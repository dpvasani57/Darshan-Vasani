from fastapi import APIRouter, HTTPException, Depends
from bson import ObjectId

from config.database import get_database
from middleware.auth import get_current_user
from utils.api_response import ApiResponse, ApiError

router = APIRouter()

@router.post("/add")
async def add_to_cart(
    cart_data: dict,
    current_user_id: str = Depends(get_current_user)
):
    try:
        db = get_database()
        users_collection = db.users
        
        user = await users_collection.find_one({"_id": ObjectId(current_user_id)})
        if not user:
            raise ApiError(404, "User not found")
        
        cart_data_user = user.get("cart_data", {})
        item_id = cart_data["itemId"]
        
        if item_id not in cart_data_user:
            cart_data_user[item_id] = 1
        else:
            cart_data_user[item_id] += 1
        
        await users_collection.update_one(
            {"_id": ObjectId(current_user_id)},
            {"$set": {"cart_data": cart_data_user}}
        )
        
        response = ApiResponse(200, None, "Added to Cart")
        return response.to_dict()
        
    except ApiError as e:
        raise HTTPException(status_code=e.status_code, detail=e.message)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/remove")
async def remove_from_cart(
    cart_data: dict,
    current_user_id: str = Depends(get_current_user)
):
    try:
        db = get_database()
        users_collection = db.users
        
        user = await users_collection.find_one({"_id": ObjectId(current_user_id)})
        if not user:
            raise ApiError(404, "User not found")
        
        cart_data_user = user.get("cart_data", {})
        item_id = cart_data["itemId"]
        
        if item_id in cart_data_user:
            if cart_data_user[item_id] > 1:
                cart_data_user[item_id] -= 1
            else:
                del cart_data_user[item_id]
        
        await users_collection.update_one(
            {"_id": ObjectId(current_user_id)},
            {"$set": {"cart_data": cart_data_user}}
        )
        
        response = ApiResponse(200, None, "Removed from Cart")
        return response.to_dict()
        
    except ApiError as e:
        raise HTTPException(status_code=e.status_code, detail=e.message)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/get")
async def get_cart(current_user_id: str = Depends(get_current_user)):
    try:
        db = get_database()
        users_collection = db.users
        
        user = await users_collection.find_one({"_id": ObjectId(current_user_id)})
        if not user:
            raise ApiError(404, "User not found")
        
        cart_data_user = user.get("cart_data", {})
        
        response = ApiResponse(200, cart_data_user, "Cart fetched successfully")
        return response.to_dict()
        
    except ApiError as e:
        raise HTTPException(status_code=e.status_code, detail=e.message)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

cart_router = router