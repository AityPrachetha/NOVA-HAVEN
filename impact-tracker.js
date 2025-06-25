const products = [
    // Stationery
    { name: 'bioQ Plantable Seed Pens', category: 'Stationery', eco: 'Compostable', co2Saved: 0.3, wasteSaved: 0.15, timeSaved: 0.2 },
    { name: 'Reusable Whiteboard Notebooks', category: 'Stationery', eco: 'Reusable', co2Saved: 1.0, wasteSaved: 0.3, timeSaved: 0.8 },
    { name: 'Eco-Friendly Notebook', category: 'Stationery', eco: 'Sustainable', co2Saved: 0.5, wasteSaved: 0.1, timeSaved: 0.3 },
    { name: 'Bamboo Desk Organizer', category: 'Stationery', eco: 'Sustainable', co2Saved: 0.8, wasteSaved: 0.2, timeSaved: 0.5 },
    { name: 'Recycled Paper Sticky Notes', category: 'Stationery', eco: 'Sustainable', co2Saved: 0.2, wasteSaved: 0.05, timeSaved: 0.1 },
    { name: 'Wooden Pencil Set', category: 'Stationery', eco: 'Sustainable', co2Saved: 0.3, wasteSaved: 0.08, timeSaved: 0.2 },
    { name: 'Reusable Paper Clips', category: 'Stationery', eco: 'Reusable', co2Saved: 0.4, wasteSaved: 0.1, timeSaved: 0.6 },
    // Household
    { name: 'Collapsible Fabric Boxes', category: 'Household', eco: 'Recyclable', co2Saved: 1.5, wasteSaved: 0.4, timeSaved: 0.7 },
    { name: 'Vertical Rotating Shoe Carousel', category: 'Household', eco: 'Sustainable', co2Saved: 2.0, wasteSaved: 0.5, timeSaved: 1.0 },
    { name: 'Over-sink Expandable Rack', category: 'Household', eco: 'Sustainable', co2Saved: 1.2, wasteSaved: 0.3, timeSaved: 0.8 },
    { name: 'Motion-sensor Towel Dispenser', category: 'Household', eco: 'Reusable', co2Saved: 1.8, wasteSaved: 0.6, timeSaved: 1.2 },
    { name: 'Cutting Board with Waste Bin', category: 'Household', eco: 'Sustainable', co2Saved: 1.0, wasteSaved: 0.25, timeSaved: 0.5 },
    { name: 'Dual-compartment Trash Bin', category: 'Household', eco: 'Recyclable', co2Saved: 2.5, wasteSaved: 0.7, timeSaved: 1.0 },
    { name: 'Foldable 2-in-1 Fan Heater', category: 'Household', eco: 'Reusable', co2Saved: 1.5, wasteSaved: 0.4, timeSaved: 1.0 },
    // Personal Care
    { name: 'Bamboo Toothbrush', category: 'Personal Care', eco: 'Biodegradable', co2Saved: 0.2, wasteSaved: 0.1, timeSaved: 0.1 },
    { name: 'Organic Soap Bar', category: 'Personal Care', eco: 'Organic', co2Saved: 0.3, wasteSaved: 0.08, timeSaved: 0.15 },
    { name: 'Solid Shampoo Bar', category: 'Personal Care', eco: 'Plastic-free', co2Saved: 0.4, wasteSaved: 0.12, timeSaved: 0.2 },
    { name: 'Natural Deodorant Stick', category: 'Personal Care', eco: 'Aluminum-free', co2Saved: 0.3, wasteSaved: 0.09, timeSaved: 0.15 },
    { name: 'Stainless Steel Safety Razor', category: 'Personal Care', eco: 'Reusable', co2Saved: 0.8, wasteSaved: 0.3, timeSaved: 0.5 },
    { name: 'Shea Butter Lotion Bar', category: 'Personal Care', eco: 'Plastic-free', co2Saved: 0.4, wasteSaved: 0.12, timeSaved: 0.2 },
    { name: 'Beeswax Lip Balm', category: 'Personal Care', eco: 'Natural', co2Saved: 0.2, wasteSaved: 0.05, timeSaved: 0.1 },
    // Packaging
    { name: 'Stackable Bamboo Storage Boxes', category: 'Packaging', eco: 'Sustainable', co2Saved: 1.5, wasteSaved: 0.4, timeSaved: 0.7 },
    { name: 'Reusable Vacuum Storage Bags', category: 'Packaging', eco: 'Reusable', co2Saved: 1.0, wasteSaved: 0.3, timeSaved: 0.8 },
    { name: 'Wall-Mounted Cereal Dispenser', category: 'Packaging', eco: 'Reusable', co2Saved: 1.2, wasteSaved: 0.35, timeSaved: 0.9 },
    { name: 'Magnetic Cable Organizer', category: 'Packaging', eco: 'Reusable', co2Saved: 0.5, wasteSaved: 0.15, timeSaved: 0.6 },
    { name: 'Foldable Shoe Rack', category: 'Packaging', eco: 'Sustainable', co2Saved: 1.8, wasteSaved: 0.5, timeSaved: 0.8 },
    { name: 'Velvet Jewelry Organizer', category: 'Packaging', eco: 'Sustainable', co2Saved: 1.0, wasteSaved: 0.25, timeSaved: 0.5 },
    { name: 'Waterproof Travel Pouches', category: 'Packaging', eco: 'Reusable', co2Saved: 0.8, wasteSaved: 0.2, timeSaved: 0.7 },
    // Groceries
    { name: 'Mesh Produce Bags', category: 'Groceries', eco: 'Reusable', co2Saved: 0.5, wasteSaved: 0.15, timeSaved: 0.6 },
    { name: 'Airtight Glass Jar Set', category: 'Groceries', eco: 'Reusable', co2Saved: 1.0, wasteSaved: 0.3, timeSaved: 0.8 },
    { name: 'Magnetic Spice Rack', category: 'Groceries', eco: 'Reusable', co2Saved: 0.7, wasteSaved: 0.2, timeSaved: 0.6 },
    { name: 'Beeswax Food Wraps', category: 'Groceries', eco: 'Reusable', co2Saved: 0.6, wasteSaved: 0.18, timeSaved: 0.5 },
    { name: 'Stretchable Silicone Lids', category: 'Groceries', eco: 'Reusable', co2Saved: 0.8, wasteSaved: 0.25, timeSaved: 0.7 },
    { name: 'Bamboo Lunch Box', category: 'Groceries', eco: 'Sustainable', co2Saved: 1.2, wasteSaved: 0.3, timeSaved: 0.6 },
    { name: 'Stainless Steel Water Bottle', category: 'Groceries', eco: 'Reusable', co2Saved: 1.5, wasteSaved: 0.4, timeSaved: 1.0 },
    { name: 'Reusable Coffee Filter', category: 'Groceries', eco: 'Reusable', co2Saved: 0.4, wasteSaved: 0.12, timeSaved: 0.5 },
    // Textiles
    { name: 'Organic Cotton Tote Bag', category: 'Textiles', eco: 'Organic', co2Saved: 0.8, wasteSaved: 0.2, timeSaved: 0.6 },
    { name: 'Bamboo Fiber Scarf', category: 'Textiles', eco: 'Sustainable', co2Saved: 0.6, wasteSaved: 0.15, timeSaved: 0.4 },
    { name: 'Hemp Blend Shirt', category: 'Textiles', eco: 'Eco-friendly', co2Saved: 1.0, wasteSaved: 0.25, timeSaved: 0.5 },
    { name: 'Recycled Polyester Socks', category: 'Textiles', eco: 'Recycled', co2Saved: 0.3, wasteSaved: 0.08, timeSaved: 0.2 },
    { name: 'Organic Cotton Bedspread', category: 'Textiles', eco: 'Organic', co2Saved: 2.0, wasteSaved: 0.5, timeSaved: 0.8 },
    { name: 'Linen Blackout Curtains', category: 'Textiles', eco: 'Sustainable', co2Saved: 1.5, wasteSaved: 0.4, timeSaved: 0.7 },
    { name: 'Bamboo Towel Set', category: 'Textiles', eco: 'Sustainable', co2Saved: 1.2, wasteSaved: 0.3, timeSaved: 0.6 },
    { name: 'Recycled Denim Apron', category: 'Textiles', eco: 'Recycled', co2Saved: 0.8, wasteSaved: 0.2, timeSaved: 0.5 },
    // Gardening
    { name: 'Self-Watering Planter', category: 'Gardening', eco: 'Sustainable', co2Saved: 1.0, wasteSaved: 0.25, timeSaved: 0.8 },
    { name: 'Organic Gardening Kit', category: 'Gardening', eco: 'Sustainable', co2Saved: 1.5, wasteSaved: 0.4, timeSaved: 1.0 },
    { name: 'Stainless Steel Watering Can', category: 'Gardening', eco: 'Sustainable', co2Saved: 0.8, wasteSaved: 0.2, timeSaved: 0.6 },
    { name: 'Ergonomic Garden Tool Set', category: 'Gardening', eco: 'Sustainable', co2Saved: 1.2, wasteSaved: 0.3, timeSaved: 0.7 },
    { name: 'Countertop Compost Bin', category: 'Gardening', eco: 'Sustainable', co2Saved: 1.0, wasteSaved: 0.5, timeSaved: 0.5 },
    { name: 'Bamboo Plant Labels', category: 'Gardening', eco: 'Sustainable', co2Saved: 0.3, wasteSaved: 0.08, timeSaved: 0.2 },
    { name: 'Glass Sprouting Jar', category: 'Gardening', eco: 'Sustainable', co2Saved: 0.6, wasteSaved: 0.15, timeSaved: 0.4 },
    // Handicrafts
    { name: 'Handwoven Bamboo Basket', category: 'Handicrafts', eco: 'Biodegradable', co2Saved: 0.8, wasteSaved: 0.3, timeSaved: 0.4 },
    { name: 'Clay Terracotta Vase', category: 'Handicrafts', eco: 'Handcrafted', co2Saved: 0.6, wasteSaved: 0.15, timeSaved: 0.3 },
    { name: 'Jute Wall Hanging', category: 'Handicrafts', eco: 'Biodegradable', co2Saved: 0.5, wasteSaved: 0.2, timeSaved: 0.3 },
    { name: 'Wooden Carved Coasters', category: 'Handicrafts', eco: 'Handcrafted', co2Saved: 0.4, wasteSaved: 0.1, timeSaved: 0.2 },
    { name: 'Coconut Shell Candle Holder', category: 'Handicrafts', eco: 'Biodegradable', co2Saved: 0.3, wasteSaved: 0.15, timeSaved: 0.2 },
    { name: 'Handwoven Macrame Plant Hanger', category: 'Handicrafts', eco: 'Handcrafted', co2Saved: 0.6, wasteSaved: 0.15, timeSaved: 0.4 },
    { name: 'Bamboo Photo Frame', category: 'Handicrafts', eco: 'Biodegradable', co2Saved: 0.5, wasteSaved: 0.2, timeSaved: 0.3 }
];

