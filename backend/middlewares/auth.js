const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');

module.exports.auth = (req, res, next) => {
  const userToken = req.cookies.jwt;
  if (!userToken) {
    next(new AuthError('Необходима авторизация'));
    return;
  }
  let payload;
  try {
    payload = jwt.verify(userToken, process.env.SECRET_KEY);
  } catch (err) {
    next(new AuthError('Необходима авторизация'));
    return;
  }
  req.user = payload;
  next();
};
