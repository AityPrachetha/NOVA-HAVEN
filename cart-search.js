// Initialize cart, wishlist, and login status from localStorage
let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
let wishlistItems = JSON.parse(localStorage.getItem('wishlist')) || [];
let isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn')) || false;
let userName = localStorage.getItem('userName') || '';

// Exchange rates for currency conversion (INR base)
const exchangeRates = {
    USD: { INR: 83, EUR: 0.95, GBP: 0.80, JPY: 150 },
    INR: { USD: 1/83, EUR: 1/83 * 0.95, GBP: 1/83 * 0.80, JPY: 1/83 * 150 },
    EUR: { USD: 1/0.95, INR: 83/0.95, GBP: 0.80/0.95, JPY: 150/0.95 },
    GBP: { USD: 1/0.80, INR: 83/0.80, EUR: 0.95/0.80, JPY: 150/0.80 },
    JPY: { USD: 1/150, INR: 83/150, EUR: 0.95/150, GBP: 0.80/150 }
};

// Currency symbols for display
const currencySymbols = {
    INR: '₹',
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥'
};

// Product catalog
const products = [
    { name: 'Magnetic Desk Organizer', category: 'Stationery', page: 'stationery.html', price: 599, image: '/images/magnetic-desk-organizer.jpg' },
    { name: 'Eco Fountain Pen', category: 'Stationery', page: 'stationery.html', price: 499, image: '/images/eco-fountain-pen.jpg' },
    { name: 'Stackable Bamboo Storage Boxes', category: 'Packaging', page: 'packaging.html', price: 999, image: '/images/bamboo-storage-boxes.jpg' },
    { name: 'Foldable Shoe Rack', category: 'Packaging', page: 'packaging.html', price: 1499, image: '/images/foldable-shoe-rack.jpg' },
    { name: 'Velvet Jewelry Organizer', category: 'Packaging', page: 'packaging.html', price: 799, image: '/images/velvet-jewelry-organizer.jpg' },
    { name: 'Handwoven Bamboo Basket', category: 'Handicrafts', page: 'handicrafts.html', price: 599, image: '/images/bamboo-basket.jpg' },
    { name: 'Clay Terracotta Vase', category: 'Handicrafts', page: 'handicrafts.html', price: 749, image: '/images/terracotta-vase.jpg' },
    { name: 'Jute Wall Hanging', category: 'Handicrafts', page: 'handicrafts.html', price: 499, image: '/images/jute-wall-hanging.jpg' },
    { name: 'Wooden Carved Coasters', category: 'Handicrafts', page: 'handicrafts.html', price: 399, image: '/images/wooden-coasters.jpg' },
    { name: 'Coconut Shell Candle Holder', category: 'Handicrafts', page: 'handicrafts.html', price: 299, image: '/images/candle-holder.jpg' },
    { name: 'Handwoven Macrame Plant Hanger', category: 'Handicrafts', page: 'handicrafts.html', price: 699, image: '/images/macrame-hanger.jpg' },
    { name: 'Bamboo Photo Frame', category: 'Handicrafts', page: 'handicrafts.html', price: 499, image: '/images/bamboo-frame.jpg' },
    { name: 'Collapsible Fabric Boxes', category: 'Household', page: 'household.html', price: 799, image: '/images/fabric-boxes.jpg' },
    { name: 'Dual-compartment Trash Bin', category: 'Household', page: 'household.html', price: 1299, image: '/images/trash-bin.jpg' },
    { name: 'Bamboo Toothbrush', category: 'Personal Care', page: 'personalcare.html', price: 99, image: '/images/bamboo-toothbrush.jpg' },
    { name: 'Organic Soap Bar', category: 'Personal Care', page: 'personalcare.html', price: 199, image: '/images/soap-bar.jpg' },
    { name: 'Solid Shampoo Bar', category: 'Personal Care', page: 'personalcare.html', price: 299, image: '/images/shampoo-bar.jpg' },
    { name: 'Shea Butter Lotion Bar', category: 'Personal Care', page: 'personalcare.html', price: 299, image: '/images/lotion-bar.jpg' }
];

// Convert price between currencies
function convertPrice(amount, fromCurrency, toCurrency) {
    if (fromCurrency === toCurrency) return amount;
    return amount * exchangeRates[fromCurrency][toCurrency];
}

