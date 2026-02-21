import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Fuel, Wrench, DollarSign, Calendar, Plus, Search } from 'lucide-react';
import analyticsService from '../services/analytics.service';
import fleetService from '../services/fleet.service';

const ExpenseLogging = () => {
    const [fuelLogs, setFuelLogs] = useState([]);
    const [maintenanceLogs, setMaintenanceLogs] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = JSON.parse(localStorage.getItem('fleetflow_user') || '{}');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [fuel, maint, vels] = await Promise.all([
                analyticsService.getFuelLogs(user.companyId),
                analyticsService.getMaintenanceLogs(user.companyId),
                fleetService.getVehicles(user.companyId)
            ]);
            setFuelLogs(fuel);
            setMaintenanceLogs(maint);
            setVehicles(vels);
        } catch (error) {
            console.error('Error fetching expenses:', error);
        } finally {
            setLoading(false);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="p-6 space-y-8"
        >
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white">Expense & Fuel Logging</h1>
                    <p className="text-slate-400 mt-1">Financial tracking per asset</p>
                </div>
                <div className="flex space-x-4">
                    <button className="btn-primary flex items-center">
                        <Plus className="h-4 w-4 mr-2" /> Log Fuel
                    </button>
                    <button className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg transition-all flex items-center">
                        <Search className="h-4 w-4 mr-2" /> Export
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Fuel Logs Section */}
                <motion.div variants={itemVariants} className="card bg-navy-800/50 border-slate-700/50">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center">
                            <div className="p-3 bg-teal-500/10 rounded-lg mr-4">
                                <Fuel className="h-6 w-6 text-teal-500" />
                            </div>
                            <h2 className="text-xl font-bold text-white">Recent Fuel Logs</h2>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-700 text-slate-400 text-sm">
                                    <th className="py-3 px-4">Vehicle</th>
                                    <th className="py-3 px-4">Liters</th>
                                    <th className="py-3 px-4">Cost</th>
                                    <th className="py-3 px-4">Date</th>
                                </tr>
                            </thead>
                            <tbody className="text-slate-300">
                                {fuelLogs.map((log) => (
                                    <tr key={log._id} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                                        <td className="py-3 px-4 font-medium text-white">{vehicles.find(v => v._id === log.vehicleId)?.name || 'Unknown'}</td>
                                        <td className="py-3 px-4">{log.liters} L</td>
                                        <td className="py-3 px-4 text-teal-400 font-semibold">${log.cost}</td>
                                        <td className="py-3 px-4 text-sm">{new Date(log.date).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {fuelLogs.length === 0 && <p className="text-center py-8 text-slate-500">No fuel logs found.</p>}
                    </div>
                </motion.div>

                {/* Maintenance Logs Section */}
                <motion.div variants={itemVariants} className="card bg-navy-800/50 border-slate-700/50">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center">
                            <div className="p-3 bg-amber-500/10 rounded-lg mr-4">
                                <Wrench className="h-6 w-6 text-amber-500" />
                            </div>
                            <h2 className="text-xl font-bold text-white">Service Logs</h2>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-700 text-slate-400 text-sm">
                                    <th className="py-3 px-4">Vehicle</th>
                                    <th className="py-3 px-4">Service</th>
                                    <th className="py-3 px-4">Cost</th>
                                    <th className="py-3 px-4">Date</th>
                                </tr>
                            </thead>
                            <tbody className="text-slate-300">
                                {maintenanceLogs.map((log) => (
                                    <tr key={log._id} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                                        <td className="py-3 px-4 font-medium text-white">{vehicles.find(v => v._id === log.vehicleId)?.name || 'Unknown'}</td>
                                        <td className="py-3 px-4">{log.serviceType}</td>
                                        <td className="py-3 px-4 text-amber-400 font-semibold">${log.cost}</td>
                                        <td className="py-3 px-4 text-sm">{new Date(log.date).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {maintenanceLogs.length === 0 && <p className="text-center py-8 text-slate-500">No maintenance logs found.</p>}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default ExpenseLogging;
