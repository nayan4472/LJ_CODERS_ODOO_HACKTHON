import React, { useState, useEffect } from 'react';
import { AlertCircle, Zap, CheckCircle, Clock, Truck, User, MapPin } from 'lucide-react';
import fleetService from '../services/fleet.service';
import tripService from '../services/trip.service';

const TripDispatcher = () => {
    const [availableVehicles, setAvailableVehicles] = useState([]);
    const [availableDrivers, setAvailableDrivers] = useState([]);
    const [recentTrips, setRecentTrips] = useState([]);
    const [cargoWeight, setCargoWeight] = useState('');
    const [selectedVehicleId, setSelectedVehicleId] = useState('');
    const [selectedDriverId, setSelectedDriverId] = useState('');
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(true);

    const user = JSON.parse(localStorage.getItem('fleetflow_user') || '{}');

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            const [vells, drvs, trps] = await Promise.all([
                fleetService.getVehicles(user.companyId),
                fleetService.getDrivers(user.companyId),
                tripService.getTrips(user.companyId)
            ]);
            setAvailableVehicles(vells.filter(v => v.status === 'Available' && !v.isRetired));
            setAvailableDrivers(drvs.filter(d => d.status === 'Available'));
            setRecentTrips(trps.slice(0, 5));
        } catch (error) {
            console.error('Error loading dispatch data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleValidationAndDispatch = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const vehicle = availableVehicles.find(v => v._id === selectedVehicleId);
        if (!vehicle) return setError('Please select a vehicle.');

        if (parseInt(cargoWeight) > vehicle.capacity) {
            setError(`CRITICAL: Cargo weight (${cargoWeight} kg) exceeds ${vehicle.model}'s capacity (${vehicle.capacity} kg).`);
            return;
        }

        try {
            await tripService.createTrip({
                vehicleId: selectedVehicleId,
                driverId: selectedDriverId,
                cargoWeight: parseInt(cargoWeight),
                source: origin,
                destination: destination,
                companyId: user.companyId
            });
            setSuccess('TRIP AUTHORIZED & DISPATCHED.');
            setCargoWeight('');
            setSelectedVehicleId('');
            setSelectedDriverId('');
            setOrigin('');
            setDestination('');
            loadData();
        } catch (err) {
            setError(err.response?.data?.error || 'Dispatch failed.');
        }
    };

    const updateStatus = async (tripId, status) => {
        try {
            await tripService.updateTripStatus(tripId, status);
            loadData();
        } catch (err) {
            alert('Status update failed.');
        }
    };

    if (loading) return <div className="text-white text-center py-20">Initializing Neural Grid...</div>;

    return (
        <div className="space-y-8 max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex justify-between items-end border-b border-navy-700/50 pb-6">
                <div>
                    <h1 className="text-3xl font-black font-display tracking-[0.05em] text-white uppercase">Neural <span className="text-teal-500">Dispatcher</span></h1>
                    <p className="text-slate-500 text-sm font-medium mt-1 uppercase tracking-widest">Asset Assignment & Payload Validation Logic</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8">
                    <div className="card !p-0 overflow-hidden shadow-2xl">
                        <form onSubmit={handleValidationAndDispatch} className="flex flex-col">
                            <div className="p-8 space-y-8">
                                {/* Success Message */}
                                {success && (
                                    <div className="bg-teal-500/10 border border-teal-500/30 text-teal-400 p-4 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center">
                                        <CheckCircle className="h-5 w-5 mr-3" />
                                        {success}
                                    </div>
                                )}

                                {/* Error Message */}
                                {error && (
                                    <div className="bg-crimson-500/10 border border-crimson-500/30 text-crimson-500 p-4 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center">
                                        <AlertCircle className="h-5 w-5 mr-3" />
                                        {error}
                                    </div>
                                )}

                                {/* Form Sections ... */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-6">
                                        <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest">Route Parameters</h3>
                                        <input required className="input-field" placeholder="Origin Node" value={origin} onChange={e => setOrigin(e.target.value)} />
                                        <input required className="input-field" placeholder="Target Destination" value={destination} onChange={e => setDestination(e.target.value)} />
                                    </div>
                                    <div className="space-y-6">
                                        <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest">Payload Data</h3>
                                        <input required type="number" className="input-field" placeholder="Net Weight (kg)" value={cargoWeight} onChange={e => setCargoWeight(e.target.value)} />
                                        <select className="input-field">
                                            <option>STANDARD_FREIGHT</option>
                                            <option>HAZMAT_PROTOCOL</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-navy-700/50 pt-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase">Available Asset</label>
                                        <select required className="input-field" value={selectedVehicleId} onChange={e => setSelectedVehicleId(e.target.value)}>
                                            <option value="">-- SELECT ASSET --</option>
                                            {availableVehicles.map(v => (
                                                <option key={v._id} value={v._id}>{v.model} ({v.plateNumber}) - {v.capacity}kg</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase">Available Operator</label>
                                        <select required className="input-field" value={selectedDriverId} onChange={e => setSelectedDriverId(e.target.value)}>
                                            <option value="">-- SELECT OPERATOR --</option>
                                            {availableDrivers.map(d => (
                                                <option key={d._id} value={d._id}>{d.name} ({d.licenseType})</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 bg-navy-800/30 border-t border-navy-700/50 flex justify-end">
                                <button type="submit" className="btn-primary w-full py-4 text-sm tracking-[0.2em] font-black">
                                    AUTHORIZE DISPATCH
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="lg:col-span-4 space-y-6">
                    <div className="card">
                        <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Active Dispatches</h4>
                        <div className="space-y-4">
                            {recentTrips.map((trip) => (
                                <div key={trip._id} className="p-4 bg-navy-900/40 rounded-xl border border-navy-700/30 space-y-3">
                                    <div className="flex justify-between items-start">
                                        <span className="text-xs font-bold text-white">{trip.source} → {trip.destination}</span>
                                        <span className={`text-[9px] font-black px-2 py-0.5 rounded ${trip.status === 'Dispatched' ? 'bg-teal-500 text-navy-900' : 'bg-navy-700 text-slate-400'
                                            }`}>{trip.status}</span>
                                    </div>
                                    <div className="flex items-center text-[10px] text-slate-500">
                                        <Truck className="h-3 w-3 mr-1" /> {trip.cargoWeight}kg
                                    </div>
                                    {trip.status === 'Dispatched' && (
                                        <button
                                            onClick={() => updateStatus(trip._id, 'Completed')}
                                            className="w-full py-2 text-[9px] font-black text-teal-400 border border-teal-500/20 rounded hover:bg-teal-500/10 transition-colors uppercase"
                                        >
                                            Mark Completed
                                        </button>
                                    )}
                                </div>
                            ))}
                            {recentTrips.length === 0 && <p className="text-center text-slate-500 text-xs py-4">No recent dispatches.</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TripDispatcher;
