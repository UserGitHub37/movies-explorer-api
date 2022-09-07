const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const NotFoundError = require('../errors/not-found-err');
const { STATUS_CODE_OK } = require('../utils/statusCodes');
const { login } = require('../controllers/login');
const { createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

router.get('/auth', auth, (req, res, next) => {
  try {
    res.sendStatus(STATUS_CODE_OK);
  } catch (err) {
    next(err);
  }
});

router.use(auth);

router.use('/users', require('./users'));

router.use('/movies', require('./movies'));

router.use('*', (req, res, next) => next(new NotFoundError('404 Not Found')));

module.exports = router;
