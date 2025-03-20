const express = require("express");
const{protect} = require("../miidlewares/auth.middle");
const assetRoute = express.Router();

assetRoute.route("/").get(protect,getPortfolio).post(protect,addAsset);

module.exports = assetRoute;