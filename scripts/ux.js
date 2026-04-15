// scripts/ux.js
document.addEventListener("DOMContentLoaded", () => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ── Header scroll state ──
    const header = document.querySelector(".site-header");
    const setHeaderState = () => {
        if (!header) return;
        header.classList.toggle("scrolled", window.scrollY > 10);
    };
    setHeaderState();
    window.addEventListener("scroll", setHeaderState, { passive: true });

    // ── Hamburger menu toggle ──
    const hamburger = document.querySelector(".hamburger");
    const mobileMenu = document.querySelector(".mobile-menu");
    if (hamburger && mobileMenu) {
        const toggleMenu = () => {
            const isOpen = mobileMenu.classList.toggle("open");
            hamburger.classList.toggle("active", isOpen);
            mobileMenu.setAttribute("aria-hidden", !isOpen);
            document.body.style.overflow = isOpen ? "hidden" : "";
        };

        hamburger.addEventListener("click", toggleMenu);

        // Close on link click
        mobileMenu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                mobileMenu.classList.remove("open");
                hamburger.classList.remove("active");
                mobileMenu.setAttribute("aria-hidden", "true");
                document.body.style.overflow = "";
            });
        });

        // Close on Escape
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && mobileMenu.classList.contains("open")) {
                toggleMenu();
            }
        });
    }

    // ── Scroll reveal (IntersectionObserver) ──
    const targets = document.querySelectorAll("[data-reveal]");
    if (!targets.length) return;

    targets.forEach(el => el.classList.add("reveal"));

    if (prefersReduced) {
        targets.forEach(el => el.classList.add("in"));
    } else {
        const io = new IntersectionObserver((entries) => {
            for (const e of entries) {
                if (e.isIntersecting) {
                    e.target.classList.add("in");
                    io.unobserve(e.target);
                }
            }
        }, { threshold: 0.08, rootMargin: "0px 0px -6% 0px" });

        targets.forEach(el => io.observe(el));
    }

    // ── Hero CTA → scroll to contact with highlight ──
    const startConversation = document.querySelector("[data-start-conversation]");
    const contactSection = document.getElementById("contact");
    let contactFocusTimer;
    if (startConversation && contactSection) {
        startConversation.addEventListener("click", (event) => {
            event.preventDefault();
            contactSection.scrollIntoView({
                behavior: prefersReduced ? "auto" : "smooth",
                block: "start"
            });
            contactSection.classList.add("contact-focus");
            window.clearTimeout(contactFocusTimer);
            contactFocusTimer = window.setTimeout(() => {
                contactSection.classList.remove("contact-focus");
            }, 1800);
        });
    }
});
