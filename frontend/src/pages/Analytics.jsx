import React, { useState, useEffect } from 'react';
import { BarChart, DollarSign, Droplet, TrendingUp, Download, CheckCircle, AlertCircle } from 'lucide-react';
import analyticsService from '../services/analytics.service';
import tripService from '../services/trip.service';
import fleetService from '../services/fleet.service';

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
    const [stats, setStats] = useState({
        fuelEx: 0,
        roi: 0,
        opCost: 0,
        efficiencyData: [40, 60, 45, 80, 50, 65, 90, 85, 40, 55, 75, 60, 45, 30, 80, 95] // fallback
    });
    const [loading, setLoading] = useState(true);
    const user = JSON.parse(localStorage.getItem('fleetflow_user') || '{}');

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            const [fuel, maintenance, trips] = await Promise.all([
                analyticsService.getFuelLogs(user.companyId),
                analyticsService.getMaintenanceLogs(user.companyId),
                tripService.getTrips(user.companyId)
            ]);

            const totalFuel = fuel.reduce((acc, log) => acc + log.cost, 0);
            const totalMaint = maintenance.reduce((acc, log) => acc + log.cost, 0);
            const totalTrips = trips.length;
            const revenue = totalTrips * 1200; // Mock revenue per trip

            const roi = totalFuel + totalMaint > 0 ? (revenue / (totalFuel + totalMaint) * 100).toFixed(1) : 0;
            const opCost = totalTrips > 0 ? ((totalFuel + totalMaint) / totalTrips).toFixed(2) : 0;

            setStats({
                fuelEx: totalFuel,
                roi: roi,
                opCost: opCost,
                efficiencyData: stats.efficiencyData
            });
        } catch (error) {
            console.error('Error loading analytics:', error);
        } finally {
            setLoading(false);
        }
    };

    const exportToCSV = () => {
        const headers = ["Metric", "Value"];
        const data = [
            ["Total Fuel Expenditure", stats.fuelEx],
            ["Asset ROI (%)", stats.roi],
            ["Avg Operating Cost/Trip", stats.opCost]
        ];

        const csvContent = "data:text/csv;charset=utf-8,"
            + headers.join(",") + "\n"
            + data.map(e => e.join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `fleet_ledger_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (loading) return <div className="text-white text-center py-20">Analyzing Neural Data Stream...</div>;

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black font-display tracking-[0.05em] text-white uppercase">Neural <span className="text-teal-500">Analytics</span></h1>
                    <p className="text-slate-500 text-sm font-medium mt-1 uppercase tracking-widest">Financial Performance & Resource Optimization</p>
                </div>
                <button
                    onClick={exportToCSV}
                    className="btn-secondary flex items-center px-6 h-12 shadow-none hover:shadow-glow-sm border-navy-700/50"
                >
                    <Download className="h-4 w-4 mr-2" /> EXPORT ODOO LEDGER
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Fuel Expenditure" value={`$${stats.fuelEx.toLocaleString()}`} icon={Droplet} color="#64FFDA" trend="+4.2%" />
                <StatCard title="Asset ROI" value={`${stats.roi}%`} icon={TrendingUp} color="#FFC107" trend="+1.5%" />
                <StatCard title="Avg Cost / Trip" value={`$${stats.opCost}`} icon={DollarSign} color="#FF3366" trend="-0.8%" />
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
                            {stats.efficiencyData.map((h, i) => (
                                <div key={i} className="group relative flex-1 flex items-end justify-center">
                                    <div className="w-full bg-gradient-to-t from-teal-500/20 to-teal-500 group-hover:scale-y-105 transition-all duration-500 cursor-pointer rounded-t-sm shadow-[0_0_15px_rgba(100,255,218,0.2)]" style={{ height: `${h}%` }}></div>
                                </div>
                            ))}
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
                </div>
            </div>
        </div>
    );
};

export default Analytics;
