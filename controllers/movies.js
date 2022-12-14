const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-err');
const BadRequest = require('../errors/bad-request-err');
const Forbidden = require('../errors/forbidden-err');

const { STATUS_CODE_CREATED } = require('../utils/statusCodes');

module.exports.getMovies = (req, res, next) => {
  const { _id } = req.user;
  Movie.find({ owner: _id })
    .then((movies) => {
      const userMovies = movies.filter((card) => req.user._id === card.owner.toString());
      return res.send(userMovies);
    })
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    nameRU,
    nameEN,
    movieId,
  } = req.body;

  const { _id } = req.user;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    nameRU,
    nameEN,
    movieId,
    owner: _id,
  })
    .then((movie) => res.status(STATUS_CODE_CREATED).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные при создании фильма'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const { _id } = req.user;
  Movie.findOne({ movieId: req.params.movieId, owner: _id })
    .orFail()
    .then((movie) => {
      if (req.user._id !== movie.owner._id.toString()) {
        return next(new Forbidden('Отсутствуют права на удаление фильма'));
      }

      return movie.remove()
        .then(() => res.send({
          message: 'Фильм удалён',
        }));
    })
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError('Фильм с указанным id не найден'));
      } else if (err.name === 'CastError') {
        next(new BadRequest('Передан некорректный id фильма'));
      } else {
        next(err);
      }
    });
};
