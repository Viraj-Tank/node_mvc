const Product = require('../models/product')

exports.getAddProduct = (req, res, next) => {
  res.render('admin/add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
}

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  // req.user is sequelize and we setup association inside app.js
  // so we're getting this magic method (createProduct)
  req.user.createProduct({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description,
    userId: req.user.id
  }).then((result) => {
    console.log('Created Product');
    res.redirect('/');
  }).catch((error) => {
    console.log(error);
  });
  // Product.create({
  //   title: title,
  //   price: price,
  //   imageUrl: imageUrl,
  //   description: description,
  //   userId: req.user.id
  // }).then((result) => {
  //   console.log('Created Product');
  //   res.redirect('/');
  // }).catch((error) => {
  //   console.log(error);
  // });

  // const product = new Product(title, imageUrl, description, price)
  // product.save()
  //   .then(() => {
  //     res.redirect('/');
  //   })
  //   .catch(err => { console.log(err) })
}

exports.getEditProduct = (req, res, next) => {
  // const editMode = req.query.edit;
  // if (!editMode) {
  //   return res.redirect('/');
  // }
  const prodId = req.params.productId;
  req.user.getProducts({ where: { id: prodId } })
    .then(products => {
      if (!products[0]) {
        return res.redirect('/');
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: true,
        product: products[0]
      });
    }).catch(error => {

    });

  // Product.findAll({
  //   where: {
  //     id: prodId
  //   }
  // }).then(product => {
  //   if (!product[0]) {
  //     return res.redirect('/');
  //   }
  //   res.render('admin/edit-product', {
  //     pageTitle: 'Edit Product',
  //     path: '/admin/edit-product',
  //     editing: true,
  //     product: product[0]
  //   });
  // }).catch(error => {

  // });

  // Product.findById(prodId, product => {
  //   if (!product) {
  //     return res.redirect('/');
  //   }
  //   res.render('admin/edit-product', {
  //     pageTitle: 'Edit Product',
  //     path: '/admin/edit-product',
  //     editing: editMode,
  //     product: product
  //   });
  // });
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;

  Product.findByPk(prodId)
    .then(product => {
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.description = updatedDesc;
      product.imageUrl = updatedImageUrl;
      // if product does not exist it will create new or it'll override
      return product.save();
    }).then(result => {
      res.redirect('/admin/products');
    }).catch(error => {
      console.log(error);
    });

  // const updatedProduct = new Product(
  //   prodId,
  //   updatedTitle,
  //   updatedImageUrl,
  //   updatedDesc,
  //   updatedPrice
  // );
  // updatedProduct.save();
  // res.redirect('/admin/products');
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByPk(prodId)
    .then(product => {
      return product.destroy();
    }).then(result => {
      console.log('Product Destroyed!');
      res.redirect('/admin/products');
    }).catch(error => console.log(error));

  // Product.deleteById(prodId);
  // res.redirect('/admin/products');
};

exports.getAdminProducts = (req, res, next) => {

  // Product.findAll()
  req.user.getProducts()
    .then(products => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      });
    }).catch(error => {

    });

  // Product.fetchAll(products => {
  //   res.render('admin/products', {
  //     prods: products,
  //     pageTitle: 'Admin Products',
  //     path: 'admin/products'
  //   });
  // })
}