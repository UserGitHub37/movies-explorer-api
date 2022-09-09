const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const checkLink = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.message('Невалидная ссылка');
};

const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const createUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const updateUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
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
    movieId: Joi.string().length(24).hex(),
  }),
});

module.exports = {
  loginValidation,
  createUserValidation,
  updateUserValidation,
  createMovieValidation,
  deleteMovieValidation,
};
