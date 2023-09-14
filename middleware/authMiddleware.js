import express from "express"
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import cookieParser from 'cookie-parser';

const app = express()

app.use(cookieParser()); 


const protect = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;
  // console.log(token)

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      // console.log(req.user)

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

export { protect };
