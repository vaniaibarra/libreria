const { pool } = require('../db/database');
const format = require('pg-format');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const obtenerLibros = async ({ limit = 40, page = 1, order_by = "id_ASC" }) => {
  const [campo, direccion] = order_by.split("_");
  const offSet = Math.abs((page - 1) * limit);

  try {
    const formattedQuery = format(`
      SELECT p.*, d.usuario_id, u.username
      FROM publicaciones p
      JOIN detalle_publicaciones d ON p.id = d.publicacion_id
      JOIN usuarios u ON d.usuario_id = u.id
      ORDER BY %I %s
      LIMIT %L OFFSET %L
    `, campo, direccion, limit, offSet);

    const { rows: publicaciones } = await pool.query(formattedQuery);
    return publicaciones;
  } catch (error) {
    console.log('Error al consultar la base de datos', error.message);
    throw error;
  }
};




const registrarUsuario = async ({correo, nombre, apellido, username, contraseña, region, ciudad}) => {
    const saltRounds = 10
    const contraseñaEncriptada = bcrypt.hashSync(contraseña, saltRounds)
    const values = [ correo, nombre, apellido, username, contraseñaEncriptada, region, ciudad]
    const consulta = "INSERT INTO usuarios (correo, nombre, apellido, username, contraseña, region, ciudad) VALUES ($1, $2, $3, $4, $5, $6, $7)"

    await pool.query(consulta, values)
}

const modificarUsuario = async (id, username, region, ciudad, descripcion, avatar) => {
    const values = [username, region, ciudad, descripcion, avatar ,id];
    const consulta = "UPDATE usuarios SET username = $1, region= $2, ciudad = $3, descripcion = $4, avatar = $5 WHERE id = $6 RETURNING *"

    const result = await pool.query(consulta, values)
    return result.rows[0];
}

const modificarPublicacion = async ({id, nombre, autor, idioma, descripcion, precio, genero, img}) => {
    const values = [nombre, autor, idioma, descripcion, precio, genero, img, id];
    const consulta = `UPDATE publicaciones SET nombre = $1, autor = $2, idioma = $3, descripcion = $4, precio = $5, genero = $6, img = $7 WHERE id = $8 RETURNING *`;

    const result = await pool.query(consulta, values);
    return result.rows[0];
}


const inicioSesion = async (correo, contraseña) => {
    const { rows } = await pool.query("SELECT * FROM usuarios WHERE correo = $1", [correo])

    if (rows.length === 0) throw { code: 401, message: 'Email no registrado' }

    const usuario = rows[0]

    const passwordEsValida = bcrypt.compareSync(contraseña, usuario.contraseña)

    if (!passwordEsValida) throw { code: 401, message: 'Contraseña incorrecta' }

    delete usuario.contraseña

    return usuario
}


const mostrarUsuariosPorId = async (id) => {
    const consulta = "SELECT id, username, region, ciudad, descripcion, avatar FROM usuarios WHERE id = $1"
    const { rows } = await pool.query(consulta, [id]);
    return rows[0];
}

const publicarLibro = async ({ nombre, autor, idioma, descripcion, precio, genero, img }, idUsuario) => {
    const values = [nombre, autor, idioma, descripcion, precio, genero, img];
    const consulta = `INSERT INTO publicaciones (nombre, autor, idioma, descripcion, precio, genero, img) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`;

    const resultado = await pool.query(consulta, values);
    const idPublicacion = resultado.rows[0].id;

    const consultaDetalle = `INSERT INTO detalle_publicaciones (usuario_id, publicacion_id) VALUES ($1, $2)`;

    await pool.query(consultaDetalle, [idUsuario, idPublicacion]);
}

const filtrarGenero = async () => {
    const consulta = `SELECT id, genero FROM generos`;
    const { rows } = await pool.query(consulta);
    return rows;
}

