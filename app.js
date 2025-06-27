// app.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rutas principales
app.get('/', (req, res) => {
  res.send('ShoppingCart API running...');
});

// Aquí se cargarán los routers del carrito, productos y cupones
const cartRoutes = require('./routes/cartRoutes');
app.use('/api/cart', cartRoutes);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
