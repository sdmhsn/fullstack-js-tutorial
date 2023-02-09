const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

// version 6:
main();

async function main() {
  try {
    await mongoose.connect(
      'mongodb://user_latihan:123456@localhost:27017/latihan?authSource=admin'
    );

    // define a scheme
    const userSchema = new mongoose.Schema(
      // Built-in Validators source: https://mongoosejs.com/docs/validation.html#custom-validators
      {
        username: {
          type: String,
        },
        email: {
          type: String,
          validate: {
            validator: function (v) {
              return /^\S+@\S+$/.test(v);
            },
            message: (props) => `${props.value} is not a valid email!`,
          },
        },
        password: String,
      }
    );

    // create a model
    const User = mongoose.model('User', userSchema);

    try {
      // create a document using query
      const newUser = await User.create({
        username: 'john',
        email: 'john.gmail.com', // invalid email. should use @
        password: '123456',
      });
      console.log(newUser);
    } catch (error) {
      console.log(error.message);
    }
  } catch (error) {
    console.log(error.message); // e.g. error: wrong authentication
  }
}
