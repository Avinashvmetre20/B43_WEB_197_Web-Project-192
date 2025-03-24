//routes/index.js
const authRoutes = require('./authRoutes');
const assetRoutes = require('./assetRoutes');
const dataRoutes = require('./dataRoutes');

function setupRoutes(app) {
  app.use('/api/auth', authRoutes);
  app.use('/api/assets', assetRoutes);
  app.use('/api/data', dataRoutes);

  app.get('/', (req, res) => {
    res.send('Investment Portfolio Tracker API is running!');
  });
}

module.exports = { setupRoutes };
