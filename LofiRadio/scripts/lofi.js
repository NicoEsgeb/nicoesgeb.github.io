document.addEventListener("DOMContentLoaded", function() {

    /* ============================================================= */
    /*                  AMBIENCE ASSET CONFIGURATION                 */
    /* ============================================================= */
    // Each ambience now includes its own unique sound effects and radio configuration.
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
            ],
            soundEffects: [
                { name: "Fire", sound: "fire" },
                { name: "Rain", sound: "rain" },
                { name: "Surroundings", sound: "surroundings" }
            ]
        },
        2: {
            background: "assets/images/stage2.png",
            audio: "assets/audio/stage2_playlist.mp3",
            radios: [
                {
                    name: "Future Chill",
                    stream: "https://www.youtube.com/embed/sQ28KTOUgVM?autoplay=1&controls=0&modestbranding=1&rel=0",
                    type: "youtube"
                },
                {
                    name: "Deep Focus",
                    stream: "https://www.youtube.com/embed/GB6wLooVFEI?autoplay=1&controls=0&modestbranding=1&rel=0",
                    type:"youtube"
                },
                {
                    name: "Night Flow",
                    stream: "https://www.youtube.com/embed/qMgtHxt0XbU?autoplay=1&controls=0&modestbranding=1&rel=0",
                    type: "youtube"
                },
                {
                    name: "Chill Synth",
                    stream: "https://www.youtube.com/embed/UedTcufyrHc?autoplay=1&controls=0&modestbranding=1&rel=0",
                    type: "youtube"
                },
                {
                    name: "Retrowave",
                    stream: "https://www.youtube.com/embed/SwhsegXolTs?autoplay=1&controls=0&modestbranding=1&rel=0",
                    type:"youtube"
                },
                {
                    name: "Synthwave",
                    stream: "https://www.youtube.com/embed/4xDzrJKXOOY?autoplay=1&controls=0&modestbranding=1&rel=0",
                    type: "youtube"
                }
            ],
            soundEffects: [
                { name: "Fire", sound: "fire" },
                { name: "Thunderstorm", sound: "thunderstorm" },
                { name: "Deep Forest", sound: "Deep Forest"}
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
            ],
            soundEffects: [] // No unique sound effects for Ambience 3
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
            ],
            soundEffects: [
                { name: "Forest Echoes", sound: "forest" },
                { name: "Birdsong", sound: "birdsong" }
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
            ],
            soundEffects: [
                { name: "Cosmic", sound: "cosmic" },
                { name: "Nebula", sound: "nebula" }
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
    /*       INSTANTIATE SOUND EFFECTS MANAGER GLOBALLY              */
    /* ============================================================= */
    let soundEffectsManager = new SoundEffects({ basePath: "assets/sounds/" });

    /* ============================================================= */
    /*          UPDATE SOUND EFFECTS MENU DYNAMICALLY                */
    /* ============================================================= */
    function updateSoundEffectsMenu(ambienceData) {
        const menu = document.getElementById("sound-effects-menu");
        // Clear previous content of the sound effects menu.
        menu.innerHTML = "";

        // Check if this ambience has any unique sound effects
        if (ambienceData.soundEffects && ambienceData.soundEffects.length > 0) {
            ambienceData.soundEffects.forEach(effect => {
                // Create a container div for each sound effect
                const effectDiv = document.createElement("div");
                effectDiv.className = "sound-effect";

                // Create the button with the sound effect's display name
                const btn = document.createElement("button");
                btn.className = "sound-btn";
                btn.setAttribute("data-sound", effect.sound);
                btn.textContent = effect.name;

                // Create the volume slider for this sound effect
                const volumeInput = document.createElement("input");
                volumeInput.className = "sound-volume";
                volumeInput.setAttribute("data-sound", effect.sound);
                volumeInput.setAttribute("type", "range");
                volumeInput.setAttribute("min", "0");
                volumeInput.setAttribute("max", "1");
                volumeInput.setAttribute("step", "0.01");
                volumeInput.value = "0.5";

                // Append button and volume slider to the container div
                effectDiv.appendChild(btn);
                effectDiv.appendChild(volumeInput);

                // Append the container div to the sound effects menu
                menu.appendChild(effectDiv);
            });
        }
        // Attach event listeners to the newly created elements
        addSoundEffectListeners();
    }

    /* ============================================================= */
    /*         ATTACH SOUND EFFECTS EVENT LISTENERS FUNCTION         */
    /* ============================================================= */
    function addSoundEffectListeners() {
        const soundButtons = document.querySelectorAll(".sound-btn");
        const volumeInputs = document.querySelectorAll(".sound-volume");

        // When a sound button is clicked, toggle the corresponding sound effect
        soundButtons.forEach(btn => {
            btn.addEventListener("click", function() {
                const soundName = this.getAttribute("data-sound");
                const volumeInput = document.querySelector(`.sound-volume[data-sound="${soundName}"]`);
                const volume = volumeInput ? parseFloat(volumeInput.value) : 0.5;
                soundEffectsManager.toggle(soundName, volume);
                // Toggle the "active" class for the glowing effect
                this.classList.toggle("active");
            });
        });

        // When the volume slider is adjusted, update the sound effect volume in real time
        volumeInputs.forEach(input => {
            input.addEventListener("input", function() {
                const soundName = this.getAttribute("data-sound");
                const volume = parseFloat(this.value);
                soundEffectsManager.setVolume(soundName, volume);
            });
        });
    }

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

            // NEW: Stop any currently playing sound effects from the previous ambience
            soundEffectsManager.pauseAll();

            // NEW: Update the sound effects menu based on the current ambience's configuration
            updateSoundEffectsMenu(ambienceData);

            // NEW: If the radio menu is currently open, update its station list to match the new ambience.
            if (document.getElementById("radio-menu").classList.contains("show")) {
                window.radioMenu.populate(ambienceData.radios);
            }
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
    // The SoundEffects manager is already instantiated,
    // and event listeners are attached dynamically via updateSoundEffectsMenu().

    /* ============================================================= */
    /*                 INITIALIZE AUDIO VISUALIZER                   */
    /* ============================================================= */
    const visualizerCanvas = document.getElementById("visualizer-canvas");
    new Visualizer(visualizerCanvas, document.getElementById("radio-audio"));

    /* ============================================================= */
    /*          MAIN AMBIENCE VOLUME CONTROL EVENT LISTENER          */
    /* ============================================================= */
    const mainVolumeSlider = document.getElementById("main-volume-slider");
    if (mainVolumeSlider) {
        mainVolumeSlider.addEventListener("input", function() {
            // Update the volume of the main ambience audio element (radio-audio)
            radioAudio.volume = parseFloat(this.value);
        });
    }

});