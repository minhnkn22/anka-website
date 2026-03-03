/* ========================================
   Anka Ventures — Main JavaScript
   ======================================== */

(function () {
    'use strict';

    // --- Navigation scroll effect ---
    const nav = document.getElementById('nav');
    let lastScrollY = 0;

    function handleNavScroll() {
        const scrollY = window.scrollY;
        if (scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        lastScrollY = scrollY;
    }

    window.addEventListener('scroll', handleNavScroll, { passive: true });

    // --- Mobile menu toggle ---
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function () {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('open');
            document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
        });

        // Close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                navToggle.classList.remove('active');
                navLinks.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

    // --- Scroll reveal animations ---
    function revealElements() {
        const reveals = document.querySelectorAll('.reveal');
        const windowHeight = window.innerHeight;

        reveals.forEach(function (el) {
            const top = el.getBoundingClientRect().top;
            const revealPoint = windowHeight - 80;

            if (top < revealPoint) {
                el.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', revealElements, { passive: true });
    // Run once on load
    window.addEventListener('DOMContentLoaded', function () {
        // Small delay to let the page render
        setTimeout(revealElements, 100);
    });

    // --- Counter animation for stats ---
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number[data-count]');

        counters.forEach(function (counter) {
            if (counter.dataset.animated) return;

            const rect = counter.getBoundingClientRect();
            if (rect.top > window.innerHeight - 80) return;

            counter.dataset.animated = 'true';
            const target = parseInt(counter.getAttribute('data-count'), 10);
            const duration = 1500;
            const startTime = performance.now();

            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // Ease out cubic
                const eased = 1 - Math.pow(1 - progress, 3);
                const current = Math.round(eased * target);

                counter.textContent = current;

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                }
            }

            requestAnimationFrame(updateCounter);
        });
    }

    window.addEventListener('scroll', animateCounters, { passive: true });
    window.addEventListener('DOMContentLoaded', function () {
        setTimeout(animateCounters, 500);
    });

    // --- Smooth anchor scrolling ---
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

})();
