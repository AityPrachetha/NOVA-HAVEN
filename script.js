let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
let isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn')) || false;
let userName = localStorage.getItem('userName') || '';

const products = [
    { name: 'Magnetic Desk Organizer', category: 'Stationery', page: 'stationery.html' },
    { name: 'Magnetic Wall Planner', category: 'Stationery', page: 'stationery.html' },
    { name: 'Smart Sticky Notes', category: 'Stationery', page: 'stationery.html' },
    { name: 'Mini Desk Vacuum', category: 'Stationery', page: 'stationery.html' },
    { name: 'Adjustable Book Holder', category: 'Stationery', page: 'stationery.html' },
    { name: 'Eco Fountain Pen', category: 'Stationery', page: 'stationery.html' },
    { name: 'Cable Organizer Clips', category: 'Stationery', page: 'stationery.html' },
    { name: 'Stackable Bamboo Storage Boxes', category: 'Packaging', page: 'packaging.html' },
    { name: 'Reusable Vacuum Storage Bags', category: 'Packaging', page: 'packaging.html' },
    { name: 'Foldable Shoe Rack', category: 'Packaging', page: 'packaging.html' },
    { name: 'Wall-Mounted Cereal Dispenser', category: 'Packaging', page: 'packaging.html' },
    { name: 'Velvet Jewelry Organizer', category: 'Packaging', page: 'packaging.html' },
    { name: 'Magnetic Cable Organizer', category: 'Packaging', page: 'packaging.html' },
    { name: 'Waterproof Travel Pouches', category: 'Packaging', page: 'packaging.html' },
    { name: 'Handwoven Bamboo Basket', category: 'Handicrafts', page: 'handicrafts.html' },
    { name: 'Clay Terracotta Vase', category: 'Handicrafts', page: 'handicrafts.html' },
    { name: 'Jute Wall Hanging', category: 'Handicrafts', page: 'handicrafts.html' },
    { name: 'Wooden Carved Coasters', category: 'Handicrafts', page: 'handicrafts.html' },
    { name: 'Coconut Shell Candle Holder', category: 'Handicrafts', page: 'handicrafts.html' },
    { name: 'Handwoven Macrame Plant Hanger', category: 'Handicrafts', page: 'handicrafts.html' },
    { name: 'Bamboo Photo Frame', category: 'Handicrafts', page: 'handicrafts.html' },
    { name: 'Collapsible Fabric Boxes', category: 'Household', page: 'household.html' },
    { name: 'Vertical Rotating Shoe Carousel', category: 'Household', page: 'household.html' },
    { name: 'Over-sink Expandable Rack', category: 'Household', page: 'household.html' },
    { name: 'Motion-sensor Towel Dispenser', category: 'Household', page: 'household.html' },
    { name: 'Cutting Board with Waste Bin', category: 'Household', page: 'household.html' },
    { name: 'Dual-compartment Trash Bin', category: 'Household', page: 'household.html' },
    { name: 'Foldable 2-in-1 Fan Heater', category: 'Household', page: 'household.html' },
    { name: 'Bamboo Toothbrush', category: 'Personal Care', page: 'personalcare.html' },
    { name: 'Organic Soap Bar', category: 'Personal Care', page: 'personalcare.html' },
    { name: 'Solid Shampoo Bar', category: 'Personal Care', page: 'personalcare.html' },
    { name: 'Natural Deodorant Stick', category: 'Personal Care', page: 'personalcare.html' },
    { name: 'Stainless Steel Safety Razor', category: 'Personal Care', page: 'personalcare.html' },
    { name: 'Shea Butter Lotion Bar', category: 'Personal Care', page: 'personalcare.html' },
    { name: 'Beeswax Lip Balm', category: 'Personal Care', page: 'personalcare.html' },
    { name: 'Organic Cotton T-Shirt', category: 'Clothing', page: 'clothing.html' },
    { name: 'Linen Scarf', category: 'Clothing', page: 'clothing.html' },
    { name: 'Compostable Planter', category: 'Gardening', page: 'gardening.html' },
    { name: 'Herb Growing Kit', category: 'Gardening', page: 'gardening.html' },
    { name: 'Organic Quinoa', category: 'Groceries', page: 'groceries.html' },
    { name: 'Reusable Coffee Pods', category: 'Groceries', page: 'groceries.html' }
];

