const express=require('express');
const app=express();
const AuthRouter = require('./routes/AuthRouter');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
require('./models/db')
const PORT=process.env.port || 8080;
app.get('/ping',(req,res)=>{
    res.send('PONG');
})
app.use(bodyParser.json());
app.use(cors());
app.use('/auth', AuthRouter);
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})