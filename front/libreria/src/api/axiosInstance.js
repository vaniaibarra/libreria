import axios from 'axios';
import { URLBASE } from './config';

const axiosInstance = axios.create({
    baseURL: URLBASE,
    
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosInstance;