const express = require('express');
const app = express();
const cors = require('cors')
require('dotenv').config();
require('./config/db')
const userRoutes = require('./routes/userRoutes');
const cookieParser = require("cookie-parser")

app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(userRoutes)
app.get("/",(req,res,next)=>{
res.send('server is runnig')
})

const PORT = process.env.PORT;
app.listen(PORT,()=>{
  console.log(`server is running at http://localhost:${PORT}`);
})