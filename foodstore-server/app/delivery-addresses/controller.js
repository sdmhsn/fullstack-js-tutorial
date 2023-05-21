const DeliveryAddress = require('./model');

const { policyFor } = require('../policies');

const { subject } = require('@casl/ability');

const store = async (req, res, next) => {
  const policy = policyFor(req.user);

  if (!policy.can('create', 'DeliveryAddress')) {
    return res.json({
      error: 1,
      message: "You're not allowed to perform this action",
    });
  }

  try {
    let payload = req.body;
    let user = req.user;

    let address = new DeliveryAddress({ ...payload, user: user._id });
    await address.save();
    return res.json(address);
  } catch (err) {
    if (err && err.name === 'ValidationError') {
      return res.json({
        error: 1,
        message: err.message,
        fields: err.errors,
      });
    }

    next(err);
  }
};

const update = async (req, res, next) => {
  const policy = policyFor(req.user);

  /*
  if (!policy.can('update', 'DeliveryAddress')) {
    return res.json({
      error: 1,
      message: "You're not allowed to modify this resource",
    });
  }

  try {
    let payload = req.body;
    console.log(payload);

    // const id = req.params.id;
    // atau
    let { id } = req.params;
    console.log(id);

    let user = req.user;

    let address = await DeliveryAddress.findOneAndUpdate(
      { _id: id },
      { ...payload, user: user._id },
      { new: true, runValidators: true }
    );

    return res.json(address);
  } catch (err) {
    if (err && err.name === 'ValidationError') {
      return res.json({
        error: 1,
        message: err.message,
        fields: err.errors,
      });
    }

    next(err);
  }
   */

  try {
    let { id } = req.params;
    let payload = req.body;
    console.log(req.user);

    // console.log(payload);

    let address = await DeliveryAddress.findOne({ _id: id });

    console.log(address);

    let subjectAddress = subject('DeliveryAddress', {
      ...address,
      user_id: address.user,
    }); // data address

    console.log(subjectAddress);

    if (!policy.can('update', subjectAddress)) {
      // menggunakan subject (subjectAddress) adalah membandingkan data address
      return res.json({
        error: 1,
        message: `You're not allowed to modify this resource`,
      });
    }

    address = await DeliveryAddress.findOneAndUpdate({ _id: id }, payload, {
      new: true,
    });

    return res.json(address);
  } catch (err) {
    if (err && err.name === 'ValidationError') {
      return res.json({
        error: 1,
        message: err.message,
        fields: err.errors,
      });
    }

    next(err);
  }
};

const destroy = async (req, res, next) => {
  const policy = policyFor(req.user);

  try {
    let { id } = req.params;

    let address = await DeliveryAddress.findOne({ _id: id });

    let subjectAddress = subject('DeliveryAddress', {
      ...address,
      user_id: address.user,
    });

    if (!policy.can('delete', subjectAddress)) {
      return res.json({
        error: 1,
        message: `You're not allowed to modify this resource`,
      });
    }

    address = await DeliveryAddress.findOneAndDelete({ _id: id });

    return res.json(address);
  } catch (err) {
    next(err);
  }
};

const index = async (req, res, next) => {
  const policy = policyFor(req.user);

  if (!policy.can('view', 'DeliveryAddress')) {
    return res.json({
      error: 1,
      message: `You're not allowed to perform this action`,
    });
  }

  try {
    let { limit = 10, skip = 0 } = req.query;

    const count = await DeliveryAddress.find({
      user: req.user._id,
    }).countDocuments();

    const deliveryAddresses = await DeliveryAddress.find({ user: req.user._id })
      .limit(parseInt(limit))
      .skip(parseInt(skip))
      .sort('-createdAt');

    return res.json({ count, data: deliveryAddresses });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  store,
  update,
  destroy,
  index,
};
