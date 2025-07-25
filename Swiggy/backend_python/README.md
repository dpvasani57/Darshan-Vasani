# FastAPI Food Delivery Backend

This is a Python FastAPI equivalent of the Node.js backend for the food delivery application.

## Features

- User authentication (register/login) with JWT tokens
- Food item management (CRUD operations)
- Shopping cart functionality
- Order management with Stripe payment integration
- Admin panel support
- File upload for food images
- MongoDB integration with Motor (async driver)

## Installation

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Create a `.env` file based on `.env.example` and fill in your configuration:
```bash
cp .env.example .env
```

4. Run the application:
```bash
python main.py
```

Or using uvicorn directly:
```bash
uvicorn main:app --reload --port 4000
```

## API Endpoints

### User Routes
- `POST /api/user/register` - Register a new user
- `POST /api/user/login` - Login user

### Food Routes
- `POST /api/food/add` - Add new food item (Admin only)
- `GET /api/food/list` - Get all food items
- `POST /api/food/remove` - Remove food item (Admin only)

### Cart Routes
- `POST /api/cart/add` - Add item to cart
- `POST /api/cart/remove` - Remove item from cart
- `POST /api/cart/get` - Get user's cart

### Order Routes
- `POST /api/order/place` - Place new order
- `POST /api/order/verify` - Verify payment
- `POST /api/order/userorders` - Get user's orders
- `GET /api/order/list` - Get all orders (Admin only)
- `POST /api/order/status` - Update order status (Admin only)

## Project Structure

```
backend_python/
├── config/
│   └── database.py          # Database connection
├── models/
│   ├── user_model.py        # User data models
│   ├── food_model.py        # Food data models
│   └── order_model.py       # Order data models
├── routes/
│   ├── user_routes.py       # User-related endpoints
│   ├── food_routes.py       # Food-related endpoints
│   ├── cart_routes.py       # Cart-related endpoints
│   └── order_routes.py      # Order-related endpoints
├── middleware/
│   └── auth.py              # Authentication middleware
├── utils/
│   └── api_response.py      # Response utilities
├── uploads/                 # Uploaded images directory
├── main.py                  # Application entry point
├── requirements.txt         # Python dependencies
└── README.md               # This file
```

## Key Differences from Node.js Version

1. **Async/Await**: Uses Python's async/await with Motor for MongoDB operations
2. **Type Hints**: Leverages Pydantic models for request/response validation
3. **Dependency Injection**: Uses FastAPI's dependency injection system
4. **Auto Documentation**: Automatic API documentation at `/docs`
5. **File Handling**: Uses aiofiles for async file operations

## Environment Variables

- `MONGO_URL`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token generation
- `SALT`: Salt rounds for password hashing
- `STRIPE_SECRET_KEY`: Stripe secret key for payments
- `FRONTEND_URL`: Frontend URL for Stripe redirects
- `PORT`: Server port (default: 4000)