const jwt = require('jsonwebtoken');
require('dotenv').config();
const AuthError = require('../errors/AuthError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.auth = (req, res, next) => {
  const userToken = req.cookies.jwt;

  if (!userToken) return next(new AuthError('Необходима авторизация.'));

  return jwt.verify(userToken, NODE_ENV === 'production' ? JWT_SECRET : process.env.SECRET_KEY, (err, payload) => {
    if (err) return next(new AuthError('Необходима авторизация.'));
    req.user = payload;
    return next();
  });
};
