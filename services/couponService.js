// services/couponService.js
const axios = require('axios');
const CouponDto = require('../models/dto/couponDto');

const COUPON_API = process.env.COUPON_API;

async function getCoupon(couponCode, token) {
  try {
    const response = await axios.get(`${COUPON_API}/Api/Cupon/GetByCode/${couponCode}`, {
      headers: {
        Authorization: token // 'Bearer eyJ...'
      }
    });

    const data = response.data;

    if (data && data.isSuccess && data.result) {
      return new CouponDto(data.result); // ✅ Aquí usas el DTO
    } else {
      return null;
    }
  } catch (error) {
    console.error('❌ Error al obtener cupón:', error.message);
    return null;
  }
}

module.exports = {
  getCoupon
};
