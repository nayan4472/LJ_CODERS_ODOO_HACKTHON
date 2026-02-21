import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardLayout from './components/DashboardLayout';
import CommandCenter from './pages/CommandCenter';
import VehicleRegistry from './pages/VehicleRegistry';
import TripDispatcher from './pages/TripDispatcher';
import Analytics from './pages/Analytics';
import LiveMap from './pages/LiveMap';
import Maintenance from './pages/Maintenance';
import Drivers from './pages/Drivers';
import ExpenseLogging from './pages/ExpenseLogging';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('fleetflow_token');
  const user = JSON.parse(localStorage.getItem('fleetflow_user') || '{}');

  if (!token) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <div className="App bg-navy-900 min-h-screen text-slate-300 selection:bg-teal-500/30">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<DashboardLayout />}>
            {/* Common Routes */}
            <Route path="/dashboard" element={<ProtectedRoute><CommandCenter /></ProtectedRoute>} />
            <Route path="/map" element={<ProtectedRoute><LiveMap /></ProtectedRoute>} />
            <Route path="/vehicles" element={<ProtectedRoute><VehicleRegistry /></ProtectedRoute>} />
            <Route path="/drivers" element={<ProtectedRoute><Drivers /></ProtectedRoute>} />

            {/* Role-Specific Routes */}
            <Route path="/dispatch" element={
              <ProtectedRoute allowedRoles={['Manager', 'Dispatcher']}>
                <TripDispatcher />
              </ProtectedRoute>
            } />

            <Route path="/maintenance" element={
              <ProtectedRoute allowedRoles={['Manager', 'Dispatcher']}>
                <Maintenance />
              </ProtectedRoute>
            } />

            <Route path="/analytics" element={
              <ProtectedRoute allowedRoles={['Manager', 'Financial_Analyst']}>
                <Analytics />
              </ProtectedRoute>
            } />

            <Route path="/expenses" element={
              <ProtectedRoute allowedRoles={['Manager', 'Financial_Analyst']}>
                <ExpenseLogging />
              </ProtectedRoute>
            } />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
