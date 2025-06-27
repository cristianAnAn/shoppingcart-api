// testConnection.js
require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'mssql',
    port: 1433,
    dialectOptions: {
      options: {
        encrypt: false,
        trustServerCertificate: true
      }
    }
  }
);

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a SQL Server exitosa.');
  } catch (error) {
    console.error('❌ Error al conectar a la base de datos:', error);
  }
}

testConnection();
