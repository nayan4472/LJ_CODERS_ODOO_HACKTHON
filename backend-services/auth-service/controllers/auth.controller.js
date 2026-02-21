const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_jwt_key_fleetflow';

// Mock SMTP Setup - in production use real creds from env
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // true for 465, false for 587
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    },
    tls: {
        rejectUnauthorized: false // Allow self-signed certs (e.g. from local proxies/antivirus)
    }
});

// Verify SMTP connection on startup
transporter.verify((error, success) => {
    if (error) {
        console.error('❌ SMTP Connection Error:', error);
    } else {
        console.log('📧 SMTP Server is ready to take our messages');
    }
});

// Professional Email Template Generator
const generateEmailTemplate = (otp, type = 'Verification') => {
    const title = type === 'Verification' ? 'Welcome to FleetFlow!' : 'Password Reset Request';
    const message = type === 'Verification'
        ? 'Your adventure in seamless logistics starts here. Please verify your email to activate your account.'
        : 'We received a request to reset your password. Use the code below to proceed.';

    return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0A192F; color: #E2E8F0; border-radius: 12px; overflow: hidden; border: 1px solid #1E293B;">
        <div style="background: linear-gradient(135deg, #14B8A6 0%, #0D9488 100%); padding: 40px 20px; text-align: center;">
            <h1 style="margin: 0; color: #ffffff; font-size: 32px; letter-spacing: 2px; text-transform: uppercase;">Fleet<span style="color: #0A192F;">Flow</span></h1>
            <p style="margin: 10px 0 0; color: #CCFBF1; font-size: 16px; opacity: 0.9;">Modular Fleet & Logistics Hub</p>
        </div>
        <div style="padding: 40px 30px; text-align: center;">
            <h2 style="color: #14B8A6; margin-top: 0;">${title}</h2>
            <p style="font-size: 16px; line-height: 1.6; color: #94A3B8;">${message}</p>
            <div style="margin: 40px 0;">
                <div style="background-color: #112240; padding: 20px; border-radius: 8px; border: 1px dashed #14B8A6; display: inline-block;">
                    <span style="font-size: 36px; font-weight: bold; letter-spacing: 12px; color: #F59E0B; margin-left: 12px;">${otp}</span>
                </div>
            </div>
            <p style="font-size: 14px; color: #64748B;">This code will expire in 15 minutes. If you did not request this, please ignore this email.</p>
        </div>
        <div style="background-color: #0F172A; padding: 20px; text-align: center; border-top: 1px solid #1E293B;">
            <p style="margin: 0; font-size: 12px; color: #475569;">&copy; 2026 FleetFlow Logistics Systems. Built for Odoo Hackathon.</p>
        </div>
    </div>`;
};

exports.register = async (req, res) => {
    try {
        const { name, email, password, role, companyId } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ error: 'Email already registered' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        const user = new User({
            name, email, password: hashedPassword, role, companyId,
            verificationOtp: otp,
            isVerified: false
        });
        await user.save();

        const mailOptions = {
            from: `"FleetFlow" <${process.env.SMTP_USER}>`,
            to: email,
            subject: 'FleetFlow - Verify Your Account',
            html: generateEmailTemplate(otp, 'Verification')
        };

        await transporter.sendMail(mailOptions);
        console.log(`✅ Registration OTP Sent to ${email}: ${otp}`);

        res.status(201).json({ message: 'Registration initiated. OTP sent to email.' });
    } catch (error) {
        console.error('Registration Error:', error);
        res.status(500).json({ error: 'Failed to send verification email. Please check your SMTP settings or try again later.' });
    }
};

exports.verifyRegistration = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await User.findOne({ email });

        if (!user || user.verificationOtp !== otp) {
            return res.status(400).json({ error: 'Invalid or expired OTP' });
        }

        user.isVerified = true;
        user.verificationOtp = undefined;
        await user.save();

        res.status(200).json({ message: 'Account verified successfully. You can now login.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(404).json({ error: 'User not found' });
        if (!user.isVerified) return res.status(403).json({ error: 'Please verify your email before logging in.' });

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
        user.otpExpiry = Date.now() + 15 * 60 * 1000;
        await user.save();

        const mailOptions = {
            from: `"FleetFlow" <${process.env.SMTP_USER}>`,
            to: email,
            subject: 'FleetFlow - Password Reset OTP',
            html: generateEmailTemplate(otp, 'Reset')
        };

        await transporter.sendMail(mailOptions);
        console.log(`✅ Reset OTP Sent to ${email}: ${otp}`);

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

        res.status(200).json({ message: 'OTP verified, you can now reset your password' });
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
