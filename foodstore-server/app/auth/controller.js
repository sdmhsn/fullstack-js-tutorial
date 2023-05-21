const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../users/model');
const config = require('../config');
const { getToken } = require('../utils/get-token');

const register = async (req, res, next) => {
  try {
    const payload = req.body;

    let user = new User(payload);
    await user.save();
    return res.json(user);
  } catch (error) {
    if (error && error.name === 'ValidationError') {
      return res.json({
        error: 1,
        message: error.message,
        fields: error.errors,
      });
    }

    next(error);
  }
};

const localStrategy = async (email, password, done) => {
  try {
    let user = await User.findOne({ email }).select(
      '-__v -createdAt -updatedAt -cart_items -token'
    );

    if (!user) return done();

    if (bcrypt.compareSync(password, user.password)) {
      ({ password, ...userWithoutPassword } = user.toJSON());

      return done(null, userWithoutPassword);
    }
  } catch (error) {
    done(error, null);
  }

  done();
};

const login = async (req, res, next) => {
  passport.authenticate('local', async (error, user) => {
    if (error) return next(error);

    if (!user)
      return res.json({ error: 1, message: 'Email or password incorrect' });

    let signed = jwt.sign(user, config.secretKey);

    await User.findOneAndUpdate(
      { _id: user._id },
      { $push: { token: signed } },
      { new: true }
    );

    return res.json({
      message: 'Logged in successfully',
      user: user,
      token: signed,
    });
  })(req, res, next);
};

const me = (req, res, next) => {
  // console.log(req.user);

  if (!req.user) {
    return res.json({
      error: 1,
      message: "Your're not login or token expired",
    });
  }

  return res.json(req.user);
};

const logout = async (req, res, next) => {
  let token = getToken(req);

  let user = await User.findOneAndUpdate(
    { token: { $in: [token] } },
    { $pull: { token } },
    { useFindAndModify: false }
  );

  if (!user || !token) {
    return res.json({
      error: 1,
      message: 'No user found',
    });
  }

  // --- logout berhasil ---//
  return res.json({
    error: 0,
    message: 'Loged out successfully',
  });
};

module.exports = { register, localStrategy, login, me, logout };
