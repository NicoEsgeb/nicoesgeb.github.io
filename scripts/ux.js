// scripts/ux.js
document.addEventListener("DOMContentLoaded", () => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ── Lenis smooth scroll ──
    // Gives the page weighted momentum: the wheel feeds a target position that
    // the page eases toward each frame, so it keeps gliding after you stop.
    // Falls back to native `scroll-behavior: smooth` (css/global.css) if the
    // CDN script fails or the visitor prefers reduced motion.
    let lenis = null;
    if (!prefersReduced && typeof Lenis === "function") {
        lenis = new Lenis({
            duration: 1.35,                                       // higher = heavier glide
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo-out
            wheelMultiplier: 1,
            touchMultiplier: 1.6,
            autoRaf: false
        });

        let lastScroll = -1;
        const raf = (time) => {
            lenis.raf(time);
            // Only re-measure when the page actually moved — getBoundingClientRect
            // forces layout, so this must not run on idle frames.
            if (lenis.animatedScroll !== lastScroll) {
                lastScroll = lenis.animatedScroll;
                updateParallax();
            }
            requestAnimationFrame(raf);
        };
        requestAnimationFrame(raf);

        // Expose for other scripts / debugging
        window.lenis = lenis;
    }

    // ── Media parallax ──
    // Project imagery drifts against its frame and tilts a little as the card
    // crosses the viewport. Driven from the Lenis rAF loop above so the image
    // tracks the eased scroll position instead of lagging a frame behind it.
    // See css/media-parallax.css for the properties these values feed.
    // Two layers of motion, because travel alone is a bad lever here: it has to
    // stay under the bleed --pl-zoom provides in media-parallax.css (1.32 gives
    // 16%), and raising that zoom crops these UI screenshots past legibility —
    // 1.44 cut the tool rails clean off the Ember shot. Moving the frame itself
    // against the card adds displacement at no cost to the crop.
    const PARALLAX_TRAVEL = 14;  // % of frame height the image drifts inside the frame
    const PARALLAX_FRAME = 20;   // px the frame itself drifts against the card
    const PARALLAX_TILT = 6;     // degrees of rotateX at the viewport edges

    const parallaxItems = lenis
        ? [...document.querySelectorAll(".project-media")]
            .map(frame => ({ frame, img: frame.querySelector("img") }))
            .filter(item => item.img)
        : [];

    function updateParallax() {
        if (!parallaxItems.length) return;
        const vh = window.innerHeight;
        // Measure every frame before writing any style — interleaving the two
        // would force a separate layout flush per card on every scrolled frame.
        const rects = parallaxItems.map(item => item.frame.getBoundingClientRect());

        for (let i = 0; i < parallaxItems.length; i++) {
            const rect = rects[i];
            if (rect.bottom < 0 || rect.top > vh) continue;   // off-screen, nothing to see
            // -1 once the frame has passed above the viewport, +1 while still below
            const p = Math.max(-1, Math.min(1,
                (rect.top + rect.height / 2 - vh / 2) / (vh / 2 + rect.height / 2)
            ));
            const { frame, img } = parallaxItems[i];
            // Frame and image drift the same way, so their displacements add up
            img.style.setProperty("--pl-shift", (-p * PARALLAX_TRAVEL).toFixed(2) + "%");
            frame.style.setProperty("--pl-frame", (-p * PARALLAX_FRAME).toFixed(1) + "px");
            frame.style.setProperty("--pl-tilt", (p * PARALLAX_TILT).toFixed(2) + "deg");
        }
    }

    if (parallaxItems.length) {
        updateParallax();
        window.addEventListener("resize", updateParallax, { passive: true });
    }

    // Scroll the page, using Lenis when it is driving.
    const scrollTo = (target, offset = 0) => {
        if (lenis) {
            lenis.scrollTo(target, { offset });
        } else if (typeof target === "number") {
            window.scrollTo({ top: target, behavior: prefersReduced ? "auto" : "smooth" });
        } else {
            target.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "start" });
        }
    };

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
        const setMenu = (isOpen) => {
            hamburger.classList.toggle("active", isOpen);
            mobileMenu.setAttribute("aria-hidden", !isOpen);
            document.body.style.overflow = isOpen ? "hidden" : "";
            if (lenis) isOpen ? lenis.stop() : lenis.start();
        };

        hamburger.addEventListener("click", () => {
            setMenu(mobileMenu.classList.toggle("open"));
        });

        // Close on link click — the anchor handler below does the scrolling
        mobileMenu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                mobileMenu.classList.remove("open");
                setMenu(false);
            });
        });

        // Close on Escape
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && mobileMenu.classList.contains("open")) {
                mobileMenu.classList.remove("open");
                setMenu(false);
            }
        });
    }

    // ── Anchor links ──
    // Lenis disables native `scroll-behavior`, so in-page links have to be routed
    // through it or they jump instantly. Wired after the menu handler above so a
    // mobile-menu link releases the scroll lock before this tries to scroll.
    if (lenis) {
        document.querySelectorAll('a[href^="#"]:not([data-start-conversation])').forEach(link => {
            link.addEventListener("click", (event) => {
                const href = link.getAttribute("href");
                if (href === "#") {
                    event.preventDefault();
                    scrollTo(0);
                    return;
                }
                const target = document.querySelector(href);
                if (!target) return;
                event.preventDefault();
                scrollTo(target);
                history.pushState(null, "", href);
            });
        });
    }

    // ── Freeze the page behind an open modal ──
    // projectModal.js toggles `.show`; watch for it rather than coupling the files.
    const modals = document.querySelectorAll(".modal");
    if (lenis && modals.length) {
        const syncModalLock = () => {
            const anyOpen = [...modals].some(m => m.classList.contains("show"));
            anyOpen ? lenis.stop() : lenis.start();
        };
        const mo = new MutationObserver(syncModalLock);
        modals.forEach(m => mo.observe(m, { attributes: true, attributeFilter: ["class"] }));
    }

    // ── Hero CTA → scroll to contact with highlight ──
    const startConversation = document.querySelector("[data-start-conversation]");
    const contactSection = document.getElementById("contact");
    let contactFocusTimer;
    if (startConversation && contactSection) {
        startConversation.addEventListener("click", (event) => {
            event.preventDefault();
            scrollTo(contactSection);
            contactSection.classList.add("contact-focus");
            window.clearTimeout(contactFocusTimer);
            contactFocusTimer = window.setTimeout(() => {
                contactSection.classList.remove("contact-focus");
            }, 1800);
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
});
