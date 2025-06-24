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
    getLibrosUsuario,
    getFiltros,
    getGeneros,
    getLibrosFiltrados,
    getLibroPorId,
    editarPublicacion,
    nuevaConversacion,
    obtenerMensajes,
    creacionMensaje
} = require('../controllers/controllers.js');
const validarToken = require('../middleware/authMiddleware.js');

routes.get("/tienda", validarToken, getLibros);
routes.get("/users/:id", validarToken, getUsuariosPorId);
routes.post("/register", añadirUsuario);
routes.post("/login", verificarUsuario);
routes.put("/edit", validarToken, upload.single('avatar'), editarPerfil);
routes.put("/editPublicacion/:id", validarToken, upload.single('img'), editarPublicacion);
routes.post("/upload", validarToken, upload.single('img'), subirLibro);
routes.get("/generos", validarToken, getGeneros);
routes.get("/librosUsuario", validarToken, getLibrosUsuario);
routes.get("/filtros", validarToken, getFiltros);
routes.get("/librosFiltrados", getLibrosFiltrados);
routes.get("/tienda/:id", getLibroPorId);
routes.post('/nuevaConversacion', validarToken, nuevaConversacion);
routes.get('/mensajes/:conversacion_id', validarToken, obtenerMensajes);
routes.post('/mensajes', validarToken, creacionMensaje);

module.exports = routes;