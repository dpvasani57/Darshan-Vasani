from fastapi import APIRouter, HTTPException, Depends
from bson import ObjectId
import stripe
import os
from datetime import datetime

from config.database import get_database
from models.order_model import Order, order_helper
from middleware.auth import get_current_user
from utils.api_response import ApiResponse, ApiError

router = APIRouter()

stripe.api_key = os.getenv("STRIPE_SECRET_KEY")
frontend_url = os.getenv("FRONTEND_URL", "http://localhost:3000")

@router.post("/place")
async def place_order(
    order_data: dict,
    current_user_id: str = Depends(get_current_user)
):
    try:
        db = get_database()
        orders_collection = db.orders
        users_collection = db.users
        
        # Create order
        order = {
            "user_id": current_user_id,
            "items": order_data["items"],
            "amount": order_data["amount"],
            "address": order_data["address"],
            "status": "Food Processing",
            "date": datetime.now(),
            "payment": False
        }
        
        result = await orders_collection.insert_one(order)
        order_id = str(result.inserted_id)
        
        # Clear cart
        await users_collection.update_one(
            {"_id": ObjectId(current_user_id)},
            {"$set": {"cart_data": {}}}
        )
        
        # Create Stripe session
        line_items = []
        for item in order_data["items"]:
            line_items.append({
                "price_data": {
                    "currency": "usd",
                    "product_data": {
                        "name": item["name"]
                    },
                    "unit_amount": int(item["price"] * 100)
                },
                "quantity": item["quantity"]
            })
        
        # Add delivery charges
        line_items.append({
            "price_data": {
                "currency": "usd",
                "product_data": {
                    "name": "Delivery Charges"
                },
                "unit_amount": 200
            },
            "quantity": 1
        })
        
        session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            line_items=line_items,
            mode="payment",
            success_url=f"{frontend_url}/verify?success=true&orderId={order_id}",
            cancel_url=f"{frontend_url}/verify?success=false&orderId={order_id}"
        )
        
        response = ApiResponse(201, {"session_url": session.url}, "Order placed successfully")
        return response.to_dict()
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/verify")
async def verify_order(verify_data: dict):
    try:
        db = get_database()
        orders_collection = db.orders
        
        order_id = verify_data["orderId"]
        success = verify_data["success"]
        
        if success == "true":
            await orders_collection.update_one(
                {"_id": ObjectId(order_id)},
                {"$set": {"payment": True}}
            )
            response = ApiResponse(200, None, "Paid")
        else:
            await orders_collection.delete_one({"_id": ObjectId(order_id)})
            response = ApiResponse(400, None, "Not Paid")
        
        return response.to_dict()
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/userorders")
async def user_orders(current_user_id: str = Depends(get_current_user)):
    try:
        db = get_database()
        orders_collection = db.orders
        
        orders = []
        async for order in orders_collection.find({"user_id": current_user_id}):
            orders.append(order_helper(order))
        
        response = ApiResponse(200, orders, "User orders fetched successfully")
        return response.to_dict()
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/list")
async def list_orders(current_user_id: str = Depends(get_current_user)):
    try:
        db = get_database()
        users_collection = db.users
        orders_collection = db.orders
        
        # Check if user is admin
        user = await users_collection.find_one({"_id": ObjectId(current_user_id)})
        if not user or user.get("role") != "admin":
            raise ApiError(403, "You are not admin")
        
        orders = []
        async for order in orders_collection.find():
            orders.append(order_helper(order))
        
        response = ApiResponse(200, orders, "All orders fetched successfully")
        return response.to_dict()
        
    except ApiError as e:
        raise HTTPException(status_code=e.status_code, detail=e.message)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/status")
async def update_status(
    status_data: dict,
    current_user_id: str = Depends(get_current_user)
):
    try:
        db = get_database()
        users_collection = db.users
        orders_collection = db.orders
        
        # Check if user is admin
        user = await users_collection.find_one({"_id": ObjectId(current_user_id)})
        if not user or user.get("role") != "admin":
            raise ApiError(403, "You are not an admin")
        
        await orders_collection.update_one(
            {"_id": ObjectId(status_data["orderId"])},
            {"$set": {"status": status_data["status"]}}
        )
        
        response = ApiResponse(200, None, "Status Updated Successfully")
        return response.to_dict()
        
    except ApiError as e:
        raise HTTPException(status_code=e.status_code, detail=e.message)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

order_router = router