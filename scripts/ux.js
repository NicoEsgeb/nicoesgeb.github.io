// scripts/ux.js
document.addEventListener("DOMContentLoaded", () => {
    // Header shadow on scroll (safe even if header missing)
    const header = document.querySelector(".site-header");
    const setHeaderState = () => {
        if (!header) return;
        header.classList.toggle("scrolled", window.scrollY > 2);
    };
    setHeaderState();
    window.addEventListener("scroll", setHeaderState, { passive: true });

    // Smooth reveal: id-card, about card, and each project
    const targets = document.querySelectorAll("#id-card-section, .about-me-text, .project");
    if (!targets.length) {
        console.warn("[ux] reveal targets not found");
        return;
    }

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    targets.forEach(el => el.classList.add("reveal"));

    if (prefersReduced) {
        targets.forEach(el => el.classList.add("in"));
        return;
    }

    const io = new IntersectionObserver((entries) => {
        for (const e of entries) {
            if (e.isIntersecting) {
                e.target.classList.add("in");
                io.unobserve(e.target);
            }
        }
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

    targets.forEach(el => io.observe(el));
});
