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

// Performance Monitoring
let lastFrameTime = performance.now();
let fps = 60;
let frameCount = 0;
let lastFpsUpdate = performance.now();

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
let lastWidth = window.innerWidth;

window.addEventListener('resize', () => {
    // Mobile Address Bar Fix: Ignore vertical resize on mobile if width hasn't changed
    const currentWidth = window.innerWidth;
    const isMobileDevice = window.innerWidth <= 768;

    if (isMobileDevice && currentWidth === lastWidth) {
        return; // Skip resize if only height changed (address bar)
    }

    lastWidth = currentWidth;

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

        this.id = Math.random(); // Unique ID for grid filtering

        this.vx = this.baseVx;
        this.vy = this.baseVy;

        // VISIBILITY BOOST (v4.42) - Night Sky Mode
        if (Math.random() < 0.05) {
            this.rgb = '34, 211, 238'; // Cyan
            this.baseAlpha = 0.55; // Boosted for sparks
            this.hasGlow = true;
        } else {
            this.rgb = '148, 163, 184'; // Platinum
            // Slightly brighter base particles for "starry" feel
            this.baseAlpha = 0.25;
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
    // OPTIMIZED DENSITY - Balanced for performance & visual quality
    // Reduced from 110/60 to 70/45 for better performance
    const count = isMobile ? 45 : 70;
    for (let i = 0; i < count; i++) {
        particles.push(new Particle());
    }
}

function animate() {
    // Skip rendering when tab is hidden (MAJOR performance boost)
    if (document.hidden) {
        requestAnimationFrame(animate);
        return;
    }

    // FPS Monitoring
    const now = performance.now();
    const delta = now - lastFrameTime;
    lastFrameTime = now;

    frameCount++;
    if (now - lastFpsUpdate > 1000) {
        fps = Math.round((frameCount * 1000) / (now - lastFpsUpdate));
        frameCount = 0;
        lastFpsUpdate = now;
    }

    ctx.clearRect(0, 0, width, height);

    // OPTIMIZED GRID SETTINGS - Larger cells = fewer checks
    const connectionDist = isMobile ? 120 : 230;
    const cellSize = connectionDist * 1.5; // Increased for better performance
    const cols = Math.ceil(width / cellSize);
    const rows = Math.ceil(height / cellSize);
    const grid = new Array(cols * rows).fill(null).map(() => []);

    // 1. UPDATE & BUCKET PARTICLES
    particles.forEach(p => {
        p.update();
        p.draw(); // Draw dot

        // Determine grid cell
        const col = Math.floor(p.x / cellSize);
        const row = Math.floor(p.y / cellSize);

        if (col >= 0 && col < cols && row >= 0 && row < rows) {
            grid[row * cols + col].push(p);
        }
    });

    // 2. CHECK CONNECTIONS EFFICIENTLY
    const minDistSq = connectionDist * connectionDist;

    // Helper to get particles from adjacent cells
    const getNeighborParticles = (col, row) => {
        const neighbors = [];
        for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
                const c = col + dx;
                const r = row + dy;
                if (c >= 0 && c < cols && r >= 0 && r < rows) {
                    const cellParticles = grid[r * cols + c];
                    if (cellParticles) neighbors.push(...cellParticles);
                }
            }
        }
        return neighbors;
    };

    // BATCH RENDERING - Collect all lines first, then render
    const linesToDraw = [];

    particles.forEach(p => {
        const pCol = Math.floor(p.x / cellSize);
        const pRow = Math.floor(p.y / cellSize);
        const neighbors = getNeighborParticles(pCol, pRow);

        // Iterate only potential neighbors
        for (let i = 0; i < neighbors.length; i++) {
            const p2 = neighbors[i];

            // Avoid duplicate checks
            if (p.id >= p2.id) continue;

            const dx = p.x - p2.x;
            const dy = p.y - p2.y;

            // Quick bounding box check (avoid expensive sqrt)
            if (Math.abs(dx) > connectionDist || Math.abs(dy) > connectionDist) continue;

            const distSq = dx * dx + dy * dy;

            if (distSq < minDistSq) {
                // Use squared distance for ratio calculation when possible
                const dist = Math.sqrt(distSq);

                // CUBIC FALLOFF
                const ratio = 1 - (dist / connectionDist);
                const opacity = ratio * ratio * ratio * 0.20;

                if (opacity > 0.005) {
                    linesToDraw.push({ p, p2, opacity });
                }

                // TRIANGLES - Skip if FPS is low to maintain smoothness
                // Only render triangles if performance is good (>45 fps)
                const shouldRenderTriangles = fps > 45 || !isMobile;

                if (shouldRenderTriangles) {
                    for (let j = i + 1; j < neighbors.length; j++) {
                        const p3 = neighbors[j];
                        if (p2.id >= p3.id) continue; // Ensure ordering to prevent dupes

                        const dx2 = p2.x - p3.x;
                        const dy2 = p2.y - p3.y;
                        const distSq2 = dx2 * dx2 + dy2 * dy2;

                        if (distSq2 < minDistSq) {
                            // Original Logic check: DistSq2 < MinDistSq.
                            // It implicitly relied on loop order P -> P2 -> P3.
                            // Ideally strictly we should check P->P3 too for "perfect" Plexus
                            // but to maintain EXACT visual behavior of previous code,
                            // we only check P2->P3. (Though previous code forced P3 to be after P2 index).

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
        }
    });

    // BATCH RENDER ALL LINES (much faster than individual strokes)
    linesToDraw.forEach(({ p, p2, opacity }) => {
        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
    });

    requestAnimationFrame(animate);
}

// Throttled mouse tracking for better performance
let mouseUpdateScheduled = false;
window.addEventListener('mousemove', e => {
    if (!mouseUpdateScheduled) {
        mouseUpdateScheduled = true;
        requestAnimationFrame(() => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
            mouseUpdateScheduled = false;
        });
    }
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
