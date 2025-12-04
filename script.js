// =============================================
// TAMWORTH CRUISING CLUB - PREMIUM JAVASCRIPT
// ULTIMATE WOW Factor Edition
// =============================================

document.addEventListener('DOMContentLoaded', function() {

    // Check if mobile
    const isMobile = window.innerWidth <= 768 || 'ontouchstart' in window;

    // =============================================
    // MOUSE CURSOR TRAIL EFFECT (desktop only)
    // =============================================
    if (!isMobile) {
        const cursorTrail = document.createElement('div');
        cursorTrail.className = 'cursor-trail';
        document.body.appendChild(cursorTrail);

        let mouseX = 0, mouseY = 0;
        let trailX = 0, trailY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateCursor() {
            trailX += (mouseX - trailX) * 0.15;
            trailY += (mouseY - trailY) * 0.15;
            cursorTrail.style.left = trailX + 'px';
            cursorTrail.style.top = trailY + 'px';
            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // =============================================
        // MAGNETIC BUTTONS (desktop only)
        // =============================================
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                this.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            });

            btn.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
        });
    }

    // =============================================
    // MOBILE NAVIGATION
    // =============================================
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // =============================================
    // NAVBAR SCROLL EFFECT WITH BLUR
    // =============================================
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    if (navbar) {
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // Hide/show navbar on scroll direction
            if (currentScroll > lastScroll && currentScroll > 300) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }

            lastScroll = currentScroll;
        });
    }

    // =============================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // =============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // =============================================
    // STAGGERED SCROLL ANIMATIONS
    // =============================================
    const animateElements = document.querySelectorAll('[data-animate]');

    if (animateElements.length > 0) {
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animated');
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        animateElements.forEach(el => {
            observer.observe(el);
        });
    }

    // =============================================
    // ANIMATED COUNTER WITH EASING
    // =============================================
    const statNumbers = document.querySelectorAll('.stat-number');

    if (statNumbers.length > 0) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const text = target.textContent;
                    const number = parseInt(text.replace(/\D/g, ''));
                    const suffix = text.replace(/[0-9]/g, '');

                    if (!isNaN(number) && number > 0) {
                        animateCounter(target, number, suffix);
                    }
                    counterObserver.unobserve(target);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(stat => counterObserver.observe(stat));
    }

    function animateCounter(element, target, suffix) {
        const duration = 2500;
        const start = performance.now();

        function easeOutExpo(t) {
            return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
        }

        function update(currentTime) {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutExpo(progress);
            const current = Math.floor(easedProgress * target);

            element.textContent = current + suffix;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = target + suffix;
            }
        }

        requestAnimationFrame(update);
    }

    // =============================================
    // ADVANCED PARALLAX EFFECT
    // =============================================
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    const heroBg = document.querySelector('.hero-bg');
    const particles = document.querySelectorAll('.particle');

    if (hero && heroContent) {
        window.addEventListener('scroll', throttle(function() {
            const scrolled = window.pageYOffset;
            const heroHeight = hero.offsetHeight;

            if (scrolled < heroHeight) {
                const opacity = 1 - (scrolled / heroHeight) * 1.5;
                const translateY = scrolled * 0.5;
                const scale = 1 + scrolled * 0.0005;

                heroContent.style.opacity = Math.max(0, opacity);
                heroContent.style.transform = `translateY(${translateY}px)`;

                if (heroBg) {
                    heroBg.style.transform = `scale(${scale}) translateY(${scrolled * 0.3}px)`;
                }

                particles.forEach((p, i) => {
                    p.style.transform = `translateY(${scrolled * (0.2 + i * 0.05)}px)`;
                });
            }
        }, 16));
    }

    // =============================================
    // WATER RIPPLE EFFECT ON CLICK
    // =============================================
    document.addEventListener('click', function(e) {
        if (e.target.closest('.hero') || e.target.closest('.cta')) {
            createRipple(e.clientX, e.clientY);
        }
    });

    function createRipple(x, y) {
        const ripple = document.createElement('div');
        ripple.className = 'water-ripple';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        document.body.appendChild(ripple);

        setTimeout(() => ripple.remove(), 2000);
    }

    // =============================================
    // TEXT REVEAL ANIMATION
    // =============================================
    const revealTexts = document.querySelectorAll('.section-title, .hero h1, .page-header h1');

    revealTexts.forEach(text => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('text-revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(text);
    });

    // =============================================
    // CONTACT FORM HANDLING
    // =============================================
    const contactForm = document.querySelector('#contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            let valid = true;

            this.querySelectorAll('input, textarea, select').forEach(field => {
                field.style.borderColor = '';
            });

            if (!data.name || data.name.trim() === '') {
                valid = false;
                showFieldError(this.querySelector('#name'));
            }

            if (!data.email || !isValidEmail(data.email)) {
                valid = false;
                showFieldError(this.querySelector('#email'));
            }

            if (!data.subject || data.subject === '') {
                valid = false;
                showFieldError(this.querySelector('#subject'));
            }

            if (!data.message || data.message.trim() === '') {
                valid = false;
                showFieldError(this.querySelector('#message'));
            }

            if (valid) {
                const btn = this.querySelector('.btn');
                const originalText = btn.textContent;
                btn.innerHTML = '<span class="spinner"></span> Sending...';
                btn.style.opacity = '0.7';

                setTimeout(() => {
                    btn.innerHTML = '✓ Message Sent!';
                    btn.style.background = 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)';

                    // Confetti effect
                    createConfetti();

                    setTimeout(() => {
                        btn.textContent = originalText;
                        btn.style.background = '';
                        btn.style.opacity = '';
                        this.reset();
                    }, 3000);
                }, 1500);
            }
        });
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showFieldError(field) {
        if (field) {
            field.style.borderColor = '#ef4444';
            field.style.animation = 'shake 0.5s ease';
            setTimeout(() => {
                field.style.animation = '';
            }, 500);
        }
    }

    // =============================================
    // CONFETTI EFFECT
    // =============================================
    function createConfetti() {
        const colors = ['#d4af37', '#1a6b3c', '#1a6b8a', '#ffffff'];

        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * 100 + 'vw';
                confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
                confetti.style.animationDelay = Math.random() * 0.5 + 's';
                document.body.appendChild(confetti);

                setTimeout(() => confetti.remove(), 4000);
            }, i * 30);
        }
    }

    // =============================================
    // GALLERY LIGHTBOX WITH ZOOM
    // =============================================
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (galleryItems.length > 0) {
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                const img = this.querySelector('img');
                const caption = this.querySelector('.gallery-caption');

                const lightbox = document.createElement('div');
                lightbox.className = 'lightbox';
                lightbox.innerHTML = `
                    <div class="lightbox-overlay"></div>
                    <div class="lightbox-content">
                        ${img ? `<img src="${img.src}" alt="${img.alt}">` : ''}
                        ${caption ? `<div class="lightbox-caption">${caption.textContent}</div>` : ''}
                        <button class="lightbox-close" aria-label="Close">&times;</button>
                    </div>
                `;

                document.body.appendChild(lightbox);
                document.body.style.overflow = 'hidden';

                // Animate in
                requestAnimationFrame(() => {
                    lightbox.classList.add('active');
                });

                const closeLightbox = () => {
                    lightbox.classList.remove('active');
                    setTimeout(() => {
                        document.body.removeChild(lightbox);
                        document.body.style.overflow = '';
                    }, 300);
                };

                lightbox.querySelector('.lightbox-overlay').addEventListener('click', closeLightbox);
                lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
                document.addEventListener('keydown', function escHandler(e) {
                    if (e.key === 'Escape') {
                        closeLightbox();
                        document.removeEventListener('keydown', escHandler);
                    }
                });
            });
        });
    }

    // =============================================
    // BUTTON RIPPLE EFFECT
    // =============================================
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const ripple = document.createElement('span');
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255,255,255,0.4);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });

    // =============================================
    // 3D TILT EFFECT FOR CARDS (desktop only)
    // =============================================
    if (!isMobile) {
        const tiltCards = document.querySelectorAll('.feature-card, .facility-card, .news-card');

        tiltCards.forEach(card => {
            card.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 25;
                const rotateY = (centerX - x) / 25;

                this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
            });

            card.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
        });
    }

    // =============================================
    // FLOATING ANIMATION FOR IMAGES
    // =============================================
    const floatingImages = document.querySelectorAll('.welcome-image img, .facility-feature-image img');

    floatingImages.forEach(img => {
        img.style.animation = 'float 6s ease-in-out infinite';
    });

    // =============================================
    // SMOOTH SCROLL PROGRESS BAR
    // =============================================
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', throttle(function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        progressBar.style.width = progress + '%';
    }, 16));

    // =============================================
    // LAZY LOADING IMAGES WITH BLUR EFFECT
    // =============================================
    const lazyImages = document.querySelectorAll('img[src]');

    lazyImages.forEach(img => {
        if (!img.complete) {
            img.style.filter = 'blur(10px)';
            img.style.transition = 'filter 0.5s ease';

            img.addEventListener('load', function() {
                this.style.filter = 'blur(0)';
            });
        }
    });

    // =============================================
    // ADD CSS ANIMATIONS
    // =============================================
    const style = document.createElement('style');
    style.textContent = `
        /* Cursor Trail */
        .cursor-trail {
            position: fixed;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, rgba(212,175,55,0.5) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            mix-blend-mode: screen;
        }

        @media (max-width: 768px) {
            .cursor-trail { display: none; }
        }

        /* Water Ripple */
        .water-ripple {
            position: fixed;
            width: 10px;
            height: 10px;
            border: 2px solid rgba(26,107,138,0.6);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: 9998;
            animation: waterRipple 2s ease-out forwards;
        }

        @keyframes waterRipple {
            0% { width: 10px; height: 10px; opacity: 1; }
            100% { width: 400px; height: 400px; opacity: 0; }
        }

        /* Scroll Progress Bar */
        .scroll-progress {
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            background: linear-gradient(90deg, #1a6b3c, #d4af37, #1a6b8a);
            z-index: 10001;
            transition: width 0.1s linear;
        }

        /* Confetti */
        .confetti {
            position: fixed;
            top: -10px;
            width: 10px;
            height: 10px;
            border-radius: 2px;
            z-index: 9999;
            animation: confettiFall 3s ease-out forwards;
        }

        @keyframes confettiFall {
            0% { transform: translateY(0) rotate(0deg); opacity: 1; }
            100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }

        /* Spinner */
        .spinner {
            display: inline-block;
            width: 16px;
            height: 16px;
            border: 2px solid rgba(255,255,255,0.3);
            border-top-color: white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-right: 8px;
        }

        @keyframes spin {
            to { transform: rotate(360deg); }
        }

        /* Float Animation */
        @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-15px); }
        }

        /* Text Reveal */
        .section-title, .hero h1, .page-header h1 {
            background-size: 200% 100%;
            background-position: 100% 0;
            -webkit-background-clip: text;
            transition: background-position 1s ease;
        }

        .text-revealed {
            background-position: 0 0;
        }

        /* Lightbox Enhanced */
        .lightbox {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        .lightbox.active {
            opacity: 1;
        }

        .lightbox-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.95);
            backdrop-filter: blur(10px);
        }

        .lightbox-content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
            transform: scale(0.9);
            transition: transform 0.3s ease;
        }

        .lightbox.active .lightbox-content {
            transform: scale(1);
        }

        .lightbox-content img {
            max-width: 100%;
            max-height: 85vh;
            object-fit: contain;
            border-radius: 8px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.5);
        }

        .lightbox-caption {
            color: white;
            text-align: center;
            margin-top: 20px;
            font-size: 1.1rem;
        }

        .lightbox-close {
            position: absolute;
            top: -50px;
            right: 0;
            font-size: 40px;
            color: white;
            background: none;
            border: none;
            cursor: pointer;
            opacity: 0.8;
            transition: all 0.3s;
        }

        .lightbox-close:hover {
            opacity: 1;
            transform: rotate(90deg);
        }

        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }

        @keyframes scaleIn {
            from { transform: scale(0.9); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }

        @keyframes ripple {
            to { transform: scale(4); opacity: 0; }
        }

        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-10px); }
            75% { transform: translateX(10px); }
        }

        [data-animate] {
            opacity: 0;
            transform: translateY(50px);
            transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1),
                        transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        [data-animate].animated {
            opacity: 1;
            transform: translateY(0);
        }

        .feature-card, .facility-card, .news-card {
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            transform-style: preserve-3d;
        }

        /* Glowing border on hover */
        .feature-card:hover, .facility-card:hover, .news-card:hover {
            box-shadow:
                0 20px 40px rgba(0,0,0,0.15),
                0 0 30px rgba(212,175,55,0.2);
        }

        /* Navbar transition */
        .navbar {
            transition: transform 0.3s ease, background 0.3s ease;
        }
    `;
    document.head.appendChild(style);

    // =============================================
    // PRELOADER
    // =============================================
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

});

// =============================================
// UTILITY: Throttle function for performance
// =============================================
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
