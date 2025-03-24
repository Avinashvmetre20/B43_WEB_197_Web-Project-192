const axios = require('axios');
const { connectRedis } = require('../utils/redisClient');

// Get list of symbols (from a public API or a predefined list)
const getstocksymbol = async (req, res) => {
    try {
        const cacheKey = 'stockSymbols';
        const client = await connectRedis();

        // Check cache first
        const cachedData = await client.get(cacheKey);
        if (cachedData) {
            console.log('Serving stock symbols from cache');
            return res.json(JSON.parse(cachedData));
        }

        // Fetch from API if not cached
        const apiKey = process.env.FINNHUB_API_KEY;
        const url = `https://finnhub.io/api/v1/stock/symbol?exchange=US&token=${apiKey}`;

        const response = await axios.get(url);
        const symbols = response.data.map((item) => item.symbol);

        if (!symbols || symbols.length === 0) {
            return res.status(404).json({ message: 'Stock symbols not found' });
        }

        // Cache the data for 1 day (86400 seconds)
        await client.setEx(cacheKey, 86400, JSON.stringify(symbols));

        console.log('Serving stock symbols from API');
        res.json(symbols);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch symbol list', error: error.message });
    }
};

// Get stock data by symbol
const getStockData = async (req, res) => {
    try {
        const { symbol } = req.params;
        const cacheKey = `stockData:${symbol}`;
        const client = await connectRedis();

        // Check Redis cache first
        const cachedData = await client.get(cacheKey);
        if (cachedData) {
            console.log(`Serving stock data for ${symbol} from cache`);
            return res.json(JSON.parse(cachedData));
        }

        const apiKey = process.env.ALPHA_VANTAGE_API_KEY;
        const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`;

        const response = await axios.get(url);
        const data = response.data;

        if (data['Note']) {
            return res.status(429).json({ message: 'API rate limit exceeded. Please try again later.' });
        }

        if (data['Error Message']) {
            return res.status(400).json({ message: 'Invalid symbol or API error.' });
        }

        if (!data['Global Quote'] || Object.keys(data['Global Quote']).length === 0) {
            return res.status(404).json({ message: 'Stock data not found for the given symbol.' });
        }

        // Store the result in Redis with a 5-minute expiration (300 seconds)
        await client.setEx(cacheKey, 300, JSON.stringify(data['Global Quote']));
        console.log(`Stock data for ${symbol} cached successfully`);

        res.json(data['Global Quote']);
    } catch (error) {
        console.error('Failed to fetch stock data:', error.message);
        res.status(500).json({ message: 'Failed to fetch stock data', error: error.message });
    }
};


// Get all supported crypto symbols with caching
const getCryptoSymbols = async (req, res) => {
    try {
        const cacheKey = 'cryptoSymbols';
        const client = await connectRedis();

        // Check cache first
        const cachedData = await client.get(cacheKey);
        if (cachedData) {
            console.log('Serving crypto symbols from cache');
            return res.json(JSON.parse(cachedData));
        }

        // If not cached, fetch from API
        const url = `${process.env.COINGECKO_API_URL}/coins/list`;
        const response = await axios.get(url);
        const data = response.data;

        if (!data) {
            return res.status(404).json({ message: 'Crypto symbols not found' });
        }

        // Cache the data for 1 day (86400 seconds)
        await client.setEx(cacheKey, 86400, JSON.stringify(data));

        console.log('Serving crypto symbols from API');
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch crypto symbols', error: error.message });
    }
};

// Get all supported currencies with caching
const getSupportedCurrencies = async (req, res) => {
    try {
        const cacheKey = 'supportedCurrencies';
        const client = await connectRedis();

        // Check cache first
        const cachedData = await client.get(cacheKey);
        if (cachedData) {
            console.log('Serving supported currencies from cache');
            return res.json(JSON.parse(cachedData));
        }

        // If not cached, fetch from API
        const url = `${process.env.COINGECKO_API_URL}/simple/supported_vs_currencies`;
        const response = await axios.get(url);
        const data = response.data;

        if (!data) {
            return res.status(404).json({ message: 'Currencies not found' });
        }

        // Cache the data for 1 day (86400 seconds)
        await client.setEx(cacheKey, 86400, JSON.stringify(data));

        console.log('Serving supported currencies from API');
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch currencies', error: error.message });
    }
};

// Get crypto data for selected symbol and currency
const getCryptoData = async (req, res) => {
    try {
        const { symbol, currency } = req.params;
        const url = `${process.env.COINGECKO_API_URL}/simple/price?ids=${symbol}&vs_currencies=${currency}`;

        const response = await axios.get(url);
        const data = response.data;

        if (!data || Object.keys(data).length === 0) {
            return res.status(404).json({ message: 'Crypto data not found' });
        }

        res.json(data);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch crypto data', error: error.message });
    }
};

// Fetch market news from News API
const getMarketNews = async (req, res) => {
    try {
        const apiKey = process.env.NEWS_API_KEY;
        const url = `https://newsapi.org/v2/top-headlines?category=business&apiKey=${apiKey}`;

        const response = await axios.get(url);
        const news = response.data.articles;

        res.json(news);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch market news', error: error.message });
    }
};

module.exports = {
    getstocksymbol,
    getStockData,
    getCryptoSymbols,
    getSupportedCurrencies,
    getCryptoData,
    getMarketNews,
};
