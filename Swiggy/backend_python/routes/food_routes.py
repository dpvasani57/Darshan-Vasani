from fastapi import APIRouter, HTTPException, Depends, File, UploadFile, Form
from bson import ObjectId
import os
import aiofiles
from datetime import datetime

from config.database import get_database
from models.food_model import Food, food_helper
from models.user_model import user_helper
from middleware.auth import get_current_user
from utils.api_response import ApiResponse, ApiError

router = APIRouter()

@router.post("/add")
async def add_food(
    name: str = Form(...),
    description: str = Form(...),
    price: float = Form(...),
    category: str = Form(...),
    image: UploadFile = File(...),
    current_user_id: str = Depends(get_current_user)
):
    try:
        db = get_database()
        users_collection = db.users
        foods_collection = db.foods
        
        # Check if user is admin
        user = await users_collection.find_one({"_id": ObjectId(current_user_id)})
        if not user or user.get("role") != "admin":
            raise ApiError(403, "You are not admin")
        
        # Save image
        timestamp = str(int(datetime.now().timestamp() * 1000))
        image_filename = f"{timestamp}{image.filename}"
        
        os.makedirs("uploads", exist_ok=True)
        file_path = f"uploads/{image_filename}"
        
        async with aiofiles.open(file_path, 'wb') as f:
            content = await image.read()
            await f.write(content)
        
        # Create food item
        food_data = {
            "name": name,
            "description": description,
            "price": price,
            "category": category,
            "image": image_filename
        }
        
        await foods_collection.insert_one(food_data)
        response = ApiResponse(201, None, "Food Added")
        
        return response.to_dict()
        
    except ApiError as e:
        raise HTTPException(status_code=e.status_code, detail=e.message)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/list")
async def list_foods():
    try:
        db = get_database()
        foods_collection = db.foods
        
        foods = []
        async for food in foods_collection.find():
            foods.append(food_helper(food))
        
        response = ApiResponse(200, foods, "All foods fetched successfully")
        return response.to_dict()
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/remove")
async def remove_food(
    food_data: dict,
    current_user_id: str = Depends(get_current_user)
):
    try:
        db = get_database()
        users_collection = db.users
        foods_collection = db.foods
        
        # Check if user is admin
        user = await users_collection.find_one({"_id": ObjectId(current_user_id)})
        if not user or user.get("role") != "admin":
            raise ApiError(403, "You are not admin")
        
        # Find and delete food
        food = await foods_collection.find_one({"_id": ObjectId(food_data["id"])})
        if not food:
            raise ApiError(404, "Food not found")
        
        # Remove image file
        image_path = f"uploads/{food['image']}"
        if os.path.exists(image_path):
            os.remove(image_path)
        
        await foods_collection.delete_one({"_id": ObjectId(food_data["id"])})
        
        response = ApiResponse(200, None, "Food Removed")
        return response.to_dict()
        
    except ApiError as e:
        raise HTTPException(status_code=e.status_code, detail=e.message)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

food_router = router