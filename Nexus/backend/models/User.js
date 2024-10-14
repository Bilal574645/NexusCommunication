const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true // Removed the unique constraint from password
    },
    password: {
        type: String,
        required: true // Removed the unique constraint from password
    },
    resetOtp: String, 
    otpExpires: Date,
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
