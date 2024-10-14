const express = require('express')
const crypto = require('crypto')
const nodemailer = require('nodemailer')
const User = require('../models/User')

const router = express.Router()

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:  process.env.EMAIL_USER,
        pass:  process.env.EMAIL_PASS
    }
});

router.post('/forgot-password', async (req,res)=>{
    const{email} = req.body;

    try{
        const user = await User.findOne({email});
        if(!user)
        {
            res.status(400).json({message: "User not found"})
        }

        const otp = crypto.randomInt(100000,999999)

        user.resetOtp = otp;
        user.otpExpires = Date.now()+10*60*1000;
        await user.save()

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Password Reset OTP',
            text: `Your OTP for password reset is: ${otp}. It will expire in 10 minutes.`
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({message: "OTP sent to email"})


    }
    catch(error){
        res.status(500).json({ error: error.message });
    }
})

module.exports = router