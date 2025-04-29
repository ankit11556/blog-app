const express = require('express');
const User = require('../models/User');
const userRoutes = express.Router();
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
require('dotenv').config()
const authMiddleware = require("../middlewares/authMiddleware.js")
const roleMiddleware = require("../middlewares/rolemiddleware.js")
const {forgotPassword,verifyOTP,resetPassword} = require("../controller/authController.js")

userRoutes.post("/signup",async (req,res) => {
  try {
    const {name,email,password,role} = req.body;
    const existUser = await User.findOne({email});
    if (existUser) {
      return res.status(404).json({error: "user already existing"})
    }
  
    //password hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt)

    const newUser = new User({name,email,password:hashedPassword,role: role || "user"});
    await newUser.save();

    //jwt token generate
    const token = jwt.sign(
      {id: newUser._id, role: newUser.role},
      process.env.JWT_SECRET,
      {expiresIn: "7d"}
    )
    
    res.cookie("token",token,{
      httpOnly: true,
      secure: process.env.NODE_ENV === "prodution",
      maxAge: 7*24*60*60*1000
    })
    res.status(200).json({message:"user registered successfully",user:newUser,token:token })
  } catch (error) {
    res.status(500).json({message:"something went wrong",error: error.message})
  }
});

userRoutes.post("/login",async (req,res) => {
  try {
    const {email,password} = req.body;
    
    const existUser = await User.findOne({email});
    
    if (!existUser) {
      return res.status(404).json({message: "invalid email or password"});
    };

    const isPasswordValid = await bcrypt.compare(password,existUser.password);
    if(!isPasswordValid){
      return res.status(404).json({message:"invalid email or password"})
    };

    //jwt token generating
    const token = jwt.sign(
      {id:existUser._id,role: existUser.role},
      process.env.JWT_SECRET,
      {expiresIn: "7d"}
    );

    //token store in httponly cookie
    res.cookie("token",token,{
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7*24*60*60*1000,
    })

    res.status(200).json({message: "login successfully"})
  } catch (error) {
    res.status(500).json({message: "something went wrong",error: error.message})
  }
});

userRoutes.get("/profile",authMiddleware,(req,res)=>{
  res.json({message: "User profile accessed", user: req.user})
});

//role middleware
userRoutes.get("/admin",authMiddleware,roleMiddleware(["admin"]),(req,res)=>{
  res.json({message: "Welcome Admin! You have access to this route. "})
})

//logout
userRoutes.post("/logout",(req,res)=>{
  res.clearCookie("token");
  res.status(200).json({message: "Lougout successful"})
});

userRoutes.post("/forgot-password",forgotPassword);
userRoutes.post("/verify-otp",verifyOTP)
userRoutes.post("/reset-password",resetPassword)


module.exports = userRoutes