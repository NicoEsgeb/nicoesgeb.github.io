
//------------------------------------ PARALLAX SCROLLING EFFECT --------------------------------------------
window.addEventListener("scroll", () => {
    let scrollPosition = window.scrollY;
    document.getElementById("layer1").style.transform = `translateY(${scrollPosition * 0.2}px)`;
    document.getElementById("layer2").style.transform = `translateY(${scrollPosition * 0.4}px)`;
    document.getElementById("layer3").style.transform = `translateY(${scrollPosition * 0.6}px)`;
});


//----------------------- ID card 3D rotation -----------------------------
const card = document.querySelector(".id-card");
const cardInner = document.querySelector(".card-inner");

let isDragging = false;
let previousX = 0, previousY = 0;
let rotationX = 0, rotationY = 0;

// Start dragging
card.addEventListener("mousedown", (event) => {
    isDragging = true;
    previousX = event.clientX;
    previousY = event.clientY;
    cardInner.style.transition = "none"; // disable smooth transition while dragging
});

// Stop dragging & snap to nearest side
document.addEventListener("mouseup", () => {
    if (!isDragging) return;
    isDragging = false;
    cardInner.style.transition = "transform 0.8s ease-out";

    // Snap to nearest multiple of 180° based on normalized rotation
    rotationY = Math.round(rotationY / 180) * 180;
    rotationX = 0; // reset tilt
    cardInner.style.transform = `rotateY(${rotationY}deg) rotateX(${rotationX}deg)`;
});

// Rotate on mouse move
document.addEventListener("mousemove", (event) => {
    if (!isDragging) return;

    let deltaX = event.clientX - previousX;
    let deltaY = event.clientY - previousY;

    rotationY += deltaX * 0.5; // adjust sensitivity if needed
    rotationX = Math.max(-20, Math.min(20, rotationX - deltaY * 0.3));

    // Normalize rotationY to remain between -180° and 180°
    if (rotationY > 180) rotationY -= 360;
    if (rotationY < -180) rotationY += 360;

    cardInner.style.transform = `rotateY(${rotationY}deg) rotateX(${rotationX}deg)`;

    previousX = event.clientX;
    previousY = event.clientY;
});

// Optional: Flip on double-click (if you still want it)
card.addEventListener("dblclick", () => {
    card.classList.toggle("flipped");
});