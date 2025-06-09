const { error } = require('console');
const { obtenerLibros, registrarUsuario, inicioSesion, mostrarUsuariosPorId } = require('../models/libreriaModel');
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

        res.send({token})

    } catch (error) {
        res.status(error.code || 500).send(error)
    }
}

const getUsuariosPorId = async ( req, res ) => {
    try {
        const header = req.header("Authorization")
        const token = header?.split("Bearer ")[1]

        if ( !token) throw { code: 401, message: "Token no enviado" }

        jwt.verify(token, SECRET_KEY)
        const { id } = decoded

        const usuario = await mostrarUsuariosPorId(id)

        if(!usuario) throw { code: 404, message: "Usuario no encontrado"}

        res.json(usuario)

    } catch (error) {

        res.status(error.code || 500).send({ error: error.message || error })

    }
}

module.exports = { getLibros, añadirUsuario, verificarUsuario, getUsuariosPorId };