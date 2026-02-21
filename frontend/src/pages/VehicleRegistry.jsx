import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, MoreVertical, Edit2, Trash2, X } from 'lucide-react';
import fleetService from '../services/fleet.service';

const StatusPill = ({ status, isRetired }) => {
    if (isRetired) return <span className="status-pill-danger">Decommissioned</span>;
    switch (status) {
        case 'Available': return <span className="status-pill-success">Available</span>;
        case 'On Trip': return <span className="bg-teal-500/10 text-teal-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-teal-500/30">Active Trip</span>;
        case 'In Shop': return <span className="status-pill-warning">Maintenance</span>;
        default: return <span className="status-pill-neutral border border-slate-700">{status}</span>;
    }
};

const VehicleRegistry = () => {
    const [vehicles, setVehicles] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [currentVehicle, setCurrentVehicle] = useState({ name: '', model: '', plateNumber: '', capacity: '', type: 'Truck' });
    const user = JSON.parse(localStorage.getItem('fleetflow_user') || '{}');

    useEffect(() => {
        loadVehicles();
    }, []);

    const loadVehicles = async () => {
        try {
            const data = await fleetService.getVehicles(user.companyId);
            setVehicles(data);
        } catch (error) {
            console.error('Error loading vehicles:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            if (currentVehicle._id) {
                await fleetService.updateVehicle(currentVehicle._id, currentVehicle);
            } else {
                await fleetService.addVehicle({ ...currentVehicle, companyId: user.companyId });
            }
            setShowModal(false);
            loadVehicles();
        } catch (error) {
            alert('Error saving vehicle');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this asset?')) {
            await fleetService.deleteVehicle(id);
            loadVehicles();
        }
    };

    const toggleRetire = async (vehicle) => {
        await fleetService.updateVehicle(vehicle._id, { isRetired: !vehicle.isRetired });
        loadVehicles();
    };

    const filteredVehicles = vehicles.filter(v =>
        v.plateNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black font-display tracking-[0.05em] text-white uppercase">Asset <span className="text-teal-500">Registry</span></h1>
                    <p className="text-slate-500 text-sm font-medium mt-1 uppercase tracking-widest">Global Fleet Configuration Management</p>
                </div>
                <button
                    onClick={() => { setCurrentVehicle({ name: '', model: '', plateNumber: '', capacity: '', type: 'Truck' }); setShowModal(true); }}
                    className="btn-primary flex items-center shadow-glow-sm"
                >
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
                            placeholder="Search by license plate or name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-navy-700/50">
                        <thead className="bg-navy-900/30">
                            <tr>
                                <th className="px-8 py-5 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Model / Name</th>
                                <th className="px-8 py-5 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Class</th>
                                <th className="px-8 py-5 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Plate</th>
                                <th className="px-8 py-5 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Capacity</th>
                                <th className="px-8 py-5 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Odometer</th>
                                <th className="px-8 py-5 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Status</th>
                                <th className="px-8 py-5 text-right text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Control</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-navy-700/30">
                            {filteredVehicles.map((vehicle) => (
                                <tr key={vehicle._id} className="hover:bg-teal-500/5 transition-all duration-300 group">
                                    <td className="px-8 py-5 whitespace-nowrap">
                                        <div className="text-sm font-bold text-white group-hover:text-teal-400 transition-colors uppercase tracking-tight">{vehicle.model}</div>
                                        <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wide">{vehicle.name}</div>
                                    </td>
                                    <td className="px-8 py-5 whitespace-nowrap">
                                        <span className="text-xs font-bold text-slate-400 uppercase bg-navy-800/50 px-2 py-0.5 rounded border border-navy-700/50 ring-1 ring-white/5">{vehicle.type}</span>
                                    </td>
                                    <td className="px-8 py-5 whitespace-nowrap">
                                        <span className="text-sm font-black text-white/90 font-mono tracking-wider px-3 py-1 bg-navy-950 rounded-lg border border-navy-700 shadow-inner">{vehicle.plateNumber}</span>
                                    </td>
                                    <td className="px-8 py-5 whitespace-nowrap text-sm font-bold text-slate-300">{vehicle.capacity} kg</td>
                                    <td className="px-8 py-5 whitespace-nowrap text-sm font-medium text-slate-300">{vehicle.odometer} km</td>
                                    <td className="px-8 py-5 whitespace-nowrap"><StatusPill status={vehicle.status} isRetired={vehicle.isRetired} /></td>
                                    <td className="px-8 py-5 whitespace-nowrap text-right">
                                        <div className="flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => toggleRetire(vehicle)} className="p-2 text-slate-400 hover:text-amber-500 hover:bg-amber-500/10 rounded-lg transition-all" title="Toggle Retired Status">
                                                <Activity className="h-4 w-4" />
                                            </button>
                                            <button onClick={() => { setCurrentVehicle(vehicle); setShowModal(true); }} className="p-2 text-slate-400 hover:text-teal-400 hover:bg-teal-500/10 rounded-lg transition-all"><Edit2 className="h-4 w-4" /></button>
                                            <button onClick={() => handleDelete(vehicle._id)} className="p-2 text-slate-400 hover:text-crimson-500 hover:bg-crimson-500/10 rounded-lg transition-all"><Trash2 className="h-4 w-4" /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal for Add/Edit */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-sm">
                    <div className="bg-navy-800 border border-navy-700 rounded-2xl w-full max-w-md p-8 shadow-2xl animate-in zoom-in-95 duration-300">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-white">{currentVehicle._id ? 'Edit Asset' : 'New Asset'}</h2>
                            <button onClick={() => setShowModal(false)} className="text-slate-500 hover:text-white"><X className="h-6 w-6" /></button>
                        </div>
                        <form onSubmit={handleSave} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Vehicle Name</label>
                                <input type="text" required className="input-field" value={currentVehicle.name} onChange={e => setCurrentVehicle({ ...currentVehicle, name: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Model</label>
                                <input type="text" required className="input-field" value={currentVehicle.model} onChange={e => setCurrentVehicle({ ...currentVehicle, model: e.target.value })} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Plate Number</label>
                                    <input type="text" required className="input-field" value={currentVehicle.plateNumber} onChange={e => setCurrentVehicle({ ...currentVehicle, plateNumber: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Capacity (kg)</label>
                                    <input type="number" required className="input-field" value={currentVehicle.capacity} onChange={e => setCurrentVehicle({ ...currentVehicle, capacity: e.target.value })} />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Type</label>
                                <select className="input-field" value={currentVehicle.type} onChange={e => setCurrentVehicle({ ...currentVehicle, type: e.target.value })}>
                                    <option value="Truck">Truck</option>
                                    <option value="Van">Van</option>
                                    <option value="Bike">Bike</option>
                                </select>
                            </div>
                            <button type="submit" className="w-full btn-primary h-12 mt-4">SAVE ASSET DATA</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VehicleRegistry;
