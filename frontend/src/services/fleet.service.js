import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1/fleet';

const fleetService = {
    getVehicles: async (companyId) => {
        const response = await axios.get(`${API_URL}/vehicles`, { params: { companyId } });
        return response.data;
    },
    addVehicle: async (data) => {
        const response = await axios.post(`${API_URL}/vehicles`, data);
        return response.data;
    },
    updateVehicle: async (id, data) => {
        const response = await axios.put(`${API_URL}/vehicles/${id}`, data);
        return response.data;
    },
    deleteVehicle: async (id) => {
        const response = await axios.delete(`${API_URL}/vehicles/${id}`);
        return response.data;
    },
    getDrivers: async (companyId) => {
        const response = await axios.get(`${API_URL}/drivers`, { params: { companyId } });
        return response.data;
    },
    addDriver: async (data) => {
        const response = await axios.post(`${API_URL}/drivers`, data);
        return response.data;
    },
    updateDriver: async (id, data) => {
        const response = await axios.put(`${API_URL}/drivers/${id}`, data);
        return response.data;
    }
};

export default fleetService;
