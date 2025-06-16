const express = require('express');
const routes = express.Router();
const upload = require('../multer/multerConfig.js');
const {
    getLibros,
    añadirUsuario,
    verificarUsuario,
    getUsuariosPorId,
    editarPerfil,
    subirLibro,
    getLibrosUsuario
} = require('../controllers/controllers.js');
const validarToken = require('../middleware/authMiddleware.js');

routes.get("/tienda", validarToken, getLibros);
routes.get("/users/:id", validarToken, getUsuariosPorId);
routes.post("/register", añadirUsuario);
routes.post("/login", verificarUsuario);
routes.put("/edit", validarToken, upload.single('avatar'), editarPerfil);
routes.post("/upload", validarToken, upload.single('img'), subirLibro);
routes.get("/librosUsuario", validarToken, getLibrosUsuario);

module.exports = routes;