import React, { useState } from 'react';
import { AlertCircle, Zap } from 'lucide-react';
import { Route, Navigate } from 'react-router-dom';

const TripDispatcher = () => {
    // ... same mock data ...
    const availableVehicles = [
        { id: 'V-001', name: 'Volvo FH16', capacityKgs: 25000, type: 'Heavy' },
        { id: 'V-002', name: 'Ford Transit', capacityKgs: 1500, type: 'Light' },
        { id: 'V-004', name: 'Merc Sprinter', capacityKgs: 2000, type: 'Medium' },
    ];

    const availableDrivers = [
        { id: 'D-01', name: 'Alex Johnson', licenseType: 'Class A' },
        { id: 'D-02', name: 'Maria Garcia', licenseType: 'Class B' },
    ];

    const [cargoWeight, setCargoWeight] = useState('');
    const [selectedVehicle, setSelectedVehicle] = useState('');
    const [selectedDriver, setSelectedDriver] = useState('');
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [error, setError] = useState('');

    const handleValidationAndDispatch = (e) => {
        e.preventDefault();
        setError('');

        const vehicle = availableVehicles.find(v => v.id === selectedVehicle);
        if (!vehicle) return setError('Please select a vehicle.');

        if (parseInt(cargoWeight) > vehicle.capacityKgs) {
            setError(`CRITICAL: Cargo weight (${cargoWeight} kg) exceeds ${vehicle.id}'s max threshold (${vehicle.capacityKgs} kg). Safety protocol blocked dispatch.`);
            return;
        }

        alert('TRIP AUTHORIZED. DISPATCHING NOW.');
    };

    return (
        <div className="space-y-8 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex justify-between items-end border-b border-navy-700/50 pb-6">
                <div>
                    <h1 className="text-3xl font-black font-display tracking-[0.05em] text-white uppercase">Neural <span className="text-teal-500">Dispatcher</span></h1>
                    <p className="text-slate-500 text-sm font-medium mt-1 uppercase tracking-widest">Asset Assignment & Payload Validation Logic</p>
                </div>
                <div className="text-right">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Pending Dispatches</span>
                    <div className="text-2xl font-display font-black text-teal-500">04</div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <div className="card !p-0 overflow-hidden shadow-2xl">
                        <form onSubmit={handleValidationAndDispatch} className="flex flex-col">
                            <div className="p-8 space-y-10">
                                {/* Route Details */}
                                <div className="space-y-6">
                                    <div className="flex items-center space-x-3">
                                        <div className="h-8 w-8 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 font-black text-xs">01</div>
                                        <h3 className="text-sm font-black text-white uppercase tracking-[0.15em]">Geo-Spatial Parameters</h3>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Origin Node</label>
                                            <input required type="text" className="input-field h-12 bg-navy-900/40 border-navy-700/50 focus:bg-navy-900" placeholder="e.g. HUB-ALPHA-01" value={origin} onChange={e => setOrigin(e.target.value)} />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Target Destination</label>
                                            <input required type="text" className="input-field h-12 bg-navy-900/40 border-navy-700/50 focus:bg-navy-900" placeholder="e.g. DC-CENTRAL-05" value={destination} onChange={e => setDestination(e.target.value)} />
                                        </div>
                                    </div>
                                </div>

                                {/* Cargo & Validation */}
                                <div className="space-y-6">
                                    <div className="flex items-center space-x-3">
                                        <div className="h-8 w-8 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 font-black text-xs">02</div>
                                        <h3 className="text-sm font-black text-white uppercase tracking-[0.15em]">Payload Data</h3>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2 text-left">
                                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Net Weight (kg)</label>
                                            <input required type="number" className="input-field h-12 bg-navy-900/40 border-navy-700/50" placeholder="0.00" value={cargoWeight} onChange={e => setCargoWeight(e.target.value)} />
                                        </div>
                                        <div className="space-y-2 text-left">
                                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Freight Classification</label>
                                            <select className="input-field h-12 bg-navy-900/40 border-navy-700/50">
                                                <option>STANDARD_FREIGHT</option>
                                                <option>THERMAL_CONTROLLED</option>
                                                <option>HAZARDOUS_VAL</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Asset Assignment */}
                                <div className="space-y-6">
                                    <div className="flex items-center space-x-3">
                                        <div className="h-8 w-8 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 font-black text-xs">03</div>
                                        <h3 className="text-sm font-black text-white uppercase tracking-[0.15em]">Hardware & Personnel</h3>
                                    </div>

                                    {error && (
                                        <div className="bg-crimson-500/5 border border-crimson-500/30 text-crimson-500 p-4 rounded-xl font-bold text-xs uppercase tracking-widest animate-pulse flex items-center">
                                            <AlertCircle className="h-5 w-5 mr-3 flex-shrink-0" />
                                            {error}
                                        </div>
                                    )}

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2 text-left">
                                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Asset ID</label>
                                            <select required className="input-field h-12 bg-navy-900/40 border-navy-700/50" value={selectedVehicle} onChange={e => setSelectedVehicle(e.target.value)}>
                                                <option value="" disabled>-- SELECT ASSET --</option>
                                                {availableVehicles.map(v => (
                                                    <option key={v.id} value={v.id}>{v.id} [{v.type}] - MAX {v.capacityKgs}kg</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="space-y-2 text-left">
                                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Authorized Operator</label>
                                            <select required className="input-field h-12 bg-navy-900/40 border-navy-700/50" value={selectedDriver} onChange={e => setSelectedDriver(e.target.value)}>
                                                <option value="" disabled>-- SELECT OPERATOR --</option>
                                                {availableDrivers.map(d => (
                                                    <option key={d.id} value={d.id}>{d.name} [{d.licenseType}]</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 bg-navy-800/30 border-t border-navy-700/50 flex justify-end">
                                <button type="submit" className="btn-primary w-full py-4 text-sm tracking-[0.2em] font-black shadow-none hover:shadow-glow-md transition-all">
                                    AUTHORIZE DISPATCH
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="card">
                        <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Validation Checklist</h4>
                        <div className="space-y-4">
                            {[
                                { label: 'Asset Capacity Sync', status: 'OK' },
                                { label: 'Operator License Check', status: 'OK' },
                                { label: 'Route Efficiency Analysis', status: 'OK' },
                                { label: 'Odoo ERP Connectivity', status: 'SYNC' },
                            ].map((item, idx) => (
                                <div key={idx} className="flex justify-between items-center bg-navy-900/40 p-3 rounded-lg border border-navy-700/30">
                                    <span className="text-xs font-bold text-slate-300">{item.label}</span>
                                    <span className="text-[10px] font-black text-teal-400">{item.status}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="card bg-teal-500/5 border-teal-500/20">
                        <div className="flex items-center mb-4">
                            <Zap className="h-5 w-5 text-teal-400 mr-2" />
                            <h4 className="text-[10px] font-black text-white uppercase tracking-widest">AI Optimizer</h4>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-relaxed font-medium">Selected route is 14% more fuel-efficient than standard paths. Carbon offset estimated at 12kg.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TripDispatcher;
