from pydantic import BaseModel, EmailStr
from typing import Optional, Dict
from bson import ObjectId

class User(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: str = "user"
    cart_data: Dict = {}

class UserInDB(User):
    id: Optional[str] = None

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    token: str
    role: str

def user_helper(user) -> dict:
    return {
        "id": str(user["_id"]),
        "name": user["name"],
        "email": user["email"],
        "role": user["role"],
        "cart_data": user.get("cart_data", {})
    }