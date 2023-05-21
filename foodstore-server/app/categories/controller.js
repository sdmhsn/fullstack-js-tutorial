const Category = require('./model');
const { policyFor } = require('../policies');

const store = async (req, res, next) => {
  if (req.method === 'POST') {
    try {
      let policy = policyFor(req.user);

      if (!policy.can('create', 'Category')) {
        return res.json({
          error: 1,
          message: "You're not allowed to perform this action",
        });
      }

      const payload = req.body;

      const category = new Category(payload);
      await category.save();

      return res.json(category);
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
  }

  if (req.method === 'GET') {
    try {
      const category = await Category.find();

      if (category.length > 0) {
        return res.json(category);
      }
    } catch (error) {
      next(error);
    }
  }

  if (req.method === 'PUT') {
    try {
      let policy = policyFor(req.user);
      if (!policy.can('update', 'Category')) {
        return res.json({
          error: 1,
          message: "You're not allowed to modify this resource",
        });
      }

      const payload = req.body;
      const id = req.params.id;

      const category = await Category.findOneAndUpdate({ _id: id }, payload, {
        new: true,
        runValidators: true,
      });

      return res.json(category);
    } catch (error) {
      if (error && error.name === 'ValidationError') {
        return res.json({
          error: 1,
          message: error.message,
          fields: error.errors,
        });
      }
    }
  }

  if (req.method === 'DELETE') {
    try {
      let policy = policyFor(req.user);
      if (!policy.can('delete', 'Category')) {
        return res.json({
          error: 1,
          message: `You're not allowed to perform this action`,
        });
      }
      const id = req.params.id;

      const category = await Category.findOneAndDelete({
        _id: id,
      });

      return res.json(category);
    } catch (error) {
      next(error);
    }
  }
};

module.exports = { store };
