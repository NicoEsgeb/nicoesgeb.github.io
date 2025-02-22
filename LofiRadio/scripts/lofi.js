document.addEventListener("DOMContentLoaded", function() {

    /* ============================================================= */
    /*                  AMBIENCE ASSET CONFIGURATION                 */
    /* ============================================================= */
    const ambiences = {
        1: {
            background: "assets/images/stage1_1792x1024.png",
            audio: "assets/audio/stage1_playlist.mp3",
            radios: [
                {
                    name: "Healing forest",
                    stream: "https://www.youtube.com/embed/hLMLCPX4zyA?autoplay=1&controls=0&modestbranding=1&rel=0",
                    type: "youtube"
                },
                {
                    name: "Journey ahead",
                    stream: "https://www.youtube.com/embed/vK5VwVyxkbI?autoplay=1&controls=0&modestbranding=1&rel=0",
                    type: "youtube"
                },
                {
                    name: "Fantasy Tavern",
                    stream: "https://www.youtube.com/embed/0p6UidTS7Ao?autoplay=1&controls=0&modestbranding=1&rel=0",
                    type: "youtube"
                },
                {
                    name: "A hero's Journey",
                    stream: "https://www.youtube.com/embed/RUyrgVKP6vo?autoplay=1&controls=0&modestbranding=1&rel=0",
                    type: "youtube"
                },
                {
                    name: "Celtic",
                    stream: "https://www.youtube.com/embed/naWrbS4EUnY?autoplay=1&controls=0&modestbranding=1&rel=0",
                    type: "youtube"
                },
                {
                    name: "Lofi Fantasy",
                    stream: "https://www.youtube.com/embed/9IOmDeoHSo8?autoplay=1&controls=0&modestbranding=1&rel=0",
                    type: "youtube"
                }
            ]
        },
        2: {
            background: "assets/images/stage2.png",
            audio: "assets/audio/stage2_playlist.mp3",
            radios: [
                { name: "Rainy Day", stream: "http://example.com/stream7" },
                { name: "Drizzle", stream: "http://example.com/stream8" },
                { name: "Umbrella", stream: "http://example.com/stream9" },
                { name: "Stormy", stream: "http://example.com/stream10" },
                { name: "Downpour", stream: "http://example.com/stream11" },
                { name: "Mist", stream: "http://example.com/stream12" }
            ]
        },
        3: {
            background: "assets/images/stage3.png",
            audio: "assets/audio/stage3_playlist.mp3",
            radios: [
                { name: "City Lights", stream: "http://example.com/stream13" },
                { name: "Urban Chill", stream: "http://example.com/stream14" },
                { name: "Neon Nights", stream: "http://example.com/stream15" },
                { name: "Concrete Jungle", stream: "http://example.com/stream16" },
                { name: "Subway", stream: "http://example.com/stream17" },
                { name: "Late Commute", stream: "http://example.com/stream18" }
            ]
        },
        4: {
            background: "assets/images/stage4.png",
            audio: "assets/audio/stage4_playlist.mp3",
            radios: [
                { name: "Forest Echoes", stream: "http://example.com/stream19" },
                { name: "Woodland", stream: "http://example.com/stream20" },
                { name: "Nature Beats", stream: "http://example.com/stream21" },
                { name: "Tranquility", stream: "http://example.com/stream22" },
                { name: "Birdsong", stream: "http://example.com/stream23" },
                { name: "River Flow", stream: "http://example.com/stream24" }
            ]
        },
        5: {
            background: "assets/images/stage5.png",
            audio: "assets/audio/stage5_playlist.mp3",
            radios: [
                { name: "Cosmic", stream: "http://example.com/stream25" },
                { name: "Galactic", stream: "http://example.com/stream26" },
                { name: "Stardust", stream: "http://example.com/stream27" },
                { name: "Nebula", stream: "http://example.com/stream28" },
                { name: "Orbit", stream: "http://example.com/stream29" },
                { name: "Eclipse", stream: "http://example.com/stream30" }
            ]
        }
    };

    /* ============================================================= */
    /*              GLOBAL AMBIENCE & ELEMENTS SETUP                 */
    /* ============================================================= */
    let currentAmbience = ambiences[1];
    const ambienceBackground = document.querySelector(".stage-background");
    const radioAudio = document.getElementById("radio-audio");
    const ambienceButtons = document.querySelectorAll(".stage-btn");
    const starsContainer = document.querySelector(".stars-container");
    const seeRadiosBtn = document.getElementById("see-radios-btn");
    const customPlayBtn = document.getElementById("custom-play");

    // Set default state: no radio station selected; initial stream state remains unchanged.
    window.currentStationType = "audio";
    window.currentYouTubeStream = null;
    // Global flag to control visualizer animation (true if playing, false if paused)
    // Do not force a state change on load; assume paused by default.
    window.isPlaying = false;
    customPlayBtn.textContent = "Play";

    /* ============================================================= */
    /*                    LOAD AMBIENCE FUNCTION                     */
    /* ============================================================= */
    function loadAmbience(ambienceNum) {
        const ambienceData = ambiences[ambienceNum];
        if (ambienceData) {
            currentAmbience = ambienceData;
            ambienceBackground.style.backgroundImage = `url('${ambienceData.background}')`;
            radioAudio.src = ambienceData.audio;
            // When loading a new ambience, preserve the current play state:
            if (window.isPlaying) {
                radioAudio.play();
                customPlayBtn.textContent = "Pause";
            } else {
                radioAudio.pause();
                customPlayBtn.textContent = "Play";
            }
            // Reset to standard audio stream and clear YouTube stream.
            window.currentStationType = "audio";
            window.currentYouTubeStream = null;
            // Do not reset window.radioSelected; preserve if a radio station is active.
        }
        starsContainer.style.display = (ambienceNum === "1" || ambienceNum === 1) ? "block" : "none";
    }
    loadAmbience("1");

    /* ============================================================= */
    /*           AMBIENCE BUTTONS EVENT LISTENERS SETUP              */
    /* ============================================================= */
    ambienceButtons.forEach(function(btn) {
        btn.addEventListener("click", function() {
            const ambienceNum = this.getAttribute("data-ambience");
            loadAmbience(ambienceNum);
        });
    });

    /* ============================================================= */
    /*           FIREFLIES, BONFIRES & MOUSE TRAIL SETUP              */
    /* ============================================================= */
    const canvas = document.getElementById("fireflies-canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.pointerEvents = 'none';
    window.canvas = canvas;
    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
    let fireflies = [];
    let bonfires = [];
    const mouseTrail = new MouseTrail({ lifetime: 400, radius: 13 });
    let mouse = { x: null, y: null, radius: 13 };
    window.mouse = mouse;
    window.bonfires = bonfires;
    window.addEventListener("mousemove", event => {
        mouse.x = event.clientX;
        mouse.y = event.clientY;
        mouseTrail.addPoint(event.clientX, event.clientY);
    });
    document.addEventListener("click", (event) => {
        if (event.target.closest(".interactive")) return;
        bonfires.push(new Bonfire(event.clientX, event.clientY));
    });
    for (let i = 0; i < 70; i++) {
        fireflies.push(new Firefly());
    }

    /* ============================================================= */
    /*                      ANIMATION LOOP                           */
    /* ============================================================= */
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (mouse.x && mouse.y) {
            mouseTrail.draw(ctx);
        }
        for (let i = bonfires.length - 1; i >= 0; i--) {
            bonfires[i].update();
            bonfires[i].draw(ctx);
            if (bonfires[i].expired()) {
                bonfires.splice(i, 1);
            }
        }
        for (let firefly of fireflies) {
            firefly.update();
            firefly.draw(ctx);
        }
        requestAnimationFrame(animate);
    }
    animate();

    /* ============================================================= */
    /*           RADIO MENU TOGGLE & INTERACTION SETUP               */
    /* ============================================================= */
    seeRadiosBtn.addEventListener("click", () => {
        window.radioMenu.show(currentAmbience.radios);
    });

    /* ============================================================= */
    /*         CUSTOM PLAY/PAUSE BUTTON FUNCTIONALITY                */
    /* ============================================================= */
    customPlayBtn.addEventListener("click", () => {
        // Only allow toggling if a radio station has been selected.
        if (!window.radioSelected) {
            alert("Please select a radio station first.");
            return;
        }
        if (window.currentStationType === "youtube") {
            // For YouTube streams, mimic pause/resume by removing/reinjecting the iframe.
            if (customPlayBtn.textContent === "Pause") {
                document.getElementById("radio-iframe-container").innerHTML = "";
                customPlayBtn.textContent = "Play";
                window.isPlaying = false;
            } else {
                if (window.currentYouTubeStream) {
                    document.getElementById("radio-iframe-container").innerHTML =
                        `<iframe src="${window.currentYouTubeStream}&autoplay=1&controls=0&modestbranding=1&rel=0" frameborder="0" allow="autoplay" allowfullscreen></iframe>`;
                    customPlayBtn.textContent = "Pause";
                    window.isPlaying = true;
                }
            }
        } else {
            // For standard audio streams, toggle play/pause on the audio element.
            if (radioAudio.paused) {
                radioAudio.play();
                customPlayBtn.textContent = "Pause";
                window.isPlaying = true;
            } else {
                radioAudio.pause();
                customPlayBtn.textContent = "Play";
                window.isPlaying = false;
            }
        }
    });

    /* ============================================================= */
    /*             SOUND EFFECTS (BUTTONS & VOLUME SLIDERS)          */
    /* ============================================================= */
    // Instantiate the SoundEffects manager (from soundEffects.js)
    const soundEffectsManager = new SoundEffects({ basePath: "assets/sounds/" });

    // Get all sound effect buttons and volume inputs from your sound effects menu
    const soundButtons = document.querySelectorAll(".sound-btn");
    const volumeInputs = document.querySelectorAll(".sound-volume");

    // Event listener for toggling sounds when a button is clicked
    soundButtons.forEach(btn => {
        btn.addEventListener("click", function() {
            const soundName = this.getAttribute("data-sound");
            // Retrieve the current volume from the corresponding range input
            const volumeInput = document.querySelector(`.sound-volume[data-sound="${soundName}"]`);
            const volume = volumeInput ? parseFloat(volumeInput.value) : 0.5;
            // Toggle the sound: if playing, it will pause; if paused, it will play
            soundEffectsManager.toggle(soundName, volume);
            // Optionally toggle a visual active state on the button
            this.classList.toggle("active");
        });
    });

    // Event listener for adjusting volume in real time when the range input changes
    volumeInputs.forEach(input => {
        input.addEventListener("input", function() {
            const soundName = this.getAttribute("data-sound");
            const volume = parseFloat(this.value);
            soundEffectsManager.setVolume(soundName, volume);
        });
    });

    /* ============================================================= */
    /*                 INITIALIZE AUDIO VISUALIZER                   */
    /* ============================================================= */
    const visualizerCanvas = document.getElementById("visualizer-canvas");
    new Visualizer(visualizerCanvas, document.getElementById("radio-audio"));

});