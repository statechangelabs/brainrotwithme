// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(254, 252, 249, 0.98)';
            navbar.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
        } else {
            navbar.style.background = 'rgba(254, 252, 249, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe feature cards and steps
    const animatedElements = document.querySelectorAll('.feature-card, .step');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            // Basic validation
            if (!formData.name || !formData.email || !formData.subject || !formData.message) {
                showNotification('Please fill in all fields.', 'error');
                return;
            }

            if (!isValidEmail(formData.email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }

            // Show loading state
            const submitButton = contactForm.querySelector('.form-submit');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;

            // Simulate form submission (replace with actual email service)
            setTimeout(() => {
                // Create mailto link as fallback
                const mailtoLink = `mailto:rakheja.akshay@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
                    `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
                )}`;

                // Open email client
                window.location.href = mailtoLink;

                // Reset form
                contactForm.reset();

                // Reset button
                submitButton.textContent = originalText;
                submitButton.disabled = false;

                // Show success message
                showNotification('Thank you! Your message has been prepared. Please send it from your email client.', 'success');
            }, 1000);
        });
    }

    // CTA buttons
    const ctaButtons = document.querySelectorAll('.primary-btn, .cta-button, .cta-button-large');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (!this.getAttribute('href')) {
                e.preventDefault();
                showNotification('Coming soon! We\'re putting the finishing touches on the app.', 'info');
            }
        });
    });

    // Instagram button
    const instagramButton = document.querySelector('.instagram-btn');
    if (instagramButton) {
        instagramButton.addEventListener('click', function(e) {
            e.preventDefault();
            toggleInstagramFeed();
        });
    }
});

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${getNotificationIcon(type)}</span>
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: white;
        border-radius: 12px;
        box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
        border-left: 4px solid ${getNotificationColor(type)};
        padding: 16px 20px;
        max-width: 400px;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;

    // Add to document
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Close functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

function getNotificationIcon(type) {
    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };
    return icons[type] || icons.info;
}

function getNotificationColor(type) {
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6'
    };
    return colors[type] || colors.info;
}

// Add notification styles
const notificationStyles = `
    .notification-content {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .notification-icon {
        font-size: 1.2rem;
        flex-shrink: 0;
    }

    .notification-message {
        flex: 1;
        color: #374151;
        font-weight: 500;
        line-height: 1.5;
    }

    .notification-close {
        background: none;
        border: none;
        font-size: 1.5rem;
        color: #9ca3af;
        cursor: pointer;
        padding: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: all 0.2s ease;
    }

    .notification-close:hover {
        background: #f3f4f6;
        color: #374151;
    }
`;

// Inject notification styles
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);

// Add mobile menu styles
const mobileMenuStyles = `
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            top: 80px;
            right: -100%;
            width: 100%;
            height: calc(100vh - 80px);
            background: rgba(254, 252, 249, 0.98);
            backdrop-filter: blur(20px);
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            padding-top: 2rem;
            transition: right 0.3s ease;
        }

        .nav-menu.active {
            right: 0;
        }

        .nav-menu .nav-link {
            font-size: 1.2rem;
            margin: 1rem 0;
        }

        .hamburger.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }

        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }

        .hamburger.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    }
