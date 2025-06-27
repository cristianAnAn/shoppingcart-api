// models/dto/cartDetailsDto.js
const CartHeaderDto = require('./cartHeaderDto');
const ProductDto = require('./productDto');

class CartDetailsDto {
  constructor({
    cartDetailsId = 0,
    cartHeaderId = 0,
    cartHeader = null,
    productId = 0,
    productDto = null,
    count = 0
  } = {}) {
    this.cartDetailsId = cartDetailsId;
    this.cartHeaderId = cartHeaderId;

    // Si viene un objeto, lo convertimos a instancia
    this.cartHeader = cartHeader instanceof CartHeaderDto
      ? cartHeader
      : cartHeader ? new CartHeaderDto(cartHeader) : null;

    this.productId = productId;
    this.productDto = productDto instanceof ProductDto
      ? productDto
      : productDto ? new ProductDto(productDto) : null;

    this.count = count;
  }
}

module.exports = CartDetailsDto;
