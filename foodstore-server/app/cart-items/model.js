const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const cartItemSchema = Schema({
  name: {
    type: String,
    minLength: [5, 'Name must has at least 5 characters'],
    required: [true, 'Name field is required!'],
  },
  qty: {
    type: Number,
    required: [true, 'Qty field is required!'],
    min: [1, 'Minimal qty is 1'],
  },
  price: {
    type: Number,
    default: 0,
  },
  image_url: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
  },
});

module.exports = model('CartItem', cartItemSchema);
