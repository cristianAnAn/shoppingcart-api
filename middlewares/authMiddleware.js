// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ isSuccess: false, message: 'Token no proporcionado' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      issuer: process.env.JWT_ISSUER,
      audience: process.env.JWT_AUDIENCE
    });

    req.user = decoded; // Guardamos el payload en la request
    next();
  } catch (err) {
    return res.status(403).json({ isSuccess: false, message: 'Token inválido o expirado' });
  }
}

module.exports = verifyToken;
