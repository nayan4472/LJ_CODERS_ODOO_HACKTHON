import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1/trips';

const tripService = {
    getTrips: async (companyId) => {
        const response = await axios.get(API_URL, { params: { companyId } });
        return response.data;
    },
    createTrip: async (data) => {
        const response = await axios.post(API_URL, data);
        return response.data;
    },
    updateTripStatus: async (id, data) => {
        const response = await axios.put(`${API_URL}/${id}`, data);
        return response.data;
    }
};

export default tripService;
