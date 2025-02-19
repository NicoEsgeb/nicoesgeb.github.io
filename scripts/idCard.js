

const card = document.querySelector(".id-card");
const cardInner = document.querySelector(".card-inner");

let isDragging = false;
let previousX = 0, previousY = 0;
let rotationX = 0, rotationY = 0;

// Start dragging
card.addEventListener("mousedown", (event) => {
    event.preventDefault();
    isDragging = true;
    previousX = event.clientX;
    previousY = event.clientY;
    cardInner.style.transition = "none";
});

// Stop dragging & snap
document.addEventListener("mouseup", () => {
    if (!isDragging) return;
    isDragging = false;
    cardInner.style.transition = "transform 0.8s ease-out";
    rotationY = Math.round(rotationY / 180) * 180;
    rotationX = 0;
    cardInner.style.transform = `rotateY(${rotationY}deg) rotateX(${rotationX}deg)`;
});

// Rotate on mouse move
document.addEventListener("mousemove", (event) => {
    if (!isDragging) return;
    let deltaX = event.clientX - previousX;
    let deltaY = event.clientY - previousY;
    rotationY += deltaX * 0.5;
    rotationX = Math.max(-20, Math.min(20, rotationX - deltaY * 0.3));
    if (rotationY > 180) rotationY -= 360;
    if (rotationY < -180) rotationY += 360;
    cardInner.style.transform = `rotateY(${rotationY}deg) rotateX(${rotationX}deg)`;
    previousX = event.clientX;
    previousY = event.clientY;
});

card.addEventListener("dblclick", () => {
    card.classList.toggle("flipped");
});