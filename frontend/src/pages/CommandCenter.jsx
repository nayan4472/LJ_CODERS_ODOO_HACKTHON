import React from 'react';
import { Truck, Activity, Wrench, PackageSearch, AlertTriangle, Map as MapIcon, TrendingUp, TrendingDown, Zap, ShieldAlert, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const KpiCard = ({ title, value, subtext, icon: Icon, trend, colorClass }) => (
    <div className="card group hover:shadow-glow-md transition-all duration-500 overflow-visible">
        <div className="flex items-start justify-between">
            <div className="space-y-2">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">{title}</p>
                <h3 className="text-4xl font-display font-black text-white tracking-tighter group-hover:text-teal-400 transition-colors duration-500">{value}</h3>
                <div className={`flex items-center text-[11px] font-bold ${trend === 'up' ? 'text-teal-400' : trend === 'down' ? 'text-crimson-500' : 'text-slate-400'}`}>
                    <div className={`p-0.5 rounded-full mr-1.5 ${trend === 'up' ? 'bg-teal-500/10' : trend === 'down' ? 'bg-crimson-500/10' : 'bg-slate-500/10'}`}>
                        {trend === 'up' ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    </div>
                    {subtext}
                </div>
            </div>
            <div className="p-4 rounded-2xl bg-navy-900/50 border border-navy-700/50 group-hover:border-teal-500/30 transition-all duration-500 shadow-inner group-hover:shadow-[0_0_20px_rgba(100,255,218,0.1)]">
                <Icon className="h-7 w-7 transition-all duration-500 group-hover:scale-110" style={{ color: colorClass }} />
            </div>
        </div>

        {/* Subtle decorative graph line */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-teal-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
    </div>
);

const CommandCenter = () => {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black font-display tracking-[0.05em] text-white">INTELLIGENCE <span className="text-teal-500">DASHBOARD</span></h1>
                    <p className="text-slate-500 text-sm font-medium mt-1 uppercase tracking-widest">Real-time Fleet Operations & Predictive Maintenance</p>
                </div>
                <div className="flex items-center space-x-3 bg-navy-800/40 p-1.5 rounded-2xl border border-navy-700/50 backdrop-blur-sm">
                    <div className="flex space-x-1 px-2">
                        <button className="px-4 py-2 text-xs font-bold text-teal-400 bg-teal-500/10 rounded-xl border border-teal-500/20">GLOBAL</button>
                        <button className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-300 transition-colors">REGIONAL</button>
                    </div>
                    <button className="btn-primary py-2 text-xs px-5 shadow-none hover:shadow-glow-sm">GENERATE REPORT</button>
                </div>
            </div>

            {/* KPI Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <KpiCard
                    title="Active Fleet"
                    value="1,420"
                    subtext="+12.5% MTD"
                    icon={Truck}
                    trend="up"
                    colorClass="#64FFDA"
                />
                <KpiCard
                    title="System Alerts"
                    value="08"
                    subtext="3 Critical Priority"
                    icon={AlertCircle}
                    trend="down"
                    colorClass="#FFC107"
                />
                <KpiCard
                    title="Asset Utilization"
                    value="87.5%"
                    subtext="-2.1% Deviation"
                    icon={Activity}
                    trend="down"
                    colorClass="#FF3366"
                />
                <KpiCard
                    title="Operating Ratio"
                    value="0.72"
                    subtext="Optimal Performance"
                    icon={Zap}
                    trend="up"
                    colorClass="#64FFDA"
                />
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* AI Predictive Alerts */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="card !p-0">
                        <div className="p-6 border-b border-navy-700/50 flex items-center justify-between">
                            <h2 className="text-sm font-bold font-display text-white uppercase tracking-widest flex items-center">
                                <ShieldAlert className="h-4 w-4 text-teal-500 mr-2" />
                                Predictive Insights
                            </h2>
                            <span className="text-[10px] bg-teal-500/10 text-teal-400 px-2 py-0.5 rounded border border-teal-500/20">LIVE</span>
                        </div>
                        <div className="p-2 space-y-1">
                            <div className="group p-4 hover:bg-navy-700/30 rounded-xl transition-all duration-300 cursor-pointer border border-transparent hover:border-navy-600/50">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="font-bold text-sm text-white group-hover:text-teal-400 transition-colors">Van-05 - Engine Overheat</span>
                                    <div className="flex flex-col items-end">
                                        <span className="text-[10px] text-teal-500 font-black">85% CONFIDENCE</span>
                                        <span className="text-[9px] text-slate-500 uppercase tracking-tighter">PREDICTED: 24h</span>
                                    </div>
                                </div>
                                <p className="text-xs text-slate-400 leading-relaxed">Telemetry indicates anomalous thermal signature in Block B. Probability of failure high.</p>
                                <div className="mt-4 flex space-x-3">
                                    <button className="text-[10px] font-black text-teal-400 uppercase tracking-widest hover:underline">Schedule Hub</button>
                                    <button className="text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-slate-300">Ignore</button>
                                </div>
                            </div>

                            <div className="group p-4 hover:bg-navy-700/30 rounded-xl transition-all duration-300 cursor-pointer border border-transparent hover:border-navy-600/50">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="font-bold text-sm text-white group-hover:text-crimson-400 transition-colors">Truck-88 - Brake Wear</span>
                                    <div className="flex flex-col items-end">
                                        <span className="text-[10px] text-crimson-500 font-black">92% CRITICAL</span>
                                        <span className="text-[9px] text-slate-500 uppercase tracking-tighter">PREDICTED: 50km</span>
                                    </div>
                                </div>
                                <p className="text-xs text-slate-400 leading-relaxed">Excessive friction detected during descent from Route 12. Safety threshold exceeded.</p>
                                <div className="mt-4 flex space-x-3">
                                    <button className="text-[10px] font-black text-teal-400 uppercase tracking-widest hover:underline">Reroute Now</button>
                                    <button className="text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-slate-300">View Data</button>
                                </div>
                            </div>
                        </div>
                        <button className="w-full py-4 text-[10px] font-bold text-slate-500 hover:text-teal-400 bg-navy-900/40 border-t border-navy-700/50 transition-colors">VIEW ALL SYSTEM INSIGHTS</button>
                    </div>
                </div>

                {/* Map Visualization */}
                <div className="lg:col-span-8">
                    <div className="card !p-0 h-[520px] flex flex-col relative overflow-hidden group">
                        <div className="absolute top-6 left-6 z-20 space-y-2">
                            <div className="bg-navy-900/80 backdrop-blur-md p-3 rounded-2xl border border-navy-700/50 shadow-2xl">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Live Telemetry Feed</p>
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center">
                                        <div className="h-1.5 w-1.5 rounded-full bg-teal-500 mr-2"></div>
                                        <span className="text-[10px] text-white font-bold">142 Moving</span>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="h-1.5 w-1.5 rounded-full bg-amber-500 mr-2"></div>
                                        <span className="text-[10px] text-white font-bold">12 Geofence Alerts</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 bg-navy-800 relative z-10 flex items-center justify-center overflow-hidden">
                            {/* Visual Eye Candy - Radar/Grid Background */}
                            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#233554_1px,transparent_1px)] [background-size:20px_20px]"></div>
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-navy-900/90 z-10"></div>

                            <div className="relative z-20 flex flex-col items-center">
                                <div className="relative mb-6">
                                    <div className="absolute -inset-4 bg-teal-500/20 blur-xl rounded-full animate-pulse"></div>
                                    <MapIcon className="h-20 w-20 text-teal-400 relative" />
                                </div>
                                <h3 className="text-xl font-display font-black text-white tracking-widest mb-2 uppercase">Neural Grid Active</h3>
                                <p className="text-slate-400 text-xs text-center max-w-xs leading-relaxed font-medium">Global fleet telemetry is synchronized with the regional Edge-Intelligence network.</p>
                                <button className="mt-8 btn-secondary border-teal-500/30 text-xs px-8 tracking-widest shadow-none" onClick={() => navigate('/map')}>
                                    INITIALIZE 3D VISUALIZER
                                </button>
                            </div>

                            {/* Scanning line animation */}
                            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-t from-teal-500/10 to-transparent border-b border-teal-500/20 -translate-y-full hover:animate-[scan_4s_linear_infinite] pointer-events-none"></div>
                        </div>

                        <div className="p-6 bg-navy-800 border-t border-navy-700/50 flex justify-between items-center z-20">
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="h-8 w-8 rounded-full border-2 border-navy-800 bg-navy-700 flex items-center justify-center overflow-hidden">
                                        <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" className="h-full w-full object-cover grayscale" />
                                    </div>
                                ))}
                                <div className="h-8 w-8 rounded-full border-2 border-navy-800 bg-navy-700 flex items-center justify-center text-[10px] font-bold text-slate-400">+12</div>
                            </div>
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest italic font-display">System Integrity: 99.8%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default CommandCenter;
