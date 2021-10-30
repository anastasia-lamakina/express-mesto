const { celebrate, Joi } = require('celebrate');
const express = require('express');
const {
  getUsers,
  getUserById,
  updateUser,
  updateUserAvatar,
  getLoggedUser,
} = require('../controllers/users');
const validateURL = require('../utils/validateURL');

const router = express.Router();

router.get('/', getUsers);

router.get('/me', getLoggedUser);

router.get(
  '/:userId',
  celebrate({
    params: {
      userId: Joi.string().length(24).hex(),
    },
  }),
  getUserById,
);

router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
  }),
  updateUser,
);

router.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required().custom(validateURL),
    }),
  }),
  updateUserAvatar,
);

module.exports = router;
