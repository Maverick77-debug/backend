const API_URL = 'https://backend-rnon.onrender.com/';

// State
let products = [];
let cart = [];

// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const cartSidebar = document.getElementById('cartSidebar');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartSubtotal = document.getElementById('cartSubtotal');
const cartTax = document.getElementById('cartTax');
const cartTotal = document.getElementById('cartTotal');
const overlay = document.getElementById('overlay');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');

// Initialize App
async function init() {
    await loadProducts();
    await loadCart();
    attachEventListeners();
}

// Load Products from API
async function loadProducts() {
    try {
        const response = await fetch(`${API_URL}/products`);
        const data = await response.json();
     if (data && data.products) {
    products = data.products;
    displayProducts(products);
} else {
    console.error("Invalid API response:", data);
    productsGrid.innerHTML = '<div class="loading-spinner">API Error: No products received</div>';
}
    } catch (error) {
        console.error('Error loading products:', error);
        productsGrid.innerHTML = '<div class="loading-spinner">Failed to load products. Please refresh.</div>';
    }
}

// Display Products
function displayProducts(productsToShow) {
    if (!productsToShow || productsToShow.length === 0) {
        productsGrid.innerHTML = '<div class="loading-spinner">No products found.</div>';
        return;
    }

    productsGrid.innerHTML = productsToShow.map(product => `
        <div class="product-card" data-id="${product.id}">
            ${product.discount > 0 ? `<div class="product-badge">-${product.discount}% OFF</div>` : ''}
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <div class="product-title">${product.name}</div>
                <div class="product-brand">${product.brand}</div>
                <div class="product-rating">
                    <div class="stars">${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}</div>
                    <span class="rating-value">(${product.rating})</span>
                </div>
                <div class="product-price">
                    <span class="current-price">$${product.price.toFixed(2)}</span>
                    ${product.discount > 0 ? `
                        <span class="old-price">$${(product.price / (1 - product.discount / 100)).toFixed(2)}</span>
                        <span class="discount">-${product.discount}%</span>
                    ` : ''}
                </div>
                <button class="add-to-cart" onclick="addToCart('${product.id}')">
                    <i class="fas fa-shopping-bag"></i>
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

// Load Cart from API
async function loadCart() {
    try {
        const response = await fetch(`${API_URL}/cart`);
        const data = await response.json();
        cart = data.items || [];
        updateCartUI();
    } catch (error) {
        console.error('Error loading cart:', error);
    }
}

// Add to Cart
async function addToCart(productId, quantity = 1) {
    try {
        const response = await fetch(`${API_URL}/cart`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ productId, quantity })
        });
        
        const data = await response.json();
        
        if (data.success) {
            await loadCart();
            showToast(data.message);
            animateAddToCart();
        }
    } catch (error) {
        console.error('Error adding to cart:', error);
        showToast('Failed to add to cart', 'error');
    }
}

// Update Cart Item Quantity
async function updateCartQuantity(productId, quantity) {
    try {
        const response = await fetch(`${API_URL}/cart/${productId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ quantity })
        });
        
        const data = await response.json();
        
        if (data.success) {
            await loadCart();
            showToast(data.message);
        }
    } catch (error) {
        console.error('Error updating cart:', error);
    }
}

// Remove from Cart
async function removeFromCart(productId) {
    try {
        const response = await fetch(`${API_URL}/cart/${productId}`, {
            method: 'DELETE'
        });
        
        const data = await response.json();
        
        if (data.success) {
            await loadCart();
            showToast(data.message);
        }
    } catch (error) {
        console.error('Error removing from cart:', error);
    }
}

// Update Cart UI
function updateCartUI() {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart items display
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Your cart is empty</p>
                <button class="btn-primary" id="continueShopping">Continue Shopping</button>
            </div>
        `;
        document.getElementById('continueShopping')?.addEventListener('click', () => closeCart());
        return;
    }
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.product.image}" alt="${item.product.name}" class="cart-item-image">
            <div class="cart-item-details">
                <div class="cart-item-title">${item.product.name}</div>
                <div class="cart-item-price">$${item.product.price.toFixed(2)}</div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn" onclick="updateCartQuantity('${item.product.id}', ${item.quantity - 1})">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateCartQuantity('${item.product.id}', ${item.quantity + 1})">+</button>
                    <button class="remove-item" onclick="removeFromCart('${item.product.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    // Calculate totals
    const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const tax = subtotal * 0.1;
    const total = subtotal + tax;
    
    cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    cartTax.textContent = `$${tax.toFixed(2)}`;
    cartTotal.textContent = `$${total.toFixed(2)}`;
}

// Show Toast Notification
function showToast(message, type = 'success') {
    toastMessage.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Animate Add to Cart
function animateAddToCart() {
    const cartBtn = document.querySelector('.cart-btn');
    cartBtn.style.transform = 'scale(1.1)';
    setTimeout(() => {
        cartBtn.style.transform = 'scale(1)';
    }, 200);
}

// Open Cart
function openCart() {
    cartSidebar.classList.add('open');
    overlay.classList.add('show');
}

// Close Cart
function closeCart() {
    cartSidebar.classList.remove('open');
    overlay.classList.remove('show');
}

// Filter Products by Category
function filterByCategory(category) {
    if (category === 'all') {
        displayProducts(products);
    } else {
        const filtered = products.filter(p => p.category.toLowerCase() === category.toLowerCase());
        displayProducts(filtered);
    }
}

// Attach Event Listeners
function attachEventListeners() {
    // Cart button
    document.getElementById('cartBtn').addEventListener('click', openCart);
    document.getElementById('closeCart').addEventListener('click', closeCart);
    overlay.addEventListener('click', closeCart);
    
    // Shop now button
    document.getElementById('shopNowBtn').addEventListener('click', () => {
        document.getElementById('productsSection').scrollIntoView({ behavior: 'smooth' });
    });
    
    // Category filters
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', () => {
            const category = card.dataset.category;
            filterByCategory(category);
            document.getElementById('productsSection').scrollIntoView({ behavior: 'smooth' });
        });
    });
    
    // Checkout
    document.getElementById('checkoutBtn')?.addEventListener('click', () => {
        if (cart.length === 0) {
            showToast('Your cart is empty!', 'error');
        } else {
            showToast('Proceeding to checkout... 🎉');
            setTimeout(() => {
                alert('Thank you for your purchase! 🏀\nThis is a demo checkout.');
                closeCart();
            }, 1000);
        }
    });
}

// Start the app
init();
