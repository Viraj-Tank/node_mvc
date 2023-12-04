const Product = require('../models/product')
const Cart = require('../models/cart');
const e = require('express');

exports.getProducts = (req, res, next) => {
  // Product.findAll()
  req.user.getProducts()
    .then(products => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'Shop',
        path: '/products'
      });
    }).catch(error => {

    })
  // Product.fetchAll()
  //   .then(([rows, fieldData]) => {
  //     res.render('shop/product-list', {
  //       prods: rows,
  //       pageTitle: 'Shop',
  //       path: '/products'
  //     });
  //   }).catch(err => {

  //   });
}

exports.getIndex = async (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      });
    }).catch(error => {

    })

  // Product.fetchAll()
  //   .then(([rows, fieldData]) => {
  //     res.render('shop/index', {
  //       prods: rows,
  //       pageTitle: 'Shop',
  //       path: '/'
  //     });
  //   }).catch(err => {

  //   });
}

exports.getCart = (req, res, next) => {
  //cannot access like this
  console.log(req.user.cart);
  //instead need to call getCart() method
  req.user
    .getCart()
    .then(cart => {
      return cart.getProducts()
        .then(products => {
          res.render('shop/cart', {
            path: '/cart',
            pageTitle: 'Your Cart',
            products: products
          });
        }).catch(error => {

        });
      console.log(cart);
    })
    .catch(error => console.log(error));

  // Cart.getCart(cart => {
  //   Product.fetchAll(products => {
  //     const cartProducts = [];
  //     for (product of products) {
  //       const cartProductData = cart.products.find(
  //         prod => prod.id === product.id
  //       );
  //       if (cartProductData) {
  //         cartProducts.push({ productData: product, qty: cartProductData.qty });
  //       }
  //     }
  //     res.render('shop/cart', {
  //       path: '/cart',
  //       pageTitle: 'Your Cart',
  //       products: cartProducts
  //     });
  //   });
  // });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let fetchedCart;
  // we can the whole cart with getCart()
  req.user.
    getCart()
    .then(cart => {
      // we store it in other variable to access it in this block
      fetchedCart = cart;
      // here we only fetch products which match with our prodId
      return cart.getProducts({ where: { id: prodId } });
    })
    .then(products => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }
      let newQuantity = 1;
      if (product) {

      }
      return Product.findByPk(prodId)
        .then(product => {
          return fetchedCart.addProduct(product, { through: { quantity: newQuantity } });
        })
        .catch(err => console.log(err));
    })
    .then(() => {
      res.redirect('/cart');
    })
    .catch(error => { console.log(error) });



  // Product.findById(prodId, (product) => {
  //   Cart.addProduct(prodId, product.price);
  // })
  // res.redirect('/cart');
}

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    pageTitle: 'Checkout',
    path: '/checkout'
  });
}

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect('/cart');
  });
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    pageTitle: 'Orders',
    path: '/orders'
  });
}

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;

  Product.findAll({
    where: {
      id: prodId
    }
  }).then(products => {
    res.render('shop/product-detail', {
      product: products[0],
      pageTitle: products[0].title,
      path: '/products'
    });
  }).catch(error => {

  });

  // Product.findByPk(prodId)
  //   .then(product => {
  //     res.render('shop/product-detail', {
  //       product: product,
  //       pageTitle: product.title,
  //       path: '/products'
  //     });
  //   })
  //   .catch(error => {

  //   })

  // same producId which we passed from origin point (shop.js in routes)
  /*const prodId = req.params.productId;
  Product.findById(prodId)
    .then(([product]) => {
      res.render('shop/product-detail', {
        product: product[0],
        pageTitle: product.title,
        path: '/products'
      });
    })
    .catch(err => {

    })*/
}