import userModel from "../models/userModel.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// add items to user cart
const addToCart = asyncHandler(async (req, res) => {
  let userData = await userModel.findById(req.body.userId);
  if (!userData) {
    throw new ApiError(404, "User not found");
  }
  let cartData = await userData.cartData;
  if (!cartData[req.body.itemId]) {
    cartData[req.body.itemId] = 1;
  } else {
    cartData[req.body.itemId] += 1;
  }
  await userModel.findByIdAndUpdate(req.body.userId, { cartData });
  res.status(200).json(new ApiResponse(200, null, "Added to Cart"));
});

// remove from cart
const removeFromCart = asyncHandler(async (req, res) => {
  let userData = await userModel.findById(req.body.userId);
  if (!userData) {
    throw new ApiError(404, "User not found");
  }
  let cartData = await userData.cartData;
  if (cartData[req.body.itemId] > 1) {
    cartData[req.body.itemId] -= 1;
  } else {
    delete cartData[req.body.itemId];
  }
  await userModel.findByIdAndUpdate(req.body.userId, { cartData });
  res.status(200).json(new ApiResponse(200, null, "Removed from Cart"));
});

// fetch user cart data
const getCart = asyncHandler(async (req, res) => {
  let userData = await userModel.findById(req.body.userId);
  if (!userData) {
    throw new ApiError(404, "User not found");
  }
  let cartData = await userData.cartData;
  res.status(200).json(new ApiResponse(200, cartData, "Cart fetched successfully"));
});

export { addToCart, removeFromCart, getCart };
