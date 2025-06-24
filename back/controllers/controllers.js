const { error } = require('console');
const { obtenerLibros, registrarUsuario, inicioSesion, mostrarUsuariosPorId, modificarUsuario, publicarLibro, librosPorUsuario, seleccionarFiltro, filtrarGenero, filtrarLibros, obtenerLibro, modificarPublicacion, buscarConversacion, crearConversacion, crearMensaje, obtenerMensajesConversacion } = require('../models/libreriaModel');
const jwt = require('jsonwebtoken')

const SECRET_KEY = process.env.JWT_SECRET || 'clave_secreta'


const getLibros = async (req, res) => {
  const {
    limit = 40,
    page = 1,
    order_by = "id_ASC"
  } = req.query;

  try {
    const libros = await obtenerLibros({
      limit: Number(limit),
      page: Number(page),
      order_by
    });

    res.status(200).json(libros);
  } catch (error) {
    console.error("Error en controlador al obtener libros:", error.message);
    res.status(500).json({ error: "Error al obtener libros" });
  }
};

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

const editarPublicacion = async (req, res) => {
    try {
        const id = req.params.id;
        const { nombre, autor, idioma, descripcion, precio, genero } = req.body;
        const img = req.file?.filename;

        const publicacionActual = await obtenerLibro(id);
        const nombreActualizado = nombre ?? publicacionActual.nombre;
        const autorActualizado = autor ?? publicacionActual.autor;
        const idiomaActualizado = idioma ?? publicacionActual.idioma;
        const descripcionActualizada = descripcion ?? publicacionActual.descripcion;
        const precioActualizado = precio ?? publicacionActual.precio;
        const generoActualizado = genero ?? publicacionActual.genero;
        const imgActualizada = img ?? publicacionActual.img;

        await modificarPublicacion({
            id,
            nombre: nombreActualizado, 
            autor: autorActualizado, 
            idioma: idiomaActualizado, 
            descripcion: descripcionActualizada, 
            precio: precioActualizado, 
            genero: generoActualizado, 
            img: imgActualizada
        })

        const bookActualizado = await obtenerLibro(id);
        res.send({book : bookActualizado});

    } catch (error) {
        res.status(error.status || 500).json({ mensaje: error.message || `Error al actualizar libro`})
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

const getGeneros = async (req, res) => {
    try {
        const result = await filtrarGenero();
        res.json(result)
    } catch (error) {
        res.status(error.status || 500).json({ mensaje: error.message || `Error interno del servidor`})
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

const getFiltros = async (req, res) => {
    try {
        const result = await seleccionarFiltro()
        res.send(result)
    } catch (error) {
        res.status(error.status || 500).json({ mensaje: error.message || `Error interno del servidor` })
    }
}

const getLibrosFiltrados = async (req, res) => {
    try {
        const { autor, precioMin, precioMax, genero, idioma } = req.query;
        const result = await filtrarLibros({ autor, precioMin, precioMax, genero, idioma })
        res.send(result);
    } catch (error) {
        res.status(error.status || 500).json({message: error.message || `Error interno del servidor`})
    }
}

const getLibroPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const libro = await obtenerLibro(id)
        res.json(libro)
    } catch (error) {
        res.status(error.status || 500).json({message: error.message || `Error interno del servidor`})
    }
};

const nuevaConversacion = async (req, res) => {
    const { usuario1, usuario2 } = req.body;
    if (!usuario1 || !usuario2) {
    return res.status(400).json({ error: "Faltan datos para crear la conversación" });
  }
    try {
        const conversacionExistente = await buscarConversacion(usuario1, usuario2);
        if(conversacionExistente.length > 0){
            return res.status(200).json({
                mensaje: 'La conversación ya existe',
                conversacion: conversacionExistente[0]
            });
        };
        const conversacionNueva = await crearConversacion(usuario1, usuario2);
        res.status(201).json({
            mensaje: 'Conversación creada con éxito',
            conversacion: conversacionNueva
        });
    } catch (error) {
        console.error("Error en mensajería", error);
        res.status(500).json({ error: 'Error al crear conversación'});
    }
};

const creacionMensaje = async (req, res) => {
    const { conversacion_id, remitente_id, contenido } = req.body;
    if(!conversacion_id || !remitente_id || !contenido ){
        return res.status(400).json({error: 'Faltan datos requeridos'});
    }

    try {
        const nuevoMensaje = await crearMensaje({conversacion_id, remitente_id, contenido});
        res.status(201).json(nuevoMensaje)
    } catch (error) {
        console.error('Error al crear mensaje:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

const obtenerMensajes = async (req, res) => {
    const  { conversacion_id } = req.params;

    try {
        const mensajes = await obtenerMensajesConversacion(conversacion_id);
        res.json(mensajes);
    } catch (error) {
        console.log("Error al obtener mensajes", error);
        res.status(500).json({ error: 'Error al obtener mensajes'})
    }
};



module.exports = { 
    getLibros, 
    añadirUsuario, 
    verificarUsuario, 
    getUsuariosPorId, 
    editarPerfil, 
    subirLibro,
    getGeneros,
    getLibrosUsuario,
    getFiltros,
    getLibrosFiltrados,
    getLibroPorId,
    editarPublicacion,
    nuevaConversacion,
    creacionMensaje,
    obtenerMensajes
};