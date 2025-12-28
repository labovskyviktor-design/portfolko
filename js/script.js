document.addEventListener('DOMContentLoaded', () => {

    // --- 0. Preloader ---
    window.addEventListener('load', () => {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }
    });

    // --- 1. Premium Custom Cursor (Simple & Smooth) ---
    const cursorDot = document.createElement('div');
    const cursorOutline = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    cursorOutline.className = 'cursor-outline';
    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorOutline);

    const spotlight = document.createElement('div');
    spotlight.className = 'spotlight-overlay';
    document.body.appendChild(spotlight);

    // Core coordinates
    let mouseX = 0, mouseY = 0;
    let dotX = 0, dotY = 0;
    let outlineX = 0, outlineY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        spotlight.style.setProperty('--x', `${mouseX}px`);
        spotlight.style.setProperty('--y', `${mouseY}px`);
    });

    const lerp = (start, end, factor) => start + (end - start) * factor;

    function renderCursor() {
        // Smooth movement
        dotX = lerp(dotX, mouseX, 0.2);
        dotY = lerp(dotY, mouseY, 0.2);
        outlineX = lerp(outlineX, mouseX, 0.1);
        outlineY = lerp(outlineY, mouseY, 0.1);

        cursorDot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;
        cursorOutline.style.transform = `translate3d(${outlineX}px, ${outlineY}px, 0) translate(-50%, -50%)`;

        requestAnimationFrame(renderCursor);
    }
    renderCursor();

    // Click behavior
    window.addEventListener('mousedown', () => cursorOutline.classList.add('clicking'));
    window.addEventListener('mouseup', () => cursorOutline.classList.remove('clicking'));

    // Dynamic Interaction Detection
    function initInteractions() {
        const triggers = document.querySelectorAll('a, button, .skill-card-container, .project-card, .lang-btn, .magnetic');

        triggers.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorDot.classList.add('active');
                cursorOutline.classList.add('active');
            });

            el.addEventListener('mouseleave', () => {
                cursorDot.classList.remove('active');
                cursorOutline.classList.remove('active');
            });
        });
    }
    initInteractions();

    // --- 2. Smooth Scroll Reveal (Optimized & Snappy) ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                // Stop observing after reveal for performance
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    // Grouping by section to reset stagger index
    const sections = document.querySelectorAll('section, header');
    sections.forEach(section => {
        const revealElements = section.querySelectorAll('.skill-card-container, .project-card, h1, .badge, .hero-tagline, .cta-group');
        revealElements.forEach((el, i) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = `all 0.6s cubic-bezier(0.23, 1, 0.32, 1) ${i * 0.05}s`;
            observer.observe(el);
        });
    });

    // --- 3. Navbar & Mobile Menu Logic ---
    const navbar = document.querySelector('.navbar');
    const menuTrigger = document.querySelector('.menu-trigger');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    const toggleMenu = () => {
        menuTrigger.classList.toggle('active');
        mobileNav.classList.toggle('active');
        document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    };

    if (menuTrigger) {
        menuTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });
    }

    mobileLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (mobileNav.classList.contains('active') && !mobileNav.contains(e.target) && !menuTrigger.contains(e.target)) {
            toggleMenu();
        }
    });

    // Mobile Interactions removed for flat design
    /*
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.addEventListener('click', function () {
            if (window.innerWidth <= 1024) {
                this.classList.toggle('flipped');
            }
        });
    });
    */

    const backToTop = document.querySelector('.back-to-top');
    const progressBar = document.querySelector('.progress-circle-bar');
    const progressTotal = 283;

    // --- 5. Content Protection (No Copy/Selection) ---
    document.addEventListener('contextmenu', (e) => e.preventDefault());
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && (e.key === 'c' || e.key === 'v' || e.key === 'x' || e.key === 'u' || e.key === 'a')) {
            e.preventDefault();
        }
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }

        const scrollPercent = (window.scrollY) / (document.documentElement.scrollHeight - window.innerHeight);
        const offset = progressTotal - (scrollPercent * progressTotal);
        if (progressBar) {
            progressBar.style.strokeDashoffset = offset;
        }
    });

});