// Format price with currency symbol
function formatPrice(amount, currency) {
    const decimals = currency === 'JPY' ? 0 : 2;
    return `${currencySymbols[currency]}${amount.toFixed(decimals)}`;
}

// Update cart count display
function updateCartCount() {
    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    const cartCountElements = document.querySelectorAll('#cart-count');
    cartCountElements.forEach(element => element.textContent = cartCount);
}

// Add product to cart
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

// Add product to wishlist
function addToWishlist(productName, price, image) {
    const existingItem = wishlistItems.find(item => item.name === productName);
    if (existingItem) {
        alert(`${productName} is already in your wishlist!`);
        return;
    }
    wishlistItems.push({ name: productName, price: parseFloat(price), image });
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
    alert(`${productName} added to wishlist!`);
}

// Setup cart and wishlist buttons
function setupCart() {
    const cartButtons = document.querySelectorAll('.cart-btn');
    cartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productName = button.getAttribute('data-product');
            const price = button.getAttribute('data-price');
            addToCart(productName, price);
        });
    });

    const wishlistButtons = document.querySelectorAll('.wishlist-btn');
    wishlistButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productName = button.getAttribute('data-product');
            const price = button.getAttribute('data-price');
            const image = button.getAttribute('data-image');
            addToWishlist(productName, price, image);
        });
    });
}

