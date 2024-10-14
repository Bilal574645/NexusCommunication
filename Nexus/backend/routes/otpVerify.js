const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.post('/verify-otp', async (req,res)=>{
    const {email,otp} = req.body
    const user = await User.findOne({email})
    try {
        if(!user)
        {
            res.status(400).json({message: "User not found"})
        }
        if(user.resetOtp!== otp || Date.now() >user.otpExpires )
        {
            res.status(400).json({message: "Invalid or expired OTP"})
        }
        res.status(200).json({ message: "OTP verified, proceed to reset your password" });

    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

module.exports = router