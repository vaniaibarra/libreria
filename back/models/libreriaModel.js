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
    const values = [correo]
    const consulta = "SELECT * FROM usuarios WHERE correo = $1"
    const { rows, rowCount } = await pool.query(consulta, values)

    if(!rowCount) throw { code: 404, message: "Email no registrado"}

    const {id, correo: correoUsuario, contraseña: contraseñaEncriptada } = rows[0]
    const contraseñaAprobada = bcrypt.compareSync(contraseña, contraseñaEncriptada)

    if(!contraseñaAprobada) throw { code: 401, message: "Contraseña incorrecta" }

    return { id, correo: correoUsuario }
}

const mostrarUsuariosPorId = async (id) => {
    const consulta = "SELECT * FROM usuarios WHERE id = $1"
    const values = [id]
    const { rows } = await pool.query(consulta, values)
    return rows[0]
}

module.exports = { obtenerLibros, registrarUsuario, inicioSesion, mostrarUsuariosPorId }