import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// login user

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    throw new ApiError(404, "User Doesn't exist");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new ApiError(401, "Invalid Credentials");
  }
  const role = user.role;
  const token = createToken(user._id);
  res.status(200).json(new ApiResponse(200, { token, role }, "Login successful"));
});

// Create token

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// register user

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const exists = await userModel.findOne({ email });
  if (exists) {
    throw new ApiError(409, "User already exists");
  }
  if (!validator.isEmail(email)) {
    throw new ApiError(400, "Please enter valid email");
  }
  if (password.length < 8) {
    throw new ApiError(400, "Please enter strong password");
  }
  const salt = await bcrypt.genSalt(Number(process.env.SALT));
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = new userModel({
    name: name,
    email: email,
    password: hashedPassword,
  });
  const user = await newUser.save();
  const role = user.role;
  const token = createToken(user._id);
  res.status(201).json(new ApiResponse(201, { token, role }, "Registration successful"));
});

export { loginUser, registerUser };
