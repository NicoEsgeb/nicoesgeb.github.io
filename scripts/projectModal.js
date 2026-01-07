// Modal elements
const modal = document.getElementById("project-modal");
const modalVideo = modal.querySelector("video");
const modalVideoSource = modal.querySelector("video source");
const closeModalBtn = modal.querySelector(".close");

// Project cards
const bonfireProject = document.getElementById("project-bonfire");
const steelProject   = document.getElementById("project"); // steel drum
const lofiProject    = document.getElementById("project-lofi");
const hatchling      = document.getElementById("project-The-Hatchling");
const shotmergeProject = document.getElementById("project-shotmerge");

// PengWings modal
const pengwingsProject = document.getElementById("project-pengwings");
const pengwingsModal   = document.getElementById("pengwings-modal");

// ShotMerge modal
const shotmergeModal = document.getElementById("shotmerge-modal");
const shotmergeCloseBtn = shotmergeModal.querySelector(".close");

// Open shared modal with a given video
function openModal(videoSrc){
    modalVideoSource.src = videoSrc;
    modalVideo.load();
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
    // autoplay politely
    modalVideo.play().catch(()=>{ /* ignore blocked autoplay */ });
}

// Close shared modal
function closeModal(){
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
    // pause & reset
    modalVideo.pause();
    try { modalVideo.currentTime = 0; } catch(e){}
}

// Wire up project clicks
bonfireProject.addEventListener("click", () => {
    openModal("assets/videos/bonfire-preview.mp4");
});
steelProject.addEventListener("click", () => {
    openModal("assets/videos/steel-preview.mp4");
});
hatchling.addEventListener("click", () => {
    openModal("assets/videos/TheHatchlingVideo.mp4");
});

// ShotMerge modal
function openShotmergeModal(){
    shotmergeModal.classList.add("show");
    shotmergeModal.setAttribute("aria-hidden", "false");
}
function closeShotmergeModal(){
    shotmergeModal.classList.remove("show");
    shotmergeModal.setAttribute("aria-hidden", "true");
}
shotmergeProject.addEventListener("click", openShotmergeModal);
shotmergeCloseBtn.addEventListener("click", closeShotmergeModal);
window.addEventListener("click", (event) => {
    if (event.target === shotmergeModal) {
        closeShotmergeModal();
    }
});
window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && shotmergeModal.classList.contains("show")) {
        closeShotmergeModal();
    }
});

// Lofi: redirect
lofiProject.addEventListener("click", () => {
    window.location.href = "https://nicoesgeb.github.io/FantasyRadio";
});

// Modal close behaviors
closeModalBtn.addEventListener("click", closeModal);
window.addEventListener("click", (e) => { if(e.target === modal) closeModal(); });
window.addEventListener("keydown", (e) => { if(e.key === "Escape" && modal.classList.contains("show")) closeModal(); });

// PengWings modal
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