const biodegradableProducts = [
    { name: 'Eco Fountain Pen', price: 499, category: 'Stationery', co2Saved: 0.5, wasteSaved: 0.1, timeSaved: 0.3 },
    { name: 'Stackable Bamboo Storage Boxes', price: 999, category: 'Packaging', co2Saved: 1.0, wasteSaved: 0.2, timeSaved: 1.0 },
    { name: 'Foldable Shoe Rack', price: 1499, category: 'Packaging', co2Saved: 1.5, wasteSaved: 0.3, timeSaved: 1.5 },
    { name: 'Velvet Jewelry Organizer', price: 799, category: 'Packaging', co2Saved: 0.8, wasteSaved: 0.15, timeSaved: 0.8 },
    { name: 'Handwoven Bamboo Basket', price: 599, category: 'Handicrafts', co2Saved: 0.6, wasteSaved: 0.12, timeSaved: 0.5 },
    { name: 'Clay Terracotta Vase', price: 749, category: 'Handicrafts', co2Saved: 0.7, wasteSaved: 0.14, timeSaved: 0.4 },
    { name: 'Jute Wall Hanging', price: 499, category: 'Handicrafts', co2Saved: 0.5, wasteSaved: 0.1, timeSaved: 0.3 },
    { name: 'Wooden Carved Coasters', price: 399, category: 'Handicrafts', co2Saved: 0.4, wasteSaved: 0.08, timeSaved: 0.2 },
    { name: 'Coconut Shell Candle Holder', price: 299, category: 'Handicrafts', co2Saved: 0.3, wasteSaved: 0.06, timeSaved: 0.2 },
    { name: 'Handwoven Macrame Plant Hanger', price: 699, category: 'Handicrafts', co2Saved: 0.7, wasteSaved: 0.14, timeSaved: 0.5 },
    { name: 'Bamboo Photo Frame', price: 499, category: 'Handicrafts', co2Saved: 0.5, wasteSaved: 0.1, timeSaved: 0.3 },
    { name: 'Collapsible Fabric Boxes', price: 799, category: 'Household', co2Saved: 0.8, wasteSaved: 0.16, timeSaved: 1.0 },
    { name: 'Dual-compartment Trash Bin', price: 1299, category: 'Household', co2Saved: 1.2, wasteSaved: 0.24, timeSaved: 1.2 },
    { name: 'Bamboo Toothbrush', price: 99, category: 'Personal Care', co2Saved: 0.2, wasteSaved: 0.04, timeSaved: 0.5 },
    { name: 'Organic Soap Bar', price: 199, category: 'Personal Care', co2Saved: 0.3, wasteSaved: 0.06, timeSaved: 0.4 },
    { name: 'Solid Shampoo Bar', price: 299, category: 'Personal Care', co2Saved: 0.4, wasteSaved: 0.08, timeSaved: 0.4 },
    { name: 'Shea Butter Lotion Bar', price: 299, category: 'Personal Care', co2Saved: 0.4, wasteSaved: 0.08, timeSaved: 0.4 }
];

function updateCartCount() {
    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    const cartCountElements = document.querySelectorAll('#cart-count');
    cartCountElements.forEach(element => element.textContent = cartCount);
}

function addToCart(productName, price) {
    const existingItem = cartItems.find(item => item.name === productName);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({ name: productName, price: parseFloat(price), quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cartItems));
    updateCartCount();
    alert(`${productName} added to cart!`);
}

function setupCart() {
    const cartButtons = document.querySelectorAll('.cart-btn');
    cartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productName = button.getAttribute('data-product');
            const price = button.getAttribute('data-price');
            addToCart(productName, price);
        });
    });
}

