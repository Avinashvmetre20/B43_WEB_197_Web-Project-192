const mongoose = require("mongoose");

const assetSchema = mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    symbol: { type: String, required: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    purchasePrice: { type: Number, required: true },
},{
    timestamps:true,
});

module.exports = mongoose.model("Asset",assetSchema);