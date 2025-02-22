document.addEventListener("DOMContentLoaded", function() {
    // =============================================================
    //                FIREFLIES, BONFIRES & MOUSE TRAIL SETUP
    // =============================================================
    // Get the fireflies canvas and its context.
    const canvas = document.getElementById("fireflies-canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // Ensure the canvas doesn't block clicks on underlying elements.
    canvas.style.pointerEvents = 'none';

    // Expose canvas globally so that Firefly and Bonfire classes can use it.
    window.canvas = canvas;

    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    // Global variables for fireflies and bonfires.
    let fireflies = [];
    let bonfires = []; // Global array for bonfires

    // Instead of a plain array for the mouse trail, create an instance of the MouseTrail class.
    // (Ensure that MouseTrail is loaded as a global class—either via a script tag or another method.)
    const mouseTrail = new MouseTrail({ lifetime: 400, radius: 13 });

    // Global mouse object for fireflies attraction and trail drawing.
    let mouse = { x: null, y: null, radius: 13 };

    // Expose mouse and bonfires globally so external code (e.g. Firefly.update) can access them.
    window.mouse = mouse;
    window.bonfires = bonfires;

    // =============================================================
    //                UPDATE MOUSE POSITION & TRAIL
    // =============================================================
    // On every mousemove, update mouse position and add a trail point using the MouseTrail class.
    window.addEventListener("mousemove", event => {
        mouse.x = event.clientX;
        mouse.y = event.clientY;
        mouseTrail.addPoint(event.clientX, event.clientY);
    });

    // =============================================================
    //       DOCUMENT CLICK LISTENER FOR BONFIRES
    // Create a bonfire only if the click target is NOT inside an interactive element.
    // (Assumes Bonfire is defined globally.)
    // =============================================================
    document.addEventListener("click", (event) => {
        if (event.target.closest(".interactive")) {
            return;
        }
        bonfires.push(new Bonfire(event.clientX, event.clientY));
    });

    // =============================================================
    //                CREATE FIREFLIES
    // =============================================================
    // Create 70 fireflies using the global Firefly class.
    for (let i = 0; i < 70; i++) {
        fireflies.push(new Firefly());
    }

    // =============================================================
    //                ANIMATION LOOP
    // =============================================================
    function animate() {
        // Clear the entire canvas.
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the mouse trail using the MouseTrail class's draw method.
        if (mouse.x && mouse.y) {
            mouseTrail.draw(ctx);
        }

        // Update and draw bonfires; remove expired ones.
        for (let i = bonfires.length - 1; i >= 0; i--) {
            bonfires[i].update();
            bonfires[i].draw(ctx);
            if (bonfires[i].expired()) {
                bonfires.splice(i, 1);
            }
        }

        // Update and draw fireflies.
        for (let firefly of fireflies) {
            firefly.update();
            firefly.draw(ctx);
        }

        requestAnimationFrame(animate);
    }
    animate();
});