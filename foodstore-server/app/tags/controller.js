const Tag = require('./model');
const { policyFor } = require('../policies');

const store = async (req, res, next) => {
  if (req.method === 'POST') {
    try {
      let policy = policyFor(req.user);

      if (!policy.can('create', 'Tag')) {
        return res.json({
          error: 1,
          message: "You're not allowed to perform this action",
        });
      }

      const payload = req.body;

      const tag = new Tag(payload);
      await tag.save();

      return res.status(201).json({
        status: 'Success',
        message: 'Add new tag Succeed',
        data: tag,
      });
    } catch (error) {
      if (error && error.name === 'ValidationError') {
        return res.status(400).json({
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
      const tag = await Tag.find();

      if (tag.length > 0) {
        return res.status(200).json({
          status: 'Success',
          data: tag,
        });
      } else {
        return res.status(404).json({
          status: 'Fail',
          message: 'Tag not found',
        });
      }
    } catch (error) {
      next(error);
    }
  }

  if (req.method === 'PUT') {
    try {
      let policy = policyFor(req.user);

      if (!policy.can('update', 'Tag')) {
        return res.json({
          error: 1,
          message: "You're not allowed to modify this resource",
        });
      }

      const payload = req.body;
      const id = req.params.id;

      const tag = await Tag.findOneAndUpdate({ _id: id }, payload, {
        new: true,
        runValidators: true,
      });

      return res.status(201).json(tag);
    } catch (error) {
      if (error && error.name === 'ValidationError') {
        return res.status(400).json({
          error: 1,
          message: error.message,
          fields: error.errors,
        });
      }

      next(error);
    }
  }

  if (req.method === 'DELETE') {
    try {
      let policy = policyFor(req.user);

      if (!policy.can('delete', 'Tag')) {
        return res.json({
          error: 1,
          message: "You're not allowed to perform this action",
        });
      }

      const id = req.params.id;

      const tag = await Tag.findOneAndDelete({ _id: id });

      return res.status(200).json(tag);
    } catch (error) {
      next(error);
    }
  }
};

module.exports = { store };
