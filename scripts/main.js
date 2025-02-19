// =================== MAIN.JS ===================

// Get the fireflies canvas and context
const canvas = document.getElementById("fireflies-canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Ensure canvas doesn't block clicks on underlying elements
canvas.style.pointerEvents = 'none';

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// ----------------- Global Variables -----------------
let fireflies = [];
let bonfires = []; // Global array for bonfires

// Global mouse object for fireflies attraction and glow properties
let mouse = { x: null, y: null, radius: 50 };
window.addEventListener("mousemove", event => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

// ----------------- Document Click Listener for Bonfires -----------------
// Only create a bonfire if the click target is not inside an interactive element.
document.addEventListener("click", (event) => {
    // If clicked inside an element with class "interactive", do nothing.
    if (event.target.closest(".interactive")) {
        return;
    }
    // Otherwise, create a bonfire at the click position.
    bonfires.push(new Bonfire(event.clientX, event.clientY));
});

// ----------------- Create Fireflies -----------------
for (let i = 0; i < 70; i++) {
    fireflies.push(new Firefly());
}

// ----------------- Animation Loop -----------------
function animate() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw a small glow at the mouse position
    if (mouse.x && mouse.y) {
        let glowRadius = mouse.radius;
        let gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, glowRadius);
        gradient.addColorStop(0, 'rgba(100, 200, 255, 0.4)');
        gradient.addColorStop(1, 'rgba(100, 200, 255, 0)');
        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(mouse.x, mouse.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();
    }

    // Update and draw bonfires, and remove any that have expired
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