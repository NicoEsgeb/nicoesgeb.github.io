// =================== MAIN.JS ===================

// Get the fireflies canvas and context
const canvas = document.getElementById("fireflies-canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// Ensure the canvas doesn't block clicks on underlying elements
canvas.style.pointerEvents = 'none';

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// ----------------- Global Variables -----------------
let fireflies = [];
let bonfires = []; // Global array for bonfires
let mouseTrail = []; // Array to store recent mouse positions for the trail

// Global mouse object for fireflies attraction and trail drawing
let mouse = { x: null, y: null, radius: 13 };
// On every mousemove, update mouse position and add a trail point
window.addEventListener("mousemove", event => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
    mouseTrail.push({ x: event.clientX, y: event.clientY, time: Date.now() });
});

// ----------------- Document Click Listener for Bonfires -----------------
// Create a bonfire only if the click target is NOT inside an interactive element.
document.addEventListener("click", (event) => {
    if (event.target.closest(".interactive")) {
        return;
    }
    bonfires.push(new Bonfire(event.clientX, event.clientY));
});

// ----------------- Create Fireflies -----------------
for (let i = 0; i < 70; i++) {
    fireflies.push(new Firefly());
}

// ----------------- Draw the Mouse Trail -----------------
// This function draws a continuous, smooth line with small, subtle dots along the mouse trail.
function drawMouseTrail() {
    const trailLifetime = 400; // Lifetime for each trail point in ms
    const now = Date.now();
    // Remove old trail points
    mouseTrail = mouseTrail.filter(pt => now - pt.time < trailLifetime);

    if (mouseTrail.length < 2) return; // Need at least two points to draw a line

    ctx.save();
    // Apply a slight blur so the connecting line looks smooth and plasma‑like
    ctx.filter = 'blur(2px)';

    // Draw connecting line
    ctx.beginPath();
    ctx.moveTo(mouseTrail[0].x, mouseTrail[0].y);
    for (let i = 1; i < mouseTrail.length; i++) {
        ctx.lineTo(mouseTrail[i].x, mouseTrail[i].y);
    }
    ctx.strokeStyle = "rgba(100,200,255,0.3)";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw small dots at each trail point (subtle, so they don't appear as large balls)
    for (let pt of mouseTrail) {
        let age = now - pt.time;
        let factor = 1 - age / trailLifetime; // Fades from 1 (new) to 0 (old)
        // Use a small base radius with a slight variation
        let r = mouse.radius * (1 + factor * 0.1);
        let gradient = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, r);
        gradient.addColorStop(0, `rgba(100,200,255, ${0.4 * factor})`);
        gradient.addColorStop(1, 'rgba(100,200,255, 0)');
        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(pt.x, pt.y, r, 0, Math.PI * 2);
        ctx.fill();
    }

    ctx.restore();
}

// ----------------- Animation Loop -----------------
function animate() {
    // Clear the entire canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the plasma-like mouse trail with connecting lines and subtle dots
    if (mouse.x && mouse.y) {
        drawMouseTrail();
    }

    // Update and draw bonfires; remove expired ones
    for (let i = bonfires.length - 1; i >= 0; i--) {
        bonfires[i].update();
        bonfires[i].draw(ctx);
        if (bonfires[i].expired()) {
            bonfires.splice(i, 1);
        }
    }

    // Update and draw fireflies
    for (let firefly of fireflies) {
        firefly.update();
        firefly.draw(ctx);
    }

    requestAnimationFrame(animate);
}

animate();



