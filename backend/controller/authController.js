const User = require("../models/User");
const bcrypt = require("bcrypt");
const sendEmail = require("../util/sendEmail");

//Gnerate 6-digit OTP
const generateOTP = ()=> Math.floor(100000 + Math.random()*900000).toString();

//Forgot Password Api 
const forgotPassword = async (req,res) => {
  try {
    const {email} = req.body;
    const user = await User.findOne({email});

    if (!user) {
      return res.status(404).json({message: "user not found"});
    };

    const otp = generateOTP();
    user.otp = otp;
    user.otp.Expiry = Date.now() + 10*60*1000;
    await user.save();

    await sendEmail(user.email, "Password reset OTP",`Your OTP is: ${otp}`);

    res.json({message: "OTP sent to email"});
  } catch (error) {
    res.status(500).json({message: "Error sending OTP",error: error.message})
  };
}
  //Verify OTP API
  const verifyOTP = async (req,res) => {
    try {
      const {email,otp} = req.body;
      const user = await User.findOne({email,otp});

      if (!user || user.otpExpiry < Date.now()) {
        return res.status(400).json({message: "Invalid or expired OTP"})
      };

      res.json({message: "OTP verified successfully"})
    } catch (error) {
      res.status(500).json({message: "Error verifying OTP",error: error.message})
    }
  };

  //Reset Password API  
  const resetPassword = async (req,res) => {
    try {
      const {email,otp,newPassword} = req.body;
      const user = await User.findOne({email,otp});

      if (!user || user.otpExpiry < Date.now()) {
        return res.status(400).json({message: "Invalid or expired OTP"});
      }

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword,salt);
      user.otp = null;
      user.otpExpiry = null;
      await user.save()

      res.json({message: "Password reset successfully"});
    } catch (error) {
      res.status(500).json({message: "Error reseting password ", error: error.message})
    }
  }

module.exports = {forgotPassword,verifyOTP,resetPassword}