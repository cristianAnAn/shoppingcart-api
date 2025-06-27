// services/productService.js
const axios = require('axios');
const ProductDto = require('../models/dto/productDto');

const PRODUCT_API = process.env.PRODUCT_API;

async function getProductos(token) {
  try {
    const response = await axios.get(`${PRODUCT_API}/api/Product`, {
      headers: {
        Authorization: token // 'Bearer eyJ...'
      }
    });

    const data = response.data;

    if (data && data.isSuccess && Array.isArray(data.result)) {
      return data.result.map(product => new ProductDto(product)); // ✅ Instanciar cada DTO
    } else {
      return [];
    }
  } catch (error) {
    console.error('❌ Error al obtener productos:', error.message);
    return [];
  }
}

module.exports = {
  getProductos
};
