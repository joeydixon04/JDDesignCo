// Contact form submission
function handleSubmit(e) {
    e.preventDefault();
    
    // Add loading state to button
    const button = e.target.querySelector('button[type="submit"]');
    const originalText = button.textContent;
    button.textContent = 'Sending...';
    button.style.opacity = '0.5';
    
    // Simulate sending (replace with actual form submission)
    setTimeout(() => {
        button.textContent = 'Sent!';
        button.style.opacity = '1';
        alert('Thank you for your message! I will get back to you within 24 hours.');
        e.target.reset();
        
        // Reset button after 2 seconds
        setTimeout(() => {
            button.textContent = originalText;
        }, 2000);
    }, 1000);
}

// Smooth cursor follower effect
function customCursor() {
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);
    
    const cursorDot = document.createElement('div');
    cursorDot.classList.add('cursor-dot');
    document.body.appendChild(cursorDot);
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let dotX = 0, dotY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dotX = e.clientX;
        dotY = e.clientY;
    });
    
    function animate() {
        // Smooth follow effect for main cursor
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        cursorDot.style.left = dotX + 'px';
        cursorDot.style.top = dotY + 'px';
        
        requestAnimationFrame(animate);
    }
    animate();
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .custom-cursor {
            width: 40px;
            height: 40px;
            border: 1px solid rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            position: fixed;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            transition: width 0.3s, height 0.3s, border 0.3s;
        }
        
        .cursor-dot {
            width: 6px;
            height: 6px;
            background: #fff;
            border-radius: 50%;
            position: fixed;
            pointer-events: none;
            z-index: 10000;
            transform: translate(-50%, -50%);
        }
        
        .custom-cursor.hover {
            width: 60px;
            height: 60px;
            border-color: #fff;
        }
        
        body {
            cursor: none;
        }
        
        a, button, .card, .cta-button {
            cursor: none;
        }
    `;
    document.head.appendChild(style);
    
    // Expand cursor on hover
    const hoverElements = document.querySelectorAll('a, button, .card, .cta-button');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
}

// Parallax effect on scroll for sections
function parallaxScroll() {
    const parallaxElements = document.querySelectorAll('.card');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach((el, index) => {
            const rect = el.getBoundingClientRect();
            const elementTop = rect.top + scrolled;
            
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const speed = 0.03 + (index * 0.01);
                const yPos = -(scrolled - elementTop) * speed;
                el.style.transform = `translateY(${yPos}px)`;
            }
        });
    });
}

// Staggered text reveal animation (only for h2 and h3, not h1)
function textReveal() {
    const textElements = document.querySelectorAll('h2, h3');
    
    textElements.forEach(element => {
        const text = element.textContent;
        element.innerHTML = '';
        
        const chars = text.split('');
        chars.forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.opacity = '0';
            span.style.display = 'inline-block';
            span.style.animation = `fadeInChar 0.5s ease forwards ${index * 0.03}s`;
            element.appendChild(span);
        });
    });
    
    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInChar {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        h2 span, h3 span {
            transform: translateY(20px);
        }
    `;
    document.head.appendChild(style);
}

// Smooth scroll between sections
function smoothScroll() {
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
}