`;

// Inject mobile menu styles
const mobileStyleSheet = document.createElement('style');
mobileStyleSheet.textContent = mobileMenuStyles;
document.head.appendChild(mobileStyleSheet);

// Instagram Feed Functionality
function toggleInstagramFeed() {
    const instagramSection = document.getElementById('instagram-feed');
    const instagramButton = document.querySelector('.instagram-btn');

    if (instagramSection.style.display === 'none' || instagramSection.style.display === '') {
        instagramSection.style.display = 'block';
        instagramButton.textContent = 'Hide Content';

        // Smooth scroll to Instagram section
        setTimeout(() => {
            instagramSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }, 100);

        // Load Instagram posts if not already loaded
        if (!instagramSection.dataset.loaded) {
            loadInstagramPosts();
            instagramSection.dataset.loaded = 'true';
        }
    } else {
        instagramSection.style.display = 'none';
        instagramButton.textContent = 'View Our Content';
    }
}

function loadInstagramPosts() {
    const instagramGrid = document.getElementById('instagram-posts');

    // Show loading state
    instagramGrid.innerHTML = '<div class="instagram-loading">Loading our latest content...</div>';

    // Since we can't directly access Instagram API without authentication,
    // we'll create some sample posts and provide a link to the actual Instagram
    setTimeout(() => {
        displayInstagramContent();
    }, 1500);
}

function displayInstagramContent() {
    const instagramGrid = document.getElementById('instagram-posts');

    // Simple, effective Instagram profile showcase
    instagramGrid.innerHTML = `
        <div class="instagram-profile-showcase">
            <div class="instagram-profile-card">
                <div class="profile-header">
                    <div class="profile-avatar">
                        <div class="avatar-circle">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                            </svg>
                        </div>
                    </div>
                    <div class="profile-info">
                        <h3>@brainrot.withme</h3>
                        <p class="bio">🧠 Transform content into viral learning experiences</p>
                        <p class="stats">📱 Copyright-free AI content • 🚀 Educational brainrot</p>
                    </div>
                </div>

                <div class="content-preview">
                    <h4>Latest Content Highlights</h4>
                    <div class="content-grid">
                        <div class="content-item">
                            <div class="content-placeholder">
                                <span class="emoji">📰</span>
                                <p>News ➜ Viral Content</p>
                            </div>
                        </div>
                        <div class="content-item">
                            <div class="content-placeholder">
                                <span class="emoji">📄</span>
                                <p>PDF ➜ Social Posts</p>
                            </div>
                        </div>
                        <div class="content-item">
                            <div class="content-placeholder">
                                <span class="emoji">🧠</span>
                                <p>Learning + Entertainment</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="profile-actions">
                    <a href="https://www.instagram.com/brainrot.withme/" target="_blank" class="follow-button">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                        Follow @brainrot.withme
                    </a>

                    <a href="https://www.instagram.com/brainrot.withme/" target="_blank" class="view-posts-button">
                        View All Posts →
                    </a>
                </div>
            </div>
        </div>
    `;

    // Style the Instagram profile card
    addInstagramProfileStyles();
}

function addInstagramProfileStyles() {
    const profileStyles = `
        .instagram-profile-showcase {
            max-width: 600px;
            margin: 0 auto;
        }

        .instagram-profile-card {
            background: white;
            border-radius: 20px;
            padding: 2.5rem;
            box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .profile-header {
            display: flex;
            gap: 1.5rem;
            margin-bottom: 2rem;
            align-items: center;
        }

        .profile-avatar {
            flex-shrink: 0;
        }

        .avatar-circle {
            width: 80px;
            height: 80px;
            background: linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 8px 15px -3px rgb(0 0 0 / 0.2);
        }

        .profile-info h3 {
            font-size: 1.5rem;
            font-weight: 700;
            color: #1f2937;
            margin-bottom: 0.5rem;
        }

        .profile-info .bio {
            color: #374151;
            font-weight: 500;
            margin-bottom: 0.5rem;
        }

        .profile-info .stats {
            color: #6b7280;
            font-size: 0.9rem;
            line-height: 1.6;
        }

        .content-preview {
            margin-bottom: 2rem;
        }

        .content-preview h4 {
            color: #374151;
            font-size: 1.1rem;
            font-weight: 600;
            margin-bottom: 1rem;
            text-align: center;
        }

        .content-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1rem;
        }

        .content-item {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 12px;
            padding: 1rem;
            text-align: center;
            color: white;
            transition: transform 0.3s ease;
        }

        .content-item:hover {
            transform: translateY(-3px);
        }

        .content-placeholder .emoji {
            font-size: 1.5rem;
            display: block;
            margin-bottom: 0.5rem;
        }

        .content-placeholder p {
            font-size: 0.8rem;
            font-weight: 500;
            margin: 0;
        }

        .profile-actions {
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
        }

        .follow-button, .view-posts-button {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.875rem 1.5rem;
            border-radius: 12px;
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s ease;
            flex: 1;
            justify-content: center;
            min-width: 150px;
            font-size: 0.9rem;
        }

        .follow-button {
            background: linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%);
            color: white;
            border: none;
        }

        .follow-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px -5px rgb(0 0 0 / 0.3);
        }

        .view-posts-button {
            background: rgba(255, 255, 255, 0.1);
            color: white;
            border: 2px solid rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(10px);
        }

        .view-posts-button:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: translateY(-2px);
        }

        @media (max-width: 768px) {
            .instagram-profile-card {
                padding: 2rem;
            }

            .profile-header {
                flex-direction: column;
                text-align: center;
                gap: 1rem;
            }

            .content-grid {
                grid-template-columns: 1fr;
            }

            .profile-actions {
                flex-direction: column;
            }

            .follow-button, .view-posts-button {
                flex: none;
                width: 100%;
            }
        }

        @media (max-width: 480px) {
            .instagram-profile-card {
                padding: 1.5rem;
            }

            .avatar-circle {
                width: 60px;
                height: 60px;
            }

            .profile-info h3 {
                font-size: 1.25rem;
            }
        }
    `;

    // Add styles if not already added
    if (!document.getElementById('instagram-profile-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'instagram-profile-styles';
        styleSheet.textContent = profileStyles;
        document.head.appendChild(styleSheet);
    }
}