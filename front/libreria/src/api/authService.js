import axiosInstance from "./axiosInstance";
import { ENDPOINT } from "./config";

export async function loginUser(credentials) {
    try {
        const response = await axiosInstance.post(ENDPOINT.login, credentials);
        return response.data
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error al iniciar sesión');
    }
}

export async function registerUser(userData) {
    try {
        const response = await axiosInstance.post(ENDPOINT.register, userData);
        return response.data
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error al registrar usuario');
    }
}

