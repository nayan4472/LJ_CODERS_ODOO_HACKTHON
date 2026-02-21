import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1/analytics';

const analyticsService = {
    getMaintenanceLogs: async (companyId) => {
        const response = await axios.get(`${API_URL}/maintenance`, { params: { companyId } });
        return response.data;
    },
    addMaintenanceLog: async (data) => {
        const response = await axios.post(`${API_URL}/maintenance`, data);
        return response.data;
    },
    getFuelLogs: async (companyId) => {
        const response = await axios.get(`${API_URL}/fuel`, { params: { companyId } });
        return response.data;
    },
    addFuelLog: async (data) => {
        const response = await axios.post(`${API_URL}/fuel`, data);
        return response.data;
    },
    getROI: async (companyId) => {
        const response = await axios.get(`${API_URL}/roi`, { params: { companyId } });
        return response.data;
    },
    syncOdoo: async () => {
        const response = await axios.post(`${API_URL}/sync-odoo`);
        return response.data;
    }
};

export default analyticsService;
