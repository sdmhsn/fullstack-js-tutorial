const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const productSchema = Schema(
  {
    name: {
      type: String,
      minLength: [3, 'Name must has at least 3 characters'],
      maxLength: [255, 'Name must has at most 255 characters'],
      required: [true, 'Name field is required!'],
    },
    description: {
      type: String,
      maxLength: [1000, 'Description must has at most 1000 characters'],
    },
    price: {
      type: Number,
      default: 0,
    },
    image_url: String,

    // relation to category (one to one relationship)
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category', // relation to Category collection
    },

    // relation to tag (one to many relationship)
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Tag', // relation to Tag collection
      },
    ],
  },
  { timestamps: true } // createdAt and updateAt
);

module.exports = model('Product', productSchema);
