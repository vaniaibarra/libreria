import { createContext, useContext, useState, useEffect } from "react";
import { editUser, getUserBooks, loginUser, registerUser, tienda, uploadBook } from "../api/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(() => {
    const savedUser = localStorage.getItem("usuario");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem("token") || null);
  const [book, setBook] = useState([])
  

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
  }

  const newBook = async (bookData) => {
    await uploadBook(bookData);
  }

  const userBooks = async () => {
  if (!token) return; 
  const data = await getUserBooks(token);
  setBook(data);
  }

  const allBooks = async () => {
    if(!token) return;
    const data = await tienda(token);
    setBook(data);
  }




  const logout = () => {
    setToken(null);
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, token, book, login, register, editProfile, newBook, logout, userBooks, allBooks }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
