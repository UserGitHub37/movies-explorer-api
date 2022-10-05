require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');

const {
  PORT,
  MONGO_URL,
  limiter,
  corsOptions,
} = require('./utils/config');

const { errorHandler } = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const router = require('./routes');

const app = express();

app.use(requestLogger);

app.use(limiter);

app.use(helmet());

mongoose.connect(MONGO_URL);

app.use(express.json());

app.use(cors(corsOptions));

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
