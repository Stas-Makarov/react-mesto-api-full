const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const EmaiUniquelError = require('../errors/EmailUniqueError');
const ValidationError = require('../errors/ValidationError');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch(next);
};

module.exports.getUsersById = (req, res, next) => {
  User.findById(req.params.userid)
    .then((user) => {
      if (user === null) {
        throw new NotFoundError('Нет пользователя с таким id');
      }
      res.status(200).send({ data: user });
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new EmaiUniquelError('Этот Email уже используется');
      }
      bcrypt.hash(password, 10)
        .then((hash) => User.create({
          name, about, avatar, email, password: hash,
        }))
        .then((newUser) => {
          res.status(201).send({
            name: newUser.name,
            about: newUser.about,
            avatar: newUser.avatar,
            email: newUser.email,
            _id: newUser._id,
          });
        })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            next(new ValidationError('Переданы некорректные данные при создании пользователя.'));
            return;
          }
          next(err);
        });
    })
    .catch(next);
};

module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { runValidators: true, new: true, upsert: true },
  )
    .then((user) => {
      if (user === null) {
        throw new NotFoundError('Нет пользователя с таким id');
      }
      res.status(200).send({ data: user });
    })
    .catch(next);
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { runValidators: true, new: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному _id не найден');
      }
      res.status(200).send({ data: user });
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      });
      res.send({ token });
    })
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch(next);
};
