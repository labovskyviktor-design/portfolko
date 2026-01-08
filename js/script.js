// --- 3. Navbar & Mobile Menu Logic (GLOBAL EXPOSURE - TOP LEVEL) ---
window.toggleMobileMenu = function () {
    const menuTrigger = document.querySelector('.menu-trigger');
    const mobileNav = document.querySelector('.mobile-nav');
    const navbar = document.querySelector('.navbar');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (!menuTrigger || !mobileNav) {
        console.error("Critical: Menu elements missing");
        return;
    }

    menuTrigger.classList.toggle('active');
    mobileNav.classList.toggle('active');
    if (navbar) navbar.classList.toggle('menu-open');
    document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';

    // Staggered reveal for mobile links
    if (mobileNav.classList.contains('active')) {
        mobileLinks.forEach((link, i) => {
            link.style.opacity = '0';
            link.style.transform = 'translateY(20px)';
            setTimeout(() => {
                link.style.transition = 'all 0.4s var(--ease-out)';
                link.style.opacity = '1';
                link.style.transform = 'translateY(0)';
            }, 100 + i * 100);
        });
    }
};

document.addEventListener('DOMContentLoaded', () => {

    // --- 0. Preloader (CRITICAL: MUST RUN FIRST) ---
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        // Force hide after load
        window.addEventListener('load', () => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        });

        // Fallback for safety (max 3s)
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 3000);
    }

    // --- 1. Navbar & Scroll Logic (THROTTLED) ---
    const navbar = document.querySelector('.navbar');
    const backToTop = document.querySelector('.back-to-top');
    const progressBar = document.querySelector('.progress-circle-bar');
    const progressTotal = 283;

    let scrollScheduled = false;
    function handleScroll() {
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        if (backToTop) {
            if (window.scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }

        if (progressBar) {
            const scrollPercent = (window.scrollY) / (document.documentElement.scrollHeight - window.innerHeight);
            const offset = progressTotal - (scrollPercent * progressTotal);
            progressBar.style.strokeDashoffset = offset;
        }

        scrollScheduled = false;
    }

    window.addEventListener('scroll', () => {
        if (!scrollScheduled) {
            scrollScheduled = true;
            requestAnimationFrame(handleScroll);
        }
    }, { passive: true });

    // Auto-close on link click
    const mobileLinks = document.querySelectorAll('.mobile-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            const mobileNav = document.querySelector('.mobile-nav');
            if (mobileNav && mobileNav.classList.contains('active')) {
                window.toggleMobileMenu(); // Re-use global function
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        const mobileNav = document.querySelector('.mobile-nav');
        const menuTrigger = document.querySelector('.menu-trigger');
        if (mobileNav && mobileNav.classList.contains('active') && !mobileNav.contains(e.target) && !menuTrigger.contains(e.target)) {
            window.toggleMobileMenu();
        }
    });


    // --- 2. Premium Custom Cursor (Simple & Smooth) ---
    // Only init if device has fine pointer (mouse)
    if (window.matchMedia("(pointer: fine)").matches) {
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
    }

    // --- 3. Premium Magnetic Effect ---
    const magneticItems = [];
    function initMagnetic() {
        if (window.innerWidth <= 1024) return;

        document.querySelectorAll('.magnetic').forEach(el => {
            magneticItems.push({
                el: el,
                currentX: 0, currentY: 0,
                targetX: 0, targetY: 0,
                lerp: 0.1
            });

            el.addEventListener('mousemove', (e) => {
                const item = magneticItems.find(m => m.el === el);
                const rect = el.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const strength = el.classList.contains('btn') ? 40 : 20;

                item.targetX = (e.clientX - centerX) * (strength / 100);
                item.targetY = (e.clientY - centerY) * (strength / 100);
            });

            el.addEventListener('mouseleave', () => {
                const item = magneticItems.find(m => m.el === el);
                item.targetX = 0;
                item.targetY = 0;
            });
        });
    }

    function updateMagnetic() {
        // Skip when tab is hidden (performance boost)
        if (document.hidden) {
            requestAnimationFrame(updateMagnetic);
            return;
        }

        magneticItems.forEach(item => {
            // Only update if element is in viewport (major optimization)
            const rect = item.el.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

            if (isVisible) {
                const lerp = (start, end, factor) => start + (end - start) * factor;
                item.currentX = lerp(item.currentX, item.targetX, item.lerp);
                item.currentY = lerp(item.currentY, item.targetY, item.lerp);
                item.el.style.transform = `translate3d(${item.currentX}px, ${item.currentY}px, 0)`;
            }
        });
        requestAnimationFrame(updateMagnetic);
    }

    initMagnetic();
    updateMagnetic();

    // --- 4. Smooth Scroll Reveal (Optimized) ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.05,  // Reduced from 0.1 for earlier triggering
        rootMargin: '50px'  // Start animation slightly before element enters viewport
    });

    const sections = document.querySelectorAll('section, header');
    sections.forEach(section => {
        const revealElements = section.querySelectorAll('.skill-card-container, .project-card, h1, .badge, .hero-tagline, .cta-group');
        revealElements.forEach((el, i) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = `all 0.6s cubic-bezier(0.23, 1, 0.32, 1) ${i * 0.03}s`;  // Reduced from 0.05s
            observer.observe(el);
        });
    });

    // --- 5. Content Protection ---
    document.addEventListener('contextmenu', (e) => e.preventDefault());
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && (e.key === 'c' || e.key === 'v' || e.key === 'x' || e.key === 'u' || e.key === 'a')) {
            e.preventDefault();
        }
    });

    // --- SHOW MORE PROJECTS LOGIC ---
    const showMoreBtn = document.getElementById('show-more-projects');
    if (showMoreBtn) {
        showMoreBtn.addEventListener('click', function () {
            const hiddenProjects = document.querySelectorAll('.hidden-project');
            hiddenProjects.forEach((project, index) => {
                setTimeout(() => {
                    project.classList.add('reveal');
                    project.classList.remove('hidden-project');
                }, index * 200);
            });
            this.style.opacity = '0';
            this.style.pointerEvents = 'none';
            setTimeout(() => this.remove(), 500);
        });
    }

});
