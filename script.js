/**
 * Planxisteria Gelabert - Enhanced Interactive Script
 * Premium functionality for modern web experience
 */

document.addEventListener('DOMContentLoaded', () => {

    // =====================================
    // HEADER SCROLL EFFECT
    // =====================================
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // =====================================
    // MOBILE MENU TOGGLE
    // =====================================
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = hamburger.classList.contains('active') ? 'hidden' : '';
        });

        // Close mobile menu when clicking a link
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close mobile menu when clicking outside
        mobileMenu.addEventListener('click', (e) => {
            if (e.target === mobileMenu) {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // =====================================
    // ACTIVE NAVIGATION LINK ON SCROLL
    // =====================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function highlightNavigation() {
        let scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });

        // If at the top, highlight the first link
        if (scrollY < 200) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLinks[0]) navLinks[0].classList.add('active');
        }
    }

    window.addEventListener('scroll', highlightNavigation);

    // =====================================
    // SMOOTH SCROLL FOR NAVIGATION LINKS
    // =====================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '#!') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // =====================================
    // REVEAL ELEMENTS ON SCROLL
    // =====================================
    const revealElements = document.querySelectorAll('.reveal');
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // =====================================
    // GALLERY CATEGORY FILTERING
    // =====================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.getAttribute('data-category');

            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter gallery items
            galleryItems.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.classList.remove('hidden');
                    item.style.animation = 'fadeIn 0.5s ease-in-out';
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });

    // =====================================
    // ANIMATED STATISTICS COUNTER
    // =====================================
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };

        updateCounter();
    }

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                statNumbers.forEach(stat => {
                    animateCounter(stat);
                });
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('#stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // =====================================
    // TESTIMONIALS CAROUSEL
    // =====================================
    const testimonialsTrack = document.getElementById('testimonialsTrack');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.getElementById('prevTestimonial');
    const nextBtn = document.getElementById('nextTestimonial');
    const dotsContainer = document.getElementById('testimonialDots');

    let currentTestimonial = 0;
    let autoPlayInterval;

    if (testimonialCards.length > 0) {
        // Create dots
        testimonialCards.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('carousel-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => showTestimonial(index));
            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.carousel-dot');

        function showTestimonial(index) {
            testimonialCards.forEach(card => card.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));

            currentTestimonial = index;
            testimonialCards[currentTestimonial].classList.add('active');
            dots[currentTestimonial].classList.add('active');

            // Reset autoplay
            clearInterval(autoPlayInterval);
            startAutoPlay();
        }

        function nextTestimonial() {
            let next = (currentTestimonial + 1) % testimonialCards.length;
            showTestimonial(next);
        }

        function prevTestimonial() {
            let prev = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
            showTestimonial(prev);
        }

        function startAutoPlay() {
            autoPlayInterval = setInterval(nextTestimonial, 5000); // Change every 5 seconds
        }

        if (prevBtn) prevBtn.addEventListener('click', prevTestimonial);
        if (nextBtn) nextBtn.addEventListener('click', nextTestimonial);

        // Show first testimonial and start autoplay
        showTestimonial(0);
    }

    // =====================================
    // BACK TO TOP BUTTON
    // =====================================
    const backToTopBtn = document.getElementById('backToTop');

    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // =====================================
    // ENHANCED MODAL WITH BEFORE/AFTER SLIDER
    // =====================================
    const modal = document.getElementById('modal');
    const beforeImg = document.getElementById('beforeImg');
    const afterImg = document.getElementById('afterImg');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const sliderHandle = document.getElementById('sliderHandle');
    const comparisonOverlay = document.querySelector('.comparison-overlay');

    let isDragging = false;

    window.openModal = function (title, baseImageName, description = '') {
        // Set images
        beforeImg.src = `./assets/img/${baseImageName}.png`;
        afterImg.src = `./assets/img/${baseImageName}_1.png`;
        
        // Set text
        modalTitle.textContent = title;
        modalDescription.textContent = description;
        
        // Show modal
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Reset slider to center
        if (comparisonOverlay && sliderHandle) {
            comparisonOverlay.style.width = '50%';
            sliderHandle.style.left = '50%';
        }
    };

    window.closeModal = function () {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    };

    // Slider drag functionality
    if (sliderHandle && comparisonOverlay) {
        const imageWrapper = document.querySelector('.comparison-image-wrapper');

        function updateSliderPosition(e) {
            if (!imageWrapper) return;

            const rect = imageWrapper.getBoundingClientRect();
            let x;

            if (e.type.includes('touch')) {
                x = e.touches[0].clientX - rect.left;
            } else {
                x = e.clientX - rect.left;
            }

            const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
            
            comparisonOverlay.style.width = percentage + '%';
            sliderHandle.style.left = percentage + '%';
        }

        function startDrag(e) {
            isDragging = true;
            updateSliderPosition(e);
        }

        function stopDrag() {
            isDragging = false;
        }

        function drag(e) {
            if (!isDragging) return;
            e.preventDefault();
            updateSliderPosition(e);
        }

        // Mouse events
        sliderHandle.addEventListener('mousedown', startDrag);
        document.addEventListener('mouseup', stopDrag);
        document.addEventListener('mousemove', drag);

        // Touch events
        sliderHandle.addEventListener('touchstart', startDrag);
        document.addEventListener('touchend', stopDrag);
        document.addEventListener('touchmove', drag);
    }

    // Close modal on click outside content
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    // =====================================
    // PARALLAX EFFECT ON HERO SECTION
    // =====================================
    const heroImg = document.querySelector('.hero-img img');
    
    if (heroImg) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            heroImg.style.transform = `translateY(${rate}px)`;
        });
    }

    // =====================================
    // CONSOLE GREETING
    // =====================================
    console.log('%c🚗 Planxisteria Gelabert', 'font-size: 24px; font-weight: bold; color: #007AFF;');
    console.log('%cMés de 60 anys d\'excel·lència en carrosseria', 'font-size: 14px; color: #A1A1A6;');
    console.log('%c✨ Website Enhanced by AI', 'font-size: 12px; color: #34C759;');

});