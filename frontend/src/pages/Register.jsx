import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../services/auth.service';
import { Truck, User, Mail, Lock, Building, Briefcase } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'Manager',
        companyId: ''
    });
    const [error, setError] = useState('');
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await register(formData);
            navigate('/login', { state: { message: 'Registration successful! Please login.' } });
        } catch (err) {
            setError(err.response?.data?.error || 'Registration failed. Please try again.');
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

                        <form className="space-y-4" onSubmit={handleSubmit}>
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
                                <label className="block text-sm font-medium text-slate-300 mb-2">Your Role</label>
                                <div className="grid grid-cols-1 gap-3">
                                    {roles.map((role) => (
                                        <label key={role.id} className={`relative flex cursor-pointer rounded-lg border p-4 shadow-sm focus:outline-none transition-all ${formData.role === role.id ? 'border-teal-500 bg-teal-500/10 ring-1 ring-teal-500' : 'border-slate-700 bg-slate-800/50 hover:bg-slate-800'
                                            }`}>
                                            <input type="radio" name="role" value={role.id} checked={formData.role === role.id} onChange={handleChange} className="sr-only" />
                                            <span className="flex flex-1">
                                                <span className="flex flex-col">
                                                    <span className="block text-sm font-medium text-white">{role.label}</span>
                                                    <span className="mt-1 flex items-center text-xs text-slate-400">{role.description}</span>
                                                </span>
                                            </span>
                                            <Briefcase className={`h-5 w-5 ${formData.role === role.id ? 'text-teal-500' : 'text-slate-500'}`} />
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-2">
                                <button type="submit" disabled={loading} className="w-full btn-primary flex justify-center items-center">
                                    {loading ? 'Creating Account...' : 'Register Now'}
                                </button>
                            </div>

                            <div className="text-center mt-4 text-sm text-slate-400">
                                Already have an account?{' '}
                                <Link to="/login" className="font-medium text-teal-500 hover:text-teal-400">
                                    Sign in instead
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
