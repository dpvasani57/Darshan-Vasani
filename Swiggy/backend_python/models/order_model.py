from pydantic import BaseModel
from typing import List, Dict, Optional
from datetime import datetime

class OrderItem(BaseModel):
    name: str
    price: float
    quantity: int

class Address(BaseModel):
    firstName: str
    lastName: str
    email: str
    street: str
    city: str
    state: str
    zipcode: str
    country: str
    phone: str

class Order(BaseModel):
    user_id: str
    items: List[OrderItem]
    amount: float
    address: Address
    status: str = "Food Processing"
    payment: bool = False

class OrderInDB(Order):
    id: Optional[str] = None
    date: Optional[datetime] = None

def order_helper(order) -> dict:
    return {
        "id": str(order["_id"]),
        "user_id": order["user_id"],
        "items": order["items"],
        "amount": order["amount"],
        "address": order["address"],
        "status": order["status"],
        "date": order.get("date"),
        "payment": order["payment"]
    }