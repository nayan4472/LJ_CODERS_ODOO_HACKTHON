import React, { useState, useEffect } from 'react';
import { Users, Search, Filter, MoreVertical, ShieldCheck, Mail, Phone, Calendar, AlertTriangle } from 'lucide-react';
import fleetService from '../services/fleet.service';

const Drivers = () => {
    const [drivers, setDrivers] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = JSON.parse(localStorage.getItem('fleetflow_user') || '{}');

    useEffect(() => {
        loadDrivers();
    }, []);

    const loadDrivers = async () => {
        try {
            const data = await fleetService.getDrivers(user.companyId);
            setDrivers(data);
        } catch (error) {
            console.error('Error loading drivers:', error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Available': return 'bg-teal-500';
            case 'On Trip': return 'bg-amber-500';
            case 'Suspended': return 'bg-crimson-500';
            default: return 'bg-slate-500';
        }
    };

    if (loading) return <div className="text-white text-center py-20">Accessing Personnel Hub...</div>;

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-black font-display tracking-[0.05em] text-white uppercase italic">Personnel <span className="text-teal-500">Hub</span></h1>
                    <p className="text-slate-500 text-sm font-medium mt-1 uppercase tracking-widest">Operator Certification & Performance Tracking</p>
                </div>
                <button className="btn-primary flex items-center shadow-glow-sm px-8">
                    ONBOARD OPERATOR
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {drivers.map(driver => (
                    <div key={driver._id} className="card group hover:shadow-glow-sm transition-all duration-500">
                        <div className="flex flex-col items-center text-center space-y-4">
                            <div className="relative">
                                <div className="absolute -inset-1 bg-gradient-to-tr from-teal-500 to-navy-700 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <div className="h-20 w-20 rounded-full border-2 border-navy-700 relative bg-navy-900 flex items-center justify-center font-black text-2xl text-teal-400">
                                    {driver.name.charAt(0)}
                                </div>
                                <div className={`absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-navy-800 ${getStatusColor(driver.status)}`}></div>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white group-hover:text-teal-400 transition-colors uppercase tracking-tight">{driver.name}</h3>
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">{driver.licenseNumber} • {driver.licenseType}</p>
                            </div>

                            <div className="flex items-center space-x-1 text-amber-500">
                                {[...Array(5)].map((_, i) => (
                                    <ShieldCheck key={i} className={`h-3 w-3 ${i < (driver.safetyScore / 20) ? 'fill-amber-500' : 'text-slate-700'}`} />
                                ))}
                            </div>

                            <div className="w-full flex flex-col space-y-2 pt-4 border-t border-navy-700/50">
                                <div className="flex justify-between items-center">
                                    <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Safety Score</span>
                                    <span className="text-xs font-black text-teal-500">{driver.safetyScore}%</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Expiry</span>
                                    <span className={`text-[10px] font-bold ${new Date(driver.licenseExpiry) < new Date() ? 'text-crimson-500' : 'text-slate-300'}`}>
                                        {new Date(driver.licenseExpiry).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>

                            <div className="flex space-x-2 pt-2">
                                <button className="p-2 bg-navy-900 rounded-lg hover:text-teal-400 transition-colors"><Mail className="h-4 w-4" /></button>
                                <button className="p-2 bg-navy-900 rounded-lg hover:text-teal-400 transition-colors"><Phone className="h-4 w-4" /></button>
                                <button className="p-2 bg-navy-900 rounded-lg hover:text-teal-400 transition-colors"><MoreVertical className="h-4 w-4" /></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Drivers;
