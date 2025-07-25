import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const frontend_url = process.env.FRONTEND_URL;

// placing user order for frontend
const placeOrder = asyncHandler(async (req, res) => {
  // const frontend_url = "https://food-delivery-frontend-s2l9.onrender.com";
  const newOrder = new orderModel({
    userId: req.body.userId,
    items: req.body.items,
    amount: req.body.amount,
    address: req.body.address,
  });
  await newOrder.save();
  await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

  const line_items = req.body.items.map((item) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item.name,
      },
      unit_amount: item.price * 100,
    },
    quantity: item.quantity,
  }));

  line_items.push({
    price_data: {
      currency: "usd",
      product_data: {
        name: "Delivery Charges",
      },
      unit_amount: 2 * 100,
    },
    quantity: 1,
  });

  const session = await stripe.checkout.sessions.create({
    line_items: line_items,
    mode: "payment",
    success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
    cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
  });

  res.status(201).json(new ApiResponse(201, { session_url: session.url }, "Order placed successfully"));
});

const verifyOrder = asyncHandler(async (req, res) => {
  const { orderId, success } = req.body;
  if (success == "true") {
    await orderModel.findByIdAndUpdate(orderId, { payment: true });
    res.status(200).json(new ApiResponse(200, null, "Paid"));
  } else {
    await orderModel.findByIdAndDelete(orderId);
    res.status(400).json(new ApiResponse(400, null, "Not Paid"));
  }
});

// user orders for frontend
const userOrders = asyncHandler(async (req, res) => {
  const orders = await orderModel.find({ userId: req.body.userId });
  res.status(200).json(new ApiResponse(200, orders, "User orders fetched successfully"));
});

// Listing orders for admin pannel
const listOrders = asyncHandler(async (req, res) => {
  let userData = await userModel.findById(req.body.userId);
  if (userData && userData.role === "admin") {
    const orders = await orderModel.find({});
    res.status(200).json(new ApiResponse(200, orders, "All orders fetched successfully"));
  } else {
    throw new ApiError(403, "You are not admin");
  }
});

// api for updating status
const updateStatus = asyncHandler(async (req, res) => {
  let userData = await userModel.findById(req.body.userId);
  if (userData && userData.role === "admin") {
    await orderModel.findByIdAndUpdate(req.body.orderId, {
      status: req.body.status,
    });
    res.status(200).json(new ApiResponse(200, null, "Status Updated Successfully"));
  } else {
    throw new ApiError(403, "You are not an admin");
  }
});

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };
