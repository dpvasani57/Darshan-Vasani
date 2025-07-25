from fastapi import FastAPI, HTTPException, Depends, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse
import uvicorn
import os
from dotenv import load_dotenv

from config.database import connect_db
from routes.food_routes import food_router
from routes.user_routes import user_router
from routes.cart_routes import cart_router
from routes.order_routes import order_router

load_dotenv()

app = FastAPI(title="Food Delivery API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Static files
os.makedirs("uploads", exist_ok=True)
app.mount("/images", StaticFiles(directory="uploads"), name="images")

# Database connection
@app.on_event("startup")
async def startup_event():
    await connect_db()

# Routes
app.include_router(food_router, prefix="/api/food", tags=["food"])
app.include_router(user_router, prefix="/api/user", tags=["user"])
app.include_router(cart_router, prefix="/api/cart", tags=["cart"])
app.include_router(order_router, prefix="/api/order", tags=["order"])

@app.get("/")
async def root():
    return {"message": "API Working"}

if __name__ == "__main__":
    port = int(os.getenv("PORT", 4000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)