const librosPorUsuario = async (id) => {
  const consulta = `
    SELECT p.*, dp.usuario_id 
    FROM publicaciones p 
    JOIN detalle_publicaciones dp ON p.id = dp.publicacion_id 
    JOIN usuarios u ON dp.usuario_id = u.id
    WHERE dp.usuario_id = $1
  `;
  const { rows } = await pool.query(consulta, [id]);
  return rows;
};


const filtrarLibros = async ({autor, precioMin, precioMax, genero, idioma}) => {

    const filtroAutor = autor ?? null;

    const filtroPrecioMin = !isNaN(Number(precioMin)) ? Number(precioMin) : null;
    const filtroPrecioMax = !isNaN(Number(precioMax)) ? Number(precioMax) : null;

    const generoInt = parseInt(genero, 10);
    const filtroGenero = !Number.isNaN(generoInt) ? generoInt : null;

    const filtroIdioma = idioma ?? null;

    const consulta = `SELECT * FROM publicaciones
    WHERE ($1::TEXT IS NULL OR autor = $1::TEXT)
    AND ($2::NUMERIC IS NULL OR precio >= $2::NUMERIC)
    AND ($3::NUMERIC IS NULL OR precio <= $3::NUMERIC)
    AND ($4::INTEGER IS NULL OR genero = $4::INTEGER)
    AND ($5::TEXT IS NULL OR idioma = $5::TEXT)
    `;
    
    const values = [filtroAutor, filtroPrecioMin, filtroPrecioMax, filtroGenero, filtroIdioma];
    const result = await pool.query(consulta, values);
    return result.rows;
};

const obtenerLibro = async (id) => {
    const consulta = `SELECT * FROM publicaciones WHERE id = $1`;
    const { rows } = await pool.query(consulta, [id]);
    return rows[0];
}



// CONSULTRA FILTRO BUSCADOR
const seleccionarFiltro = async () => {
    const consulta = `SELECT
    (SELECT json_agg(DISTINCT autor) FROM publicaciones) AS autor,
    (SELECT json_agg(DISTINCT idioma) FROM publicaciones) AS idioma,
    (SELECT MIN(precio) FROM publicaciones) AS precio_min,
    (SELECT MAX(precio) FROM publicaciones) AS precio_max,
    (SELECT json_agg(genero) FROM generos) AS genero
    `;
    const { rows } = await pool.query(consulta);
    return rows[0];
}

const buscarConversacion = async (usuario1, usuario2) => {
    const query = 
    `SELECT * FROM conversaciones 
    WHERE (usuario_1_id = $1 AND usuario_2_id = $2)
    OR (usuario_1_id = $2 AND usuario_2_id = $1)`;
    const result = await pool.query(query, [usuario1, usuario2]);
    return result.rows
};

const crearConversacion = async (usuario1, usuario2) => {
    const query = `
    INSERT INTO conversaciones (usuario_1_id, usuario_2_id)
    VALUES ($1, $2) RETURNING *`;
    const result = await pool.query(query, [usuario1, usuario2]);
    return result.rows[0];
};

const crearMensaje = async({ conversacion_id, remitente_id, contenido }) => {
    const query = `
    INSERT INTO mensajes (conversacion_id, remitente_id, contenido)
    VALUES ($1, $2, $3)
    RETURNING *`;
    const values = [conversacion_id, remitente_id, contenido];
    const { rows } = await pool.query(query, values);
    return rows[0];
};

const obtenerMensajesConversacion = async (conversacion_id) => {
    const query = `
    SELECT * FROM mensajes WHERE conversacion_id = $1 ORDER BY timestamp ASC`;

    const { rows } = await pool.query(query, [conversacion_id]);
    return rows; 
}


module.exports = { 
    obtenerLibros, 
    registrarUsuario, 
    inicioSesion, 
    mostrarUsuariosPorId, 
    modificarUsuario, 
    publicarLibro,
    filtrarGenero,
    librosPorUsuario,
    seleccionarFiltro,
    filtrarLibros,
    obtenerLibro,
    modificarPublicacion,
    buscarConversacion,
    crearConversacion,
    crearMensaje,
    obtenerMensajesConversacion
 }