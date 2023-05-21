const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const categorySchema = Schema({
  name: {
    type: String,
    minLength: [3, 'Name must has at least 3 characters'],
    maxLength: [255, 'Name must has at most 255 characters'],
    require: [true, 'Name category is required!'],
  },
});

module.exports = model('Category', categorySchema);
