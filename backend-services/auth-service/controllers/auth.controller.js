const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_jwt_key_fleetflow';

// Mock SMTP Setup - in production use real creds from env
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.ethereal.email',
    port: process.env.SMTP_PORT || 587,
    auth: {
        user: process.env.SMTP_USER || 'ethereal.user@ethereal.email',
        pass: process.env.SMTP_PASS || 'ethereal_pass'
    }
});

exports.register = async (req, res) => {
    try {
        const { name, email, password, role, companyId } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name, email, password: hashedPassword, role, companyId
        });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(404).json({ error: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id, role: user.role, companyId: user.companyId }, JWT_SECRET, { expiresIn: '1d' });

        res.status(200).json({ token, user: { id: user._id, name: user.name, role: user.role, email: user.email } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: 'User not found' });

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        user.resetOtp = otp;
        user.otpExpiry = Date.now() + 15 * 60 * 1000; // 15 mins
        await user.save();

        const mailOptions = {
            from: '"FleetFlow Security" <no-reply@fleetflow.io>',
            to: email,
            subject: 'FleetFlow - Password Reset OTP',
            html: `<div style="font-family: Arial, sans-serif; background-color: #0A192F; color: #fff; padding: 20px;">
                    <h2 style="color: #64FFDA;">Password Reset Request</h2>
                    <p>Your One-Time Password (OTP) is:</p>
                    <h1 style="color: #FFC107; background: #112240; padding: 10px; display: inline-block; border-radius: 5px;">${otp}</h1>
                    <p>This code is valid for 15 minutes.</p>
                   </div>`
        };

        // await transporter.sendMail(mailOptions); // Uncomment when real SMTP is ready
        console.log(`Mock Email Sent to ${email} with OTP: ${otp}`);

        res.status(200).json({ message: 'OTP sent to email' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await User.findOne({ email });

        if (!user || user.resetOtp !== otp || user.otpExpiry < Date.now()) {
            return res.status(400).json({ error: 'Invalid or expired OTP' });
        }

        res.status(200).json({ message: 'OTP verified, you can now reset your password', resetToken: 'mock_token_for_now' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: 'User not found' });

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetOtp = undefined;
        user.otpExpiry = undefined;
        await user.save();

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
