// routes/assetRoutes.js

const express = require('express');
const { addAsset, updateAsset, deleteAsset, getAssets } = require('../controllers/assetController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Get all assets
router.get('/', protect, getAssets);

// Add a new asset
router.post('/add', protect, addAsset);

// Update an existing asset
router.put('/update/:id', protect, updateAsset);

// Delete an asset
router.delete('/delete/:id', protect, deleteAsset);

module.exports = router;
