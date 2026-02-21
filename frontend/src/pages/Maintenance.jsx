import React from 'react';
import { Wrench, ShieldAlert, CheckCircle, Clock, Zap, History } from 'lucide-react';

const Maintenance = () => {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-black font-display tracking-[0.05em] text-white uppercase italic">Advanced <span className="text-teal-500">Insights</span></h1>
                    <p className="text-slate-500 text-sm font-medium mt-1 uppercase tracking-widest">Predictive Maintenance & Asset Health Telemetry</p>
                </div>
                <div className="flex items-center space-x-2 bg-navy-800/40 p-1 rounded-xl border border-navy-700/50">
                    <button className="px-4 py-2 text-[10px] font-black text-teal-400 bg-teal-500/10 rounded-lg">LIVE_FEED</button>
                    <button className="px-4 py-2 text-[10px] font-black text-slate-500 hover:text-slate-300">INCIDENT_LOGS</button>
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
                            {[
                                { id: 'TRUCK-88', system: 'BREAK_VALVE_PSI', prob: '92%', urgency: 'IMMEDIATE', desc: 'Anomalous pressure drop detected during actuator test sequence.' },
                                { id: 'VAN-05', system: 'THERMAL_CASING', prob: '85%', urgency: '24H', desc: 'Core temperature exceeding optimal threshold by 12.4%.' },
                            ].map((alert, idx) => (
                                <div key={idx} className="p-6 hover:bg-navy-800/30 transition-all group rounded-xl">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center space-x-4">
                                            <div className="h-12 w-12 rounded-2xl bg-navy-900 flex items-center justify-center border border-navy-700 group-hover:border-crimson-500/50 transition-colors">
                                                <Wrench className="h-5 w-5 text-slate-500 group-hover:text-crimson-500" />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-black text-white uppercase tracking-tight group-hover:text-crimson-400 transition-colors">{alert.id} • {alert.system}</h4>
                                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Failure Probability: {alert.prob}</p>
                                            </div>
                                        </div>
                                        <button className="btn-secondary py-1 text-[9px] font-black uppercase tracking-widest border-crimson-500/30 text-crimson-500 hover:bg-crimson-500/10">EXECUTE_REPAIR</button>
                                    </div>
                                    <p className="text-xs text-slate-400 leading-relaxed max-w-2xl">{alert.desc}</p>
                                </div>
                            ))}
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

                    <div className="card space-y-6">
                        <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Asset Integrity Stats</h4>
                        <div className="space-y-4">
                            {[
                                { label: 'Avg Fleet Age', val: '2.4 Yrs' },
                                { label: 'Engine Efficiency', val: '98.2%' },
                                { label: 'Tire Integrity', val: '89.5%' },
                                { label: 'Oil Viscosity', val: 'NOMINAL' },
                            ].map((stat, i) => (
                                <div key={i} className="flex justify-between border-b border-navy-700/50 pb-2">
                                    <span className="text-xs font-bold text-slate-400">{stat.label}</span>
                                    <span className="text-xs font-black text-white uppercase">{stat.val}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Maintenance;
