// src/routes/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import BookDetail from "../pages/components/BookDetail";
import BookStore from "../pages/BookStore";
import ProtectedRoutes from "./ProtectedRoutes";
import Register from "../pages/Register";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register/>} />
      
      <Route
        path="/profile"
        element={
          <ProtectedRoutes>
            <Profile />
          </ProtectedRoutes>
        }
      />

      <Route path="/books" element={<BookStore />} />
      <Route path="/books/:id" element={<BookDetail />} />
    </Routes>
  );
}

export default AppRoutes;
