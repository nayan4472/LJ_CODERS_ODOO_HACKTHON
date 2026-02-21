import React from 'react';
import { BarChart, DollarSign, Droplet, TrendingUp, Download } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, color, trend }) => (
    <div className="card group hover:shadow-glow-sm transition-all duration-500 overflow-visible">
        <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-2xl bg-navy-900/50 border border-navy-700/50 group-hover:border-teal-500/30 transition-all duration-500" style={{ color }}>
                <Icon className="h-6 w-6 group-hover:scale-110 transition-transform" />
            </div>
            {trend && (
                <div className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${trend.startsWith('+') ? 'bg-teal-500/10 text-teal-400 border-teal-500/20' : 'bg-crimson-500/10 text-crimson-500 border-crimson-500/20'}`}>
                    {trend}
                </div>
            )}
        </div>
        <div className="space-y-1">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">{title}</p>
            <h3 className="text-3xl font-display font-black text-white tracking-tighter group-hover:text-teal-400 transition-colors duration-500">{value}</h3>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-teal-500/10 to-transparent"></div>
    </div>
);

const Analytics = () => {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black font-display tracking-[0.05em] text-white uppercase">Neural <span className="text-teal-500">Analytics</span></h1>
                    <p className="text-slate-500 text-sm font-medium mt-1 uppercase tracking-widest">Financial Performance & Resource Optimization</p>
                </div>
                <button className="btn-secondary flex items-center px-6 h-12 shadow-none hover:shadow-glow-sm border-navy-700/50">
                    <Download className="h-4 w-4 mr-2" /> EXPORT ODOO LEDGER
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Fuel Expenditure" value="$42,500.00" icon={Droplet} color="#64FFDA" trend="+4.2%" />
                <StatCard title="Asset ROI" value="114.8%" icon={TrendingUp} color="#FFC107" trend="+1.5%" />
                <StatCard title="Op Cost / km" value="$1.12" icon={DollarSign} color="#FF3366" trend="-0.8%" />
                <StatCard title="AI Routing Delta" value="$4,200.00" icon={BarChart} color="#64FFDA" trend="+12.0%" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8 card !p-0 overflow-hidden">
                    <div className="p-6 border-b border-navy-700/50 flex justify-between items-center">
                        <h3 className="text-xs font-bold font-display text-white uppercase tracking-widest">Efficiency Waveforms (30D)</h3>
                        <div className="flex space-x-1">
                            <div className="h-2 w-2 rounded-full bg-teal-500 animate-pulse"></div>
                            <span className="text-[10px] text-teal-400 font-black">REALTIME</span>
                        </div>
                    </div>
                    <div className="p-8">
                        <div className="h-72 flex items-end justify-between space-x-2 border-b border-l border-navy-700/50 pb-4 pl-4 relative">
                            {/* Chart Grid Lines */}
                            <div className="absolute inset-0 top-0 left-4 flex flex-col justify-between pointer-events-none opacity-10">
                                {[1, 2, 3, 4].map(i => <div key={i} className="border-t border-slate-500 w-full"></div>)}
                            </div>

                            {[40, 60, 45, 80, 50, 65, 90, 85, 40, 55, 75, 60, 45, 30, 80, 95].map((h, i) => (
                                <div key={i} className="group relative flex-1 flex items-end justify-center">
                                    <div className="w-full bg-gradient-to-t from-teal-500/20 to-teal-500 group-hover:scale-y-105 transition-all duration-500 cursor-pointer rounded-t-sm shadow-[0_0_15px_rgba(100,255,218,0.2)]" style={{ height: `${h}%` }}></div>
                                    <div className="absolute -top-10 scale-0 group-hover:scale-100 transition-transform bg-navy-950 text-teal-400 text-[10px] font-black px-2 py-1 rounded border border-teal-500/30 z-20">
                                        {h}%_EFF
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between text-[10px] text-slate-500 mt-4 font-black tracking-widest px-4">
                            <span>PERIOD_START</span>
                            <span>PEAK_PERFORMANCE</span>
                            <span>CURRENT_CYCLE</span>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-4 card !p-0 overflow-hidden">
                    <div className="p-6 border-b border-navy-700/50">
                        <h3 className="text-xs font-bold font-display text-white uppercase tracking-widest">Odoo Sync Log</h3>
                    </div>
                    <div className="p-4 space-y-2">
                        {[
                            { status: 'SUCCESS', msg: 'Sync Journal Entries', time: '10m', color: 'text-teal-400', bg: 'bg-teal-500/5' },
                            { status: 'SUCCESS', msg: 'Asset Depreciation', time: '2h', color: 'text-teal-400', bg: 'bg-teal-500/5' },
                            { status: 'RETRY', msg: 'Fuel API Handshake', time: '5h', color: 'text-amber-500', bg: 'bg-amber-500/5' },
                            { status: 'ERROR', msg: 'OAuth Token Refresh', time: '1d', color: 'text-crimson-500', bg: 'bg-crimson-500/5' },
                            { status: 'SUCCESS', msg: 'Personnel Payroll', time: '2d', color: 'text-teal-400', bg: 'bg-teal-500/5' },
                        ].map((log, idx) => (
                            <div key={idx} className={`${log.bg} p-4 rounded-xl border border-navy-700/30 flex justify-between items-center group hover:border-teal-500/20 transition-colors cursor-pointer`}>
                                <div className="space-y-1">
                                    <div className={`text-[9px] font-black ${log.color} tracking-[0.2em]`}>{log.status}</div>
                                    <div className="text-xs font-bold text-slate-200">{log.msg}</div>
                                </div>
                                <span className="text-[10px] font-bold text-slate-500">{log.time}</span>
                            </div>
                        ))}
                    </div>
                    <button className="w-full py-4 text-[10px] font-black text-slate-500 hover:text-teal-400 bg-navy-900/40 border-t border-navy-700/50 transition-colors uppercase tracking-[0.2em]">View History</button>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
