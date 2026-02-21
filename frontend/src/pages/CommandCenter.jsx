import React, { useState, useEffect } from 'react';
import { Truck, Activity, Wrench, PackageSearch, AlertTriangle, Map as MapIcon, TrendingUp, TrendingDown, Zap, ShieldAlert, AlertCircle, Filter, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import fleetService from '../services/fleet.service';
import tripService from '../services/trip.service';

const KpiCard = ({ title, value, subtext, icon: Icon, trend, colorClass }) => (
    <div className="card group hover:shadow-glow-md transition-all duration-500 overflow-visible relative">
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
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-teal-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
    </div>
);

const CommandCenter = () => {
    const [vehicles, setVehicles] = useState([]);
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({ type: 'All', status: 'All', region: 'All' });
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('fleetflow_user') || '{}');

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 30000); // 30s poll
        return () => clearInterval(interval);
    }, []);

    const fetchData = async () => {
        try {
            const [vels, trps] = await Promise.all([
                fleetService.getVehicles(user.companyId),
                tripService.getTrips(user.companyId)
            ]);
            setVehicles(vels);
            setTrips(trps);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    const activeFleet = vehicles.filter(v => v.status === 'On Trip').length;
    const maintenanceAlerts = vehicles.filter(v => v.status === 'In Shop').length;
    const utilizationRate = vehicles.length > 0 ? ((activeFleet / vehicles.length) * 100).toFixed(1) : 0;
    const pendingCargo = trips.filter(t => t.status === 'Draft').length;

    const filteredVehicles = vehicles.filter(v => {
        return (filters.type === 'All' || v.type === filters.type) &&
            (filters.status === 'All' || v.status === filters.status) &&
            (filters.region === 'All' || v.region === filters.region);
    });

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black font-display tracking-[0.05em] text-white">INTELLIGENCE <span className="text-teal-500">DASHBOARD</span></h1>
                    <p className="text-slate-500 text-sm font-medium mt-1 uppercase tracking-widest">Real-time Fleet Operations & Predictive Maintenance</p>
                </div>
                <div className="flex items-center space-x-3 bg-navy-800/40 p-1.5 rounded-2xl border border-navy-700/50 backdrop-blur-sm">
                    <div className="flex space-x-1 px-2">
                        <select
                            className="bg-transparent text-xs font-bold text-teal-400 border-none focus:ring-0 cursor-pointer"
                            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                        >
                            <option value="All">All Types</option>
                            <option value="Truck">Truck</option>
                            <option value="Van">Van</option>
                            <option value="Bike">Bike</option>
                        </select>
                        <select
                            className="bg-transparent text-xs font-bold text-slate-400 border-none focus:ring-0 cursor-pointer"
                            onChange={(e) => setFilters({ ...filters, region: e.target.value })}
                        >
                            <option value="All">All Regions</option>
                            <option value="North">North</option>
                            <option value="South">South</option>
                            <option value="East">East</option>
                            <option value="West">West</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* KPI Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <KpiCard
                    title="Active Fleet"
                    value={activeFleet}
                    subtext="Vehicles on trip"
                    icon={Truck}
                    trend="up"
                    colorClass="#64FFDA"
                />
                <KpiCard
                    title="Maintenance Alerts"
                    value={maintenanceAlerts}
                    subtext="Vehicles in shop"
                    icon={AlertCircle}
                    trend="down"
                    colorClass="#FFC107"
                />
                <KpiCard
                    title="Asset Utilization"
                    value={`${utilizationRate}%`}
                    subtext="Assigned vs Idle"
                    icon={Activity}
                    trend={utilizationRate > 50 ? "up" : "down"}
                    colorClass="#FF3366"
                />
                <KpiCard
                    title="Pending Cargo"
                    value={pendingCargo}
                    subtext="Wait for assignment"
                    icon={PackageSearch}
                    trend="up"
                    colorClass="#64FFDA"
                />
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Vehicle Status List */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="card !p-0">
                        <div className="p-6 border-b border-navy-700/50 flex items-center justify-between">
                            <h2 className="text-sm font-bold font-display text-white uppercase tracking-widest flex items-center">
                                <Filter className="h-4 w-4 text-teal-500 mr-2" />
                                Live Status ({filteredVehicles.length})
                            </h2>
                        </div>
                        <div className="p-2 max-h-[400px] overflow-y-auto custom-scrollbar">
                            {filteredVehicles.map((v) => (
                                <div key={v._id} className="group p-3 hover:bg-navy-700/30 rounded-xl transition-all duration-300 border border-transparent hover:border-navy-600/50 mb-1">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <span className="font-bold text-sm text-white">{v.name}</span>
                                            <span className="text-[10px] text-slate-500 block">{v.plateNumber} • {v.type}</span>
                                        </div>
                                        <span className={`text-[10px] font-black px-2 py-0.5 rounded ${v.status === 'Available' ? 'bg-teal-500/10 text-teal-400' :
                                            v.status === 'On Trip' ? 'bg-purple-500/10 text-purple-400' :
                                                'bg-amber-500/10 text-amber-400'
                                            }`}>
                                            {v.status.toUpperCase()}
                                        </span>
                                    </div>
                                </div>
                            ))}
                            {filteredVehicles.length === 0 && <p className="text-center py-4 text-slate-500 text-xs">No vehicles match filters.</p>}
                        </div>
                    </div>
                </div>

                {/* Map Visualization */}
                <div className="lg:col-span-8">
                    <div className="card !p-0 h-[520px] flex flex-col relative overflow-hidden group">
                        {/* Map content remains visual placeholder but points to LiveMap */}
                        <div className="absolute top-6 left-6 z-20 space-y-2">
                            <div className="bg-navy-900/80 backdrop-blur-md p-3 rounded-2xl border border-navy-700/50 shadow-2xl">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Real-time Telemetry Feed</p>
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center">
                                        <div className="h-1.5 w-1.5 rounded-full bg-teal-500 mr-2"></div>
                                        <span className="text-[10px] text-white font-bold">{activeFleet} Moving</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 bg-navy-800 relative z-10 flex items-center justify-center overflow-hidden">
                            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#233554_1px,transparent_1px)] [background-size:20px_20px]"></div>
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-navy-900/90 z-10"></div>

                            <div className="relative z-20 flex flex-col items-center">
                                <div className="relative mb-6">
                                    <div className="absolute -inset-4 bg-teal-500/20 blur-xl rounded-full animate-pulse"></div>
                                    <MapIcon className="h-20 w-20 text-teal-400 relative" />
                                </div>
                                <h3 className="text-xl font-display font-black text-white tracking-widest mb-2 uppercase">Neural Grid Active</h3>
                                <p className="text-slate-400 text-xs text-center max-w-xs leading-relaxed font-medium">Fleet telemetry is synchronized with the regional network.</p>
                                <button className="mt-8 btn-secondary border-teal-500/30 text-xs px-8 tracking-widest shadow-none" onClick={() => navigate('/map')}>
                                    INITIALIZE 3D VISUALIZER
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommandCenter;
