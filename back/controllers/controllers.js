const { error } = require('console');
const { obtenerLibros, registrarUsuario, inicioSesion, mostrarUsuariosPorId, modificarUsuario, publicarLibro, librosPorUsuario } = require('../models/libreriaModel');
const jwt = require('jsonwebtoken')

const SECRET_KEY = process.env.JWT_SECRET || 'clave_secreta'

const getLibros = async ( req, res ) => {
    try {
        const queryStrings = req.query;
        const publicaciones = await obtenerLibros(queryStrings);
        res.json(publicaciones)
    } catch (error) {
        res.status(500).json({error: 'Error al cargar los libros', detalle: error.message})
    }
}

const añadirUsuario = async (req, res) => {
    try {
        console.log('BODY recibido en /register:', req.body);

        const { correo, nombre, apellido, username, contraseña, region, ciudad } = req.body;

        if ( !correo || !nombre || !apellido || !username || !contraseña || !region || !ciudad ) {
            return res.status(400).json({ mensaje: 'Faltan campos obligatorios' });
        }

        await registrarUsuario({ correo, nombre, apellido, username, contraseña, region, ciudad });
        res.send("Usuario registrado con éxito");

    } catch (error) {
        console.error('Error en añadirUsuario:', error);
        res.status(error.status || 500).json({ mensaje: error.message || 'Error interno del servidor' });
    }
}

const editarPerfil = async (req, res) => {
  try {
    const id = req.usuario.id;
    const { username, region, ciudad, descripcion } = req.body;
    const avatar = req.file?.filename;

    const usuarioActual = await mostrarUsuariosPorId(id);

    const usernameActualizado = username || usuarioActual.username;
    const regionActualizada = region || usuarioActual.region;
    const ciudadActualizada = ciudad || usuarioActual.ciudad;
    const descripcionActualizada = descripcion || usuarioActual.descripcion;
    const avatarActualizado = avatar || usuarioActual.avatar;

    await modificarUsuario(
      id,
      usernameActualizado,
      regionActualizada,
      ciudadActualizada,
      descripcionActualizada,
      avatarActualizado
    );

    const usuarioActualizado = await mostrarUsuariosPorId(id);
    res.send({ usuario: usuarioActualizado });

  } catch (error) {
    res.status(error.status || 500).json({ mensaje: error.message || 'Error interno del servidor' });
  }
};



const verificarUsuario = async ( req, res) => {
    try {
        const { correo, contraseña } = req.body

        const usuario = await inicioSesion(correo, contraseña)

        const token = jwt.sign(
            { 
                id: usuario.id,
                correo: usuario.correo
             },
            SECRET_KEY,
            { expiresIn: '1h'}
            )

        res.send({token, usuario})

    } catch (error) {
        res.status(error.code || 500).send(error)
    }
}

const getUsuariosPorId = async (req, res) => {
    try {
        const { id } = req.user; 

        const usuario = await mostrarUsuariosPorId(id);

        if (!usuario) throw { code: 404, message: "Usuario no encontrado" };

        res.json(usuario);

    } catch (error) {
        res.status(error.code || 500).send({ error: error.message || error });
    }
};

const subirLibro = async (req, res) => {
    try {
        const { id } = req.usuario;
        const { nombre, autor, idioma, descripcion, precio, genero } = req.body;
        const  img  = req.file?.filename
        if ( !nombre || !autor || !idioma || !descripcion || !precio || !genero || !img ){
            return res.status(400).json({ mensaje: 'Faltan campos obligatorios' });
        }

        await publicarLibro({nombre, autor, idioma, descripcion, precio, genero, img }, id);
        console.log('req.body:', req.body);
        console.log('req.file:', req.file);

        res.send("Libro publicado con éxito")
    } catch (error) {
        res.status(error.status || 500).json({ mensaje: error.message || 'Error interno del servidor' });
    }
}

const getLibrosUsuario = async (req, res) => {
    try {
        const { id } = req.usuario;
        const libros = await librosPorUsuario(id);
        res.json(libros)
    } catch (error) {
        res.status(error.status || 500).json({ mensaje: error.message || 'Error interno del servidor' });
    }
} 


module.exports = { 
    getLibros, 
    añadirUsuario, 
    verificarUsuario, 
    getUsuariosPorId, 
    editarPerfil, 
    subirLibro,
    getLibrosUsuario,
};