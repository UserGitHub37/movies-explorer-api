const { STATUS_CODE_INTERNAL_SERVER_ERROR } = require('../utils/statusCodes');

module.exports.errorHandler = (err, req, res, next) => {
  const { statusCode = STATUS_CODE_INTERNAL_SERVER_ERROR, message } = err;

  console.log('err.name: ', err.name);
  console.log('err.code: ', err.code);
  console.log('err.message: ', err.message);
  console.log('statusCode', statusCode);
  res
    .status(statusCode)
    .send({
      message: statusCode === STATUS_CODE_INTERNAL_SERVER_ERROR
        ? 'На сервере произошла ошибка'
        : message,
    });

  next();
};
