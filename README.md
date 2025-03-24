# 📊 Investment Portfolio Tracker

The **Investment Portfolio Tracker** is a sleek and responsive web application that allows users to manage their investment portfolios efficiently. The app provides real-time market data, including stocks and cryptocurrencies, and displays business news and portfolio insights. It leverages advanced technologies such as **Express**, **MongoDB**, **Redis**, **Socket.io**, and various third-party APIs for real-time updates and data visualization.

---

## 🚀 Features

- **User Authentication:** Secure registration and login using JWT.
- **Real-Time Market Data:** Fetches stocks and cryptocurrency data from multiple APIs.
- **Crypto and Stock Symbols:** Fetches and caches supported symbols and currencies from external APIs.
- **Market News:** Displays the latest business news using the News API.
- **Asset Management:** Add, update, delete, and view portfolio assets.
- **Responsive Frontend:** Intuitive UI with search boxes for stock and crypto data.
- **Data Caching:** Uses Redis to cache symbols and currencies to reduce API calls.
- **Real-Time Updates:** Updates market data and portfolio insights using Socket.io.
- **Performance Optimizations:** Implements caching, rate limiting, and security practices.

---

## 🛠️ Technologies Used

### Backend:
- **Node.js**: Server runtime
- **Express**: Web framework
- **MongoDB**: Database
- **Redis**: Caching layer
- **Socket.io**: Real-time updates
- **Axios**: API requests
- **Helmet**: Security middleware
- **Morgan**: HTTP request logger
- **CORS**: Cross-origin resource sharing
- **dotenv**: Environment variable management
- **JWT**: JSON Web Token for authentication

### Frontend:
- **HTML/CSS**: Structure and styling
- **JavaScript (DOM Manipulation)**: Client-side functionality
- **Socket.io Client**: Real-time updates

### APIs:
- **Finnhub API**: Stock market data
- **Alpha Vantage API**: Stock quote data
- **Coingecko API**: Cryptocurrency data
- **News API**: Business news

---


---

## ⚙️ Environment Variables

Create a `.env` file in the root directory and add the following variables:

PORT=8080 MONGODB=mongodb://localhost:27017/CWP 
JWT_SECRET=***** 
ALPHA_VANTAGE_API_KEY=***** 
BROADCAST_INTERVAL=30000 REDIS_URL=redis://localhost:6379 
COINGECKO_API_URL=*****
FINNHUB_API_KEY=88888 
NEWS_API_KEY=****** 
NODE_ENV=development



---

## 📝 Installation

1. Clone the repository:
   ```bash
   git clone 
---

## 📝 Installation

1. Clone the repository:
   ```bash
   git clonehttps://github.com/Avinashvmetre20/B43_WEB_197_Web-Project-192.git

Install backend dependencies:

commands
npm install
redis-server
npm run dev
http://localhost:8080
---

## Usage
Register or log in to your account.

View your profile and add/update/delete assets.

Search for stocks or cryptocurrencies to view their data.

Stay updated with real-time data and news.

📝 API Endpoints
Authentication
Register: POST /api/auth/register

Login: POST /api/auth/login

Stock Data
Get Stock Symbols: GET /api/data/stocksymbol

Get Stock Data: GET /api/data/stock/:symbol

Crypto Data
Get Crypto Symbols: GET /api/data/cryptosymbol

Get Supported Currencies: GET /api/data/currencies

Get Crypto Data: GET /api/data/crypto/:symbol/:currency

Market News
Get Market News: GET /api/data/marketnews

Troubleshooting
Redis Connection Error: Ensure the Redis server is running and the URL in .env is correct.

API Limit Exceeded: API providers may rate limit. Consider upgrading the API plan.

Socket Not Updating: Check if Socket.io is configured correctly on both client and server.

API Rate Limits: Some APIs (like Alpha Vantage) may have strict rate limits. Consider using caching to minimize API requests.

Future Improvements
Advanced data visualization with charts and graphs

Enhanced UI with drag-and-drop widgets

Interactive portfolio comparison tools

Push notifications for significant changes