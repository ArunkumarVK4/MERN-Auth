import express from "express"
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';


const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(cookieParser()); 


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


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
