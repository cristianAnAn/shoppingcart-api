// utils/responseDto.js

class ResponseDto {
  constructor(result = null, isSuccess = true, message = '') {
    this.result = result;
    this.isSuccess = isSuccess;
    this.message = message;
  }
}

module.exports = ResponseDto;
