import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const registerUserAPI = async (userData) => {
    const { data } = await axios.post(`${API_URL}/register`, userData);
    return data;
};

export const loginUserAPI = async (userData) => {
    const { data } = await axios.post(`${API_URL}/login`, userData);
    return data;
};
