// Placeholder for index page scripts (if needed)
console.log("Welcome to Investment Portfolio Tracker");

document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('login-btn');
    const registerButton = document.getElementById('register-btn');

    loginButton.addEventListener('click', () => {
        window.location.href = '/login.html';
    });

    registerButton.addEventListener('click', () => {
        window.location.href = '/register.html';
    });
});