// Store selected products with quantities
let selectedProducts = [];

function populateDropdown() {
    console.log('populateDropdown called');
    const productSelect = document.getElementById('product-select');
    if (!productSelect) {
        console.error('Product select element not found');
        return;
    }

    console.log('Found product-select, current options:', productSelect.options.length);
    if (productSelect.options.length > 1) {
        console.log('Dropdown already populated, skipping');
        return;
    }

    console.log('Populating dropdown with', products.length, 'products');
    // Group products by category
    const categories = [...new Set(products.map(p => p.category))];
    categories.forEach(category => {
        const optgroup = document.createElement('optgroup');
        optgroup.label = category;
        products
            .filter(p => p.category === category)
            .forEach(product => {
                const option = document.createElement('option');
                option.value = product.name;
                option.textContent = `${product.name} (${product.eco})`;
                optgroup.appendChild(option);
            });
        productSelect.appendChild(optgroup);
    });
    console.log('Dropdown populated, new options:', productSelect.options.length);
}

function updateImpactDisplay() {
    console.log('updateImpactDisplay called');
    const impactItemsContainer = document.getElementById('impact-items');
    const impactEmptyElement = document.getElementById('impact-empty');
    const impactTable = document.getElementById('impact-table');
    const totalCo2Element = document.getElementById('total-co2');
    const totalWasteElement = document.getElementById('total-waste');
    const totalTimeElement = document.getElementById('total-time');

    if (!impactItemsContainer || !impactEmptyElement || !impactTable || !totalCo2Element || !totalWasteElement || !totalTimeElement) {
        console.error('Impact tracker elements not found');
        return;
    }

    impactItemsContainer.innerHTML = '';
    impactEmptyElement.style.display = selectedProducts.length === 0 ? 'block' : 'none';
    impactTable.style.display = selectedProducts.length === 0 ? 'none' : 'table';

    let totalCo2Saved = 0;
    let totalWasteSaved = 0;
    let totalTimeSaved = 0;

    selectedProducts.forEach((item, index) => {
        const product = products.find(p => p.name === item.name);
        if (product) {
            const co2Saved = product.co2Saved * item.quantity;
            const wasteSaved = product.wasteSaved * item.quantity;
            const timeSaved = product.timeSaved * item.quantity;

            totalCo2Saved += co2Saved;
            totalWasteSaved += wasteSaved;
            totalTimeSaved += timeSaved;

            const itemElement = document.createElement('tr');
            itemElement.innerHTML = `
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>
                    <input type="number" min="1" value="${item.quantity}" data-index="${index}" class="quantity-input">
                </td>
                <td>${co2Saved.toFixed(2)}</td>
                <td>${wasteSaved.toFixed(2)}</td>
                <td>${timeSaved.toFixed(2)}</td>
                <td><button class="remove-btn" data-index="${index}">Remove</button></td>
            `;
            impactItemsContainer.appendChild(itemElement);
        }
    });

    totalCo2Element.textContent = totalCo2Saved.toFixed(2);
    totalWasteElement.textContent = totalWasteSaved.toFixed(2);
    totalTimeElement.textContent = totalTimeSaved.toFixed(2);
}

