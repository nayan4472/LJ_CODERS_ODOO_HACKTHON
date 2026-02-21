import React, { useState, useEffect } from 'react';
import Map, { Marker, NavigationControl } from 'react-map-gl/mapbox';
import { io } from 'socket.io-client';
import { Truck, Navigation } from 'lucide-react';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiZGVtbyIsImEiOiJjbGlja21vY2tpbmcxMndwZzZ6ZzZ6ZzZ6In0.demo_token'; // Mock Token for Hackathon
const SOCKET_URL = 'http://localhost:5004';

const LiveMap = () => {
    // ... same logic ...
    const [viewState, setViewState] = useState({
        longitude: -74.006,
        latitude: 40.7128,
        zoom: 11,
        pitch: 45
    });

    const [vehicles, setVehicles] = useState({});

    const user = JSON.parse(localStorage.getItem('fleetflow_user') || '{}');

    useEffect(() => {
        const socket = io(SOCKET_URL);

        socket.on('connect', () => {
            console.log('🔗 Connected to Neural Uplink');
            socket.emit('join_company_room', user.companyId);
        });

        socket.on('map_update', (data) => {
            // Payload: { companyId, vehicleId, lat, lng, speed, status }
            setVehicles(prev => ({
                ...prev,
                [data.vehicleId]: {
                    id: data.vehicleId,
                    lat: data.lat,
                    lng: data.lng,
                    speed: data.speed,
                    status: data.status,
                    health: prev[data.vehicleId]?.health || 100
                }
            }));
        });

        return () => {
            socket.disconnect();
            console.log('🔴 Uplink Terminated');
        };
    }, [user.companyId]);

    return (
        <div className="space-y-6 h-full flex flex-col animate-in fade-in duration-1000">
            <div className="flex justify-between items-center border-b border-navy-700/50 pb-6">
                <div>
                    <h1 className="text-3xl font-black font-display tracking-[0.05em] text-white uppercase italic">Neural <span className="text-teal-500">Grid Overlay</span></h1>
                    <div className="flex items-center mt-2 space-x-4">
                        <div className="flex items-center">
                            <span className="h-2 w-2 rounded-full bg-teal-500 mr-2 animate-pulse shadow-[0_0_10px_rgba(100,255,218,0.5)]"></span>
                            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Quantum Uplink Active</span>
                        </div>
                        <div className="flex items-center">
                            <span className="h-2 w-2 rounded-full bg-navy-600 mr-2"></span>
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Latency: 24ms</span>
                        </div>
                    </div>
                </div>
                <div className="flex space-x-3">
                    <button className="btn-secondary px-5 py-2 text-[10px] font-black tracking-widest border-navy-700/50">FILTER_TYPE</button>
                    <button className="btn-primary px-5 py-2 text-[10px] font-black tracking-widest shadow-glow-sm">BROADCAST_ALERT</button>
                </div>
            </div>

            <div className="flex-1 rounded-3xl overflow-hidden border border-navy-700/50 shadow-2xl relative bg-navy-950">
                {/* Visual HUD overlays */}
                <div className="absolute top-8 left-8 z-30 space-y-4">
                    <div className="bg-navy-950/80 backdrop-blur-xl p-6 rounded-2xl border border-teal-500/20 shadow-2xl space-y-4 w-64">
                        <div className="pb-3 border-b border-navy-700/50">
                            <h4 className="text-[10px] font-black text-teal-400 uppercase tracking-widest">Active Asset Clusters</h4>
                        </div>
                        <div className="space-y-3">
                            {Object.values(vehicles).map(v => (
                                <div key={v.id} className="flex justify-between items-center group cursor-pointer">
                                    <div className="flex items-center space-x-3">
                                        <div className="h-2 w-2 rounded-full bg-teal-500"></div>
                                        <span className="text-xs font-bold text-white group-hover:text-teal-400 transition-colors">{v.id}</span>
                                    </div>
                                    <span className="text-[10px] font-black text-slate-500">{(v.speed).toFixed(1)} KM/H</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="absolute top-8 right-8 z-30">
                    <div className="bg-navy-950/80 backdrop-blur-xl p-4 rounded-xl border border-navy-700/50 flex flex-col space-y-2">
                        <div className="h-12 w-12 rounded-lg bg-navy-800 flex items-center justify-center border border-navy-700 group hover:border-teal-500/50 cursor-pointer transition-colors">
                            <Navigation className="h-5 w-5 text-slate-500 group-hover:text-teal-400" />
                        </div>
                        <div className="h-12 w-12 rounded-lg bg-navy-800 flex items-center justify-center border border-navy-700 group hover:border-teal-500/50 cursor-pointer transition-colors">
                            <Truck className="h-5 w-5 text-slate-500 group-hover:text-teal-400" />
                        </div>
                    </div>
                </div>

                {/* Simulated Grid Background */}
                <div className="absolute inset-0 bg-[radial-gradient(#112240_1.5px,transparent_1.5px)] [background-size:40px_40px] opacity-30"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-navy-900/50 via-transparent to-teal-500/5"></div>

                {/* Moving Scanning Box */}
                <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-teal-500/10 bg-teal-500/5 rounded-lg animate-pulse pointer-events-none">
                    <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-teal-500/50"></div>
                    <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-teal-500/50"></div>
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-teal-500/50"></div>
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-teal-500/50"></div>
                </div>

                <div className="absolute inset-0 z-20 overflow-hidden">
                    {Object.values(vehicles).map(v => {
                        const top = 40 + (40.7128 - v.lat) * 2000;
                        const left = 50 + (v.lng - -74.006) * 2000;
                        return (
                            <div key={v.id} className="absolute transition-all duration-1000 ease-linear flex flex-col items-center" style={{ top: `${top}%`, left: `${left}%` }}>
                                <div className="bg-navy-950/90 border border-teal-500/30 text-teal-400 text-[9px] font-black px-2 py-0.5 rounded shadow-2xl mb-1 whitespace-nowrap backdrop-blur-md">
                                    {v.id} • {v.speed.toFixed(0)} KM/H
                                </div>
                                <div className="relative">
                                    <div className="absolute -inset-2 bg-teal-500/20 blur-md rounded-full animate-ping"></div>
                                    <div className="h-5 w-5 bg-teal-500 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(100,255,218,0.5)] border border-white/20">
                                        <Truck className="h-2.5 w-2.5 text-navy-900" />
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30">
                    <div className="bg-navy-950/80 backdrop-blur-2xl px-8 py-3 rounded-full border border-navy-700/50 shadow-2xl flex items-center space-x-8">
                        <div className="text-center">
                            <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Active Fleet</p>
                            <p className="text-sm font-display font-black text-white">{Object.keys(vehicles).length || 0}</p>
                        </div>
                        <div className="h-6 w-px bg-navy-700"></div>
                        <div className="text-center">
                            <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Region Efficiency</p>
                            <p className="text-sm font-display font-black text-teal-500">92%</p>
                        </div>
                        <div className="h-6 w-px bg-navy-700"></div>
                        <div className="text-center">
                            <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Deviations</p>
                            <p className="text-sm font-display font-black text-crimson-500">03</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LiveMap;
