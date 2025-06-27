const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const verifyToken = require('../middlewares/authMiddleware');

// Protegemos todas las rutas del carrito
router.use(verifyToken);

router.post('/ApplyCoupon', cartController.applyCoupon);
router.post('/RemoveCoupon', cartController.removeCoupon);
router.get('/GetCart/:userId', cartController.getCart);
router.post('/CartUpsert', cartController.cartUpsert);
router.post('/RemoveCart', cartController.removeCart);

module.exports = router;
