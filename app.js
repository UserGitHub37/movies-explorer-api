require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

const { PORT, MONGO_URL } = require('./utils/config');
const { errorHandler } = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes');

const app = express();

mongoose.connect(MONGO_URL);

app.use(express.json());

app.use(requestLogger);

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
