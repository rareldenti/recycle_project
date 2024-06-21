const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.get('/', authMiddleware, orderController.getOrders);
router.post('/', authMiddleware, upload.single('image'), orderController.createOrder);
router.put('/:id', authMiddleware, upload.single('image'), orderController.updateOrder);
router.delete('/:id', authMiddleware, orderController.deleteOrder);

module.exports = router;
