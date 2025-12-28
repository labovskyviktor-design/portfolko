const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);

canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.style.zIndex = '0'; // Changed from -1 to be visible above body background color
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
        this.vx = (Math.random() - 0.5) * (isMobile ? 0.3 : 0.5);
        this.vy = (Math.random() - 0.5) * (isMobile ? 0.3 : 0.5);
        this.size = Math.random() * (isMobile ? 1.5 : 2) + 1;
        this.color = `rgba(${Math.random() > 0.5 ? '99, 102, 241' : '6, 182, 212'}, ${Math.random() * 0.4 + 0.1})`;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        // Skip mouse interaction on small mobile for performance
        if (!isMobile) {
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 200) {
                const force = (200 - dist) / 200;
                this.vx -= (dx / dist) * force * 0.5;
                this.vy -= (dy / dist) * force * 0.5;
            }
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
    const count = isMobile ? 45 : 100; // Drastically reduced for mobile performance
    for (let i = 0; i < count; i++) {
        particles.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, width, height);

    const connectionDist = isMobile ? 100 : 150; // Shorter connections on mobile

    particles.forEach((p, i) => {
        p.update();
        p.draw();

        for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const distSq = dx * dx + dy * dy; // Optimization: use square distance
            const minDistSq = connectionDist * connectionDist;

            if (distSq < minDistSq) {
                const dist = Math.sqrt(distSq);
                ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 - dist / (connectionDist * 10)})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }
        }
    });

    requestAnimationFrame(animate);
}

window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

// Initial trigger
width = canvas.width = window.innerWidth;
height = canvas.height = window.innerHeight;
initParticles();
animate();
