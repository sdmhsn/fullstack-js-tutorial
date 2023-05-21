const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const tagSchema = Schema({
  name: {
    type: String,
    minLength: [3, 'Name must has at least 3 characters'],
    maxLength: [20, 'Name must has at most 20 characters'],
    required: [true, 'Name tag is required!'],
  },
});

module.exports = model('Tag', tagSchema);
