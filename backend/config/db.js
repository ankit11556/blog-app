const mongoose = require('mongoose');
require('dotenv').config()

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
  console.log("mongoose connect");
})
.catch((err)=>{
  console.log("mongoose not connect",err);
})