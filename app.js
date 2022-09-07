require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const { celebrate, Joi, errors } = require('celebrate');

const { PORT, MONGO_URL } = require('./utils/config');
const NotFoundError = require('./errors/not-found-err');
const { STATUS_CODE_OK, STATUS_CODE_INTERNAL_SERVER_ERROR } = require('./utils/statusCodes');
const { login } = require('./controllers/login');
const { createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');

const app = express();

mongoose.connect(MONGO_URL);

app.use(express.json());

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

app.get('/auth', auth, (req, res, next) => {
  try {
    res.sendStatus(STATUS_CODE_OK);
  } catch (err) {
    next(err);
  }
});

app.use(auth);

app.use('/users', require('./routes/users'));

app.use('/movies', require('./routes/movies'));

app.use('*', (req, res, next) => next(new NotFoundError('404 Not Found')));

app.use(errors());

app.use((err, req, res, next) => {
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
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${PORT}`);
});
