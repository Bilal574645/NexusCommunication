const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const router = express.Router()

router.post('/signup',async (req,res)=>{
    const {firstName,lastName,userName,email,password} = req.body

    try {
        const existingUser = await User.findOne({email});
        if(existingUser){
            res.status(400).json({message: "User already exists"})
        }

        const hashedPassword = await bcrypt.hash(password,10)
        const newUser = new User({
            firstName,
            lastName,
            userName,
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({message: "User created successfully"});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
})

router.post('/login', async (req, res) => {
    // Extract email or username and password from the request body
    const { emailOrUsername, password } = req.body;

    // Check if both fields are present
    if (!emailOrUsername || !password) {
        return res.status(400).json({ message: 'Username or Email and Password are required!' });
    }

    // Log the attempt to check that the values are being received correctly
    console.log(`Login attempt with ${emailOrUsername} and password`);

    try {
        const user = await User.findOne({
            $or: [{ email: emailOrUsername }, { userName: emailOrUsername }]
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Assuming you are using bcrypt to compare passwords
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Proceed with token creation and sending response back
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Login successful!', token });
        
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Something went wrong!' });
    }
});


module.exports = router