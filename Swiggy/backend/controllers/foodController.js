import foodModel from "../models/foodModel.js";
import userModel from "../models/userModel.js";
import fs from "fs";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// add food items

const addFood = asyncHandler(async (req, res) => {
  let image_filename = `${req.file.filename}`;
  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });
  let userData = await userModel.findById(req.body.userId);
  if (userData && userData.role === "admin") {
    await food.save();
    res.status(201).json(new ApiResponse(201, null, "Food Added"));
  } else {
    throw new ApiError(403, "You are not admin");
  }
});

// all foods
const listFood = asyncHandler(async (req, res) => {
  const foods = await foodModel.find({});
  res.status(200).json(new ApiResponse(200, foods, "All foods fetched successfully"));
});

// remove food item
const removeFood = asyncHandler(async (req, res) => {
  let userData = await userModel.findById(req.body.userId);
  if (userData && userData.role === "admin") {
    const food = await foodModel.findById(req.body.id);
    if (!food) {
      throw new ApiError(404, "Food not found");
    }
    fs.unlink(`uploads/${food.image}`, () => {});
    await foodModel.findByIdAndDelete(req.body.id);
    res.status(200).json(new ApiResponse(200, null, "Food Removed"));
  } else {
    throw new ApiError(403, "You are not admin");
  }
});

export { addFood, listFood, removeFood };
