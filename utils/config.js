const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // за 15 минут
  max: 100, // можно совершить максимум 100 запросов с одного IP
});

const {
  NODE_ENV,
  PORT = 3000,
  SALT_ROUND = 10,
  JWT_SECRET = 'some-secret-key',
  ALLOWED_CORS,
  MONGO_URL = 'mongodb://localhost:27017/moviesdb',
} = process.env;

const urlRegex = /^https?:\/\/(w{3}\.)?[0-9a-z.-]{1,256}(\/([0-9a-z\-._~:/?#[\]@!$&'()*+,;=])*)?$/i;

const allowedCors = NODE_ENV !== 'production'
  ? [
    'http://localhost:3000',
    'https://localhost:3000',
    'http://localhost:3001',
    'https://localhost:3001',
  ]
  : ALLOWED_CORS.split(', ');

module.exports = {
  limiter,
  PORT,
  SALT_ROUND: Number(SALT_ROUND),
  JWT_SECRET,
  urlRegex,
  allowedCors,
  MONGO_URL,
};
