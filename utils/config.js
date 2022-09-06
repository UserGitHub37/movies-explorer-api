const {
  NODE_ENV,
  SALT_ROUND = 10,
  JWT_SECRET = 'some-secret-key',
  ALLOWED_CORS,
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
  SALT_ROUND: Number(SALT_ROUND),
  JWT_SECRET,
  urlRegex,
  allowedCors,
};
