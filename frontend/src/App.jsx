import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import DashboardLayout from './components/DashboardLayout';
import CommandCenter from './pages/CommandCenter';
import VehicleRegistry from './pages/VehicleRegistry';
import TripDispatcher from './pages/TripDispatcher';
import Analytics from './pages/Analytics';
import LiveMap from './pages/LiveMap';
import Maintenance from './pages/Maintenance';
import Drivers from './pages/Drivers';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('fleetflow_token');
  // if (!token) return <Navigate to="/login" replace />; // disabled for hackathon ease of demo
  return children;
};

function App() {
  return (
    <Router>
      <div className="App bg-navy-900 min-h-screen text-slate-300 selection:bg-teal-500/30">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
            <Route path="/dashboard" element={<CommandCenter />} />
            <Route path="/map" element={<LiveMap />} />
            <Route path="/vehicles" element={<VehicleRegistry />} />
            <Route path="/dispatch" element={<TripDispatcher />} />
            <Route path="/maintenance" element={<Maintenance />} />
            <Route path="/drivers" element={<Drivers />} />
            <Route path="/analytics" element={<Analytics />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
