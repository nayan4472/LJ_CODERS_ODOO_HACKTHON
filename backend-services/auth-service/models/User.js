const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['Manager', 'Dispatcher', 'Safety_Officer', 'Financial_Analyst'], default: 'Manager' },
    companyId: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    verificationOtp: { type: String },

    // For OTP reset
    resetOtp: { type: String },
    otpExpiry: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
