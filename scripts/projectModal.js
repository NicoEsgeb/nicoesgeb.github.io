// Get modal elements
const modal = document.getElementById("project-modal");
const modalVideoSource = modal.querySelector("video source");
const modalVideo = modal.querySelector("video");
const bonfireProject = document.getElementById("project-bonfire");
const steelProject = document.getElementById("project");
const closeModal = document.querySelector(".modal .close");
// Get the Lofi project element (make sure its id is "project-lofi")
const lofiProject = document.getElementById("project-lofi");
// Get The Hatchling project element
const hatchlingProject = document.getElementById("project-The-Hatchling");



// Function to open modal with the desired video source
function openModal(videoSrc) {
    modalVideoSource.src = videoSrc;
    // Reload the video element so it picks up the new source
    modalVideo.load();
    modal.classList.add("show");
}

// When The Hatchling project is clicked, show the modal with its video
hatchlingProject.addEventListener("click", () => {
    openModal("assets/videos/TheHatchlingVideo.mp4");
});

// When the Bonfire project is clicked, show the modal with bonfire video
bonfireProject.addEventListener("click", () => {
    openModal("assets/videos/bonfire-preview.mp4");
});

// When the Steel project is clicked, show the modal with steel video
steelProject.addEventListener("click", () => {
    openModal("assets/videos/steel-preview.mp4");
});

// Close modal when clicking the close button
closeModal.addEventListener("click", () => {
    modal.classList.remove("show");
});

// Hide modal when clicking outside the modal content
window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.classList.remove("show");
    }
});



// When the Lofi project is clicked, redirect to the FantasyRadio page
lofiProject.addEventListener("click", () => {
    window.location.href = "https://nicoesgeb.github.io/FantasyRadio";
});

const pengwingsProject = document.getElementById("project-pengwings");
const pengwingsModal = document.getElementById("pengwings-modal");

pengwingsProject.addEventListener("click", () => {
    pengwingsModal.classList.add("show");
});

pengwingsModal.querySelector(".close").addEventListener("click", () => {
    pengwingsModal.classList.remove("show");
});

window.addEventListener("click", (event) => {
    if (event.target === pengwingsModal) {
        pengwingsModal.classList.remove("show");
    }
});
