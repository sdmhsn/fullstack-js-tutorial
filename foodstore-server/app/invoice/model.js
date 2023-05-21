const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const invoiceSchema = Schema(
  {
    sub_total: {
      type: Number,
      required: [true, 'sub_total is required!'],
    },
    delivery_fee: {
      type: Number,
      required: [true, 'delivery_fee is required!'],
    },
    delivery_address: {
      province: { type: String, required: [true, 'province is required!'] },
      regency: { type: String, required: [true, 'regency is required!'] },
      district: { type: String, required: [true, 'district is required!'] },
      village: { type: String, required: [true, 'village is required!'] },
      detail: { type: String },
    },
    total: {
      type: Number,
      required: [true, 'total is required!'],
    },
    payment_status: {
      type: String,
      enum: ['waiting_payment', 'paid'],
      default: 'waiting_payment',
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    order: {
      type: Schema.Types.ObjectId,
      ref: 'Order',
    },
  },
  { timestamps: true }
);

module.exports = model('Invoice', invoiceSchema);
