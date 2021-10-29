const { celebrate, Joi } = require('celebrate');
const express = require('express');
const {
  createCard,
  getCards,
  deleteCardById,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const validateURL = require('../utils/validateURL');

const router = express.Router();

router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().custom(validateURL),
    }),
  }),
  createCard,
);

router.get('/', getCards);

router.delete(
  '/:cardId',
  celebrate({
    params: {
      cardId: Joi.string().length(24).hex(),
    },
  }),
  deleteCardById,
);

router.put(
  '/:cardId/likes',
  celebrate({
    params: {
      cardId: Joi.string().length(24).hex(),
    },
  }),
  likeCard,
);

router.delete(
  '/:cardId/likes',
  celebrate({
    params: {
      cardId: Joi.string().length(24).hex(),
    },
  }),
  dislikeCard,
);

module.exports = router;
