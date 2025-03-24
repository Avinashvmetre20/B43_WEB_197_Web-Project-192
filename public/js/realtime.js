// Fetch stock symbols on load
async function fetchStockSymbols() {
    try {
        const response = await fetch('/api/data/stocksymbol', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        const symbols = await response.json();

        const selectElement = document.getElementById('stockSymbol');
        symbols.forEach(symbol => {
            const option = document.createElement('option');
            option.value = symbol;
            option.textContent = symbol;
            selectElement.appendChild(option);
        });

        // Add search functionality for stocks
        const searchInput = document.getElementById('symbolSearch');
        searchInput.addEventListener('input', () => {
            const searchValue = searchInput.value.toLowerCase();
            Array.from(selectElement.options).forEach(option => {
                if (option.value.toLowerCase().includes(searchValue)) {
                    option.style.display = '';
                } else {
                    option.style.display = 'none';
                }
            });
        });
    } catch (error) {
        console.error('Failed to fetch stock symbols', error);
    }
}

// Fetch crypto symbols on load
async function fetchCryptoSymbols() {
    try {
        const response = await fetch('/api/data/cryptosymbol', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const symbols = await response.json();

        const selectElement = document.getElementById('cryptoSymbol');
        symbols.forEach(symbol => {
            const option = document.createElement('option');
            option.value = symbol.id;
            option.textContent = symbol.id;
            selectElement.appendChild(option);
        });

        // Add search functionality for cryptos
        const searchInput = document.getElementById('cryptoSearch');
        searchInput.addEventListener('input', () => {
            const searchValue = searchInput.value.toLowerCase();
            Array.from(selectElement.options).forEach(option => {
                if (option.value.toLowerCase().includes(searchValue)) {
                    option.style.display = '';
                } else {
                    option.style.display = 'none';
                }
            });
        });
    } catch (error) {
        console.error('Failed to fetch crypto symbols', error);
    }
}

// Fetch supported currencies on load
async function fetchSupportedCurrencies() {
    try {
        const response = await fetch('/api/data/currencies', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const currencies = await response.json();

        const selectElement = document.getElementById('currency');
        currencies.forEach(currency => {
            const option = document.createElement('option');
            option.value = currency;
            option.textContent = currency;
            selectElement.appendChild(option);
        });

        // Add search functionality for currencies
        const searchInput = document.getElementById('currencySearch');
        searchInput.addEventListener('input', () => {
            const searchValue = searchInput.value.toLowerCase();
            Array.from(selectElement.options).forEach(option => {
                if (option.value.toLowerCase().includes(searchValue)) {
                    option.style.display = '';
                } else {
                    option.style.display = 'none';
                }
            });
        });
    } catch (error) {
        console.error('Failed to fetch supported currencies', error);
    }
}

// Fetch market news
async function fetchMarketNews() {
    try {
        const response = await fetch('/api/data/news', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        const news = await response.json();

        const newsDiv = document.getElementById('marketNews');
        newsDiv.innerHTML = `
            <h3>Latest Market News</h3>
            <ul>
                ${news.map(article => `
                    <li>
                        <a href="${article.url}" target="_blank">${article.title}</a>
                        <p>${article.description}</p>
                    </li>
                `).join('')}
            </ul>
        `;
    } catch (error) {
        console.error('Failed to fetch market news', error);
    }
}

// Fetch stock data
async function fetchStockData(symbol) {
    try {
        const response = await fetch(`/api/data/stocks/${symbol}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        const data = await response.json();

        const dataDiv = document.getElementById('stockData');

        // Format stock data for better readability
        let formattedData = '';
        if (data && typeof data === 'object') {
            for (const [key, value] of Object.entries(data)) {
                formattedData += `
                    <div class="output-data-row">
                        <span class="data-key">${key.replace(/^\d+\.\s*/, '').toUpperCase()}:</span>
                        <span class="data-value">${value}</span>
                    </div>
                `;
            }
        } else {
            formattedData = '<p class="error-message">No valid stock data found.</p>';
        }

        dataDiv.innerHTML = `
            <h3>Stock Data for ${symbol.toUpperCase()}</h3>
            <div class="output-data-box">
                ${formattedData}
            </div>
        `;
    } catch (error) {
        console.error('Failed to fetch stock data', error);
        dataDiv.innerHTML = '<p class="error-message">Error fetching data. Please try again.</p>';
    }
}

// Fetch crypto data
async function fetchCryptoData(symbol, currency) {
    try {
        const response = await fetch(`/api/data/crypto/${symbol}/${currency}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const data = await response.json();

        const dataDiv = document.getElementById('cryptoData');

        // Format data to display neatly
        let formattedData = '';
        if (data && typeof data === 'object') {
            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    const value = data[key];
                    if (typeof value === 'object') {
                        for (const nestedKey in value) {
                            formattedData += `<div class="output-data-row"><span class="data-key">${nestedKey.toUpperCase()}:</span> <span class="data-value">${value[nestedKey]}</span></div>`;
                        }
                    } else {
                        formattedData += `<div class="output-data-row"><span class="data-key">${key.toUpperCase()}:</span> <span class="data-value">${value}</span></div>`;
                    }
                }
            }
        } else {
            formattedData = '<p class="error-message">No valid crypto data found.</p>';
        }

        dataDiv.innerHTML = `
            <h3>Crypto Data for ${symbol.toUpperCase()} (${currency.toUpperCase()})</h3>
            <div class="output-data-box">${formattedData}</div>
        `;
    } catch (error) {
        console.error('Failed to fetch crypto data', error);
        dataDiv.innerHTML = '<p class="error-message">Error fetching data. Please try again.</p>';
    }
}

// Event listener for fetching stock data
document.getElementById('fetchStockDataButton').addEventListener('click', () => {
    const selectedSymbol = document.getElementById('stockSymbol').value;
    if (selectedSymbol) {
        fetchStockData(selectedSymbol);
    } else {
        alert('Please select a stock symbol.');
    }
});

// Event listener for fetching crypto data
document.getElementById('fetchCryptoDataButton').addEventListener('click', () => {
    const selectedCrypto = document.getElementById('cryptoSymbol').value;
    const selectedCurrency = document.getElementById('currency').value;
    if (selectedCrypto && selectedCurrency) {
        fetchCryptoData(selectedCrypto, selectedCurrency);
    } else {
        alert('Please select a crypto symbol and currency.');
    }
});

// Load stock symbols, crypto symbols, supported currencies, and market news on page load
fetchStockSymbols();
fetchCryptoSymbols();
fetchSupportedCurrencies();
fetchMarketNews();
