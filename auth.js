// auth.js
let isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn')) || false;
let userName = localStorage.getItem('userName') || '';

function setupAuth() {
    const loginLink = document.getElementById('login-link');
    const logoutLink = document.getElementById('logout-link');

    if (!loginLink || !logoutLink) return;

    function updateAuthUI() {
        if (isLoggedIn && userName) {
            loginLink.textContent = userName;
            loginLink.href = '#';
            logoutLink.style.display = 'block';
        } else {
            loginLink.textContent = 'LOGIN';
            loginLink.href = 'login.html';
            logoutLink.style.display = 'none';
        }
    }

    logoutLink.addEventListener('click', (e) => {
        e.preventDefault();
        isLoggedIn = false;
        userName = '';
        localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
        localStorage.removeItem('userName');
        updateAuthUI();
        alert('Logged out successfully!');
        window.location.href = 'index.html';
    });

    updateAuthUI();
}

function setupLogin() {
    const loginForm = document.getElementById('login-form');
    const loginError = document.getElementById('login-error');

    if (!loginForm || !loginError) return;

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        if (!email || !password) {
            loginError.textContent = 'Please fill in all fields.';
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.email === email && user.password === password);

        if (!user) {
            loginError.textContent = 'Invalid email or password.';
            return;
        }

        isLoggedIn = true;
        userName = user.name;
        localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
        localStorage.setItem('userName', userName);

        loginError.textContent = '';
        alert('Login successful!');
        window.location.href = 'index.html';
    });
}

function setupSignup() {
    const signupForm = document.getElementById('signup-form');
    const signupError = document.getElementById('signup-error');

    if (!signupForm || !signupError) return;

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('signup-name').value.trim();
        const email = document.getElementById('signup-email').value.trim();
        const password = document.getElementById('signup-password').value.trim();
        const confirmPassword = document.getElementById('signup-confirm-password').value.trim();

        if (!name || !email || !password || !confirmPassword) {
            signupError.textContent = 'Please fill in all fields.';
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            signupError.textContent = 'Please enter a valid email address.';
            return;
        }

        if (password !== confirmPassword) {
            signupError.textContent = 'Passwords do not match.';
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];
        if (users.some(user => user.email === email)) {
            signupError.textContent = 'Email already registered.';
            return;
        }

        users.push({ name, email, password });
        localStorage.setItem('users', JSON.stringify(users));

        isLoggedIn = true;
        userName = name;
        localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
        localStorage.setItem('userName', userName);

        signupError.textContent = '';
        alert('Sign up successful! You are now logged in.');
        window.location.href = 'index.html';
    });
}

document.addEventListener('DOMContentLoaded', () => {
    setupAuth();
    setupLogin();
    setupSignup();
});