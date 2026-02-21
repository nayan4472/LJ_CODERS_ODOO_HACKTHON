import React, { useState } from 'react';
import { Plus, Search, Filter, MoreVertical, Edit2, Trash2 } from 'lucide-react';

// Mock Data
const initialVehicles = [
    { id: 'V-001', name: 'Volvo FH16', type: 'Truck', plate: 'XT-99-QA', capacity: '25T', status: 'Available', odo: '145,000 km' },
    { id: 'V-002', name: 'Ford Transit', type: 'Van', plate: 'AB-12-XY', capacity: '1.5T', status: 'On Trip', odo: '42,000 km' },
    { id: 'V-003', name: 'Scania R500', type: 'Truck', plate: 'LK-55-WE', capacity: '20T', status: 'In Shop', odo: '210,500 km' },
    { id: 'V-004', name: 'Merc Sprinter', type: 'Van', plate: 'DF-88-RT', capacity: '2T', status: 'Available', odo: '12,400 km' },
    { id: 'V-005', name: 'Honda CGO', type: 'Bike', plate: 'M-11-22', capacity: '50kg', status: 'Retired', odo: '84,000 km' },
];

const StatusPill = ({ status }) => {
    switch (status) {
        case 'Available': return <span className="status-pill-success">Available</span>;
        case 'On Trip': return <span className="bg-teal-500/10 text-teal-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-teal-500/30">Active Trip</span>;
        case 'In Shop': return <span className="status-pill-warning">Maintenance</span>;
        case 'Retired': return <span className="status-pill-danger">Decommissioned</span>;
        default: return <span className="status-pill-neutral">{status}</span>;
    }
};

const VehicleRegistry = () => {
    const [vehicles, setVehicles] = useState(initialVehicles);
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black font-display tracking-[0.05em] text-white uppercase">Asset <span className="text-teal-500">Registry</span></h1>
                    <p className="text-slate-500 text-sm font-medium mt-1 uppercase tracking-widest">Global Fleet Configuration Management</p>
                </div>
                <button className="btn-primary flex items-center shadow-glow-sm">
                    <Plus className="h-5 w-5 mr-2" /> ADD NEW ASSET
                </button>
            </div>

            <div className="card !p-0 overflow-hidden">
                <div className="p-8 flex flex-col md:flex-row justify-between items-center gap-4 bg-navy-800/20">
                    <div className="relative w-full md:w-96 group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-teal-400">
                            <Search className="h-5 w-5 text-slate-500" />
                        </div>
                        <input
                            type="text"
                            className="input-field pl-12 h-12 bg-navy-900/50 border-navy-700/50 focus:bg-navy-900 transition-all duration-300 rounded-xl"
                            placeholder="Search by license plate, ID or model..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center space-x-3 w-full md:w-auto">
                        <button className="flex-1 md:flex-none btn-secondary h-12 flex items-center px-6 rounded-xl border-navy-700/50 hover:bg-navy-700/50">
                            <Filter className="h-4 w-4 mr-2" /> ADVANCED FILTERS
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-navy-700/50">
                        <thead className="bg-navy-900/30">
                            <tr>
                                <th className="px-8 py-5 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Asset ID / Model</th>
                                <th className="px-8 py-5 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Classification</th>
                                <th className="px-8 py-5 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">License Plate</th>
                                <th className="px-8 py-5 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Load Capacity</th>
                                <th className="px-8 py-5 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Asset Life (km)</th>
                                <th className="px-8 py-5 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Lifecycle Status</th>
                                <th className="px-8 py-5 text-right text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Control</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-navy-700/30">
                            {vehicles.filter(v => v.plate.toLowerCase().includes(searchTerm.toLowerCase()) || v.id.toLowerCase().includes(searchTerm.toLowerCase())).map((vehicle) => (
                                <tr key={vehicle.id} className="hover:bg-teal-500/5 transition-all duration-300 group">
                                    <td className="px-8 py-5 whitespace-nowrap">
                                        <div className="text-sm font-bold text-white group-hover:text-teal-400 transition-colors uppercase tracking-tight">{vehicle.id}</div>
                                        <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wide">{vehicle.name}</div>
                                    </td>
                                    <td className="px-8 py-5 whitespace-nowrap">
                                        <span className="text-xs font-bold text-slate-400 uppercase bg-navy-800/50 px-2 py-0.5 rounded border border-navy-700/50 ring-1 ring-white/5">{vehicle.type}</span>
                                    </td>
                                    <td className="px-8 py-5 whitespace-nowrap">
                                        <span className="text-sm font-black text-white/90 font-mono tracking-wider px-3 py-1 bg-navy-950 rounded-lg border border-navy-700 shadow-inner">{vehicle.plate}</span>
                                    </td>
                                    <td className="px-8 py-5 whitespace-nowrap text-sm font-bold text-slate-300">{vehicle.capacity}</td>
                                    <td className="px-8 py-5 whitespace-nowrap">
                                        <div className="text-sm font-medium text-slate-300">{vehicle.odo}</div>
                                        <div className="w-24 bg-navy-800 rounded-full h-1 mt-1.5 overflow-hidden">
                                            <div className="bg-navy-600 h-full w-[65%]"></div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 whitespace-nowrap"><StatusPill status={vehicle.status} /></td>
                                    <td className="px-8 py-5 whitespace-nowrap text-right">
                                        <div className="flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 text-slate-400 hover:text-teal-400 hover:bg-teal-500/10 rounded-lg transition-all"><Edit2 className="h-4 w-4" /></button>
                                            <button className="p-2 text-slate-400 hover:text-crimson-500 hover:bg-crimson-500/10 rounded-lg transition-all"><Trash2 className="h-4 w-4" /></button>
                                            <button className="p-2 text-slate-400 hover:text-white hover:bg-navy-700 rounded-lg transition-all"><MoreVertical className="h-4 w-4" /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-6 bg-navy-800/10 border-t border-navy-700/30 flex justify-between items-center">
                    <p className="text-xs text-slate-500 font-medium">Showing {vehicles.length} active fleet assets recorded in the secure neural ledger.</p>
                    <div className="flex space-x-2">
                        <button className="px-3 py-1 text-xs font-bold text-slate-400 hover:text-white transition-colors">PREVIOUS</button>
                        <button className="px-3 py-1 text-xs font-bold text-teal-400 bg-teal-500/10 border border-teal-500/20 rounded-lg">1</button>
                        <button className="px-3 py-1 text-xs font-bold text-slate-400 hover:text-white transition-colors">NEXT</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VehicleRegistry;
