import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register, verifyRegistration } from '../services/auth.service';
import { Truck, User, Mail, Lock, Building, Briefcase, Key } from 'lucide-react';

const Register = () => {
    const [view, setView] = useState('form'); // form, otp
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'Manager',
        companyId: ''
    });
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [msg, setMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const roles = [
        { id: 'Manager', label: 'Fleet Manager', description: 'Oversee vehicle health & asset lifecycle' },
        { id: 'Dispatcher', label: 'Dispatcher', description: 'Create trips & assign drivers' },
        { id: 'Safety_Officer', label: 'Safety Officer', description: 'Monitor compliance & safety scores' },
        { id: 'Financial_Analyst', label: 'Financial Analyst', description: 'Audit fuel spend & operational costs' }
    ];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(''); setMsg('');
        setLoading(true);
        try {
            await register(formData);
            setMsg('Verification OTP sent to your email.');
            setView('otp');
        } catch (err) {
            setError(err.response?.data?.error || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setError(''); setMsg('');
        setLoading(true);
        try {
            await verifyRegistration(formData.email, otp);
            navigate('/login', { state: { message: 'Account verified! You can now login.' } });
        } catch (err) {
            setError(err.response?.data?.error || 'Invalid OTP.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-navy-900 relative overflow-hidden">
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
            <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>

            <div className="sm:mx-auto sm:w-full sm:max-w-md z-10">
                <div className="flex justify-center flex-col items-center">
                    <Truck className="h-16 w-16 text-teal-500" />
                    <h2 className="mt-4 text-center text-3xl font-extrabold text-white font-display uppercase tracking-widest">
                        Join Fleet<span className="text-teal-500">Flow</span>
                    </h2>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="card">
                        {error && <div className="mb-4 bg-crimson-500/20 border border-crimson-500 text-crimson-500 px-4 py-3 rounded relative text-sm">{error}</div>}
                        {msg && <div className="mb-4 bg-teal-500/20 border border-teal-500 text-teal-400 px-4 py-3 rounded relative text-sm">{msg}</div>}

                        {view === 'form' ? (
                            <form className="space-y-4" onSubmit={handleRegister}>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300">Full Name</label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <User className="h-5 w-5 text-slate-500" />
                                        </div>
                                        <input name="name" type="text" required className="input-field pl-10" value={formData.name} onChange={handleChange} />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-300">Email Address</label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Mail className="h-5 w-5 text-slate-500" />
                                        </div>
                                        <input name="email" type="email" required className="input-field pl-10" value={formData.email} onChange={handleChange} />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-300">Password</label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Lock className="h-5 w-5 text-slate-500" />
                                        </div>
                                        <input name="password" type="password" required className="input-field pl-10" value={formData.password} onChange={handleChange} />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-300">Company ID</label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Building className="h-5 w-5 text-slate-500" />
                                        </div>
                                        <input name="companyId" type="text" required className="input-field pl-10" placeholder="e.g. FLEET_001" value={formData.companyId} onChange={handleChange} />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">Operational Role</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Briefcase className="h-5 w-5 text-slate-500" />
                                        </div>
                                        <select
                                            name="role"
                                            value={formData.role}
                                            onChange={handleChange}
                                            className="input-field pl-10 appearance-none cursor-pointer hover:border-teal-500/50 transition-colors"
                                        >
                                            {roles.map((role) => (
                                                <option key={role.id} value={role.id} className="bg-navy-900 text-white">
                                                    {role.label}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                            <div className="h-4 w-4 border-r-2 border-b-2 border-slate-500 rotate-45 mb-1 mr-1"></div>
                                        </div>
                                    </div>
                                    <p className="mt-2 text-[10px] text-slate-500 uppercase tracking-widest italic">
                                        {roles.find(r => r.id === formData.role)?.description}
                                    </p>
                                </div>

                                <div className="pt-2">
                                    <button type="submit" disabled={loading} className="w-full btn-primary flex justify-center items-center">
                                        {loading ? 'Sending OTP...' : 'Register Now'}
                                    </button>
                                </div>

                                <div className="text-center mt-4 text-sm text-slate-400">
                                    Already have an account?{' '}
                                    <Link to="/login" className="font-medium text-teal-500 hover:text-teal-400">
                                        Sign in instead
                                    </Link>
                                </div>
                            </form>
                        ) : (
                            <form className="space-y-6" onSubmit={handleVerifyOtp}>
                                <div className="text-center mb-6">
                                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-500/10 mb-4">
                                        <Key className="h-8 w-8 text-teal-500" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white">Check your email</h3>
                                    <p className="text-slate-400 text-sm mt-1">We've sent a 6-digit verification code to <br /><span className="text-white font-medium">{formData.email}</span></p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-300 text-center mb-4">Enter 6-digit code</label>
                                    <input
                                        type="text"
                                        maxLength="6"
                                        required
                                        className="input-field text-center text-2xl tracking-[1em] font-mono"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                                        placeholder="000000"
                                    />
                                </div>

                                <button type="submit" disabled={loading} className="w-full btn-primary">
                                    {loading ? 'Verifying...' : 'Verify & Complete'}
                                </button>

                                <div className="text-center">
                                    <button
                                        type="button"
                                        onClick={() => setView('form')}
                                        className="text-sm text-slate-400 hover:text-white transition-colors"
                                    >
                                        Change email address
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
