document.addEventListener("DOMContentLoaded", function() {
    // =============================================================
    //           EXTRAS MODAL: COMMENTS, LIKES & DONATION
    // =============================================================
    const extrasBtn = document.getElementById("extras-btn");
    const extrasModal = document.getElementById("extras-modal");
    const closeExtras = document.querySelector(".close-extras");

    // When the extras button is clicked, show the extras modal
    extrasBtn.addEventListener("click", function() {
        extrasModal.style.display = "block";
        // Placeholder: Load visitor count from your analytics/backend
        loadVisitorCount();
        // Placeholder: Load like count
        loadLikeCount();
    });

    // When the close button is clicked, hide the extras modal
    closeExtras.addEventListener("click", function() {
        extrasModal.style.display = "none";
    });

    // Hide modal when clicking outside the modal content
    window.addEventListener("click", function(event) {
        if (event.target === extrasModal) {
            extrasModal.style.display = "none";
        }
    });

    // Placeholder: Function to load visitor count
    function loadVisitorCount() {
        // TODO: Integrate with your analytics API/backend
        document.getElementById("visitor-number").textContent = "12345"; // Example count
    }

    // Placeholder: Like button functionality (global like count)
    const likeBtn = document.getElementById("like-btn");
    const likeCountEl = document.getElementById("like-count");
    let likeCount = 0; // Should be loaded from your backend ideally.
    likeBtn.addEventListener("click", function() {
        likeCount++;
        likeCountEl.textContent = likeCount;
        // TODO: Send like update to your backend for global storage.
    });
});