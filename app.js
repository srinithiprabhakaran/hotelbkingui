// ==================== PHOTO CAROUSEL ====================
function prevPhoto(event) {
    event.stopPropagation();
    const hotelCard = event.target.closest('.hotel-card');
    const carousel = hotelCard.querySelector('.hotel-image-carousel');
    const dots = hotelCard.querySelectorAll('.photo-dot');
    
    let currentIndex = Array.from(dots).findIndex(d => d.classList.contains('active'));
    currentIndex = currentIndex === 0 ? dots.length - 1 : currentIndex - 1;
    
    goToPhotoIndex(carousel, dots, currentIndex);
}

function nextPhoto(event) {
    event.stopPropagation();
    const hotelCard = event.target.closest('.hotel-card');
    const carousel = hotelCard.querySelector('.hotel-image-carousel');
    const dots = hotelCard.querySelectorAll('.photo-dot');
    
    let currentIndex = Array.from(dots).findIndex(d => d.classList.contains('active'));
    currentIndex = currentIndex === dots.length - 1 ? 0 : currentIndex + 1;
    
    goToPhotoIndex(carousel, dots, currentIndex);
}

function goToPhoto(event, index) {
    event.stopPropagation();
    const hotelCard = event.target.closest('.hotel-card');
    const carousel = hotelCard.querySelector('.hotel-image-carousel');
    const dots = hotelCard.querySelectorAll('.photo-dot');
    
    goToPhotoIndex(carousel, dots, index);
}

function goToPhotoIndex(carousel, dots, index) {
    const offset = -(index * 100);
    carousel.style.transform = `translateX(${offset}%)`;
    
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
}

// ==================== PAGE NAVIGATION ====================
function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // Show selected page
    const selectedPage = document.getElementById(pageId);
    if (selectedPage) {
        selectedPage.classList.add('active');
        window.scrollTo(0, 0);
    }
}

// ==================== HOME PAGE - SEARCH FUNCTIONALITY ====================
function searchHotels() {
    const destination = document.getElementById('destination').value;
    const checkin = document.getElementById('checkin').value;
    const checkout = document.getElementById('checkout').value;
    
    if (!destination) {
        alert('Please enter a destination');
        return;
    }
    
    if (!checkin || !checkout) {
        alert('Please select check-in and check-out dates');
        return;
    }
    
    // Update location display on hotels page
    document.getElementById('location-display').textContent = destination;
    
    // Show hotels page
    showPage('hotels-page');
}

// ==================== HOTELS PAGE - FILTERS ====================
function updatePriceRange() {
    const minInput = document.getElementById('priceMin');
    const maxInput = document.getElementById('priceMax');
    const minPrice = document.getElementById('minPrice');
    const maxPrice = document.getElementById('maxPrice');
    
    let minVal = parseInt(minInput.value);
    let maxVal = parseInt(maxInput.value);
    
    if (minVal > maxVal) {
        minInput.value = maxVal;
        minVal = maxVal;
    }
    
    minPrice.textContent = minVal;
    maxPrice.textContent = maxVal;
}

// Initialize price range
document.addEventListener('DOMContentLoaded', function() {
    updatePriceRange();
    
    // Room selection functionality
    const roomOptions = document.querySelectorAll('.room-option');
    roomOptions.forEach(option => {
        option.addEventListener('click', function() {
            roomOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            this.querySelector('input').checked = true;
        });
    });
    
    // Wishlist button functionality
    const wishlistBtns = document.querySelectorAll('.wishlist-btn');
    wishlistBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const icon = this.querySelector('i');
            icon.classList.toggle('far');
            icon.classList.toggle('fas');
            
            if (icon.classList.contains('fas')) {
                this.style.background = '#ffebee';
                this.style.color = '#ef4444';
            } else {
                this.style.background = 'white';
                this.style.color = '#6b7280';
            }
        });
    });
});

// ==================== BOOKING PAGE ====================
function goToBooking(hotelName, price, imageUrl) {
    // Store booking data
    window.bookingData = {
        hotelName: hotelName,
        price: price,
        imageUrl: imageUrl,
        nights: 4, // March 30 - April 3 = 4 nights
        servicefee: 58,
        taxes: 139
    };
    
    // Update booking summary
    document.getElementById('hotel-name-summary').textContent = hotelName;
    document.getElementById('summary-hotel-image').src = imageUrl;
    
    // Calculate prices
    const subtotal = price * 4;
    const total = subtotal + 58 + 139;
    
    document.getElementById('subtotal').textContent = '$' + subtotal.toLocaleString();
    document.getElementById('total-amount').textContent = '$' + total.toLocaleString();
    
    // Show booking page
    showPage('booking-page');
}

function completeBooking() {
    // Validate form
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const cardNumber = document.getElementById('cardNumber').value;
    const expiry = document.getElementById('expiry').value;
    const cvv = document.getElementById('cvv').value;
    const cardName = document.getElementById('cardName').value;
    const terms = document.getElementById('terms').checked;
    
    // Validation
    if (!firstName || !lastName) {
        alert('Please enter your first and last name');
        return;
    }
    
    if (!email || !email.includes('@')) {
        alert('Please enter a valid email address');
        return;
    }
    
    if (!phone) {
        alert('Please enter your phone number');
        return;
    }
    
    if (!cardNumber || cardNumber.replace(/\s/g, '').length < 13) {
        alert('Please enter a valid card number');
        return;
    }
    
    if (!expiry || !expiry.includes('/')) {
        alert('Please enter a valid expiry date (MM/YY)');
        return;
    }
    
    if (!cvv || cvv.length < 3) {
        alert('Please enter a valid CVV');
        return;
    }
    
    if (!cardName) {
        alert('Please enter cardholder name');
        return;
    }
    
    if (!terms) {
        alert('Please agree to Terms and Conditions');
        return;
    }
    
    // Generate booking ID
    const bookingId = generateBookingId();
    
    // Update confirmation page
    document.getElementById('booking-id').textContent = bookingId;
    document.getElementById('confirm-hotel-name').textContent = window.bookingData.hotelName;
    
    // Show confirmation page
    showPage('confirmation-page');
    
    // Show success message
    showNotification('Booking confirmed! Check your email for details.', 'success');
}

