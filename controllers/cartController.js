const { CartHeader, CartDetails } = require('../models');
const { getProductos } = require('../services/productService');
const { getCoupon } = require('../services/couponService');
const CartDto = require('../models/dto/cartDto');
const CartDetailsDto = require('../models/dto/cartDetailsDto');
const CartHeaderDto = require('../models/dto/cartHeaderDto');

module.exports = {
  async applyCoupon(req, res) {
    try {
      const userId = req.user.sub;
      const { CartHeader: header } = req.body;

      const cart = await CartHeader.findOne({ where: { UserId: userId } });
      if (!cart) return res.status(404).json({ isSuccess: false, message: 'Carrito no encontrado' });

      cart.CouponCode = header.CouponCode;
      await cart.save();

      res.json({ isSuccess: true, result: true });
    } catch (err) {
      res.json({ isSuccess: false, message: err.message });
    }
  },

  async removeCoupon(req, res) {
    try {
      const userId = req.user.sub;

      const cart = await CartHeader.findOne({ where: { UserId: userId } });
      if (!cart) return res.status(404).json({ isSuccess: false, message: 'Carrito no encontrado' });

      cart.CouponCode = '';
      await cart.save();

      res.json({ isSuccess: true, result: true });
    } catch (err) {
      res.json({ isSuccess: false, message: err.message });
    }
  },

  async getCart(req, res) {
    try {
      const userId = req.user.sub;
      const token = req.headers.authorization;

      const cartHeader = await CartHeader.findOne({ where: { UserId: userId } });
      if (!cartHeader) return res.status(404).json({ isSuccess: false, message: 'Carrito no encontrado' });

      const cartDetails = await CartDetails.findAll({ where: { CartHeaderId: cartHeader.CartHeaderId } });

      const productos = await getProductos(token);

      let cartTotal = 0;
      const cartDetailsDtos = cartDetails.map(detail => {
        const productDto = productos.find(p => p.productId === detail.ProductId);
        const totalItem = detail.Count * (productDto?.price || 0);
        cartTotal += totalItem;

        return new CartDetailsDto({
          cartDetailsId: detail.CartDetailsId,
          cartHeaderId: detail.CartHeaderId,
          productId: detail.ProductId,
          count: detail.Count,
          productDto: productDto
        });
      });

      let discount = 0;
      if (cartHeader.CouponCode) {
        const coupon = await getCoupon(cartHeader.CouponCode, token);
        if (coupon && cartTotal > coupon.minAmount) {
          discount = coupon.discountAmount;
          cartTotal -= discount;
        }
      }

      const cartHeaderDto = new CartHeaderDto({
        cartHeaderId: cartHeader.CartHeaderId,
        userId: cartHeader.UserId,
        couponCode: cartHeader.CouponCode,
        discount,
        cartTotal,
        name: cartHeader.Name,
        phone: cartHeader.Phone,
        email: cartHeader.Email
      });

      const result = new CartDto({
        cartHeader: cartHeaderDto,
        cartDetailsDtos: cartDetailsDtos
      });

      res.json({ isSuccess: true, result });
    } catch (err) {
      res.json({ isSuccess: false, message: err.message });
    }
  },

  async cartUpsert(req, res) {
    try {
      const userId = req.user.sub;
      const { CartHeader: header, CartDetailsDtos } = req.body;
      const item = CartDetailsDtos[0];

      let cartHeader = await CartHeader.findOne({ where: { UserId: userId } });

      if (!cartHeader) {
        const newHeader = { ...header, UserId: userId };
        cartHeader = await CartHeader.create(newHeader);
        item.CartHeaderId = cartHeader.CartHeaderId;
        await CartDetails.create(item);
      } else {
        const existing = await CartDetails.findOne({
          where: { ProductId: item.ProductId, CartHeaderId: cartHeader.CartHeaderId }
        });

        if (!existing) {
          item.CartHeaderId = cartHeader.CartHeaderId;
          await CartDetails.create(item);
        } else {
          item.Count += existing.Count;
          item.CartHeaderId = existing.CartHeaderId;
          item.CartDetailsId = existing.CartDetailsId;
          await CartDetails.update(item, { where: { CartDetailsId: existing.CartDetailsId } });
        }
      }

      res.json({ isSuccess: true, result: req.body });
    } catch (err) {
      res.json({ isSuccess: false, message: err.message });
    }
  },

  async removeCart(req, res) {
    try {
      const { cartDetailsId } = req.body;

      const detail = await CartDetails.findOne({ where: { CartDetailsId: cartDetailsId } });
      if (!detail) return res.status(404).json({ isSuccess: false, message: 'Item no encontrado' });

      const count = await CartDetails.count({ where: { CartHeaderId: detail.CartHeaderId } });
      await detail.destroy();

      if (count === 1) {
        await CartHeader.destroy({ where: { CartHeaderId: detail.CartHeaderId } });
      }

      res.json({ isSuccess: true, result: true });
    } catch (err) {
      res.json({ isSuccess: false, message: err.message });
    }
  }
};
