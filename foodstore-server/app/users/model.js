const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const bcrypt = require('bcrypt');
const HASH_ROUND = 10;

const AutoIncrement = require('mongoose-sequence')(mongoose);

let userSchema = Schema(
  {
    full_name: {
      type: String,
      minLength: [3, 'Name must has at least 3 characters'],
      maxLength: [255, 'Name must has at most 255 characters'],
      required: [true, 'Name is required!'],
    },
    // customer_id: {
    //   type: Number,
    // },
    email: {
      type: String,
      maxLength: [255, 'Email must has at most 255 characters'],
      required: [true, 'Email is required!'],
    },
    password: {
      type: String,
      maxLength: [255, 'Password must has at most 255 characters'],
      required: [true, 'Password is required!'],
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    token: [String],
  },
  { timestamps: true }
);

userSchema.pre('save', function (next) {
  this.password = bcrypt.hashSync(this.password, HASH_ROUND);
  next();
});

userSchema.path('email').validate(
  function (value) {
    const EMAIL_RE = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return EMAIL_RE.test(value);
  },
  (attr) => `${attr.value} must has valid email!`
);

userSchema.path('email').validate(
  async function (value) {
    try {
      const count = await this.model('User').count({ email: value });
      return !count;
    } catch (error) {
      throw error;
    }
  },
  (attr) => `${attr.value} registered!`
);

userSchema.plugin(AutoIncrement, { inc_field: 'customer_id' });

module.exports = model('User', userSchema);
