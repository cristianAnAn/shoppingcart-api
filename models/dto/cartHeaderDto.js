// models/dto/cartHeaderDto.js

class CartHeaderDto {
  constructor({
    cartHeaderId = 0,
    userId = '',
    couponCode = '',
    discount = 0,
    cartTotal = 0,
    name = '',
    phone = '',
    email = ''
  } = {}) {
    this.cartHeaderId = cartHeaderId;
    this.userId = userId;
    this.couponCode = couponCode;
    this.discount = discount;
    this.cartTotal = cartTotal;
    this.name = name;
    this.phone = phone;
    this.email = email;
  }
}

module.exports = CartHeaderDto;
