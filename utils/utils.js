// successResponse.js
function successResponse(res, message = 'Success',data) {
    return res.status(200).json({
      success: true,
      message,
      data,
    });
  }
  function errorResponse(res, message = 'Error occurred',error = null) {
    return res.status(400).json({
      success: false,
      message,
      error,
    });
  }

  function  CreateToken (text)  {
    let token = text + Math.random().toString(36).substr(2, 20).slice(0, 8);

    return token
}

  module.exports = {successResponse,errorResponse,CreateToken};
  