const express = require('express');
const mongoose = require('mongoose');
const users = require('./routes/users');
const cards = require('./routes/cards');

const port = 3000;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  req.user = {
    _id: '6161fa204bdd2bdd95ec1957',
  };

  next();
});
app.use('/users', users);
app.use('/cards', cards);

app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
