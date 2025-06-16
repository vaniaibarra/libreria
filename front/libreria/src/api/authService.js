import { data } from "react-router-dom";
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

export async function tienda(token) {
  try {
    const response = await axiosInstance.get(ENDPOINT.tienda, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al obtener libros publicados');
  }
}

export async function editUser(userData) {
  try {
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("username", userData.username);
    formData.append("region", userData.region);
    formData.append("ciudad", userData.ciudad);
    formData.append("descripcion", userData.descripcion);

    if(userData.avatar){
      formData.append("avatar", userData.avatar);
    }

    const response = await axiosInstance.put(ENDPOINT.edit, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.mensaje || "Error al editar perfil"
    );
  }
}

export async function uploadBook(bookData) {
  try {
    const token = localStorage.getItem('token');

    const formData = new FormData();
    formData.append("nombre", bookData.nombre);
    formData.append("autor", bookData.autor);
    formData.append("idioma", bookData.idioma);
    formData.append("genero", bookData.genero);
    formData.append("precio", bookData.precio);
    formData.append("descripcion", bookData.descripcion);
    formData.append("img", bookData.img);

    for (let pair of formData.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }

    const response = await axiosInstance.post(ENDPOINT.upload, formData, {
      headers: {
        Authorization: `Bearer ${token}`,

      },
    })
    return response.data;
  } catch (error) {
    console.error("Error al subir libro:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Error al publicar libro');
  }
}

export async function getUserBooks(token) {
  try {
    const response = await axiosInstance.get('/librosUsuario', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al obtener libros publicados');
  }
}




