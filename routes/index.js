const router = require('express').Router();

const NotFoundError = require('../errors/not-found-err');
const { login } = require('../controllers/login');
const { createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { loginValidation, createUserValidation } = require('../middlewares/requestValidator');

const { STATUS_CODE_OK } = require('../utils/statusCodes');

router.post('/signin', loginValidation, login);

router.post('/signup', createUserValidation, createUser);

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
