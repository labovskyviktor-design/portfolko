const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);

canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.style.zIndex = '-1';
canvas.style.pointerEvents = 'none';

let width, height;
let particles = [];
let mouse = { x: -1000, y: -1000 };
let isMobile = window.innerWidth <= 768;

// Global Gradient Storage
let meshGradient;

function resize() {
    const dpr = window.devicePixelRatio || 1;
    const displayWidth = window.innerWidth;
    const displayHeight = window.innerHeight;

    canvas.width = displayWidth * dpr;
    canvas.height = displayHeight * dpr;

    ctx.scale(dpr, dpr);

    width = displayWidth;
    height = displayHeight;
    isMobile = width <= 768;

    // LUXURY GRADIENT (Deepest Void)
    meshGradient = ctx.createLinearGradient(0, 0, width, height);
    meshGradient.addColorStop(0, 'rgba(2, 6, 23, 1)');     // Obsidian
    meshGradient.addColorStop(0.5, 'rgba(15, 23, 42, 1)');  // Dark Slate
    meshGradient.addColorStop(1, 'rgba(30, 27, 75, 1)');    // Deep Indigo

    initParticles();
}

let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(resize, 200);
});

class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * (isMobile ? 1.5 : 2.5) + 0.5;

        // 3D PARALLAX
        const depthFactor = this.size / 2;

        // Slower, smoother drift
        this.baseVx = (Math.random() - 0.5) * (isMobile ? 0.010 : 0.005) * depthFactor;
        this.baseVy = (Math.random() - 0.5) * (isMobile ? 0.010 : 0.005) * depthFactor;

        this.vx = this.baseVx;
        this.vy = this.baseVy;

        // VISIBILITY BOOST (v4.34)
        if (Math.random() < 0.05) {
            this.rgb = '34, 211, 238'; // Cyan
            this.baseAlpha = 0.45;
            this.hasGlow = true;
        } else {
            this.rgb = '148, 163, 184'; // Platinum
            this.baseAlpha = 0.18;
            this.hasGlow = Math.random() < 0.02;
        }

        this.angle = Math.random() * Math.PI * 2;
        this.angleSpeed = 0.002 + Math.random() * 0.004;
        this.phaseOffset = Math.random() * 100;
    }

    update() {
        // FLUID PHYSICS
        this.vx += (this.baseVx - this.vx) * 0.02;
        this.vy += (this.baseVy - this.vy) * 0.02;

        this.x += this.vx;
        this.y += this.vy;
        this.angle += this.angleSpeed;

        // INTERACTION (Strong Push)
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const interactRadius = isMobile ? 180 : 300;

        if (dist < interactRadius) {
            const relDist = 1 - (dist / interactRadius);
            const force = relDist * relDist;
            const pushMultiplier = isMobile ? 0.6 : 0.9;

            this.vx -= (dx / dist) * force * pushMultiplier;
            this.vy -= (dy / dist) * force * pushMultiplier;
        }

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;

        const alphaFluctuation = Math.sin(this.angle + this.phaseOffset) * 0.08;
        this.currentAlpha = Math.max(0.02, Math.min(0.8, this.baseAlpha + alphaFluctuation));
    }

    draw() {
        ctx.fillStyle = `rgba(${this.rgb}, ${this.currentAlpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();

        if (this.hasGlow && !isMobile) {
            ctx.fillStyle = `rgba(${this.rgb}, 0.06)`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}

function initParticles() {
    particles = [];
    // OPTIMIZED DENSITY (Increased by 10 as requested)
    // 30 -> 40 (Mobile), 65 -> 75 (Desktop)
    const count = isMobile ? 40 : 75;
    for (let i = 0; i < count; i++) {
        particles.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, width, height);

    // BALANCED RANGE
    const connectionDist = isMobile ? 120 : 230;

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

                // CUBIC FALLOFF
                const ratio = 1 - (dist / connectionDist);
                const opacity = ratio * ratio * ratio * 0.20;

                if (opacity > 0.005) {
                    ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }

                for (let k = j + 1; k < particles.length; k++) {
                    const p3 = particles[k];
                    const dx2 = p2.x - p3.x;
                    const dy2 = p2.y - p3.y;
                    const distSq2 = dx2 * dx2 + dy2 * dy2;

                    if (distSq2 < minDistSq) {
                        // STRUCTURE FILL
                        const ratio2 = 1 - (Math.sqrt(distSq2) / connectionDist);
                        const triAlpha = (ratio * ratio2) * 0.08;

                        ctx.globalAlpha = triAlpha;
                        ctx.fillStyle = meshGradient;
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.lineTo(p3.x, p3.y);
                        ctx.closePath();
                        ctx.fill();
                        ctx.globalAlpha = 1.0;
                    }
                }
            }
        }
    });

    requestAnimationFrame(animate);
}

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

resize();
animate();
