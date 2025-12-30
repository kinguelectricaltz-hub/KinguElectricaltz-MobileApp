/**
 * Kingu Electrical Mobile App - JavaScript
 * Main application logic and functionality
 */

// App Configuration
const APP_CONFIG = {
    name: 'Kingu Electrical',
    version: '2.0.0',
    apiBaseUrl: 'https://api.kinguelectrical.com',
    whatsappNumber: '+255682843552',
    emergencyNumber: '+255682843552',
    primaryEmail: 'Kinguelectricaltz@gmail.com',
    defaultCurrency: 'TZS',
    serviceAreas: ['Dar-es-salaam', 'Arusha', 'Dodoma', 'Mwanza', 'Mbeya', 'Zanzibar']
};

// App State
let appState = {
    cart: [],
    favorites: [],
    userLocation: null,
    isOnline: navigator.onLine,
    darkMode: false,
    notifications: true,
    currentPage: 'home',
    lastUpdate: null
};

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    console.log(`${APP_CONFIG.name} App v${APP_CONFIG.version} initializing...`);
    
    initApp();
    setupEventListeners();
    checkConnectivity();
    loadUserPreferences();
    
    // Request notification permission
    if ('Notification' in window && APP_CONFIG.notifications) {
        requestNotificationPermission();
    }
    
    // Initialize service worker
    if ('serviceWorker' in navigator) {
        initServiceWorker();
    }
    
    // Track app install
    window.addEventListener('appinstalled', (evt) => {
        console.log('App installed successfully');
        trackEvent('app_installed');
    });
});

// ========== CORE FUNCTIONS ==========

function initApp() {
    console.log('Initializing app...');
    
    // Set current year in footer
    document.querySelectorAll('.current-year').forEach(el => {
        el.textContent = new Date().getFullYear();
    });
    
    // Initialize navigation
    initNavigation();
    
    // Initialize cart from localStorage
    loadCart();
    
    // Initialize lazy loading
    initLazyLoading();
    
    // Initialize animations
    initAnimations();
    
    console.log('App initialized successfully');
}

function setupEventListeners() {
    // Online/Offline detection
    window.addEventListener('online', () => {
        appState.isOnline = true;
        showNotification('You are back online!', 'success');
        syncPendingData();
    });
    
    window.addEventListener('offline', () => {
        appState.isOnline = false;
        showNotification('You are offline. Some features may be limited.', 'warning');
    });
    
    // Before install prompt
    let deferredPrompt;
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        showInstallPrompt();
    });
    
    // Page visibility
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            // App came to foreground
            checkForUpdates();
        }
    });
    
    // Swipe gestures for mobile
    initSwipeGestures();
}

// ========== NAVIGATION ==========

function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const pages = document.querySelectorAll('.page');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetPage = this.getAttribute('data-page') || this.getAttribute('href').replace('#', '');
            
            // Update active states
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            // Show target page
            pages.forEach(page => {
                page.classList.remove('active');
                if (page.id === `${targetPage}Page`) {
                    page.classList.add('active');
                    appState.currentPage = targetPage;
                    
                    // Trigger page-specific initializations
                    initPage(targetPage);
                    
                    // Track page view
                    trackEvent('page_view', { page: targetPage });
                }
            });
            
            // Smooth scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
    
    // Handle back button
    window.addEventListener('popstate', function() {
        const hash = window.location.hash.substring(1) || 'home';
        navigateTo(hash);
    });
}

function navigateTo(page) {
    const navItem = document.querySelector(`.nav-item[data-page="${page}"], .nav-item[href="#${page}"]`);
    if (navItem) {
        navItem.click();
    }
}

function initPage(page) {
    switch(page) {
        case 'home':
            initHomePage();
            break;
        case 'services':
            initServicesPage();
            break;
        case 'products':
            initProductsPage();
            break;
        case 'shop':
            initShopPage();
            break;
        case 'contact':
            initContactPage();
            break;
    }
}

// ========== PAGE INITIALIZATIONS ==========

function initHomePage() {
    // Load featured products
    loadFeaturedProducts();
    
    // Initialize stats counter animation
    initStatsCounter();
    
    // Initialize service cards
    initServiceCards();
    
    // Check for active promotions
    checkPromotions();
}

