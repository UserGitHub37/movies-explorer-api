const bcrypt = require('bcryptjs');
const escape = require('escape-html');

const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const BadRequest = require('../errors/bad-request-err');
const Conflict = require('../errors/conflict-err');

const { SALT_ROUND } = require('../utils/config');

const { STATUS_CODE_CREATED } = require('../utils/statusCodes');

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      res.send(user);
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, SALT_ROUND)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => {
      const userData = user.toObject();
      delete userData.password;
      return res.status(STATUS_CODE_CREATED).send(userData);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные при создании пользователя'));
      } else if (err.code === 11000) {
        next(new Conflict('Пользователь с таким email уже существует'));
      } else {
        next(err);
      }
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    {
      name: name ? escape(name) : undefined,
      email: email ? escape(email) : undefined,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail()
    .then((userData) => res.send(userData))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError('Пользователь с указанным _id не найден'));
      } else if (err.name === 'CastError') {
        next(new BadRequest('Передан некорректный _id пользователя'));
      } else if (err.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные при обновлении профиля'));
      } else if (err.code === 11000) {
        next(new Conflict('Пользователь с таким email уже существует'));
      } else {
        next(err);
      }
    });
};
