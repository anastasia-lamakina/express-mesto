const { celebrate, Joi } = require('celebrate');
const express = require('express');
const mongoose = require('mongoose');
const users = require('./routes/users');
const cards = require('./routes/cards');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');

const port = 3000;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', auth, users);
app.use('/cards', auth, cards);

app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
      avatar: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required().min(8),
    }),
  }),
  createUser,
);
app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required(),
      password: Joi.string().required().min(8),
    }),
  }),
  login,
);

app.use((err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ message: err.message });
  } else if (err.message === 'Validation failed') {
    res.status(400).send({ message: 'Переданы неверные данные.' });
  } else {
    res.status(500).send({ message: 'На сервере произошла ошибка.' });
  }
});

app.use((req, res) => {
  res.status(404).send({ message: 'Страница не найдена' });
});

app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