function initServicesPage() {
    // Load service packages
    loadServicePackages();
    
    // Initialize service categories
    initServiceCategories();
    
    // Initialize booking form
    initBookingForm();
}

function initProductsPage() {
    // Load product categories
    loadProductCategories();
    
    // Initialize product filters
    initProductFilters();
    
    // Initialize quick order
    initQuickOrder();
}

function initShopPage() {
    // Load shop products
    loadShopProducts();
    
    // Initialize search
    initProductSearch();
    
    // Initialize cart functionality
    initCartFunctionality();
    
    // Initialize checkout process
    initCheckoutProcess();
}

function initContactPage() {
    // Initialize contact form
    initContactForm();
    
    // Initialize map if available
    initMap();
    
    // Initialize business hours
    initBusinessHours();
}

// ========== CART MANAGEMENT ==========

function loadCart() {
    const savedCart = localStorage.getItem('kingu_cart');
    if (savedCart) {
        appState.cart = JSON.parse(savedCart);
        updateCartCount();
    }
}

function saveCart() {
    localStorage.setItem('kingu_cart', JSON.stringify(appState.cart));
    updateCartCount();
}

function addToCart(product) {
    // Check if product already in cart
    const existingIndex = appState.cart.findIndex(item => item.id === product.id);
    
    if (existingIndex > -1) {
        // Update quantity
        appState.cart[existingIndex].quantity = (appState.cart[existingIndex].quantity || 1) + 1;
    } else {
        // Add new item
        product.quantity = 1;
        product.addedAt = new Date().toISOString();
        appState.cart.push(product);
    }
    
    saveCart();
    showNotification(`${product.name} added to cart!`, 'success');
    
    // Update cart UI if on shop page
    if (appState.currentPage === 'shop') {
        updateCartUI();
    }
}

function removeFromCart(productId) {
    appState.cart = appState.cart.filter(item => item.id !== productId);
    saveCart();
    showNotification('Item removed from cart', 'info');
    
    if (appState.currentPage === 'shop') {
        updateCartUI();
    }
}

function updateCartQuantity(productId, quantity) {
    const item = appState.cart.find(item => item.id === productId);
    if (item) {
        item.quantity = quantity;
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
        }
    }
}

function getCartTotal() {
    return appState.cart.reduce((total, item) => {
        const price = parseFloat(item.price.replace(/[^\d.]/g, '')) || 0;
        return total + (price * (item.quantity || 1));
    }, 0);
}

function updateCartCount() {
    const cartCountElements = document.querySelectorAll('.cart-count, #cartCount');
    const totalItems = appState.cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    
    cartCountElements.forEach(element => {
        element.textContent = totalItems;
        element.style.display = totalItems > 0 ? 'flex' : 'none';
    });
}

