import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { Truck, LayoutDashboard, Database, Map as MapIcon, Wrench, FileText, Users, LogOut, Bell } from 'lucide-react';
import { logout } from '../services/auth.service';

const SidebarLink = ({ to, icon: Icon, label }) => (
    <NavLink to={to} className={({ isActive }) => `flex items-center px-4 py-3.5 mb-2 rounded-xl transition-all duration-300 group ${isActive ? 'bg-teal-500/10 text-teal-400 border border-teal-500/20 shadow-[0_0_15px_rgba(100,255,218,0.05)]' : 'text-slate-400 hover:bg-navy-700/50 hover:text-slate-200 border border-transparent'}`}>
        <Icon className={`h-5 w-5 mr-3 transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-teal-400' : 'text-slate-500 group-hover:text-teal-500/70'}`} />
        <span className="font-semibold tracking-wide text-sm">{label}</span>
    </NavLink>
);

const DashboardLayout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="flex h-screen overflow-hidden bg-navy-900 font-sans">
            {/* Background blobs for depth */}
            <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="fixed bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-navy-700/20 rounded-full blur-[100px] pointer-events-none"></div>

            {/* Sidebar */}
            <aside className="w-72 flex-shrink-0 bg-navy-800/40 backdrop-blur-3xl border-r border-navy-700/50 flex flex-col pt-8 relative z-20">
                <div className="px-8 flex items-center mb-10 group cursor-pointer" onClick={() => navigate('/dashboard')}>
                    <div className="p-2 bg-teal-500/10 rounded-xl border border-teal-500/20 mr-3 group-hover:shadow-[0_0_15px_rgba(100,255,218,0.2)] transition-all duration-300">
                        <Truck className="h-7 w-7 text-teal-400" />
                    </div>
                    <h1 className="text-2xl font-display font-bold text-white tracking-[0.2em]">FLEET<span className="text-teal-500">FLOW</span></h1>
                </div>

                <nav className="flex-1 px-4 space-y-1 overflow-y-auto scrollbar-hide">
                    <SidebarLink to="/dashboard" icon={LayoutDashboard} label="Command Center" />
                    <SidebarLink to="/map" icon={MapIcon} label="Live Intelligence Map" />
                    <SidebarLink to="/vehicles" icon={Database} label="Vehicle Registry" />
                    <SidebarLink to="/dispatch" icon={Truck} label="Trip Dispatcher" />
                    <SidebarLink to="/maintenance" icon={Wrench} label="Advanced Insights" />
                    <SidebarLink to="/drivers" icon={Users} label="Personnel Hub" />
                    <SidebarLink to="/analytics" icon={FileText} label="ROI & Analytics" />
                </nav>

                <div className="p-4 border-t border-navy-700/50 bg-navy-900/20">
                    <div className="bg-teal-500/10 border border-teal-500/20 rounded-xl p-4">
                        <p className="text-xs font-bold text-teal-400 uppercase tracking-widest mb-1">Fleet Health</p>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-slate-300">92% Optimal</span>
                            <span className="text-[10px] text-teal-500">+2.4%</span>
                        </div>
                        <div className="w-full bg-navy-700 rounded-full h-1.5 overflow-hidden">
                            <div className="bg-teal-500 h-full w-[92%] shadow-[0_0_10px_rgba(100,255,218,0.5)]"></div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden relative z-10">
                {/* Topbar */}
                <header className="flex-shrink-0 h-20 bg-navy-900/10 backdrop-blur-md border-b border-navy-700/30 flex items-center justify-between px-10">
                    <div className="flex items-center">
                        <div className="flex items-center px-4 py-1.5 bg-navy-700/30 border border-navy-700/50 rounded-full text-xs font-bold tracking-widest">
                            <span className="flex h-2 w-2 mr-3 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                            </span>
                            <span className="text-slate-200">SYSTEM: </span>
                            <span className="text-teal-400 ml-1"> OPERATIONAL</span>
                        </div>
                    </div>

                    <div className="flex items-center space-x-6">
                        <button className="text-slate-400 hover:text-teal-400 relative transition-colors p-2 hover:bg-navy-700/30 rounded-xl">
                            <Bell className="h-6 w-6" />
                            <span className="absolute top-2 right-2 flex h-2.5 w-2.5 border-2 border-navy-800 rounded-full bg-crimson-500"></span>
                        </button>

                        <div className="flex items-center border-l border-navy-700/50 pl-6 space-x-4">
                            <div className="flex flex-col text-right">
                                <span className="text-sm font-bold text-white leading-tight mt-1">Admin Demo</span>
                                <span className="text-[10px] font-bold text-teal-500/50 uppercase tracking-widest">Global Manager</span>
                            </div>
                            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 shadow-teal-500/20 shadow-lg border border-teal-400/30 flex items-center justify-center font-black text-navy-900 text-sm transform transition hover:scale-105 cursor-pointer">
                                AD
                            </div>
                            <button onClick={handleLogout} className="p-2 text-slate-500 hover:text-crimson-500 transition-all hover:bg-crimson-500/5 rounded-xl border border-transparent hover:border-crimson-500/20">
                                <LogOut className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-10 bg-navy-900/20 scrollbar-thin">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
