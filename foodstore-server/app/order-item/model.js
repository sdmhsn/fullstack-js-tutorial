const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const orderItemSchema = Schema({
  name: {
    type: String,
    minLength: [5, 'Name must has at least 5 characters'],
    required: [true, 'Name field is required!'],
  },
  price: {
    type: Number,
    required: [true, 'Price field is required!'],
  },
  qty: {
    type: Number,
    required: [true, 'Qty field is required!'],
    min: [1, 'Minimal qty is 1'],
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
  },
  order: {
    type: Schema.Types.ObjectId,
    ref: 'Order',
  },
});

module.exports = model('OrderItem', orderItemSchema);
