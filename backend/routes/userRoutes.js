const express = require('express');
const User = require('../models/User');
const userRoutes = express.Router();
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
require('dotenv').config()
const authMiddleware = require("../middlewares/authMiddleware.js")

userRoutes.post("/signup",async (req,res) => {
  try {
    const {name,email,password} = req.body;
    const existUser = await User.findOne({email});
    if (existUser) {
      return res.status(404).json({message: "user already existing"})
    }
  
    //password hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt)

    const newUser = new User({name,email,password:hashedPassword});
    await newUser.save();

    //jwt token generate
    const token = jwt.sign(
      {id: newUser._id, role: newUser.rol},
      process.jwt.JWT_SECRET,
      {expiresIn: "7d"}
    )
    
    res.cookie("token",token,{
      httpOnly: true,
      secure: process.env.NODE_ENV === "prodution",
      maxAge: 7*24*60*60*1000
    })
    res.status(200).json({message:"user registered successfully",user:newUser,token me bhi })
  } catch (error) {
    res.status(500).json({message:"something went wrong",error: error.message})
  }
});

userRoutes.post("/login",async (req,res) => {
  try {
    const {email,password} = req.body;
    
    const existUser = await User.findOne({email}).select("+password");
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

    //token store in httonly cookie
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
})

module.exports = userRoutes