const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true,
    unique: true
  },
  password:{
    type: String,
    required: true,
    select: false
  },
  role: {
    type: String,
    enum: ["user","admin"],
    default: "user"
  },
  otp: {
    type: String,
    select: false
  },
  otpExpiry: {
    type: Date,
    select: false
  }
},{timestamps: true});

const User = mongoose.model('User',userSchema);

module.exports = User