const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const NotFoundError = require('./errors/not-found-err');

const app = express();

mongoose.connect('mongodb://localhost:27017/moviesdb');

app.use('/users', require('./routes/users'));

app.use('/movies', require('./routes/movies'));

app.use('*', (req, res, next) => next(new NotFoundError('404 Not Found')));

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${PORT}`);
});