// Page transition effect
function pageTransitions() {
    // Create overlay element
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #000;
        z-index: 10001;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.5s ease;
    `;
    document.body.appendChild(overlay);
    
    // Fade in on page load
    window.addEventListener('load', () => {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '1';
        }, 100);
    });
    
    // Fade out on navigation
    document.querySelectorAll('a').forEach(link => {
        if (!link.getAttribute('href').startsWith('#') && !link.getAttribute('target')) {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href && href !== 'mailto:' && !href.startsWith('tel:')) {
                    e.preventDefault();
                    overlay.style.opacity = '1';
                    setTimeout(() => {
                        window.location.href = href;
                    }, 500);
                }
            });
        }
    });
}

// Fade-in animation on scroll
function fadeInOnScroll() {
    const elements = document.querySelectorAll('.card, .about-intro-text, .about-what-i-do, .about-image, .contact-form');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1
    });

    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
}

// Smooth reveal for hero text
function heroReveal() {
    const hero = document.querySelector('.hero h1');
    const heroP = document.querySelector('.hero p');
    const heroBtn = document.querySelector('.hero .cta-button');
    
    if (hero) {
        setTimeout(() => {
            hero.style.opacity = '1';
            hero.style.transform = 'translateY(0)';
        }, 100);
    }
    
    if (heroP) {
        setTimeout(() => {
            heroP.style.opacity = '1';
            heroP.style.transform = 'translateY(0)';
        }, 400);
    }
    
    if (heroBtn) {
        setTimeout(() => {
            heroBtn.style.opacity = '1';
            heroBtn.style.transform = 'translateY(0)';
        }, 700);
    }
}

// Magnetic effect on buttons with liquid glass
function magneticButtons() {
    const buttons = document.querySelectorAll('.cta-button, .card');
    
    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            // Magnetic effect
            button.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
            
            // Liquid glass effect - update CSS custom properties for gradient position
            const mouseX = ((e.clientX - rect.left) / rect.width) * 100;
            const mouseY = ((e.clientY - rect.top) / rect.height) * 100;
            button.style.setProperty('--mouse-x', `${mouseX}%`);
            button.style.setProperty('--mouse-y', `${mouseY}%`);
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0)';
        });
    });
}

// Scroll progress indicator
function scrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #fff 0%, rgba(255,255,255,0.5) 100%);
        width: 0%;
        z-index: 9998;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Floating elements on mouse move
function floatingElements() {
    const floaters = document.querySelectorAll('.hero h1, .hero p');
    
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth) * 10 - 5;
        const y = (e.clientY / window.innerHeight) * 10 - 5;
        
        floaters.forEach((floater, index) => {
            const speed = (index + 1) * 0.3;
            floater.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
        });
    });
}

// Initialize all animations
document.addEventListener('DOMContentLoaded', () => {
    // Core animations
    fadeInOnScroll();
    heroReveal();
    magneticButtons();
    
    // New features
    customCursor();
    parallaxScroll();
    textReveal();
    smoothScroll();
    pageTransitions();
    scrollProgress();
    floatingElements();
    
    // Set initial states for hero elements
    const hero = document.querySelector('.hero h1');
    const heroP = document.querySelector('.hero p');
    const heroBtn = document.querySelector('.hero .cta-button');
    
    if (hero) {
        hero.style.opacity = '0';
        hero.style.transform = 'translateY(30px)';
        hero.style.transition = 'opacity 1s ease, transform 1s ease';
    }
    
    if (heroP) {
        heroP.style.opacity = '0';
        heroP.style.transform = 'translateY(30px)';
        heroP.style.transition = 'opacity 1s ease, transform 1s ease';
    }
    
    if (heroBtn) {
        heroBtn.style.opacity = '0';
        heroBtn.style.transform = 'translateY(30px)';
        heroBtn.style.transition = 'opacity 1s ease, transform 1s ease';
    }
});

// ====== GALLERY POPUP FUNCTIONS ======

// Gallery data - Replace these with your actual image paths
const galleries = {
    poster: {
        title: 'Poster Design',
        images: [
            'images/posters/poster1.jpg',
            'images/posters/poster2.jpg',
            'images/posters/poster3.jpg',
            'images/posters/poster4.jpg',
            'images/posters/poster5.jpg',
            'images/posters/poster6.jpg',
            'images/posters/poster7.jpg',
            'images/posters/poster8.jpg',
            'images/posters/poster9.jpg',
            'images/posters/poster10.jpg',
            'images/posters/poster11.jpg',
            'images/posters/poster12.jpg',
            'images/posters/poster13.jpg',
            'images/posters/poster14.jpg',
            'images/posters/poster15.jpg',
            'images/posters/poster16.jpg',
            'images/posters/poster17.jpg',
            'images/posters/poster18.jpg',
            'images/posters/poster19.jpg',
            'images/posters/poster20.jpg',
			'images/posters/poster21.jpg'
        ]
    },
    social: {
        title: 'Social Media',
        images: [
            'images/social/social1.jpg',
            'images/social/social2.jpg',
            'images/social/social3.jpg',
            'images/social/social4.jpg',
            'images/social/social5.jpg',
            'images/social/social6.jpg',
            'images/social/social7.jpg',
            'images/social/social8.jpg',
            'images/social/social9.jpg',
            'images/social/social10.jpg',
            'images/social/social11.jpg',
            'images/social/social12.jpg',
            'images/social/social13.jpg',
            'images/social/social14.jpg',
            'images/social/social15.jpg',
            'images/social/social16.jpg',
            'images/social/social17.jpg',
            'images/social/social18.jpg',
            'images/social/social19.jpg',
            'images/social/social20.jpg'
        ]
    },
    advertising: {
        title: 'Advertising Design',
        images: [
            'images/advertising/ad1.jpg',
            'images/advertising/ad2.jpg',
            'images/advertising/ad3.jpg',
            'images/advertising/ad4.jpg',
            'images/advertising/ad5.jpg',
            'images/advertising/ad6.jpg',
            'images/advertising/ad7.jpg',
            'images/advertising/ad8.jpg',
            'images/advertising/ad9.jpg',
            'images/advertising/ad10.jpg',
            'images/advertising/ad11.jpg',
            'images/advertising/ad12.jpg',
            'images/advertising/ad13.jpg',
            'images/advertising/ad14.jpg',
            'images/advertising/ad15.jpg',
            'images/advertising/ad16.jpg',
            'images/advertising/ad17.jpg',
            'images/advertising/ad18.jpg',
            'images/advertising/ad19.jpg',
            'images/advertising/ad20.jpg'
        ]
    }
};

function openGallery(category) {
    const modal = document.getElementById('galleryModal');
    const title = document.getElementById('galleryTitle');
    const grid = document.getElementById('galleryGrid');
    
    const gallery = galleries[category];
    
    if (!gallery) return;
    
    // Set title
    title.textContent = gallery.title;
    
    // Clear previous images
    grid.innerHTML = '';
    
    // Add images
    gallery.images.forEach((imagePath, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-popup-item';
        
        const img = document.createElement('img');
        img.src = imagePath;
        img.alt = `${gallery.title} ${index + 1}`;
        
        item.appendChild(img);
        grid.appendChild(item);
    });
    
    // Show modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeGallery() {
    const modal = document.getElementById('galleryModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('galleryModal');
    if (event.target === modal) {
        closeGallery();
    }
});

// Close modal with ESC key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeGallery();
    }
});