function setupEventListeners() {
    console.log('setupEventListeners called');
    const addProductButton = document.getElementById('add-product');
    const productSelect = document.getElementById('product-select');
    const impactItemsContainer = document.getElementById('impact-items');

    if (!addProductButton || !productSelect || !impactItemsContainer) {
        console.error('Event listener elements not found');
        return;
    }

    addProductButton.addEventListener('click', () => {
        const selectedName = productSelect.value;
        if (!selectedName) {
            alert('Please select a product.');
            return;
        }

        const existingItem = selectedProducts.find(item => item.name === selectedName);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            selectedProducts.push({ name: selectedName, quantity: 1 });
        }

        updateImpactDisplay();
        productSelect.value = ''; // Reset dropdown
    });

    impactItemsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-btn')) {
            const index = parseInt(e.target.getAttribute('data-index'));
            selectedProducts.splice(index, 1);
            updateImpactDisplay();
        }
    });

    impactItemsContainer.addEventListener('change', (e) => {
        if (e.target.classList.contains('quantity-input')) {
            const index = parseInt(e.target.getAttribute('data-index'));
            const quantity = parseInt(e.target.value);
            if (quantity >= 1) {
                selectedProducts[index].quantity = quantity;
                updateImpactDisplay();
            } else {
                e.target.value = selectedProducts[index].quantity; // Revert invalid input
            }
        }
    });
}

// Retry mechanism for DOM readiness
function initializeImpactTracker() {
    console.log('initializeImpactTracker called');
    const productSelect = document.getElementById('product-select');
    if (productSelect) {
        populateDropdown();
        setupEventListeners();
        updateImpactDisplay();
    } else {
        console.warn('product-select not found, retrying in 100ms');
        setTimeout(initializeImpactTracker, 100);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeImpactTracker);
} else {
    initializeImpactTracker();
}