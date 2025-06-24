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
};

export async function editPublicacion(bookData){
  try {
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("nombre", bookData.nombre);
    formData.append("autor", bookData.autor);
    formData.append("idioma", bookData.idioma);
    formData.append("genero", bookData.genero);
    formData.append("precio", bookData.precio);
    formData.append("descripcion", bookData.descripcion);
    formData.append("img", bookData.img);

    const response = await axiosInstance.put(ENDPOINT.editPublicacion(bookData.id), formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.mensaje || "Error al editar perfil"
    );
  }
};

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
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data;
  } catch (error) {
    console.error("Error al subir libro:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Error al publicar libro');
  }
}

export async function getGeneros(token) {
  try {
    const response = await axiosInstance.get(ENDPOINT.generos, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || `Error al obtener géneros`)
  }
}

export async function getUserBooks(token) {
  try {
    const response = await axiosInstance.get(ENDPOINT.librosUsuario, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al obtener libros publicados');
  }
}


export async function getFiltros(token){
  try {
    const response = await axiosInstance.get(ENDPOINT.filtros, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || `Error al obtener filtros`);
  }
}

export async function getLibrosFiltrados(token, filtros) {
  try {
    const params = new URLSearchParams();

    if (filtros.autor) params.append("autor", filtros.autor);
    if (filtros.genero) params.append("genero", filtros.genero);
    if (filtros.precioMin) params.append("precioMin", filtros.precioMin);
    if (filtros.precioMax) params.append("precioMax", filtros.precioMax);
    if (filtros.idioma) params.append("idioma", filtros.idioma);
    const response = await axiosInstance.get(`/librosfiltrados?${params.toString()}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || `Error al obtener libros filtrados`);
  }
}

export async function getBookDetail(id) {
  try {
    const response = await axiosInstance.get(`/tienda/${id}`);
    return response.data
  } catch (error) {
    console.error("Error en getBookDetail:", error); 
    throw new Error(error.response?.data?.message || "Error al obtener detalle del libro");
  }
};

export async function crearConversacion(usuario1, usuario2) {
  const token = localStorage.getItem('token');
  console.log("Crear conversación con: ", usuario1, usuario2);
  try {
    const response = await axiosInstance.post(ENDPOINT.nuevaConversacion, { usuario1, usuario2}, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return response.data;
  } catch (error) {
    throw new Error("Error al crear conversación")
  }
};

export async function enviarMensaje(conversacion_id, remitente_id, contenido) {
  const token = localStorage.getItem('token');
  try {
    const response = await axiosInstance.post(ENDPOINT.creacionMensaje, {
      conversacion_id,
      remitente_id,
      contenido,
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error("Error al enviar mensaje");
  }
};

export async function obtenerMensajes(conversacion_id) {
  const token = localStorage.getItem('token');
  try {
    const response = await axiosInstance.get(ENDPOINT.obtenerMensajes(conversacion_id),
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error en obtenerMensajes:", error.response?.data || error.message);
    throw new Error("Error al obtener mensajes");
  }
}







