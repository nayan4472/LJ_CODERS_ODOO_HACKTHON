import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, forgotPassword, verifyOtp, resetPassword } from '../services/auth.service';
import { Truck, Lock, Mail, Key } from 'lucide-react';

const Login = () => {
    const [view, setView] = useState('login'); // login, forgot, otp, reset
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const data = await login(email, password);
            if (data.token) navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed. Note: you must register first in a real DB.');
        }
    };

    const handleForgot = async (e) => {
        e.preventDefault();
        setError(''); setMsg('');
        try {
            await forgotPassword(email);
            setMsg('OTP sent to your email.');
            setView('otp');
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to send OTP.');
        }
    };

    const handleOtp = async (e) => {
        e.preventDefault();
        setError(''); setMsg('');
        try {
            await verifyOtp(email, otp);
            setMsg('OTP verified.');
            setView('reset');
        } catch (err) {
            setError(err.response?.data?.error || 'Invalid OTP.');
        }
    };

    const handleReset = async (e) => {
        e.preventDefault();
        setError(''); setMsg('');
        try {
            await resetPassword(email, password);
            setMsg('Password updated. Please log in.');
            setView('login');
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to reset password.');
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-navy-900 relative overflow-hidden">
            {/* Background design elements */}
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
            <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>

            <div className="sm:mx-auto sm:w-full sm:max-w-md z-10">
                <div className="flex justify-center flex-col items-center">
                    <Truck className="h-16 w-16 text-teal-500" />
                    <h2 className="mt-4 text-center text-3xl font-extrabold text-white font-display uppercase tracking-widest">
                        Fleet<span className="text-teal-500">Flow</span>
                    </h2>
                    <p className="mt-2 text-center text-sm text-slate-400">
                        Modular Fleet & Logistics Hub
                    </p>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="card">
                        {error && <div className="mb-4 bg-crimson-500/20 border border-crimson-500 text-crimson-500 px-4 py-3 rounded relative text-sm">{error}</div>}
                        {msg && <div className="mb-4 bg-teal-500/20 border border-teal-500 text-teal-400 px-4 py-3 rounded relative text-sm">{msg}</div>}

                        {view === 'login' && (
                            <form className="space-y-6" onSubmit={handleLogin}>
                                <div><label className="block text-sm font-medium text-slate-300">Email address</label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Mail className="h-5 w-5 text-slate-500" />
                                        </div>
                                        <input type="email" required className="input-field pl-10" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                </div>
                                <div><label className="block text-sm font-medium text-slate-300">Password</label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Lock className="h-5 w-5 text-slate-500" />
                                        </div>
                                        <input type="password" required className="input-field pl-10" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="text-sm">
                                        <button type="button" onClick={() => setView('forgot')} className="font-medium text-teal-500 hover:text-teal-400">Forgot your password?</button>
                                    </div>
                                </div>
                                <div><button type="submit" className="w-full btn-primary flex justify-center">Sign in</button></div>
                            </form>
                        )}

                        {view === 'forgot' && (
                            <form className="space-y-6" onSubmit={handleForgot}>
                                <h3 className="text-lg font-medium text-white mb-2">Reset Password</h3>
                                <div><label className="block text-sm font-medium text-slate-300">Email address</label>
                                    <div className="mt-1"><input type="email" required className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
                                </div>
                                <div><button type="submit" className="w-full btn-primary">Send OTP</button></div>
                                <div className="text-center mt-4">
                                    <button type="button" onClick={() => setView('login')} className="text-sm text-slate-400 hover:text-white">Back to login</button>
                                </div>
                            </form>
                        )}

                        {view === 'otp' && (
                            <form className="space-y-6" onSubmit={handleOtp}>
                                <h3 className="text-lg font-medium text-white mb-2">Enter OTP</h3>
                                <div><label className="block text-sm font-medium text-slate-300">6-Digit Code</label>
                                    <div className="mt-1"><input type="text" required className="input-field text-center tracking-widest text-lg" value={otp} onChange={(e) => setOtp(e.target.value)} /></div>
                                </div>
                                <div><button type="submit" className="w-full btn-primary">Verify OTP</button></div>
                            </form>
                        )}

                        {view === 'reset' && (
                            <form className="space-y-6" onSubmit={handleReset}>
                                <h3 className="text-lg font-medium text-white mb-2">Set New Password</h3>
                                <div><label className="block text-sm font-medium text-slate-300">New Password</label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Key className="h-5 w-5 text-slate-500" />
                                        </div>
                                        <input type="password" required className="input-field pl-10" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                </div>
                                <div><button type="submit" className="w-full btn-primary">Save New Password</button></div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
