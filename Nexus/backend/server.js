const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
const authorize = require('./routes/auth')
const forgotPasswordRoutes = require('./routes/forgotPassword');
const otpVerifyRoutes = require('./routes/otpVerify');
const resetPasswordRoutes = require('./routes/resetPassword');

const app = express()


app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log('MongoDB connected'))
.catch(err=>console.log(err))

 const port = process.env.PORT
 app.use(cors({
    origin: 'http://localhost:3000',  // Allow frontend domain
    methods: ['GET', 'POST'],
    credentials: true,
}));
 app.use('/api/auth',authorize)
 app.use('/auth', forgotPasswordRoutes);
app.use('/auth', otpVerifyRoutes);
app.use('/auth', resetPasswordRoutes);


app.listen(port,(req,res)=>{
    console.log(`listening on port ${port}`)
})