// Update cart display with currency support
function updateCartDisplay(currency = 'INR') {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const cartEmptyElement = document.getElementById('cart-empty');

    if (!cartItemsContainer || !cartTotalElement || !cartEmptyElement) {
        console.error('Cart elements not found:', {
            cartItemsContainer: !!cartItemsContainer,
            cartTotalElement: !!cartTotalElement,
            cartEmptyElement: !!cartEmptyElement
        });
        return;
    }

    cartItemsContainer.innerHTML = '';
    if (cartItems.length === 0) {
        cartEmptyElement.style.display = 'block';
        cartTotalElement.textContent = formatPrice(0, currency);
        return;
    }

    cartEmptyElement.style.display = 'none';
    let total = 0;

    cartItems.forEach((item, index) => {
        const priceInCurrency = convertPrice(item.price, 'INR', currency);
        const subtotal = priceInCurrency * item.quantity;
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p>Price: ${formatPrice(priceInCurrency, currency)}</p>
                <p>Subtotal: ${formatPrice(subtotal, currency)}</p>
            </div>
            <div class="cart-item-quantity">
                <button class="quantity-decrease" data-index="${index}">-</button>
                <input type="number" value="${item.quantity}" min="1" data-index="${index}" class="quantity-input">
                <button class="quantity-increase" data-index="${index}">+</button>
            </div>
            <span class="cart-item-remove" data-index="${index}">Remove</span>
        `;
        cartItemsContainer.appendChild(itemElement);
        total += subtotal;
    });

    cartTotalElement.textContent = formatPrice(total, currency);

    // Event delegation for quantity controls
    cartItemsContainer.addEventListener('click', (e) => {
        const index = parseInt(e.target.getAttribute('data-index'));
        if (e.target.classList.contains('quantity-decrease') && cartItems[index].quantity > 1) {
            cartItems[index].quantity -= 1;
            localStorage.setItem('cart', JSON.stringify(cartItems));
            updateCartDisplay(currency);
            updateCartCount();
        } else if (e.target.classList.contains('quantity-increase')) {
            cartItems[index].quantity += 1;
            localStorage.setItem('cart', JSON.stringify(cartItems));
            updateCartDisplay(currency);
            updateCartCount();
        } else if (e.target.classList.contains('cart-item-remove')) {
            cartItems.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cartItems));
            updateCartDisplay(currency);
            updateCartCount();
        }
    }, { once: true });

    cartItemsContainer.addEventListener('change', (e) => {
        if (e.target.classList.contains('quantity-input')) {
            const index = parseInt(e.target.getAttribute('data-index'));
            const value = parseInt(e.target.value);
            if (value >= 1) {
                cartItems[index].quantity = value;
                localStorage.setItem('cart', JSON.stringify(cartItems));
                updateCartDisplay(currency);
                updateCartCount();
            }
        }
    }, { once: true });
}

// Generate invoice with currency support and save order
function generateBill(orderDetails) {
    console.log('Generating bill for order:', orderDetails);
    const billModal = document.getElementById('bill-modal');
    const billContent = document.getElementById('bill-content');
    if (!billModal || !billContent) {
        console.error('Bill modal or content not found');
        return;
    }

    const currency = orderDetails.currency || 'INR';
    let total = 0;
    let billHTML = `
        <h2>Invoice</h2>
        <p><strong>Order ID:</strong> ${Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
        <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
        <p><strong>Customer:</strong> ${orderDetails.name}</p>
        <p><strong>Email:</strong> ${orderDetails.email}</p>
        <p><strong>Transaction Type:</strong> ${orderDetails.transactionType}</p>
        ${orderDetails.transactionType === 'rent' ? `<p><strong>Rental Duration:</strong> ${orderDetails.rentalMonths} months</p>` : ''}
        <p><strong>Payment Method:</strong> ${orderDetails.paymentMethod === 'card' ? `Card (**** **** **** ${orderDetails.paymentDetails.cardNumber})` : `UPI (${orderDetails.paymentDetails.upiId})`}</p>
        <p><strong>Currency:</strong> ${currency} (${currencySymbols[currency]})</p>
        <table class="bill-table">
            <thead>
                <tr>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Price (${currencySymbols[currency]})</th>
                    <th>Subtotal (${currencySymbols[currency]})</th>
                </tr>
            </thead>
            <tbody>
    `;

    cartItems.forEach(item => {
        const priceInCurrency = convertPrice(item.price, 'INR', currency);
        const multiplier = orderDetails.transactionType === 'rent' ? (orderDetails.rentalMonths || 1) : 1;
        const subtotal = priceInCurrency * item.quantity * multiplier;
        total += subtotal;
        billHTML += `
            <tr>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>${formatPrice(priceInCurrency, currency)}</td>
                <td>${formatPrice(subtotal, currency)}</td>
            </tr>
        `;
    });

    billHTML += `
            </tbody>
        </table>
        <p class="bill-total"><strong>Total:</strong> ${formatPrice(total, currency)}</p>
        <button id="download-bill">Download PDF</button>
    `;

    billContent.innerHTML = billHTML;
    billModal.style.display = 'block';

    // Save order to localStorage for impact tracker
    const orderId = billHTML.match(/Order ID: ([A-Z0-9]+)/)[1];
    const order = {
        orderId,
        date: new Date().toLocaleDateString(),
        items: cartItems.map(item => ({ name: item.name, quantity: item.quantity })),
        transactionType: orderDetails.transactionType,
        rentalMonths: orderDetails.transactionType === 'rent' ? orderDetails.rentalMonths : null,
        currency,
        total
    };
    const userOrders = JSON.parse(localStorage.getItem('userOrders')) || {};
    if (!userOrders[orderDetails.email]) {
        userOrders[orderDetails.email] = [];
    }
    userOrders[orderDetails.email].push(order);
    localStorage.setItem('userOrders', JSON.stringify(userOrders));
    console.log('Order saved to localStorage:', userOrders);

    const downloadButton = document.getElementById('download-bill');
    downloadButton.addEventListener('click', () => {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text('Invoice', 105, 20, { align: 'center' });
        doc.setFontSize(12);
        doc.text(`Order ID: ${orderId}`, 20, 40);
        doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 50);
        doc.text(`Customer: ${orderDetails.name}`, 20, 60);
        doc.text(`Email: ${orderDetails.email}`, 20, 70);
        doc.text(`Transaction Type: ${orderDetails.transactionType}`, 20, 80);
        let yOffset = 90;
        if (orderDetails.transactionType === 'rent') {
            doc.text(`Rental Duration: ${orderDetails.rentalMonths} months`, 20, yOffset);
            yOffset += 10;
        }
        doc.text(`Payment Method: ${orderDetails.paymentMethod === 'card' ? `Card (**** **** **** ${orderDetails.paymentDetails.cardNumber})` : `UPI (${orderDetails.paymentDetails.upiId})`}`, 20, yOffset);
        doc.text(`Currency: ${currency} (${currencySymbols[currency]})`, 20, yOffset + 10);

        const tableData = cartItems.map(item => {
            const priceInCurrency = convertPrice(item.price, 'INR', currency);
            const multiplier = orderDetails.transactionType === 'rent' ? (orderDetails.rentalMonths || 1) : 1;
            return [
                item.name,
                item.quantity,
                formatPrice(priceInCurrency, currency),
                formatPrice(priceInCurrency * item.quantity * multiplier, currency)
            ];
        });
        doc.autoTable({
            startY: yOffset + 20,
            head: [['Item', 'Quantity', `Price (${currencySymbols[currency]})`, `Subtotal (${currencySymbols[currency]})`]],
            body: tableData,
            theme: 'grid',
            headStyles: { fillColor: [55, 65, 81] },
            margin: { left: 20, right: 20 }
        });

        doc.text(`Total: ${formatPrice(total, currency)}`, 20, doc.lastAutoTable.finalY + 10);
        doc.save(`invoice_${orderDetails.name}_${Date.now()}.pdf`);
    }, { once: true });

    const closeModal = () => billModal.style.display = 'none';
    document.querySelector('#bill-modal .close').addEventListener('mousedown', closeModal, { once: true });
    window.addEventListener('mousedown', (event) => {
        if (event.target === billModal) closeModal();
    }, { once: true });
}

// Setup checkout form
function setupCheckout() {
    const checkoutButton = document.getElementById('checkout-btn');
    const modal = document.getElementById('buyrent-modal');
    const closeButton = document.querySelector('#buyrent-modal .close');
    const buyRentForm = document.getElementById('buyrent-form');
    const orderError = document.getElementById('order-error');
    const transactionTypeSelect = document.getElementById('transaction-type');
    const paymentMethodSelect = document.getElementById('payment-method');

    if (!checkoutButton || !modal || !buyRentForm || !orderError || !transactionTypeSelect || !paymentMethodSelect) {
        console.error('Required checkout elements not found:', {
            checkoutButton: !!checkoutButton,
            modal: !!modal,
            buyRentForm: !!buyRentForm,
            orderError: !!orderError,
            transactionTypeSelect: !!transactionTypeSelect,
            paymentMethodSelect: !!paymentMethodSelect
        });
        return;
    }

    // Update form fields dynamically
    transactionTypeSelect.addEventListener('change', () => {
        const rentalDurationDiv = document.getElementById('rental-duration');
        if (rentalDurationDiv) {
            rentalDurationDiv.style.display = transactionTypeSelect.value === 'rent' ? 'block' : 'none';
        }
    });

    paymentMethodSelect.addEventListener('change', () => {
        const paymentDetailsDiv = document.getElementById('payment-details');
        if (paymentDetailsDiv) {
            paymentDetailsDiv.innerHTML = paymentMethodSelect.value === 'card' ? `
                <label for="card-number">Card Number:</label>
                <input type="text" id="card-number" placeholder="1234 5678 9012 3456" maxlength="19"><br>
                <label for="card-expiry">Expiry (MM/YY):</label>
                <input type="text" id="card-expiry" placeholder="MM/YY" maxlength="5"><br>
                <label for="card-cvv">CVV:</label>
                <input type="password" id="card-cvv" placeholder="123" maxlength="3"><br>
            ` : paymentMethodSelect.value === 'upi' ? `
                <label for="upi-id">UPI ID:</label><br>
                <input type="text" id="upi-id" placeholder="example@upi"><br>
            ` : '';
        }
    });

    checkoutButton.addEventListener('click', () => {
        if (cartItems.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        if (!isLoggedIn) {
            alert('Please log in to proceed with checkout.');
            window.location.href = 'login.html';
            return;
        }
        modal.style.display = 'block';
        // Initialize form fields
        transactionTypeSelect.dispatchEvent(new Event('change'));
        paymentMethodSelect.dispatchEvent(new Event('change'));
    });

    buyRentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const transactionType = transactionTypeSelect.value;
        const paymentMethod = paymentMethodSelect.value;
        const currency = document.getElementById('currency').value;
        const rentalMonths = transactionType === 'rent' ? document.getElementById('rental-months')?.value : null;
        const cardNumber = paymentMethod === 'card' ? document.getElementById('card-number')?.value.trim() : '';
        const cardExpiry = paymentMethod === 'card' ? document.getElementById('card-expiry')?.value.trim() : '';
        const cardCvv = paymentMethod === 'card' ? document.getElementById('card-cvv')?.value.trim() : '';
        const upiId = paymentMethod === 'upi' ? document.getElementById('upi-id')?.value.trim() : '';

        // Validation
        if (!name || !email || !transactionType || !paymentMethod || !currency) {
            orderError.textContent = 'Please fill in all fields.';
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            orderError.textContent = 'Please enter a valid email address.';
            return;
        }

        if (transactionType === 'rent' && (!rentalMonths || isNaN(rentalMonths) || rentalMonths < 1 || rentalMonths > 12)) {
            orderError.textContent = 'Please enter a valid rental duration (1-12 months).';
            return;
        }

        if (paymentMethod === 'card' && (!cardNumber || !/^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/.test(cardNumber) || !cardExpiry || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardExpiry) || !cardCvv || !/^\d{3}$/.test(cardCvv))) {
            orderError.textContent = 'Please enter valid card details.';
            return;
        }

        if (paymentMethod === 'upi' && (!upiId || !/^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/.test(upiId))) {
            orderError.textContent = 'Please enter a valid UPI ID.';
            return;
        }

        orderError.textContent = '';
        const orderDetails = {
            name,
            email,
            transactionType,
            currency,
            paymentMethod,
            paymentDetails: paymentMethod === 'card' ? { cardNumber: cardNumber.replace(/\s/g, '').slice(-4) } : { upiId },
            rentalMonths: transactionType === 'rent' ? parseInt(rentalMonths) : null
        };
        console.log('Order details before generating bill:', orderDetails);
        alert(`Order placed successfully! Transaction Type: ${transactionType}, Payment Method: ${paymentMethod}, Currency: ${currency}${transactionType === 'rent' ? `, Rental Duration: ${rentalMonths} months` : ''}`);
        generateBill(orderDetails);
        modal.style.display = 'none';
        cartItems = [];
        localStorage.setItem('cart', JSON.stringify(cartItems));
        updateCartCount();
        updateCartDisplay(currency);
        buyRentForm.reset();
        if (document.getElementById('rental-duration')) document.getElementById('rental-duration').style.display = 'none';
        if (document.getElementById('payment-details')) document.getElementById('payment-details').innerHTML = '';
    });

    if (closeButton) {
        closeButton.addEventListener('click', () => {
            modal.style.display = 'none';
            buyRentForm.reset();
            if (document.getElementById('rental-duration')) document.getElementById('rental-duration').style.display = 'none';
            if (document.getElementById('payment-details')) document.getElementById('payment-details').innerHTML = '';
        });
    }

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
            buyRentForm.reset();
            if (document.getElementById('rental-duration')) document.getElementById('rental-duration').style.display = 'none';
            if (document.getElementById('payment-details')) document.getElementById('payment-details').innerHTML = '';
        }
    });
}

// Setup search functionality
function setupSearch() {
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    if (!searchForm || !searchInput || !searchResults) {
        console.error('Search elements not found');
        return;
    }

    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const query = searchInput.value.trim().toLowerCase();
        searchResults.innerHTML = '';

        if (query === '') {
            searchResults.classList.remove('show');
            return;
        }

        const filteredResults = products.filter(product =>
            product.name.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query)
        );

        if (filteredResults.length === 0) {
            searchResults.innerHTML = '<p>No products found.</p>';
            searchResults.classList.add('show');
            return;
        }

        filteredResults.forEach(product => {
            const resultItem = document.createElement('div');
            resultItem.className = 'search-result-item';
            resultItem.innerHTML = `
                <img src="${product.image}" alt="${product.name}" style="width: 50px; height: 50px;">
                <div>
                    <a href="${product.page}">${product.name}</a>
                    <p>Category: ${product.category}</p>
                    <p>Price: ${formatPrice(product.price, 'INR')}</p>
                </div>
            `;
            searchResults.appendChild(resultItem);
        });

        searchResults.classList.add('show');
    });

    searchInput.addEventListener('input', () => {
        if (searchInput.value.trim() === '') {
            searchResults.innerHTML = '';
            searchResults.classList.remove('show');
        }
    });
}

// Setup return form
function setupReturnForm() {
    const returnForm = document.getElementById('return-form');
    const returnProductSelect = document.getElementById('return-product');
    const returnError = document.getElementById('return-error');
    const productPhotoInput = document.getElementById('product-photo');

    if (!returnForm || !returnProductSelect || !returnError || !productPhotoInput) {
        console.error('Return form elements not found');
        return;
    }

    products.forEach(product => {
        const option = document.createElement('option');
        option.value = product.name;
        option.textContent = `${product.name} (${product.category})`;
        returnProductSelect.appendChild(option);
    });

    returnForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const productName = returnProductSelect.value;
        const usageDuration = parseFloat(document.getElementById('usage-duration').value);
        const productPhoto = productPhotoInput.files[0];

        if (!productName || isNaN(usageDuration) || !productPhoto) {
            returnError.textContent = 'Please fill in all fields, including a product photo.';
            return;
        }

        if (usageDuration < 0) {
            returnError.textContent = 'Please enter a valid usage duration.';
            return;
        }

        if (!['image/jpeg', 'image/png'].includes(productPhoto.type)) {
            returnError.textContent = 'Please upload a JPEG or PNG image.';
            return;
        }

        if (productPhoto.size > 5 * 1024 * 1024) {
            returnError.textContent = 'Photo size must be less than 5MB.';
            return;
        }

        const product = products.find(p => p.name === productName);
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
        alert(`Return submitted for ${productName}. Refund amount: ${formatPrice(refundAmount, 'INR')}. Photo uploaded: ${productPhoto.name}`);
        returnForm.reset();
    });
}

// Setup gift card form
function setupGiftCardForm() {
    const giftCardForm = document.getElementById('gift-card-form');
    const giftAmountSelect = document.getElementById('gift-amount');
    const customAmountInput = document.getElementById('custom-amount');
    const giftError = document.getElementById('gift-error');
    const currencySelect = document.getElementById('gift-currency');

    if (!giftCardForm || !giftAmountSelect || !customAmountInput || !giftError || !currencySelect) {
        console.error('Gift card form elements not found');
        return;
    }

    giftAmountSelect.addEventListener('change', () => {
        customAmountInput.style.display = giftAmountSelect.value === 'custom' ? 'block' : 'none';
    });

    giftCardForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const amountSelect = giftAmountSelect.value;
        const customAmount = parseFloat(customAmountInput.value);
        const name = document.getElementById('recipient-name').value.trim();
        const email = document.getElementById('recipient-email').value.trim();
        const message = document.getElementById('gift-message').value.trim();
        const currency = currencySelect.value;

        if (!amountSelect || !name || !email || !currency) {
            giftError.textContent = 'Please fill in all required fields.';
            return;
        }

        if (!/^[a-zA-Z\s]+$/.test(name)) {
            giftError.textContent = 'Please enter a valid recipient name.';
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            giftError.textContent = 'Please enter a valid email address.';
            return;
        }

        let finalAmount;
        if (amountSelect === 'custom') {
            if (isNaN(customAmount) || customAmount < 25 || customAmount > 500) {
                giftError.textContent = 'Custom amount must be between 25 and 500 in INR.';
                return;
            }
            finalAmount = customAmount;
        } else {
            finalAmount = parseFloat(amountSelect);
        }

        const amountInCurrency = convertPrice(finalAmount, 'INR', currency);
        giftError.textContent = '';
        const messageText = message ? `Message: ${message}` : 'No message provided.';
        alert(`Gift card of ${formatPrice(amountInCurrency, currency)} sent to ${name} (${email})! ${messageText}`);
        giftCardForm.reset();
        customAmountInput.style.display = 'none';
    });
}

// Setup wishlist display
function setupWishlist(currency = 'INR') {
    const wishlistItemsContainer = document.getElementById('wishlist-items');
    const wishlistEmptyElement = document.getElementById('wishlist-empty');

    if (!wishlistItemsContainer || !wishlistEmptyElement) {
        console.error('Wishlist elements not found');
        return;
    }

    wishlistItemsContainer.innerHTML = '';
    if (wishlistItems.length === 0) {
        wishlistEmptyElement.style.display = 'block';
        return;
    }

    wishlistEmptyElement.style.display = 'none';

    wishlistItems.forEach((item, index) => {
        const priceInCurrency = convertPrice(item.price, 'INR', currency);
        const itemElement = document.createElement('div');
        itemElement.className = 'wishlist-item';
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px;">
            <div class="wishlist-item-details">
                <h4>${item.name}</h4>
                <p>Price: ${formatPrice(priceInCurrency, currency)}</p>
            </div>
            <button class="add-to-cart-btn" data-index="${index}">Add to Cart</button>
            <span class="remove-wishlist" data-index="${index}">Remove</span>
        `;
        wishlistItemsContainer.appendChild(itemElement);
    });

    wishlistItemsContainer.addEventListener('click', (e) => {
        const index = parseInt(e.target.getAttribute('data-index'));
        if (e.target.classList.contains('add-to-cart-btn')) {
            const item = wishlistItems[index];
            addToCart(item.name, item.price);
            wishlistItems.splice(index, 1);
            localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
            setupWishlist(currency);
        } else if (e.target.classList.contains('remove-wishlist')) {
            wishlistItems.splice(index, 1);
            localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
            setupWishlist(currency);
        }
    }, { once: true });
}

// Setup contact form
function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    const contactError = document.getElementById('contact-error');

    if (!contactForm || !contactError) {
        console.error('Contact form elements not found');
        return;
    }

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

// Setup hamburger menu
function setupHamburger() {
    const hamburgerToggle = document.querySelector('.hamburger-toggle .hamburger-icon');
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    if (!hamburgerToggle || !hamburgerMenu) {
        console.error('Hamburger menu elements not found');
        return;
    }
    hamburgerToggle.addEventListener('click', (e) => {
        e.preventDefault();
        hamburgerMenu.classList.toggle('active');
    });
}

// Setup authentication
function setupAuth() {
    const loginLink = document.getElementById('login-link');
    const logoutLink = document.getElementById('logout-link');

    if (!loginLink || !logoutLink) {
        console.error('Authentication link elements not found');
        return;
    }

    // Update login form fields dynamically based on UI state
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

    // Handle user logout
    logoutLink.addEventListener('mousedown', (event) => {
        event.preventDefault();
        isLoggedIn = false;
        userName = '';
        localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
        localStorage.removeItem('userName');
        updateAuthUI();
        alert('Logged out successfully! logged out');
        window.location.href = 'index.html';
    });

    updateAuthUI();
}

// Setup signup form
function setupSignup() {
    const signupForm = document.getElementById('signup-form');
    const signupError = document.getElementById('signup-error');

    if (!signupForm || !signupError) {
        console.error('Signup form fields elements not found');
        return;
    }

    signupForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('signup-name').value.trim();
        const email = document.getElementById('signup-email').value.trim();
        const password = document.getElementById('signup-password').value.trim();
        const confirmPassword = document.getElementById('signup-confirm-password').value.trim();

        // Validate user input fields
        if (!name || !email || !password || !confirmPassword) {
            signupError.textContent = 'Please fill in all fields.';
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            signupError.textContent = 'Please enter a valid email address.';
            return;
        }

        if (password !== confirmPassword) {
            signupError.textContent = 'Passwords do not match!';
            return;
        }

        // Check if user already exists in signup
        const users = JSON.parse(localStorage.getItem('users')) || [];
        if (users.some(user => user.email === email)) {
            signupError.textContent = 'Email already registered.';
            return;
        }

        // Store user data (insecure for production use; ideally use a backend server)
        users.push({ name, email, password }); // Password should be hashed in production
        localStorage.setItem('users', JSON.stringify(users));

        // Update authentication login state
        isLoggedIn = true;
        userName = name;
        localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
        localStorage.setItem('userName', userName);

        signupError.textContent = '';
        alert('Sign up successful! You are now logged in.');
        window.location.href = 'index.html'; // Redirect user to homepage
    });
}

// Initialize setup listeners on DOM content load
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    setupCart();
    setupSearch();
    updateCartDisplay();
    setupCheckout();
    setupReturnForm();
    setupGiftCard();
Form();
    setupWishlist();
    setupContactForm();
    setupHamburger();
    setupAuth();
    setupSignup();
});