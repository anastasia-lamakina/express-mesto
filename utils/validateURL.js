const { isURL } = require('validator');

const validateURL = (value) => {
  if (isURL(value, { require_protocol: true })) {
    return value;
  }
  throw new Error('Неправильный формат ссылки');
};

module.exports = validateURL;
