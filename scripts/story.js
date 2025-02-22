document.addEventListener("DOMContentLoaded", function () {
    // ---------------- Modal Setup ----------------
    const storyModal = document.getElementById("about-story-modal");
    const closeStory = storyModal.querySelector(".story-close");
    const storyContainer = storyModal.querySelector(".story-container");
    const aboutStoryTrigger = document.getElementById("about-story-trigger");

    // Open modal when trigger is clicked
    aboutStoryTrigger.addEventListener("click", function () {
        storyModal.classList.add("show");
    });

    // Close modal when clicking the close button
    closeStory.addEventListener("click", function () {
        storyModal.classList.remove("show");
    });

    // Close modal when clicking outside the modal content
    window.addEventListener("click", function (event) {
        if (event.target === storyModal) {
            storyModal.classList.remove("show");
        }
    });

    // ---------------- Horizontal Drag-to-Scroll ----------------
    let isDown = false;
    let startX;
    let scrollLeft;
    storyContainer.addEventListener("mousedown", function (e) {
        isDown = true;
        startX = e.pageX - storyContainer.offsetLeft;
        scrollLeft = storyContainer.scrollLeft;
    });
    storyContainer.addEventListener("mouseleave", function () {
        isDown = false;
    });
    storyContainer.addEventListener("mouseup", function () {
        isDown = false;
    });
    storyContainer.addEventListener("mousemove", function (e) {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - storyContainer.offsetLeft;
        const walk = (x - startX) * 2; // Adjust scroll speed as needed
        storyContainer.scrollLeft = scrollLeft - walk;
    });
    // Optionally convert vertical scroll to horizontal
    storyContainer.addEventListener("wheel", function (e) {
        e.preventDefault();
        storyContainer.scrollLeft += e.deltaY;
    });

    // ---------------- Initialize Parallax Assets ----------------
    // For each .parallax-asset, store its image width in a data attribute for wrapping calculations.
    const parallaxAssets = document.querySelectorAll(".parallax-asset");
    parallaxAssets.forEach(function (asset) {
        const img = asset.querySelector("img");
        if (img) {
            // Wait for image to load to get correct width:
            if (img.complete) {
                asset.dataset.width = img.offsetWidth;
            } else {
                img.addEventListener("load", () => {
                    asset.dataset.width = img.offsetWidth;
                });
            }
        }
        // Ensure the asset container hides overflow
        asset.style.overflow = "hidden";
    });

    // ---------------- Parallax Effect for Story Stages and Assets ----------------
    storyContainer.addEventListener("scroll", function () {
        const scrollLeft = storyContainer.scrollLeft;
        // Update background parallax for each story stage
        const storyStages = document.querySelectorAll(".story-stage");
        storyStages.forEach(function (stage) {
            const bgParallaxSpeed = 0.3; // Adjust multiplier for background
            stage.style.backgroundPositionX = `${-scrollLeft * bgParallaxSpeed}px`;

            // Update text parallax if needed (if .story-content exists)
            const textContent = stage.querySelector(".story-content");
            if (textContent) {
                const textParallaxSpeed = 0.5; // Adjust as needed
                textContent.style.transform = `translateX(${-scrollLeft * textParallaxSpeed}px)`;
            }
        });

        // Update parallax assets wrapping
        parallaxAssets.forEach(function (asset) {
            const speed = parseFloat(asset.getAttribute("data-speed")) || 0;
            // Calculate translation based on scroll position
            let translateX = -scrollLeft * speed;
            // Get asset width from data attribute (if not set, use asset.offsetWidth)
            let assetWidth = asset.dataset.width ? parseFloat(asset.dataset.width) : asset.offsetWidth;
            // Wrap translation: Ensure the value is always between 0 and assetWidth
            translateX = ((translateX % assetWidth) + assetWidth) % assetWidth;
            asset.style.transform = `translateX(${translateX}px)`;
        });
    });
});