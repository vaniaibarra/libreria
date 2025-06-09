const express = require('express');
const routes = express.Router();
const {
    getLibros,
    añadirUsuario,
    verificarUsuario,
    getUsuariosPorId
} = require('../controllers/controllers.js');
const validarToken = require('../middleware/authMiddleware.js');

routes.get("/tienda", validarToken, getLibros);
routes.get("/users", validarToken, getUsuariosPorId);
routes.post("/register", añadirUsuario);
routes.post("/login", verificarUsuario);



module.exports = routes;