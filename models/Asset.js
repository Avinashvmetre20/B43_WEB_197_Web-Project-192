const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: ['stock', 'crypto', 'bond', 'real estate', 'commodity', 'cash'],
    },
    symbol: {
        type: String,
        required: true,
        trim: true,
    },
    name: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        default: 0,
    },
    purchasePrice: {
        type: Number,
        required: true,
    },
    currentPrice: {
        type: Number,
        required: false,
    },
    purchaseDate: {
        type: Date,
        default:Date.now,
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Asset', assetSchema);
