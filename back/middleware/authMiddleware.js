const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET || 'clave_secreta';

const validarToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ mensaje: 'Token no proporcionado' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.usuario = decoded; 
        next();
    } catch (error) {
        console.error('Error al verificar token:', error);
        return res.status(403).json({ mensaje: 'Token inválido o expirado' });
    }
};

module.exports = validarToken;
