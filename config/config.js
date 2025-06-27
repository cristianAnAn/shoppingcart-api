// config/config.js
require('dotenv').config();

module.exports = {
  development: {
    dialect: 'mssql',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: 1433,
    dialectOptions: {
      options: {
        encrypt: false, // pon true si usas SSL
        trustServerCertificate: true
      }
    }
  },
  production: {
    // Puedes copiar y ajustar esto para entorno productivo si lo necesitas
  }
};