function generateBookingId() {
    const prefix = 'BK-';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let id = '';
    for (let i = 0; i < 8; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return prefix + id;
}

// ==================== NOTIFICATIONS ====================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles for notification
    const style = document.createElement('style');
    if (!document.getElementById('notification-styles')) {
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 20px;
                border-radius: 8px;
                background: white;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                z-index: 1000;
                animation: slideIn 0.3s ease;
                max-width: 400px;
            }
            
            @keyframes slideIn {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            .notification-success {
                border-left: 4px solid #10b981;
                color: #10b981;
            }
            
            .notification-error {
                border-left: 4px solid #ef4444;
                color: #ef4444;
            }
            
            .notification-info {
                border-left: 4px solid #0066ff;
                color: #0066ff;
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Auto remove notification
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// ==================== FORM ENHANCEMENTS ====================

// Card number formatting
document.addEventListener('DOMContentLoaded', function() {
    const cardNumberInput = document.getElementById('cardNumber');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function() {
            this.value = this.value.replace(/\D/g, '')
                                   .replace(/(\d{4})/g, '$1 ')
                                   .trim();
        });
    }
    
    // Expiry date formatting
    const expiryInput = document.getElementById('expiry');
    if (expiryInput) {
        expiryInput.addEventListener('input', function() {
            this.value = this.value.replace(/\D/g, '')
                                   .replace(/(\d{2})(\d)/, '$1/$2');
        });
    }
    
    // CVV only numbers
    const cvvInput = document.getElementById('cvv');
    if (cvvInput) {
        cvvInput.addEventListener('input', function() {
            this.value = this.value.replace(/\D/g, '');
        });
    }
});

// ==================== RATING INTERACTIVITY ====================
document.addEventListener('DOMContentLoaded', function() {
    const ratingCheckboxes = document.querySelectorAll('.rating-filter input, .amenities-filter input');
    ratingCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            console.log(this.parentElement.textContent + ': ' + (this.checked ? 'checked' : 'unchecked'));
            showNotification('Filter updated', 'info');
        });
    });
});

// ==================== KEYBOARD SHORTCUTS ====================
document.addEventListener('keydown', function(e) {
    // Escape key to go back to home
    if (e.key === 'Escape') {
        showPage('home-page');
    }
});

// ==================== DATE PICKER ENHANCEMENT ====================
document.addEventListener('DOMContentLoaded', function() {
    const checkinInput = document.getElementById('checkin');
    const checkoutInput = document.getElementById('checkout');
    
    if (checkinInput && checkoutInput) {
        // Add date input type fallback
        checkinInput.type = 'date';
        checkoutInput.type = 'date';
        
        // Convert back to text for display format
        checkinInput.type = 'text';
        checkoutInput.type = 'text';
    }
});

// ==================== SMOOTH SCROLLING ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ==================== MOBILE MENU (If needed in future) ====================
function toggleMobileMenu() {
    const menu = document.querySelector('.nav-links');
    if (menu) {
        menu.classList.toggle('active');
    }
}

// ==================== PAGE LOAD ANIMATIONS ====================
window.addEventListener('load', function() {
    const cards = document.querySelectorAll('.hotel-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.animation = `slideUp 0.5s ease ${index * 0.1}s forwards`;
    });
});

// Add slide up animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// ==================== LOCAL STORAGE FOR WISHLIST ====================
const wishlistBtns = document.querySelectorAll('.wishlist-btn');

// Load wishlist from localStorage on page load
document.addEventListener('DOMContentLoaded', function() {
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    
    wishlistBtns.forEach((btn, index) => {
        if (savedWishlist.includes(index)) {
            const icon = btn.querySelector('i');
            icon.classList.remove('far');
            icon.classList.add('fas');
            btn.style.background = '#ffebee';
            btn.style.color = '#ef4444';
        }
        
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const icon = this.querySelector('i');
            icon.classList.toggle('far');
            icon.classList.toggle('fas');
            
            if (icon.classList.contains('fas')) {
                this.style.background = '#ffebee';
                this.style.color = '#ef4444';
                if (!savedWishlist.includes(index)) {
                    savedWishlist.push(index);
                }
            } else {
                this.style.background = 'white';
                this.style.color = '#6b7280';
                const i = savedWishlist.indexOf(index);
                if (i > -1) {
                    savedWishlist.splice(i, 1);
                }
            }
            
            localStorage.setItem('wishlist', JSON.stringify(savedWishlist));
        });
    });
});

// ==================== ANALYTICS TRACKING (Optional) ====================
function trackEvent(eventName, eventData) {
    console.log(`Event: ${eventName}`, eventData);
    // Can be integrated with analytics service like Google Analytics
}

// Track page visits
document.addEventListener('DOMContentLoaded', function() {
    const pages = document.querySelectorAll('.page');
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.attributeName === 'class') {
                const page = mutation.target;
                if (page.classList.contains('active')) {
                    trackEvent('page_view', { page: page.id });
                }
            }
        });
    });
    
    pages.forEach(page => {
        observer.observe(page, { attributes: true });
    });
});
