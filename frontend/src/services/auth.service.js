import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1/auth';

export const login = async (email, password) => {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    if (response.data.token) {
        localStorage.setItem('fleetflow_user', JSON.stringify(response.data.user));
        localStorage.setItem('fleetflow_token', response.data.token);
    }
    return response.data;
};

export const register = async (userData) => {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
};

export const verifyRegistration = async (email, otp) => {
    const response = await axios.post(`${API_URL}/verify-registration`, { email, otp });
    return response.data;
};

export const forgotPassword = async (email) => {
    const response = await axios.post(`${API_URL}/password/forgot`, { email });
    return response.data;
};

export const verifyOtp = async (email, otp) => {
    const response = await axios.post(`${API_URL}/password/verify-otp`, { email, otp });
    return response.data;
};

export const resetPassword = async (email, newPassword) => {
    const response = await axios.post(`${API_URL}/password/reset`, { email, newPassword });
    return response.data;
};

export const logout = () => {
    localStorage.removeItem('fleetflow_user');
    localStorage.removeItem('fleetflow_token');
};

export const getCurrentUser = () => {
    const userStr = localStorage.getItem('fleetflow_user');
    if (userStr) return JSON.parse(userStr);
    return null;
};