function setupImpactTracker() {
    const impactTableBody = document.getElementById('impact-items');
    const impactEmpty = document.getElementById('impact-empty');
    const impactUnauthenticated = document.getElementById('impact-unauthenticated');
    const totalCo2 = document.getElementById('total-co2');
    const totalWaste = document.getElementById('total-waste');
    const totalTime = document.getElementById('total-time');

    if (!impactTableBody || !impactEmpty || !impactUnauthenticated || !totalCo2 || !totalWaste || !totalTime) return;

    impactTableBody.innerHTML = '';
    impactEmpty.style.display = 'none';
    impactUnauthenticated.style.display = 'none';

    if (!isLoggedIn) {
        impactUnauthenticated.style.display = 'block';
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.name === userName);
    if (!user) return;

    const userOrders = JSON.parse(localStorage.getItem('userOrders')) || {};
    const orders = userOrders[user.email] || [];

    let totalCo2Saved = 0;
    let totalWasteSaved = 0;
    let totalTimeSaved = 0;
    const itemMap = new Map();

    orders.forEach(order => {
        order.items.forEach(item => {
            const product = biodegradableProducts.find(p => p.name === item.name);
            if (product) {
                const key = `${item.name}-${product.category}`;
                if (itemMap.has(key)) {
                    const existing = itemMap.get(key);
                    existing.quantity += item.quantity;
                    existing.co2Saved += product.co2Saved * item.quantity;
                    existing.wasteSaved += product.wasteSaved * item.quantity;
                    existing.timeSaved += product.timeSaved * item.quantity;
                } else {
                    itemMap.set(key, {
                        name: item.name,
                        category: product.category,
                        quantity: item.quantity,
                        co2Saved: product.co2Saved * item.quantity,
                        wasteSaved: product.wasteSaved * item.quantity,
                        timeSaved: product.timeSaved * item.quantity
                    });
                }
                totalCo2Saved += product.co2Saved * item.quantity;
                totalWasteSaved += product.wasteSaved * item.quantity;
                totalTimeSaved += product.timeSaved * item.quantity;
            }
        });
    });

    if (itemMap.size === 0) {
        impactEmpty.style.display = 'block';
        totalCo2.textContent = '0';
        totalWaste.textContent = '0';
        totalTime.textContent = '0';
        return;
    }

    itemMap.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.category}</td>
            <td>${item.quantity}</td>
            <td>${item.co2Saved.toFixed(2)}</td>
            <td>${item.wasteSaved.toFixed(2)}</td>
            <td>${item.timeSaved.toFixed(2)}</td>
        `;
        impactTableBody.appendChild(row);
    });

    totalCo2.textContent = totalCo2Saved.toFixed(2);
    totalWaste.textContent = totalWasteSaved.toFixed(2);
    totalTime.textContent = totalTimeSaved.toFixed(2);
}

function setupSearch() {
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    if (!searchForm || !searchInput || !searchResults) return;

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = searchInput.value.trim().toLowerCase();
        searchResults.innerHTML = '';

        if (query === '') {
            searchResults.style.display = 'none';
            return;
        }

        const results = products.filter(product =>
            product.name.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query)
        );

        if (results.length === 0) {
            searchResults.innerHTML = '<p>No products found.</p>';
            searchResults.style.display = 'block';
            return;
        }

        results.forEach(product => {
            const resultItem = document.createElement('div');
            resultItem.className = 'search-result-item';
            resultItem.innerHTML = `<a href="${product.page}">${product.name} (${product.category})</a>`;
            searchResults.appendChild(resultItem);
        });

        searchResults.style.display = 'block';
    });

    searchInput.addEventListener('input', () => {
        if (searchInput.value.trim() === '') {
            searchResults.innerHTML = '';
            searchResults.style.display = 'none';
        }
    });
}

function setupReturnForm() {
    const returnForm = document.getElementById('return-form');
    const returnProductSelect = document.getElementById('return-product');
    const returnError = document.getElementById('return-error');

    if (!returnForm || !returnProductSelect) return;

    biodegradableProducts.forEach(product => {
        const option = document.createElement('option');
        option.value = product.name;
        option.textContent = `${product.name} (${product.category})`;
        returnProductSelect.appendChild(option);
    });

    returnForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const productName = returnProductSelect.value;
        const usageDuration = parseFloat(document.getElementById('usage-duration').value);

        if (isNaN(usageDuration) || usageDuration < 0) {
            returnError.textContent = 'Please enter a valid usage duration.';
            return;
        }

        const product = biodegradableProducts.find(p => p.name === productName);
        if (!product) {
            returnError.textContent = 'Product not found.';
            return;
        }

        const depreciationRate = 0.10;
        const minRefundPercentage = 0.20;
        const monthsUsed = Math.min(usageDuration, 8);
        const refundPercentage = Math.max(1 - (depreciationRate * monthsUsed), minRefundPercentage);
        const refundAmount = product.price * refundPercentage;

        returnError.textContent = '';
        alert(`Return submitted for ${productName}. Refund amount: ₹${refundAmount.toFixed(2)}`);
        returnForm.reset();
    });
}

function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    const contactError = document.getElementById('contact-error');

    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const feedback = document.getElementById('feedback').value.trim();

        if (!name || !email || !feedback) {
            contactError.textContent = 'Please fill in all fields.';
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            contactError.textContent = 'Please enter a valid email address.';
            return;
        }

        contactError.textContent = '';
        alert(`Thank you, ${name}! Your feedback has been submitted.`);
        contactForm.reset();
    });
}

function setupHamburger() {
    const hamburgerToggle = document.querySelector('.hamburger-toggle .hamburger-icon');
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    if (hamburgerToggle && hamburgerMenu) {
        hamburgerToggle.addEventListener('click', (e) => {
            e.preventDefault();
            hamburgerMenu.style.display = hamburgerMenu.style.display === 'block' ? 'none' : 'block';
        });
    }
}

function setupFilter() {
    const filterSelect = document.getElementById('mood-select');
    if (!filterSelect) return;

    filterSelect.addEventListener('change', () => {
        const selectedFilter = filterSelect.value.toLowerCase();
        const products = document.querySelectorAll('.product');

        if (!products.length) {
            console.error('No products found with class .product');
            return;
        }

        products.forEach(product => {
            const productFilter = product.getAttribute('data-filter')?.toLowerCase();
            if (!productFilter) {
                console.warn(`Product missing data-filter attribute:`, product);
                product.style.display = 'none';
                return;
            }

            if (selectedFilter === 'all' || productFilter === selectedFilter) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    });
}

function setupLoginForm() {
    const loginForm = document.getElementById('login-form');
    const loginError = document.getElementById('login-error');

    if (!loginForm || !loginError) return;

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        if (!email || !password) {
            loginError.textContent = 'Please enter both email and password.';
            alert('Login failed: Please enter both email and password.');
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            isLoggedIn = true;
            userName = user.name;
            localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
            localStorage.setItem('userName', userName);
            loginError.textContent = '';
            alert('Login successful! Welcome back to Nova Haven.');
            window.location.href = 'index.html'; // Redirect to homepage
        } else {
            loginError.textContent = 'Invalid email or password.';
            alert('Login failed: Invalid email or password.');
        }
    });
}

function setupSignupForm() {
    const signupForm = document.getElementById('signup-form');
    const signupError = document.getElementById('signup-error');

    if (!signupForm || !signupError) return;

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('signup-email').value.trim();
        const password = document.getElementById('signup-password').value.trim();
        const confirmPassword = document.getElementById('confirm-password').value.trim();
        const name = email.split('@')[0]; // Simple name derivation from email

        if (!email || !password || !confirmPassword) {
            signupError.textContent = 'Please fill in all fields.';
            alert('Signup failed: Please fill in all fields.');
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            signupError.textContent = 'Please enter a valid email address.';
            alert('Signup failed: Please enter a valid email address.');
            return;
        }

        if (password !== confirmPassword) {
            signupError.textContent = 'Passwords do not match.';
            alert('Signup failed: Passwords do not match.');
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];
        if (users.some(u => u.email === email)) {
            signupError.textContent = 'Email already registered.';
            alert('Signup failed: Email already registered.');
            return;
        }

        users.push({ name, email, password });
        localStorage.setItem('users', JSON.stringify(users));
        isLoggedIn = true;
        userName = name;
        localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
        localStorage.setItem('userName', userName);
        signupError.textContent = '';
        alert('Signup successful! Welcome to Nova Haven.');
        window.location.href = 'login.html'; // Redirect to homepage
    });
}

document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    setupCart();
    setupSearch();
    setupFilter();
    setupReturnForm();
    setupContactForm();
    setupHamburger();
    setupImpactTracker();
    setupLoginForm();
    setupSignupForm();
});