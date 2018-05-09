const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateTaskInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';
  data.description = !isEmpty(data.description) ? data.description : '';
  data.dueDate = !isEmpty(data.dueDate) ? data.dueDate : '';

  if (!Validator.isLength(data.description, { min: 10, max: 300 })) {
    errors.text = 'Description must be between 10 and 300 characters';
  }

  if (Validator.isEmpty(data.title)) {
    errors.text = 'Title field is required';
  }

  if (Validator.isEmpty(data.dueDate)) {
    errors.dueDate = 'Due date field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
