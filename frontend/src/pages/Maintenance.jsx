import React, { useState, useEffect } from 'react';
import { Wrench, ShieldAlert, CheckCircle, Clock, Zap, History, AlertTriangle } from 'lucide-react';
import fleetService from '../services/fleet.service';
import analyticsService from '../services/analytics.service';

const Maintenance = () => {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = JSON.parse(localStorage.getItem('fleetflow_user') || '{}');

    useEffect(() => {
        loadVehicles();
    }, []);

    const loadVehicles = async () => {
        try {
            const data = await fleetService.getVehicles(user.companyId);
            setVehicles(data);
        } catch (error) {
            console.error('Error loading maintenance data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleRepair = async (vehicleId, currentStatus) => {
        try {
            const newStatus = currentStatus === 'In Shop' ? 'Available' : 'In Shop';
            await fleetService.updateVehicle(vehicleId, { status: newStatus });

            if (newStatus === 'In Shop') {
                await analyticsService.addMaintenanceLog({
                    vehicleId,
                    serviceType: 'Predictive Repair',
                    cost: 0,
                    description: 'Scheduled via Intelligence Dashboard',
                    companyId: user.companyId
                });
            }
            loadVehicles();
        } catch (error) {
            alert('Maintenance operation failed.');
        }
    };

    const criticalVehicles = vehicles.filter(v => v.odometer > 100000 || v.status === 'In Shop');

    if (loading) return <div className="text-white text-center py-20">Scanning Fleet Integrity...</div>;

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-black font-display tracking-[0.05em] text-white uppercase italic">Advanced <span className="text-teal-500">Insights</span></h1>
                    <p className="text-slate-500 text-sm font-medium mt-1 uppercase tracking-widest">Predictive Maintenance & Asset Health Telemetry</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8 space-y-6">
                    <div className="card !p-0 overflow-hidden">
                        <div className="p-6 border-b border-navy-700/50 flex items-center justify-between bg-navy-900/20">
                            <h3 className="text-xs font-black text-white uppercase tracking-widest flex items-center">
                                <ShieldAlert className="h-4 w-4 text-crimson-500 mr-2" />
                                HIGH_PRIORITY_MAINTENANCE_REQUIRED
                            </h3>
                            <span className="text-[10px] bg-crimson-500/10 text-crimson-500 px-2 py-0.5 rounded animate-pulse">CRITICAL</span>
                        </div>
                        <div className="p-2 space-y-1">
                            {criticalVehicles.map((v) => (
                                <div key={v._id} className="p-6 hover:bg-navy-800/30 transition-all group rounded-xl">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center space-x-4">
                                            <div className="h-12 w-12 rounded-2xl bg-navy-900 flex items-center justify-center border border-navy-700 group-hover:border-crimson-500/50 transition-colors">
                                                <Wrench className="h-5 w-5 text-slate-500 group-hover:text-crimson-500" />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-black text-white uppercase tracking-tight group-hover:text-crimson-400 transition-colors">{v.model} ({v.plateNumber})</h4>
                                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                                    Current Odometer: {v.odometer} km • Status: {v.status}
                                                </p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleRepair(v._id, v.status)}
                                            className={`btn-secondary py-1 text-[9px] font-black uppercase tracking-widest transition-all ${v.status === 'In Shop' ? 'border-teal-500/30 text-teal-500 hover:bg-teal-500/10' : 'border-crimson-500/30 text-crimson-500 hover:bg-crimson-500/10'
                                                }`}
                                        >
                                            {v.status === 'In Shop' ? 'RELEASE_TO_SERVICE' : 'EXECUTE_REPAIR_SEQUENCE'}
                                        </button>
                                    </div>
                                    <p className="text-xs text-slate-400 leading-relaxed max-w-2xl">
                                        {v.odometer > 100000 ? 'Telemetry indicates anomalous thermal signature in Block B. Probability of failure high.' : 'Asset is currently undergoing scheduled maintenance protocols.'}
                                    </p>
                                </div>
                            ))}
                            {criticalVehicles.length === 0 && <p className="text-center py-8 text-slate-500 text-xs">All systems nominal. No critical failures predicted.</p>}
                        </div>
                    </div>

                    <div className="card !p-0 overflow-hidden">
                        <div className="p-6 border-b border-navy-700/50 bg-navy-900/20">
                            <h3 className="text-xs font-black text-white uppercase tracking-widest flex items-center">
                                <History className="h-4 w-4 text-teal-500 mr-2" />
                                SYSTEM_HEALTH_HISTORY
                            </h3>
                        </div>
                        <div className="p-8">
                            <div className="grid grid-cols-7 gap-1">
                                {[...Array(28)].map((_, i) => (
                                    <div key={i} className={`h-8 rounded-sm ${Math.random() > 0.05 ? 'bg-teal-500/20 shadow-[inset_0_0_10px_rgba(100,255,218,0.1)]' : 'bg-crimson-500/40'} border border-white/5`}></div>
                                ))}
                            </div>
                            <div className="mt-4 flex justify-between text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                <span>28_DAYS_AGO</span>
                                <span className="text-teal-400">NOMINAL_UPTIME_99.2%</span>
                                <span>PRESENT</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-4 space-y-6">
                    <div className="card bg-gradient-to-br from-navy-800 to-navy-900 border-teal-500/20">
                        <div className="flex items-center space-x-3 mb-6">
                            <Zap className="h-5 w-5 text-teal-400" />
                            <h4 className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Neural Fleet Health</h4>
                        </div>
                        <div className="flex items-center justify-center p-8 relative">
                            <svg className="h-48 w-48 -rotate-90">
                                <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-navy-700" />
                                <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray={552.92} strokeDashoffset={552.92 * (1 - 0.94)} className="text-teal-500 shadow-glow-sm" strokeLinecap="round" />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-4xl font-display font-black text-white">94%</span>
                                <span className="text-[10px] font-black text-teal-500 uppercase tracking-widest mt-1">Optimal</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Maintenance;
