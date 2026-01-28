/**
 * Planxisteria Gelabert - Script
 * Redesigned for Premium Experience
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- Header Scroll Effect ---
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Reveal Elements on Scroll ---
    const revealElements = document.querySelectorAll('.reveal');
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: stop observing once revealed
                // observer.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- Modal Handling ---
    const modal = document.getElementById('modal');
    const beforeImg = document.getElementById('beforeImg');
    const afterImg = document.getElementById('afterImg');
    const modalTitle = document.getElementById('modalTitle');

    window.openModal = function (title, baseImageName) {
        // According to the file structure: 
        // Before image is usually "galeriaX.png"
        // After image is "galeriaX_1.png"
        beforeImg.src = `./assets/img/${baseImageName}.png`;
        afterImg.src = `./assets/img/${baseImageName}_1.png`;

        modalTitle.textContent = title;
        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent scroll
    };

    window.closeModal = function () {
        modal.classList.remove('show');
        document.body.style.overflow = ''; // Restore scroll
    };

    // Close modal on click outside content
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });

});