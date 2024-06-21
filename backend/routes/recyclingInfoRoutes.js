const express = require('express');
const router = express.Router();
const recyclingInfoController = require('../controllers/recyclingInfoController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.post('/', authMiddleware, upload.single('image'), recyclingInfoController.createRecyclingInfo);
router.get('/', authMiddleware, recyclingInfoController.getRecyclingInfos);
router.put('/:id', authMiddleware, recyclingInfoController.updateRecyclingInfo);
router.delete('/:id', authMiddleware, recyclingInfoController.deleteRecyclingInfo);

module.exports = router;
