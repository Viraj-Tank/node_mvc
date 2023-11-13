const path = require('path');

const express = require('express');
const shopController = require('../controllers/shop')
const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

/**
 * add original routes first if we keep this first (/products/:productId) 
 * then we can never reach /products/delete when we follow top bottom approach
 */

// router.get('/products/delete', shopController.);

router.get('/products/:productId', shopController.getProduct);

router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart);

router.get('/checkout', shopController.getCheckout);

router.get('/orders', shopController.getOrders);

module.exports = router;
