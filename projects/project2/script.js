const products = [
    {
        id: 1,
        name: "Samsung Galaxy A54 5G - 8GB RAM, 256GB STORAGE",
        price: 285000,
        oldPrice: 320000,
        image: "",
        rating: 4.5,
        reviews: 234,
        discount: 11,
        isFlashSale: true,
        isTopDeal: false
    },
    {
        id: 2,
        name: "HP PAVILION 15.6\" Laptop - Intel Core i5, 8GB RAM",
        price: 655000,
        oldPrice: 750000,
        image: "",
        rating: 4.3,
        reviews: 156,
        discount: 13,
        isFlashSale: false,
        isTopDeal: true
    },
    {
        id: 3,
        name: "Nike Air Max 278 Running Shoes - Black/White",
        price: 45000,
        oldPrice: 55000,
        image: "",
        rating: 4.7,
        reviews: 89,
        discount: 18,
        isFlashSale: true,
        isTopDeal: false
    },
    {
        id: 4,
        name: "LG 43\" Smart TV 4K UHD - WebOS, Netflix Built-in",
        price: 380000,
        oldPrice: 450000,
        image: "",
        rating: 4.4,
        reviews: 67,
        discount: 67,
        isFlashSale: false,
        isTopDeal: true
    },
    {
        id: 5,
        name: "Sony WH-CH720N Wireless Noise Canceling Headphones",
        price: 25000,
        oldPrice: 35000,
        image: "",
        rating: 4.1,
        reviews: 344,
        discount: 29,
        isFlashSale: true,
        isTopDeal: false
    },
    {
        id: 6,
        name: "Philips Daily Collection Blender - 2L Jar, 400W",
        price: 18000,
        oldPrice: 25000,
        image: "",
        rating: 4.0,
        reviews: 154,
        discount: 27,
        isFlashSale: false,
        isTopDeal: true
    },
    {
        id: 7,
        name: "Men's Formal Cotton Long Sleeve Shirt - Blue",
        price: 8500,
        oldPrice: 12000,
        image: "",
        rating: 4.1,
        reviews: 78,
        discount: 29,
        isFlashSale: true,
        isTopDeal: false
    },
    {
        id: 8,
        name: "Anker PowerCore 20000mAh Portable Charger",
        price: 15000,
        oldPrice: 20000,
        image: "",
        rating: 4.6,
        reviews: 264,
        discount: 21,
        isFlashSale: false,
        isTopDeal: true
    }
];

let cart = [];

function formatPrice(price) {
    return '#' + price.toLocaleString();
    const fullStarts = Math.floor(rating);
    const hasHalfStar = rating % 1 !=0;
    let starts = '';

    for (let i = 0; i < fullStarts; i++) {
        stars += '*';
    }
    if(hasHalfStar) {
        stars += '';
    }
    return stars;
}

function createProductCard(product) {
    return `
    <div class="product-card" onclick="adToCart(${product.id})">
        <div class="product-image">
            ${product.image}
            ${product.discount ? `<div class="discount-badge">-${product,discount}%</div>` : ''}
        </div>
        <div class="product-info">
            <div class="product-name">${product.name}</div>
            <div class="product-price">
                <span class="current-price">${formatPrice(product.price)}</span>
                ${product.oldPrice ? `<span class="old-price">${formatPrice(product.oldPrice)}</span>` : ''}
            </div>
            <div class="product-rating">
                <span class="rating-stars">${generateStars(product.rating)}</span>
                <span class="rating-count">(${product.reviews})</span>
            </div>
        </div>
    </div>
    `;
}

function loadProducts() {
    const productsGrid = document.getElementById('productsGrid');
    const flashSalesGrid = document.getElementById('flashSalesGrid');
    const topDealsGrid = document.getElementById('topDealsGrid');
    
    productsGrid.innerHTML = products.map(createProductCard).join('');

    const flashSalesProducts = products.filter(p => p.isFlashSale);
    flashSalesProducts.map(createProductCard).join('');

    const topDealsProducts = products.filter(p => p.isTopDeal);
    topDealsGrid.innerHTML = topDealsProducts.map(createProductCard).join('');
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    }else {
        cart.push({...product, quantity: 1});
    }
    updateCartUI();
    showAddToCartFeedback();
}

function showAddToCartFeedback() {
    const cartLink = document.querySelector('.cart-link');
    cartLink.style.transform = 'scale(1.1)';
    cartLink.style.transition = 'transform 0.2s';

    setTimeout(() => {
        cartLink.style.transform = 'scale(1)';
    }, 200);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    cartCount.textContent = totalItems;

    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">Your cart is empty</p>';
    }else {
        cartItems.innerHTML = cart.map(item =>`
            <div class="cart-item">
                <div>
                    <strong style="font-size: 14px;">${item.name}</strong><br>
                    <span style="color: #764ba2; font-weight: bold;">${formatPrice(item.price)}</span> x ${item.quantity}</br>
                </div>
                <button onClick="removeFromCart(${item.id})" style="background: #e74c3c; color:white; border:none; padding: 6px 10px; border-radius: 3px; cursor: pointer; font-size: 12px;">
                    Remove
                </button>
            </div>
        `).join('');
    }
    cartTotal.textContent = `Total: ${formatPrice(totalPrice)}`;
}

function toggleCart() {
    const modal = document.getElementById('cartModal');
    modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity),0);
    alert('Thankyou for your order! Total: ${formatPrice(total)}\n\nThis is a demo - no actual payment was processed.');
    cart = [];
    updateCartUI();
    toggleCart();
}
function updateTimer() {
    const timerBoxes = document.querySelectorAll('.timer-box');
    let hours = 12;
    let minutes = 45;
    let seconds = 30;

    setInterval(() => {
        seconds--;
        if (seconds < 0) {
            seconds = 59;
            minutes--;
            if (minutes < 0) {
                minutes = 59;
                hours--;
                if(hours < 0) {
                    hours = 23;
                }
            }
        }
        if (timerBoxes.length >= 3) {
            timerBoxes[0].textContent =hours.toString().padStart(2, '0');
            timerBoxes[1].textContent =minutes.toString().padStart(2, '0');
            timerBoxes[2].textContent =seconds.toString().padStart(2, '0');
        }
    }, 1000);
}

window.onclick = function(event) {
    const modal = document.getElementById('cartModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if(target) {
            target.scrollIntoView({
                behaviour: 'smooth'
            });
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const newsletterBtn = document.querySelector('.newsletter-btn');
    if(newsletterBtn) {
        newsletterBtn.addEventListener('click', function() {
            const email = document.querySelector('.newsletter-input').value;
            if (email) {
                alert('Thank you for subscribing to our newsletter!');
                document.querySelector('.newsletter-input').value = '';
            } else {
                alert('Please enter a valid email address');
            }
        });
    }

    loadProducts();
    updateCartUI();
    updateTimer();
});