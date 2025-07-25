import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv()

client = None
database = None

async def connect_db():
    global client, database
    try:
        client = AsyncIOMotorClient(os.getenv("MONGO_URL"))
        database = client.get_database()
        print("DB Connected")
    except Exception as e:
        print(f"Database connection error: {e}")

def get_database():
    return database