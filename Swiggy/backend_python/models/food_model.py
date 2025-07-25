from pydantic import BaseModel
from typing import Optional

class Food(BaseModel):
    name: str
    description: str
    price: float
    category: str
    image: str

class FoodInDB(Food):
    id: Optional[str] = None

def food_helper(food) -> dict:
    return {
        "id": str(food["_id"]),
        "name": food["name"],
        "description": food["description"],
        "price": food["price"],
        "category": food["category"],
        "image": food["image"]
    }