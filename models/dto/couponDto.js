// models/dto/couponDto.js

class CouponDto {
  constructor({
    couponId = 0,
    couponCode = '',
    discountAmount = 0,
    minAmount = 0
  } = {}) {
    this.couponId = couponId;
    this.couponCode = couponCode;
    this.discountAmount = discountAmount;
    this.minAmount = minAmount;
  }
}

module.exports = CouponDto;
