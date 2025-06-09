const { pool } = require('../db/database');
const format = require('pg-format');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const obtenerLibros = async ({limit = 40, page = 1, order_by = "id_ASC"}) => {
    const [ campo, direccion ] = order_by.split("_");
    const offSet = Math.abs((page - 1) * limit);

    try {
        const formattedQuery = format("SELECT * FROM publicaciones ORDER BY %s %s LIMIT %s OFFSET %s", campo, direccion, limit, offSet);

        const { rows:  publicaciones } = await pool.query(formattedQuery)
        return publicaciones;
    } catch (error) {
        console.log('Error al consultar la base de datos', error.message)
        throw error;
    }}


const registrarUsuario = async ({correo, nombre, apellido, username, contraseña, region, ciudad}) => {
    const saltRounds = 10
    const contraseñaEncriptada = bcrypt.hashSync(contraseña, saltRounds)
    const values = [ correo, nombre, apellido, username, contraseñaEncriptada, region, ciudad]
    const consulta = "INSERT INTO usuarios (correo, nombre, apellido, username, contraseña, region, ciudad) VALUES ($1, $2, $3, $4, $5, $6, $7)"

    await pool.query(consulta, values)
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
    const consulta = "SELECT * FROM usuarios WHERE id = $1"
    const values = [id]
    const { rows } = await pool.query(consulta, values)
    return rows[0]
}

module.exports = { obtenerLibros, registrarUsuario, inicioSesion, mostrarUsuariosPorId }