async function fetchUserProfile() {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Not logged in!');
        window.location.href = './login.html';
        return;
    }

    const response = await fetch('/api/auth/profile', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` },
    });

    const data = await response.json();

    if (response.ok) {
        document.getElementById('username').textContent = data.user.username;
        document.getElementById('email').textContent = data.user.email;
        document.getElementById('userId').textContent = data.user._id;
        document.getElementById('createdAt').textContent = new Date(data.user.createdAt).toLocaleString();
        document.getElementById('updatedAt').textContent = new Date(data.user.updatedAt).toLocaleString();
    } else {
        alert(data.message);
    }
}

// Logout functionality
document.getElementById('logoutButton').addEventListener('click', logout);
function logout() {
    if (localStorage.getItem('token')) {
        localStorage.removeItem('token');
        alert('Logged out successfully');
    } else {
        alert('You are not logged in!');
    }
    window.location.href = './index.html';
}

// Toggle visibility for the add asset form
document.getElementById('toggleAddForm').addEventListener('click', () => {
    const addAssetForm = document.getElementById('addAssetForm');
    const button = document.getElementById('toggleAddForm');
    if (addAssetForm.style.display === 'none' || addAssetForm.style.display === '') {
        addAssetForm.style.display = 'block';
        button.textContent = 'Hide Add Data';
    } else {
        addAssetForm.style.display = 'none';
        button.textContent = 'Add Data';
    }
});

// Toggle visibility for the asset list
document.getElementById('getDataButton').addEventListener('click', () => {
    const assetsDiv = document.getElementById('assets');
    const button = document.getElementById('getDataButton');
    if (assetsDiv.style.display === 'none' || assetsDiv.style.display === '') {
        assetsDiv.style.display = 'block';
        button.textContent = 'Hide My Data';
        fetchAssets(); // Fetch assets when showing the list
    } else {
        assetsDiv.style.display = 'none';
        button.textContent = 'Give My Data';
    }
});

// Fetch assets from the server
async function fetchAssets() {
    const token = localStorage.getItem('token');
    const response = await fetch('/api/assets', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` },
    });

    const data = await response.json();
    const assetsDiv = document.getElementById('assets');
    assetsDiv.innerHTML = '';

    if (response.ok) {
        data.forEach(asset => {
            const assetDiv = document.createElement('div');
            assetDiv.classList.add('asset-item');

            assetDiv.innerHTML = `
                <h4>Asset Details:</h4>
                <p><strong>Type:</strong> ${asset.type.toUpperCase()}</p>
                <p><strong>Name:</strong> ${asset.name}</p>
                <p><strong>Symbol:</strong> ${asset.symbol}</p>
                <p><strong>Asset ID:</strong> ${asset._id}</p>
                <p><strong>Quantity:</strong> ${asset.quantity}</p>
                <p><strong>Purchase Price:</strong> $${asset.purchasePrice}</p>
                <p><strong>Purchase Date:</strong> ${new Date(asset.purchaseDate).toLocaleDateString()}</p>
                <p><strong>Created At:</strong> ${new Date(asset.createdAt).toLocaleString()}</p>
                <p><strong>Updated At:</strong> ${new Date(asset.updatedAt).toLocaleString()}</p>
            `;

            // Edit button
            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.addEventListener('click', () => editAsset(asset._id));

            // Delete button
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => deleteAsset(asset._id));

            // Add spacing between buttons
            const buttonContainer = document.createElement('div');
            buttonContainer.style.display = 'flex';
            buttonContainer.style.gap = '10px';
            buttonContainer.style.marginTop = '10px';

            buttonContainer.appendChild(editButton);
            buttonContainer.appendChild(deleteButton);

            // Append buttons and asset div
            assetDiv.appendChild(buttonContainer);
            assetDiv.appendChild(document.createElement('hr'));

            // Append asset div to assets container
            assetsDiv.appendChild(assetDiv);
        });
    } else {
        alert(data.message);
    }
}



// Add a new asset
document.getElementById('addAssetForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const type = document.getElementById('type').value;
    const symbol = document.getElementById('symbol').value;
    const name = document.getElementById('name').value;
    const quantity = document.getElementById('quantity').value;
    const purchasePrice = document.getElementById('purchasePrice').value;
    const purchaseDate = document.getElementById('purchaseDate').value;

    const response = await fetch('/api/assets/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ type, symbol, name, quantity, purchasePrice, purchaseDate })
    });

    const data = await response.json();
    if (response.ok) {
        alert('Asset added successfully');
        fetchAssets();
        document.getElementById('addAssetForm').reset();  // Clear the form
    } else {
        alert(data.message);
    }
});

// Delete an asset
async function deleteAsset(id) {
    const token = localStorage.getItem('token');
    const response = await fetch(`/api/assets/delete/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
    });

    const data = await response.json();
    if (response.ok) {
        alert('Asset deleted successfully');
        fetchAssets();
    } else {
        alert(data.message);
    }
}

// Edit an asset (open a prompt for simplicity)
async function editAsset(id) {
    const newQuantity = prompt('Enter new quantity:');
    const newPrice = prompt('Enter new purchase price:');
    if (!newQuantity || !newPrice) return;

    const token = localStorage.getItem('token');
    const response = await fetch(`/api/assets/update/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ quantity: newQuantity, purchasePrice: newPrice })
    });

    const data = await response.json();
    if (response.ok) {
        alert('Asset updated successfully');
        fetchAssets();
    } else {
        alert(data.message);
    }
}

//button yo access real time data
document.getElementById('realTimeDataButton').addEventListener('click', () => {
    window.location.href = '/realtime.html';
});



fetchUserProfile();
