const path = require('path');
const fs = require('fs');

const Product = require('./model');
const Category = require('../categories/model');
const Tag = require('../tags/model');
const config = require('../config');
const { policyFor } = require('../policies');

const store = async (req, res, next) => {
  // let payload = req.body;
  // let product = new Product(payload);
  // await product.save();
  // return res.json(product);

  // try {
  //   let payload = req.body;

  //   if (req.file) {
  //     let tmp_path = req.file.path;
  //     let originalExt =
  //       req.file.originalname.split('.')[
  //         req.file.originalname.split('.').length - 1
  //       ];
  //     let filename = req.file.filename + '.' + originalExt;
  //     let target_path = path.resolve(
  //       config.rootPath,
  //       `public/upload/${filename}`
  //     );

  //     const src = fs.createReadStream(tmp_path);
  //     const dest = fs.createWriteStream(target_path);
  //     src.pipe(dest);

  //     src.on('end', async () => {
  //       try {
  //         let product = new Product({ ...payload, image_url: filename });
  //         await product.save();
  //         return res.json(product);
  //       } catch (err) {
  //         fs.unlinkSync(target_path);
  //         if (err && err.name === 'ValidationError') {
  //           return res.json({
  //             error: 1,
  //             message: err.message,
  //             fields: err.errors,
  //           });
  //         }
  //       }
  //     });

  //     src.on('error', async () => {
  //       next(err);
  //     });
  //   } else {
  //     let product = new Product(payload);
  //     await product.save();
  //     return res.json(product);
  //   }
  // } catch (err) {
  //   // ----- cek tipe error ---- //
  //   if (err && err.name === 'ValidationError') {
  //     return res.json({
  //       error: 1,
  //       message: err.message,
  //       fields: err.errors,
  //     });
  //   }

  //   next(err);
  // }

  //   console.log(req.method);
  if (req.method === 'POST') {
    try {
      // console.log(req.user);
      let policy = policyFor(req.user);

      if (!policy.can('create', 'Product')) {
        return res.json({
          error: 1,
          message: "You're not allowed to perform this action",
        });
      }

      //   let payload = req.body;
      //   let product = new Product(payload);
      //   await product.save();
      //   return res.json(product);
      let payload = req.body;

      // console.log(payload);

      if (payload.category) {
        const category = await Category.findOne({
          name: { $regex: payload.category, $options: 'i' },
        });

        if (category) {
          payload = { ...payload, category: category._id };
        } else {
          delete payload.category;
        }
      }

      if (payload.tags && payload.tags.length) {
        // console.log(payload.tags);
        const tags = await Tag.find({
          name: { $in: payload.tags },
        });

        // console.log(tags);

        if (tags.length) {
          payload = { ...payload, tags: tags.map((tag) => tag._id) };
        }
      }

      if (req.file) {
        // console.log(req.file);

        // request file path
        let tmp_path = req.file.path;
        // console.log(req.file.path);

        // get the image file extension (.jpg / .png etc)
        let originalExt =
          req.file.originalname.split('.')[ // originalname: original name file
            req.file.originalname.split('.').length - 1
          ];

        // create complete file with name and extension
        let filename = `${req.file.filename}.${originalExt}`; // req.file.filename: the random name generated by multer()

        // configuring file upload storage
        let target_path = path.resolve(
          config.rootPath,
          `public/upload/${filename}`
        );

        // or:
        // let target_path = `${config.rootPath}/public/upload/${filename}`;

        const src = fs.createReadStream(tmp_path);
        const dest = fs.createWriteStream(target_path);
        src.pipe(dest);

        src.on('end', async () => {
          try {
            const product = new Product({ ...payload, image_url: filename });
            await product.save();
            return res.json(product);
          } catch (error) {
            fs.unlinkSync(target_path); // the image always uploaded into upload directory even the error validate happened. so delete the image using this command

            if (error && error.name === 'ValidationError') {
              return res.json({
                error: 1,
                message: error.message,
                fields: error.errors,
              });
            }
            next(error);
          }
        });

        src.on('error', async () => {
          next(error);
        });
      } else {
        const product = new Product(payload);
        await product.save();
        return res.json(product);
      }
    } catch (error) {
      //   console.log(error.name);
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
    //   return res.json(product);
    // const products = await Product.find();
    // if (products.length > 0) {
    //   return res.json({
    //     status: 'success',
    //     message: 'List of products found',
    //     data: products,
    //   });
    // } else {
    //   return res.json({
    //     status: 'warning',
    //     message: 'Products not found! :)',
    //   });
    // }
    try {
      let {
        limit = 10,
        skip = 0,
        q = '',
        category = '',
        tags = [],
      } = req.query; // query string (the output is string)

      let criteria = {};

      if (q.length) {
        // criteria = { ...criteria, name: { $regex: q, $options: 'i' } }; // this also works
        criteria = { ...criteria, name: { $regex: `${q}`, $options: 'i' } };
      }

      if (category.length) {
        category = await Category.findOne({
          name: { $regex: category, $options: 'i' },
        });

        if (category) {
          criteria = { ...criteria, category: category._id };
        }
      }

      if (tags.length) {
        const dataTags = tags.map((tag) => new RegExp(tag, 'i')); // case insensitive with regex. e.g. [ /foods/i, /drinks/i ]

        console.log(dataTags); // [ /bread/i, /cheese/i, etc... ]
        tags = await Tag.find({ name: { $in: dataTags } });

        criteria = { ...criteria, tags: { $in: tags.map((tag) => tag._id) } };
      }

      // console.log(criteria);

      // const products = await Product.find(criteria)
      //   .populate('category')
      //   .populate('tags');

      let count = await Product.find(criteria).countDocuments();

      let products = await Product.find(criteria)
        .limit(parseInt(limit))
        .skip(parseInt(skip)) // parseInt: convert the query string into number
        .populate('category')
        .populate('tags');

      if (products.length > 0) {
        return res.json({
          status: 'success',
          message: 'List of products found',
          count,
          data: products,
        });
      } else {
        return res.json({
          status: 'warning',
          message: 'Products empty! :)',
          count,
          data: products, // experiment sendiri. []: array kosong artinya data tidak terdapat dalam db. output array kosong agar tidak error saat diproses disisi react-frontend (/Home/index.js). jika bukan array kosong ([]), output akan bernilai undefined sehingga dapat mengalami error.
        });
      }

      // console.log(products);
      // return res.json({ data: products, count }); // sesuai ebook, ini juga akan menghasilkan array kosong ([]) apabila data tidak ditemukan dalam db. yang menjadi pembeda adalah output products tidak menggunakan kondisi pengecekan panjang products (if (products.length > 0))
    } catch (error) {
      next(error);
    }
  }

  if (req.method === 'PUT') {
    try {
      let policy = policyFor(req.user);

      if (!policy.can('update', 'Product')) {
        return res.json({
          error: 1,
          message: "You're not allowed to modify this resource",
        });
      }

      // const { name, description, price } = req.body;
      let payload = req.body;
      const id = req.params.id;

      // console.log(req.body);

      if (payload.category) {
        const category = await Category.findOne({
          name: { $regex: payload.category, $options: 'i' },
        });

        if (category) {
          payload = { ...payload, category: category._id };
        } else {
          delete payload.category;
        }
      }

      if (payload.tags && payload.tags.length) {
        const tags = await Tag.find({
          name: { $in: payload.tags },
        });

        // console.log(tags);

        if (tags.length) {
          payload = { ...payload, tags: tags.map((tag) => tag._id) };
        }
      }

      if (req.file) {
        let tmp_path = req.file.path;
        let originalExt =
          req.file.originalname.split('.')[
            req.file.originalname.split('.').length - 1
          ];
        let filename = `${req.file.filename}.${originalExt}`;
        let target_path = path.resolve(
          config.rootPath,
          `public/upload/${filename}`
        );

        // or:
        // let target_path = `${config.rootPath}/public/upload/${filename}`;

        const src = fs.createReadStream(tmp_path);
        const dest = fs.createWriteStream(target_path);
        src.pipe(dest);

        src.on('end', async () => {
          try {
            // console.log(target_path);
            const imageId = await Product.findById(id);
            // console.log(imageId);
            // const imagePath = path.resolve(
            //   config.rootPath,
            //   `public/upload/${imageId.image_url}`
            // );

            // or:
            const imagePath = `${config.rootPath}/public/upload/${imageId.image_url}`;
            const product = await Product.findOneAndUpdate(
              { _id: id },
              { ...payload, image_url: filename },
              { new: true, runValidators: true }
            ); // tidap seperti contoh put pada https://github.com/sdmhsn/fullstack-js-tutorial/blob/03-expressjs-mongodb-connection/project-express-app-moongose/routes.js yang menggunakan replaceOne(), contoh ini menggunakan findOneAndUpdate() karena berjalannya perubahan pada field updatedAt (timestamps) pada model. menggunakan replaceOne() tidak terjadi perubahan pada field updatedAt.

            // console.log(product);

            if (fs.existsSync(imagePath)) {
              fs.unlinkSync(imagePath);
            }

            return res.json({
              status: 'success',
              message: 'Updated product',
              data: product,
            });
          } catch (error) {
            // console.log(target_path);
            fs.unlinkSync(target_path);

            if (error && error.name === 'ValidationError') {
              return res.json({
                error: 1,
                message: error.message,
                fields: error.errors,
              });
            }

            next(error);
          }
        });

        src.on('error', async () => {
          next(error);
        });
      } else {
        // const imageId = await Product.findById(id);
        // const imagePath = `${config.rootPath}/public/upload/${imageId.image_url}`;

        const product = await Product.findOneAndUpdate(
          { _id: id },
          payload,
          // { ...payload, image_url: null },
          {
            new: true,
            runValidators: true,
          }
        );

        // console.log(product);

        // if (fs.existsSync(imagePath)) {
        //   fs.unlinkSync(imagePath);
        // }

        return res.json({
          status: 'success',
          message: 'Updated product',
          data: product,
        });
      }
    } catch (error) {
      // console.log('tes');
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

  if (req.method === 'DELETE') {
    try {
      let policy = policyFor(req.user);

      if (!policy.can('delete', 'Product')) {
        return res.json({
          error: 1,
          message: "You're not allowed to perform this action",
        });
      }

      const id = req.params.id;

      const imageId = await Product.findById(id);
      const imagePath = `${config.rootPath}/public/upload/${imageId.image_url}`;

      const product = await Product.deleteOne({
        _id: id,
      });

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }

      return res.json({
        status: 'success',
        message: 'Deleted product',
      });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = { store };