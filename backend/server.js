const express = require('express');
const app = express();
const cors = require('cors')
require('dotenv').config();

app.use(cors())
app.use(express.json())

app.get("/",(req,res,next)=>{
  res.send('server is runnig')
})

const PORT = 5500;
app.listen(PORT,()=>{
  console.log(`server is running at http://localhost:${PORT}`);
})