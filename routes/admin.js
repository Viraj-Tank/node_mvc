const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin')

// /admin/add-product => GET
router.get('/add-product', adminController.getAddProduct);

// /admin/products => GET
router.get('/products', adminController.getAdminProducts);

// /admin/add-product => POST
router.post('/add-product', adminController.postAddProduct);

router.post('/edit-product', adminController.postEditProduct);

router.post('/delete-product', adminController.postDeleteProduct);

router.get('/edit-product/:productId', adminController.getEditProduct);

// exports.routes = router;
module.exports = router;