function updateCartUI() {
    const cartContainer = document.getElementById('cartItems');
    if (!cartContainer) return;
    
    if (appState.cart.length === 0) {
        cartContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Your cart is empty</p>
                <button class="btn btn-primary" onclick="navigateTo('shop')">
                    Browse Products
                </button>
            </div>
        `;
        return;
    }
    
    let html = `
        <div class="cart-header">
            <h3>Your Cart (${appState.cart.length} items)</h3>
            <button class="btn-clear" onclick="clearCart()">Clear All</button>
        </div>
        <div class="cart-items-list">
    `;
    
    appState.cart.forEach((item, index) => {
        const price = parseFloat(item.price.replace(/[^\d.]/g, '')) || 0;
        const total = price * (item.quantity || 1);
        
        html += `
            <div class="cart-item" data-id="${item.id}">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p class="cart-item-category">${item.category}</p>
                    <div class="cart-item-price">${formatCurrency(total)}</div>
                    <div class="cart-item-controls">
                        <button class="btn-quantity" onclick="updateCartQuantity('${item.id}', ${(item.quantity || 1) - 1})">-</button>
                        <span class="quantity">${item.quantity || 1}</span>
                        <button class="btn-quantity" onclick="updateCartQuantity('${item.id}', ${(item.quantity || 1) + 1})">+</button>
                        <button class="btn-remove" onclick="removeFromCart('${item.id}')">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    
    html += `
        </div>
        <div class="cart-footer">
            <div class="cart-total">
                <span>Total:</span>
                <span class="total-amount">${formatCurrency(getCartTotal())}</span>
            </div>
            <button class="btn btn-primary btn-checkout" onclick="proceedToCheckout()">
                <i class="fab fa-whatsapp"></i> Checkout via WhatsApp
            </button>
            <button class="btn btn-outline" onclick="continueShopping()">
                Continue Shopping
            </button>
        </div>
    `;
    
    cartContainer.innerHTML = html;
}

function clearCart() {
    if (confirm('Are you sure you want to clear your cart?')) {
        appState.cart = [];
        saveCart();
        updateCartUI();
        showNotification('Cart cleared', 'info');
    }
}

function openCartModal() {
    updateCartUI();
    document.getElementById('cartModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCartModal() {
    document.getElementById('cartModal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

function proceedToCheckout() {
    if (appState.cart.length === 0) {
        showNotification('Your cart is empty', 'warning');
        return;
    }
    
    let message = `*ORDER REQUEST - KINGU ELECTRICAL*\n\n`;
    message += `Customer: [Please provide your name]\n`;
    message += `Phone: [Please provide your phone]\n`;
    message += `Delivery Address: [Please provide address]\n\n`;
    message += `*Order Details:*\n`;
    
    appState.cart.forEach((item, index) => {
        const price = parseFloat(item.price.replace(/[^\d.]/g, '')) || 0;
        const total = price * (item.quantity || 1);
        message += `${index + 1}. ${item.name}\n`;
        message += `   Quantity: ${item.quantity || 1}\n`;
        message += `   Price: ${item.price} each\n`;
        message += `   Subtotal: ${formatCurrency(total)}\n\n`;
    });
    
    message += `*Order Summary:*\n`;
    message += `Total Items: ${appState.cart.reduce((sum, item) => sum + (item.quantity || 1), 0)}\n`;
    message += `Total Amount: ${formatCurrency(getCartTotal())}\n\n`;
    message += `Please confirm availability and delivery details.`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${APP_CONFIG.whatsappNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    
    // Track checkout event
    trackEvent('checkout_initiated', {
        items: appState.cart.length,
        total: getCartTotal()
    });
}

function continueShopping() {
    closeCartModal();
    navigateTo('shop');
}

// ========== PRODUCT MANAGEMENT ==========

function loadFeaturedProducts() {
    const featuredProducts = [
        {
            id: 1,
            name: 'Diesel Generator 50kVA',
            category: 'Generators',
            price: 'TZS 8,500,000',
            image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop',
            rating: 4.5,
            description: 'Complete diesel generator set with automatic start'
        },
        {
            id: 2,
            name: 'Solar Panel 300W',
            category: 'Solar Systems',
            price: 'TZS 250,000',
            image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=300&fit=crop',
            rating: 4.7,
            description: 'High-efficiency monocrystalline solar panel'
        },
        {
            id: 3,
            name: 'ATS Control Panel',
            category: 'Electrical Panels',
            price: 'TZS 1,200,000',
            image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=300&fit=crop',
            rating: 4.6,
            description: 'Automatic Transfer Switch panel'
        }
    ];
    
    const container = document.getElementById('featuredProducts');
    if (container) {
        renderProducts(featuredProducts, container);
    }
}

function loadShopProducts() {
    const loadingElement = document.getElementById('productsLoading');
    const container = document.getElementById('productsContainer');
    
    if (loadingElement) loadingElement.style.display = 'block';
    if (container) container.innerHTML = '';
    
    // Simulate API call
    setTimeout(() => {
        const products = [
            {
                id: 1,
                name: 'Diesel Generator 50kVA',
                category: 'generators',
                price: 'TZS 8,500,000',
                image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop',
                description: 'Complete diesel generator set with automatic start, soundproof canopy, and control panel.',
                features: ['50kVA Power', 'Soundproof Canopy', 'Automatic Start', '1 Year Warranty'],
                stock: 5,
                rating: 4.5
            },
            {
                id: 2,
                name: 'Solar Panel 300W',
                category: 'solar',
                price: 'TZS 250,000',
                image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=300&fit=crop',
                description: 'High-efficiency monocrystalline solar panel with 25-year performance warranty.',
                features: ['300W Output', 'Monocrystalline', '25-Year Warranty', 'Weather Resistant'],
                stock: 25,
                rating: 4.7
            },
            {
                id: 3,
                name: 'Generator Alternator',
                category: 'spares',
                price: 'TZS 450,000',
                image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=300&fit=crop',
                description: 'Genuine alternator for diesel generators, compatible with multiple models.',
                features: ['Genuine Part', '1 Year Warranty', 'Next-Day Delivery', 'Compatible'],
                stock: 12,
                rating: 4.3
            },
            {
                id: 4,
                name: 'Electrical Tool Kit',
                category: 'tools',
                price: 'TZS 350,000',
                image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop',
                description: 'Complete electrical tool set for professional installations and repairs.',
                features: ['30+ Tools', 'Professional Grade', 'Carry Case', '1 Year Warranty'],
                stock: 8,
                rating: 4.4
            }
        ];
        
        if (container) {
            renderProducts(products, container);
        }
        
        if (loadingElement) loadingElement.style.display = 'none';
    }, 1000);
}

function renderProducts(products, container) {
    if (!container) return;
    
    container.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image-container">
                <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
                ${product.stock ? `<span class="product-badge">In Stock</span>` : ''}
            </div>
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-rating">
                    ${generateStarRating(product.rating)}
                    <span class="rating-value">${product.rating}</span>
                </div>
                <p class="product-description">${product.description}</p>
                <div class="product-features">
                    ${product.features ? product.features.slice(0, 2).map(f => `<span class="feature-tag">${f}</span>`).join('') : ''}
                </div>
                <div class="product-footer">
                    <div class="product-price">${product.price}</div>
                    <div class="product-actions">
                        <button class="btn btn-sm btn-outline" onclick="addToCart(${JSON.stringify(product).replace(/"/g, '&quot;')})">
                            <i class="fas fa-cart-plus"></i> Add to Cart
                        </button>
                        <button class="btn btn-sm btn-primary" onclick="inquireProduct('${product.name}')">
                            <i class="fab fa-whatsapp"></i> Inquire
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        container.appendChild(productCard);
    });
}

