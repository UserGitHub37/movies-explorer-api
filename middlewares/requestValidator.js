const { celebrate, Joi } = require('celebrate');
const { isURL } = require('validator');
const { emailRegExp, nameRegExp } = require('../utils/config');

const checkLink = (value, helpers) => {
  if (isURL(value)) {
    return value;
  }
  return helpers.message('Невалидная ссылка');
};

const checkName = (value, helpers) => {
  if (nameRegExp.test(value) && value.length >= 2 && value.length <= 30) {
    return value;
  }
  return helpers.message('Невалидное имя пользователя');
};

const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().regex(emailRegExp),
    password: Joi.string().required(),
  }),
});

const createUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().custom(checkName),
    email: Joi.string().required().regex(emailRegExp),
    password: Joi.string().required(),
  }),
});

const updateUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().custom(checkName),
    email: Joi.string().required().regex(emailRegExp),
  }),
});

const createMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(checkLink),
    trailerLink: Joi.string().required().custom(checkLink),
    thumbnail: Joi.string().required().custom(checkLink),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    movieId: Joi.number().required(),
  }),
});

const deleteMovieValidation = celebrate({
  params: Joi.object().keys({
    movieId: Joi.number().required(),
  }),
});

module.exports = {
  loginValidation,
  createUserValidation,
  updateUserValidation,
  createMovieValidation,
  deleteMovieValidation,
};
