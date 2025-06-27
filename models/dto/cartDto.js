// models/dto/cartDto.js
const CartHeaderDto = require('./cartHeaderDto');
const CartDetailsDto = require('./cartDetailsDto');

class CartDto {
  constructor({
    cartHeader = {},
    cartDetailsDtos = []
  } = {}) {
    // Siempre se convierte en instancia de CartHeaderDto
    this.cartHeader = new CartHeaderDto(cartHeader);

    // Se asegura que cada elemento sea instancia de CartDetailsDto
    this.cartDetailsDtos = cartDetailsDtos.map(detail => new CartDetailsDto(detail));
  }
}

module.exports = CartDto;