function generateStarRating(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    let stars = '';
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    // Half star
    if (halfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

function filterProducts(category) {
    const buttons = document.querySelectorAll('.category-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // In a real app, you would filter products from your data
    // For now, reload products
    loadShopProducts();
}

function searchProducts() {
    const searchTerm = document.getElementById('productSearch').value.toLowerCase();
    // Implement search logic here
    console.log('Searching for:', searchTerm);
}

function inquireProduct(productName) {
    const message = `I'm interested in ${productName}. Please provide more details and pricing.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${APP_CONFIG.whatsappNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    
    trackEvent('product_inquiry', { product: productName });
}

// ========== CONTACT FORM ==========

function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        submitContactForm();
    });
}

function submitContactForm() {
    const name = document.getElementById('contactName')?.value.trim();
    const phone = document.getElementById('contactPhone')?.value.trim();
    const email = document.getElementById('contactEmail')?.value.trim();
    const service = document.getElementById('contactService')?.value;
    const message = document.getElementById('contactMessage')?.value.trim();
    
    // Validation
    if (!name || !phone) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    if (phone.length < 10) {
        showNotification('Please enter a valid phone number', 'error');
        return;
    }
    
    // Prepare WhatsApp message
    let whatsappMessage = `*NEW CONTACT REQUEST*\n\n`;
    whatsappMessage += `Name: ${name}\n`;
    whatsappMessage += `Phone: ${phone}\n`;
    if (email) whatsappMessage += `Email: ${email}\n`;
    if (service) whatsappMessage += `Service: ${service}\n`;
    if (message) whatsappMessage += `Message: ${message}\n\n`;
    whatsappMessage += `Please contact this customer as soon as possible.`;
    
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/${APP_CONFIG.whatsappNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Clear form
    const form = document.getElementById('contactForm');
    if (form) form.reset();
    
    // Show success message
    showNotification('Your message has been sent! We will contact you shortly.', 'success');
    
    // Track event
    trackEvent('contact_form_submitted', {
        hasEmail: !!email,
        service: service || 'none'
    });
}

// ========== BOOKING FORM ==========

function submitBookingForm() {
    const name = document.getElementById('bookingName')?.value.trim();
    const phone = document.getElementById('bookingPhone')?.value.trim();
    const service = document.getElementById('bookingService')?.value;
    const date = document.getElementById('bookingDate')?.value;
    const time = document.getElementById('bookingTime')?.value;
    const location = document.getElementById('bookingLocation')?.value.trim();
    
    if (!name || !phone || !service || !date || !time) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    // Prepare WhatsApp message for booking
    let whatsappMessage = `*SITE INSPECTION BOOKING*\n\n`;
    whatsappMessage += `Name: ${name}\n`;
    whatsappMessage += `Phone: ${phone}\n`;
    whatsappMessage += `Service: ${service}\n`;
    whatsappMessage += `Date: ${date}\n`;
    whatsappMessage += `Time: ${time}\n`;
    if (location) whatsappMessage += `Location: ${location}\n\n`;
    whatsappMessage += `Please confirm this booking and send a technician.`;
    
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/${APP_CONFIG.whatsappNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    
    // Track event
    trackEvent('booking_submitted', { service: service });
    
    showNotification('Booking request sent! We will confirm via WhatsApp.', 'success');
}

// ========== EMERGENCY CALL ==========

function callEmergency() {
    if (confirm('Call emergency electrical service?')) {
        window.location.href = `tel:${APP_CONFIG.emergencyNumber}`;
        trackEvent('emergency_call');
    }
}

// ========== SERVICE WORKER ==========

function initServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('Service Worker registered:', registration);
                
                // Check for updates
                registration.addEventListener('updatefound', () => {
                    const newWorker = registration.installing;
                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            showUpdateNotification();
                        }
                    });
                });
                
                // Listen for messages from service worker
                navigator.serviceWorker.addEventListener('message', event => {
                    const { type, data } = event.data;
                    
                    switch (type) {
                        case 'UPDATE_AVAILABLE':
                            showUpdateNotification(data);
                            break;
                        case 'SW_ACTIVATED':
                            console.log('Service Worker activated:', data);
                            break;
                        case 'SW_INSTALLED':
                            console.log('Service Worker installed:', data);
                            break;
                    }
                });
            })
            .catch(error => {
                console.error('Service Worker registration failed:', error);
            });
    }
}

function showUpdateNotification(data) {
    if (confirm('A new version of Kingu Electrical is available. Update now?')) {
        window.location.reload();
    }
}

// ========== NOTIFICATIONS ==========

function requestNotificationPermission() {
    if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                console.log('Notification permission granted');
                appState.notifications = true;
                saveUserPreferences();
            }
        });
    }
}

function showNotification(message, type = 'info') {
    // Remove existing notification
    const existing = document.getElementById('appNotification');
    if (existing) existing.remove();
    
    // Create notification element
    const notification = document.createElement('div');
    notification.id = 'appNotification';
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="notification-icon ${getNotificationIcon(type)}"></i>
            <span class="notification-message">${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">&times;</button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

function getNotificationIcon(type) {
    switch(type) {
        case 'success': return 'fas fa-check-circle';
        case 'error': return 'fas fa-exclamation-circle';
        case 'warning': return 'fas fa-exclamation-triangle';
        default: return 'fas fa-info-circle';
    }
}

// ========== UTILITY FUNCTIONS ==========

function formatCurrency(amount) {
    if (typeof amount === 'string') {
        amount = parseFloat(amount.replace(/[^\d.]/g, '')) || 0;
    }
    
    return new Intl.NumberFormat('en-TZ', {
        style: 'currency',
        currency: APP_CONFIG.defaultCurrency,
        minimumFractionDigits: 0
    }).format(amount);
}

function checkConnectivity() {
    if (!navigator.onLine) {
        showNotification('You are offline. Some features may be limited.', 'warning');
    }
}

function loadUserPreferences() {
    const preferences = localStorage.getItem('kingu_preferences');
    if (preferences) {
        const saved = JSON.parse(preferences);
        appState = { ...appState, ...saved };
        
        // Apply preferences
        if (appState.darkMode) {
            document.body.classList.add('dark-mode');
        }
    }
}

function saveUserPreferences() {
    const preferences = {
        darkMode: appState.darkMode,
        notifications: appState.notifications,
        favorites: appState.favorites
    };
    localStorage.setItem('kingu_preferences', JSON.stringify(preferences));
}

function toggleDarkMode() {
    appState.darkMode = !appState.darkMode;
    document.body.classList.toggle('dark-mode', appState.darkMode);
    saveUserPreferences();
    
    showNotification(
        appState.darkMode ? 'Dark mode enabled' : 'Light mode enabled',
        'info'
    );
}

function initSwipeGestures() {
    let startX, startY;
    
    document.addEventListener('touchstart', e => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    });
    
    document.addEventListener('touchmove', e => {
        if (!startX || !startY) return;
        
        const endX = e.touches[0].clientX;
        const endY = e.touches[0].clientY;
        
        const diffX = startX - endX;
        const diffY = startY - endY;
        
        // Only consider horizontal swipes
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            const pages = ['home', 'services', 'products', 'shop', 'contact'];
            const currentIndex = pages.indexOf(appState.currentPage);
            
            if (diffX > 0 && currentIndex < pages.length - 1) {
                // Swipe left - next page
                navigateTo(pages[currentIndex + 1]);
            } else if (diffX < 0 && currentIndex > 0) {
                // Swipe right - previous page
                navigateTo(pages[currentIndex - 1]);
            }
            
            startX = null;
            startY = null;
        }
    });
}

function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

function initAnimations() {
    // Add animation classes on scroll
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, {
            threshold: 0.1
        });
        
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });
    }
}

function initStatsCounter() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + (counter.textContent.includes('+') ? '+' : '');
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target + (counter.textContent.includes('+') ? '+' : '');
            }
        };
        
        // Start when visible
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateCounter();
                observer.unobserve(counter);
            }
        });
        
        observer.observe(counter);
    });
}

function showInstallPrompt() {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
        return;
    }
    
    const installPrompt = document.getElementById('installPrompt');
    if (installPrompt) {
        installPrompt.style.display = 'block';
        
        document.getElementById('installBtn').addEventListener('click', () => {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted install');
                    trackEvent('app_install_accepted');
                }
                deferredPrompt = null;
            });
            installPrompt.style.display = 'none';
        });
        
        document.getElementById('closeInstall').addEventListener('click', () => {
            installPrompt.style.display = 'none';
            localStorage.setItem('installPromptDismissed', Date.now());
        });
    }
}

function syncPendingData() {
    // Sync any pending data when back online
    console.log('Syncing pending data...');
    // Implement your sync logic here
}

function checkForUpdates() {
    if (appState.isOnline) {
        // Check for app updates
        fetch('/?version-check=' + Date.now())
            .then(response => response.text())
            .then(html => {
                // Check version in response
                const match = html.match(/data-app-version="([^"]+)"/);
                if (match && match[1] !== APP_CONFIG.version) {
                    showUpdateNotification({ newVersion: match[1] });
                }
            });
    }
}

function trackEvent(eventName, data = {}) {
    // Simple analytics tracking
    const eventData = {
        event: eventName,
        timestamp: new Date().toISOString(),
        page: appState.currentPage,
        ...data
    };
    
    console.log('Tracking event:', eventData);
    
    // Save to localStorage for later sync
    const events = JSON.parse(localStorage.getItem('kingu_events') || '[]');
    events.push(eventData);
    localStorage.setItem('kingu_events', JSON.stringify(events.slice(-100))); // Keep last 100 events
    
    // In production, you would send this to your analytics service
    if (appState.isOnline) {
        // Example: send to Google Analytics
        if (typeof gtag === 'function') {
            gtag('event', eventName, data);
        }
    }
}

// ========== EXPORT FUNCTIONS FOR GLOBAL USE ==========

// Make functions available globally
window.navigateTo = navigateTo;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateCartQuantity = updateCartQuantity;
window.clearCart = clearCart;
window.openCartModal = openCartModal;
window.closeCartModal = closeCartModal;
window.proceedToCheckout = proceedToCheckout;
window.continueShopping = continueShopping;
window.filterProducts = filterProducts;
window.searchProducts = searchProducts;
window.inquireProduct = inquireProduct;
window.submitContactForm = submitContactForm;
window.submitBookingForm = submitBookingForm;
window.callEmergency = callEmergency;
window.toggleDarkMode = toggleDarkMode;

console.log(`${APP_CONFIG.name} App v${APP_CONFIG.version} ready!`);