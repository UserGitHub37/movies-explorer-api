const rateLimit = require('express-rate-limit');

const LIMITER_INTERVAL = 1 * 60 * 1000; // за 1 минуту
const LIMITER_MAX_REQUESTS = 100; // можно совершить максимум 100 запросов с одного IP

const limiter = rateLimit({
  windowMs: LIMITER_INTERVAL,
  max: LIMITER_MAX_REQUESTS,
});

const {
  NODE_ENV,
  PORT = 3000,
  SALT_ROUND = 10,
  JWT_SECRET = 'some-secret-key',
  ALLOWED_CORS,
  MONGO_URL = 'mongodb://localhost:27017/moviesdb',
} = process.env;

const allowedCors = NODE_ENV !== 'production'
  ? [
    'http://localhost:3000',
    'https://localhost:3000',
    'http://localhost:3001',
    'https://localhost:3001',
  ]
  : ALLOWED_CORS.split(', ');

const corsOptions = { origin: allowedCors };

module.exports = {
  limiter,
  PORT,
  SALT_ROUND: Number(SALT_ROUND),
  JWT_SECRET,
  MONGO_URL,
  corsOptions,
};
