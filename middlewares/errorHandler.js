const { STATUS_CODE_INTERNAL_SERVER_ERROR } = require('../utils/statusCodes');

module.exports.errorHandler = (err, req, res, next) => {
  const { statusCode = STATUS_CODE_INTERNAL_SERVER_ERROR, message } = err;

  console.log('ОШИБКА: ', err.name, err.message);

  res
    .status(statusCode)
    .send({
      message: statusCode === STATUS_CODE_INTERNAL_SERVER_ERROR
        ? 'На сервере произошла ошибка'
        : message,
    });

  next();
};