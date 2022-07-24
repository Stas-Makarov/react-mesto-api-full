const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers, getUsersById, updateProfile, updateAvatar, getCurrentUser,
} = require('../controllers/user');
const regex = require('../utils/constans');

usersRouter.get('/', getUsers);
usersRouter.get('/me', getCurrentUser);
usersRouter.get('/:userid', celebrate({
  params: Joi.object().keys({
    userid: Joi.string().required().hex().length(24),
  }),
}), getUsersById);
usersRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateProfile);
usersRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(regex),
  }),
}), updateAvatar);

module.exports = usersRouter;
