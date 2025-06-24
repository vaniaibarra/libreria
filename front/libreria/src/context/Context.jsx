import { createContext, useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { editUser, getBookDetail, getFiltros, getGeneros, getLibrosFiltrados, getUserBooks, loginUser, registerUser, tienda, uploadBook, editPublicacion, crearConversacion, enviarMensaje, obtenerMensajes } from "../api/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {

  const [usuario, setUsuario] = useState(() => {
    const savedUser = localStorage.getItem("usuario");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem("token") || null);

  const [generos, setGeneros] = useState([]);

  const [book, setBook] = useState([]);

  const [filtros, setFiltros] = useState({
    autor: [],
    genero: [],
    idioma: [],
    precio_min: 0,
    precio_max: 0
  });

  const [booksDelUsuario, setBooksDelUsuario] = useState([]);

  const [ mensajes, setMensajes ] = useState([]);

  const [ conversacionAct, setConversacionAct ] =useState(null);
    

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  useEffect(() => {
    if (usuario) {
      localStorage.setItem("usuario", JSON.stringify(usuario));
    } else {
      localStorage.removeItem("usuario");
    }
  }, [usuario]);

  useEffect(() => {
    fetchGeneros();
  }, [token]);

  useEffect(() => {
    fetchFiltros();
  }, [token]);


  

  const login = async (credentials) => {
    const data = await loginUser(credentials);
    setToken(data.token);
    setUsuario(data.usuario);
    localStorage.setItem('token', data.token);
  };

  const register = async (userData) => {
    const data = await registerUser(userData);
    setToken(data.token);
    setUsuario(data.usuario);
  };

  const editProfile = async (userData) => {
    const data = await editUser(userData);
    setUsuario(data.usuario);
  };

  const modificarPublicacion = async (bookData) => {
    const data = await editPublicacion(bookData);
    setBook(data.book);
  };

  const newBook = async (bookData) => {
    await uploadBook(bookData);
  };

  const fetchGeneros = async () => {
    if(!token) return;
    const data = await getGeneros(token);
    console.log("Generos recibidos:", data);
    setGeneros(data);
    
  };

  const userBooks = async () => {
  if (!token) return; 
  const data = await getUserBooks(token);
  setBooksDelUsuario(data);
  };


  const allBooks = async () => {
    if(!token) return;
    const data = await tienda(token);
    setBook(data);
  };


  const fetchFiltros = async () => {
    if(!token) return;
    const data = await getFiltros(token);
    setFiltros(data)
  };

  const librosFiltrados = async (filtros) => {
    if(!token) return;
    const data = await getLibrosFiltrados(token, filtros);
    setBook(data)
  };

  const libroPorId = async (id) => {
  if (!id) return;
  try {
    const data = await getBookDetail(id);
    console.log("Libro desde backend:", data);
    setBook(data);
  } catch (error) {
    console.error("Error al traer libro:", error);
  }
 };

const iniciarConversacion = async (usuario1, usuario2) => {
  try {
    const response = await crearConversacion(usuario1, usuario2);

    
    if (!response.conversacion || !response.conversacion.id) {
      throw new Error("Conversación no creada correctamente");
    }

    setConversacionAct(response.conversacion);
    return response.conversacion;
  } catch (error) {
    console.error("Error en iniciarConversacion:", error);
    throw new Error("Error al iniciar conversación");
  }
};





 const enviarMnsje = async (conversacion_id, remitente_id, contenido) => {
  try {
    const response = await enviarMensaje(conversacion_id, remitente_id, contenido);
    console.log("Respuesta enviarMensaje:", response);

    if (response && response.id) {
      setMensajes(prev => [...prev, response]);
      return response;
    } else {
      console.error("No se recibió mensaje válido en la respuesta", response);
      return null;
    }
  } catch (error) {
    console.error("Error en enviarMnsje:", error);
    throw error;
  }
};




const cargarMnsje = async (conversacion_id) => {
  try {
    const response = await obtenerMensajes(conversacion_id);
    if (response && Array.isArray(response.mensajes)) {
      setMensajes(response.mensajes);
      return response.mensajes;
    } else {
      setMensajes([]);
      return [];
    }
  } catch (error) {
    console.error(error);
    setMensajes([]);
    throw error;
  }
};



  const logout = () => {
    setToken(null);
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, token, book, filtros, generos, booksDelUsuario, mensajes, conversacionAct,
      login, 
      register, 
      editProfile, 
      newBook, 
      logout, 
      userBooks, 
      allBooks,
      librosFiltrados,
      libroPorId,
      modificarPublicacion,
      iniciarConversacion,
      enviarMnsje,
      cargarMnsje
       }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
