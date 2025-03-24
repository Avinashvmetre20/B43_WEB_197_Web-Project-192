// routes/dataRoutes.js

const express = require('express');
const {getstocksymbol, getStockData,getCryptoSymbols,getSupportedCurrencies, getCryptoData, getMarketNews } = require('../controllers/dataController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

//get stocksymbol list
router.get('/stocksymbol', protect,getstocksymbol);

// Get stock data
router.get('/stocks/:symbol', protect, getStockData);

//get cryptosymbol list
router.get('/cryptosymbol', getCryptoSymbols);
router.get('/currencies', getSupportedCurrencies);

// Get crypto data
router.get('/crypto/:symbol/:currency', getCryptoData);

// Get market news
router.get('/news', protect, getMarketNews);

module.exports = router;
