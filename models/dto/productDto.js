// models/dto/productDto.js

class ProductDto {
  constructor({
    productId = 0,
    name = '',
    price = 0,
    description = '',
    categoryName = '',
    imageUrl = ''
  } = {}) {
    this.productId = productId;
    this.name = name;
    this.price = price;
    this.description = description;
    this.categoryName = categoryName;
    this.imageUrl = imageUrl;
  }
}

module.exports = ProductDto;
