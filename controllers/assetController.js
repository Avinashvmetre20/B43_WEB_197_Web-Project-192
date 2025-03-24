//controller/assetController.js

const Asset = require('../models/Asset');

// Add a new asset
const addAsset = async (req, res) => {
    try {
        const { type, symbol, name, quantity, purchasePrice, purchaseDate } = req.body;

        const newAsset = await Asset.create({
            user: req.user.id,
            type,
            symbol,
            name,
            quantity,
            purchasePrice,
            purchaseDate,
        });

        res.status(201).json(newAsset);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all assets for the logged-in user
const getAssets = async (req, res) => {
    try {
        const assets = await Asset.find({ user: req.user.id });
        res.json(assets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an asset
const updateAsset = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const asset = await Asset.findByIdAndUpdate(id, updatedData, { new: true });

        if (!asset) {
            return res.status(404).json({ message: 'Asset not found' });
        }

        res.json(asset);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete an asset
const deleteAsset = async (req, res) => {
    try {
        const { id } = req.params;

        const asset = await Asset.findByIdAndDelete(id);

        if (!asset) {
            return res.status(404).json({ message: 'Asset not found' });
        }

        res.json({ message: 'Asset deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addAsset,
    getAssets,
    updateAsset,
    deleteAsset,
};
