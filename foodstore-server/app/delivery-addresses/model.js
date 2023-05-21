const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const deliveryAddressSchema = Schema(
  {
    name: {
      type: String,
      maxLength: [255, 'Address name must has at most 255 characters'],
      required: [true, 'Address name field is required!'],
    },
    village: {
      type: String,
      maxLength: [255, 'Village must has at most 255 characters'],
      required: [true, 'Village field is required!'],
    },
    district: {
      type: String,
      maxLength: [255, 'District must has at most 255 characters'],
      required: [true, 'District field is required!'],
    },
    regency: {
      type: String,
      maxLength: [255, 'Regency must has at most 255 characters'],
      required: [true, 'Regency field is required!'],
    },
    province: {
      type: String,
      maxLength: [255, 'Province must has at most 255 characters'],
      required: [true, 'Province field is required!'],
    },
    detail: {
      type: String,
      required: [true, 'Detail address is required!'],
      maxlength: [1000, 'Detail address must has at most 1000 characters'],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

module.exports = model('DeliveryAddress', deliveryAddressSchema);
