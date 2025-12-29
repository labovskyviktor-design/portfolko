const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);

canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.style.zIndex = '0'; // Changed to 0 to ensure it is visible above body background but below content
canvas.style.pointerEvents = 'none';

let width, height;
let particles = [];
let mouse = { x: -1000, y: -1000 };
let isMobile = window.innerWidth <= 768;

function resize() {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

    // Only re-init if significant change (not just scrollbar hiding on mobile)
    if (Math.abs(newWidth - width) > 50 || !isMobile) {
        width = canvas.width = newWidth;
        height = canvas.height = newHeight;
        isMobile = width <= 768;
        initParticles();
    }
}

// Throttle resize for mobile fluidity
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(resize, 200);
});

class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        // PREMIUM SLOW MOTION (Reduced by ~60%)
        this.vx = (Math.random() - 0.5) * (isMobile ? 0.3 : 0.2);
        this.vy = (Math.random() - 0.5) * (isMobile ? 0.3 : 0.2);
        this.size = Math.random() * (isMobile ? 1.5 : 2) + 1;
        this.color = `rgba(${Math.random() > 0.5 ? '99, 102, 241' : '6, 182, 212'}, ${Math.random() * 0.4 + 0.1})`;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        // Restore mouse/touch interaction detection logic
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < (isMobile ? 150 : 200)) {
            const force = ((isMobile ? 150 : 200) - dist) / (isMobile ? 150 : 200);
            this.vx -= (dx / dist) * force * (isMobile ? 0.8 : 0.5); // STRONGER PUSH ON MOBILE
            this.vy -= (dy / dist) * force * (isMobile ? 0.8 : 0.5);
        }

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    // HIGHER DENSITY FOR PLEXUS STRUCTURES
    const count = isMobile ? 60 : 160;
    for (let i = 0; i < count; i++) {
        particles.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, width, height);

    const connectionDist = isMobile ? 110 : 160;

    particles.forEach((p, i) => {
        p.update();
        p.draw();

        for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const distSq = dx * dx + dy * dy;
            const minDistSq = connectionDist * connectionDist;

            if (distSq < minDistSq) {
                const dist = Math.sqrt(distSq);

                // Draw Connection Line
                ctx.strokeStyle = `rgba(255, 255, 255, ${0.12 - dist / (connectionDist * 8)})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();

                // PLEXUS TRIANGULATION (Create Structures)
                // Look for a third particle to form a triangle
                for (let k = j + 1; k < particles.length; k++) {
                    const p3 = particles[k];
                    const dx2 = p2.x - p3.x;
                    const dy2 = p2.y - p3.y;
                    const distSq2 = dx2 * dx2 + dy2 * dy2;

                    if (distSq2 < minDistSq) {
                        // We have a triangle (p1-p2, p2-p3, and implicitly p1-p3 distance check included by loop nature usually sufficient for visual cluster)
                        // Fill the triangle with very low opacity
                        ctx.fillStyle = `rgba(99, 102, 241, ${0.03 - dist / (connectionDist * 20)})`; // Subtle indigo tint
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.lineTo(p3.x, p3.y);
                        ctx.closePath();
                        ctx.fill();
                    }
                }
            }
        }
    });

    requestAnimationFrame(animate);
}

// RESTORED TOUCH INTERACTIVITY FOR MOBILE
window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

window.addEventListener('touchstart', e => {
    if (e.touches[0]) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
    }
}, { passive: true });

window.addEventListener('touchmove', e => {
    if (e.touches[0]) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
    }
}, { passive: true });

window.addEventListener('touchend', () => {
    mouse.x = -1000;
    mouse.y = -1000;
});

// Initial trigger
width = canvas.width = window.innerWidth;
height = canvas.height = window.innerHeight;
initParticles();
animate();
