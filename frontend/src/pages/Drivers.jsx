import React, { useState } from 'react';
import { Users, Search, Filter, MoreVertical, ShieldCheck, Mail, Phone } from 'lucide-react';

const initialDrivers = [
    { id: 'D-001', name: 'Alex Johnson', status: 'Active', license: 'Class A', trips: 142, rating: 4.9, avatar: 'https://i.pravatar.cc/100?u=1' },
    { id: 'D-002', name: 'Maria Garcia', status: 'On Trip', license: 'Class B', trips: 89, rating: 4.7, avatar: 'https://i.pravatar.cc/100?u=2' },
    { id: 'D-003', name: 'Robert Chen', status: 'Active', license: 'Class A', trips: 210, rating: 4.8, avatar: 'https://i.pravatar.cc/100?u=3' },
    { id: 'D-004', name: 'Sarah Miller', status: 'Off Duty', license: 'Class B', trips: 56, rating: 4.9, avatar: 'https://i.pravatar.cc/100?u=4' },
];

const Drivers = () => {
    const [searchTerm, setSearchTerm] = useState('');

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
                {initialDrivers.map(driver => (
                    <div key={driver.id} className="card group hover:shadow-glow-sm transition-all duration-500">
                        <div className="flex flex-col items-center text-center space-y-4">
                            <div className="relative">
                                <div className="absolute -inset-1 bg-gradient-to-tr from-teal-500 to-navy-700 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <img src={driver.avatar} alt={driver.name} className="h-20 w-20 rounded-full border-2 border-navy-700 relative grayscale group-hover:grayscale-0 transition-all" />
                                <div className={`absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-navy-800 ${driver.status === 'Active' ? 'bg-teal-500' : driver.status === 'On Trip' ? 'bg-amber-500' : 'bg-slate-500'}`}></div>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white group-hover:text-teal-400 transition-colors uppercase tracking-tight">{driver.name}</h3>
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">{driver.id} • {driver.license}</p>
                            </div>
                            <div className="flex items-center space-x-1 text-amber-500">
                                {[...Array(5)].map((_, i) => <ShieldCheck key={i} className={`h-3 w-3 ${i < Math.floor(driver.rating) ? 'fill-amber-500' : 'text-slate-700'}`} />)}
                            </div>
                            <div className="w-full grid grid-cols-2 gap-2 pt-4 border-t border-navy-700/50">
                                <div className="text-center">
                                    <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest leading-none">Total Trips</p>
                                    <p className="text-sm font-display font-black text-white">{driver.trips}</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest leading-none">Rating</p>
                                    <p className="text-sm font-display font-black text-teal-500">{driver.rating}</p>
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
