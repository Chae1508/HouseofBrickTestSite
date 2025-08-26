// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Update header background when menu is active
    const header = document.querySelector('.header');
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
        header.style.background = 'rgba(255, 255, 255, 1)'; // Solid white background
        header.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
    } else {
        document.body.style.overflow = 'auto';
        // Reset header background based on scroll position
        const scrollY = window.scrollY;
        if (scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = 'auto'; // Restore scrolling
    
    // Reset header background
    const header = document.querySelector('.header');
    const scrollY = window.scrollY;
    if (scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
    }
}));

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        // Reset header background
        const header = document.querySelector('.header');
        const scrollY = window.scrollY;
        if (scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header background change on scroll (optimized)
let headerTicking = false;

function updateHeaderBackground() {
    const header = document.querySelector('.header');
    const scrollY = window.scrollY;
    
    // Always keep header visible and at top
    header.style.transform = 'translateY(0)';
    header.style.position = 'fixed';
    header.style.top = '0';
    
    if (scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
    
    headerTicking = false;
}

window.addEventListener('scroll', () => {
    if (!headerTicking) {
        requestAnimationFrame(updateHeaderBackground);
        headerTicking = true;
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

// Elements to animate on scroll
const animateElements = document.querySelectorAll('.service-card, .contact-item, .about-text, .about-image, .brick-specs');

animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Form submission
document.querySelector('.contact-form form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const phone = this.querySelector('input[type="tel"]').value;
    const subject = this.querySelector('input[placeholder="Subject"]').value;
    const message = this.querySelector('textarea').value;
    
    // Simple validation
    if (!name || !email || !subject || !message) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Simulate form submission
    const submitBtn = this.querySelector('.btn-primary');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
});

// Parallax effect for hero section (reduced intensity)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero');
    if (parallax && scrolled < window.innerHeight) {
        const speed = scrolled * 0.1; // Reduced from 0.5 to 0.1 for subtler effect
        parallax.style.transform = `translateY(${speed}px)`;
    } else if (parallax) {
        parallax.style.transform = 'translateY(0)'; // Reset when scrolled past hero
    }
});

// Counter animation for experience badge
function animateCounter() {
    const counter = document.querySelector('.experience-number');
    const target = 10;
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        counter.textContent = Math.floor(current);
        if (current >= target) {
            counter.textContent = target;
            clearInterval(timer);
        }
    }, 20);
}

// Trigger counter animation when visible
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter();
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const experienceBadge = document.querySelector('.experience-badge');
if (experienceBadge) {
    counterObserver.observe(experienceBadge);
}

// Hero Stats Animation
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        let current = 0;
        const increment = target > 100 ? 10 : 1; // Adjust increment based on target
        const stepTime = target > 100 ? 10 : 20; // Faster for larger numbers
        
        // Reset to 0 first
        stat.textContent = '0';
        
        const timer = setInterval(() => {
            current += increment;
            
            if (current >= target) {
                stat.textContent = target;
                clearInterval(timer);
            } else {
                stat.textContent = current;
            }
        }, stepTime);
    });
}

// Simple immediate trigger for testing
function triggerStatsAnimation() {
    setTimeout(() => {
        animateStats();
    }, 500);
}

// Trigger stats animation when hero badges section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            triggerStatsAnimation();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

const heroBadges = document.querySelector('.hero-badges-grid');
if (heroBadges) {
    statsObserver.observe(heroBadges);
}

// Also trigger animation on page load if stats are already visible
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const heroBadgesElement = document.querySelector('.hero-badges-grid');
        if (heroBadgesElement) {
            const rect = heroBadgesElement.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            if (isVisible) {
                triggerStatsAnimation();
            }
        }
    }, 2000); // Wait 2 seconds after page load to ensure everything is loaded
});

// Add click event for manual testing (can be removed later)
document.addEventListener('click', (e) => {
    if (e.target.closest('.hero-badges-grid')) {
        animateStats();
    }
});

// Add loading animation to images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', function() {
        this.style.opacity = '1';
    });
    
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.5s ease';
    
    if (img.complete) {
        img.style.opacity = '1';
    }
});

// Service cards hover effect enhancement
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(-10px) scale(1)';
    });
});

// Add click effect to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousedown', function() {
        this.style.transform = 'scale(0.95)';
    });
    
    btn.addEventListener('mouseup', function() {
        this.style.transform = 'scale(1)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Scroll progress indicator
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(135deg, #e74c3c, #c0392b);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

createScrollProgress();

// Keep header always visible and sticky at top
function ensureHeaderSticky() {
    const header = document.querySelector('.header');
    // Ensure header stays at top and is always visible
    header.style.transform = 'translateY(0)';
    header.style.position = 'fixed';
    header.style.top = '0';
}

// Add resize listener for responsive adjustments
window.addEventListener('resize', () => {
    // Close mobile menu on resize and restore scrolling
    if (window.innerWidth > 768) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Initialize AOS (Animate On Scroll) alternative
document.addEventListener('DOMContentLoaded', () => {
    // Ensure header is sticky
    ensureHeaderSticky();
    
    // Trigger initial animations
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// Add custom cursor effect for interactive elements
document.querySelectorAll('a, button, .service-card, .contact-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
        document.body.style.cursor = 'pointer';
    });
    
    el.addEventListener('mouseleave', () => {
        document.body.style.cursor = 'default';
    });
});
