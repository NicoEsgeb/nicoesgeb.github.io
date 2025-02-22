document.addEventListener("DOMContentLoaded", function() {

    /* ============================================================= */
    /*                  AMBIENCE ASSET CONFIGURATION                 */
    /* ============================================================= */
    // Each ambience now includes its own unique sound effects, radio configuration, and a top message.
    const ambiences = {
        1: {
            background: "assets/images/stage1_1792x1024.png",
            audio: "assets/audio/stage1_playlist.mp3",
            radios: [
                {
                    name: "Healing forest",
                    info: "Healing Forest – Calm & Soothing", // Custom info text
                    stream: "https://www.youtube.com/embed/hLMLCPX4zyA?autoplay=1&controls=0&modestbranding=1&rel=0",
                    type: "youtube"
                },
                {
                    name: "Journey ahead",
                    info: "Journey Ahead – A Serene Escape",
                    stream: "https://www.youtube.com/embed/vK5VwVyxkbI?autoplay=1&controls=0&modestbranding=1&rel=0",
                    type: "youtube"
                },
                {
                    name: "Fantasy Tavern",
                    info: "Fantasy Tavern – Magical Melodies",
                    stream: "https://www.youtube.com/embed/0p6UidTS7Ao?autoplay=1&controls=0&modestbranding=1&rel=0",
                    type: "youtube"
                },
                {
                    name: "A hero's Journey",
                    info: "A Hero's Journey – Epic & Soothing",
                    stream: "https://www.youtube.com/embed/RUyrgVKP6vo?autoplay=1&controls=0&modestbranding=1&rel=0",
                    type: "youtube"
                },
                {
                    name: "Celtic",
                    info: "Celtic – Enchanting Echoes",
                    stream: "https://www.youtube.com/embed/naWrbS4EUnY?autoplay=1&controls=0&modestbranding=1&rel=0",
                    type: "youtube"
                },
                {
                    name: "Lofi Fantasy",
                    info: "Lofi Fantasy – Chill & Dreamy",
                    stream: "https://www.youtube.com/embed/9IOmDeoHSo8?autoplay=1&controls=0&modestbranding=1&rel=0",
                    type: "youtube"
                }
            ],
            soundEffects: [
                { name: "Fire", sound: "fire" },
                { name: "Rain", sound: "rain" },
                { name: "Surroundings", sound: "surroundings" }
            ],
            message: "Lay down your burdens, traveler. The trees will keep watch."
        },
        2: {
            background: "assets/images/stage2.png",
            audio: "assets/audio/stage2_playlist.mp3",
            radios: [
                {
                    name: "Future Chill",
                    info: "Future Chill – Smooth futuristic vibes",
                    stream: "https://www.youtube.com/embed/sQ28KTOUgVM?autoplay=1&controls=0&modestbranding=1&rel=0",
                    type: "youtube"
                },
                {
                    name: "Deep Focus",
                    info: "Deep Focus – Concentrate and relax",
                    stream: "https://www.youtube.com/embed/GB6wLooVFEI?autoplay=1&controls=0&modestbranding=1&rel=0",
                    type: "youtube"
                },
                {
                    name: "Night Flow",
                    info: "Night Flow – Calm night tunes",
                    stream: "https://www.youtube.com/embed/qMgtHxt0XbU?autoplay=1&controls=0&modestbranding=1&rel=0",
                    type: "youtube"
                },
                {
                    name: "Chill Synth",
                    info: "Chill Synth – Synthwave serenity",
                    stream: "https://www.youtube.com/embed/UedTcufyrHc?autoplay=1&controls=0&modestbranding=1&rel=0",
                    type: "youtube"
                },
                {
                    name: "Retrowave",
                    info: "Retrowave – Retro beats",
                    stream: "https://www.youtube.com/embed/SwhsegXolTs?autoplay=1&controls=0&modestbranding=1&rel=0",
                    type: "youtube"
                },
                {
                    name: "Synthwave",
                    info: "Synthwave – Dreamy electronic",
                    stream: "https://www.youtube.com/embed/4xDzrJKXOOY?autoplay=1&controls=0&modestbranding=1&rel=0",
                    type: "youtube"
                }
            ],
            soundEffects: [
                { name: "Fire", sound: "fire" },
                { name: "Thunderstorm", sound: "thunderstorm" },
                { name: "Deep Forest", sound: "Deep Forest" }
            ],
            message: "Ruins watch in silence… take a moment."
        },
        3: {
            background: "assets/images/stage3.png",
            audio: "assets/audio/stage3_playlist.mp3",
            radios: [
                {
                    name: "City Lights",
                    info: "City Lights – Urban ambience",
                    stream: "http://example.com/stream13"
                },
                {
                    name: "Urban Chill",
                    info: "Urban Chill – City vibes",
                    stream: "http://example.com/stream14"
                },
                {
                    name: "Neon Nights",
                    info: "Neon Nights – Vibrant and cool",
                    stream: "http://example.com/stream15"
                },
                {
                    name: "Concrete Jungle",
                    info: "Concrete Jungle – Beat of the city",
                    stream: "http://example.com/stream16"
                },
                {
                    name: "Subway",
                    info: "Subway – Underground sounds",
                    stream: "http://example.com/stream17"
                },
                {
                    name: "Late Commute",
                    info: "Late Commute – Evening travel tunes",
                    stream: "http://example.com/stream18"
                }
            ],
            soundEffects: [], // No unique sound effects for Ambience 3
            message: "Bright lights, empty souls… take a moment to breathe."
        },
        4: {
            background: "assets/images/stage4.png",
            audio: "assets/audio/stage4_playlist.mp3",
            radios: [
                {
                    name: "Forest Echoes",
                    info: "Forest Echoes – Nature's rhythm",
                    stream: "http://example.com/stream19"
                },
                {
                    name: "Woodland",
                    info: "Woodland – Rustic serenity",
                    stream: "http://example.com/stream20"
                },
                {
                    name: "Nature Beats",
                    info: "Nature Beats – Organic tunes",
                    stream: "http://example.com/stream21"
                },
                {
                    name: "Tranquility",
                    info: "Tranquility – Peaceful vibes",
                    stream: "http://example.com/stream22"
                },
                {
                    name: "Birdsong",
                    info: "Birdsong – Melodic chirps",
                    stream: "http://example.com/stream23"
                },
                {
                    name: "River Flow",
                    info: "River Flow – Soothing water sounds",
                    stream: "http://example.com/stream24"
                }
            ],
            soundEffects: [
                { name: "Forest Echoes", sound: "forest" },
                { name: "Birdsong", sound: "birdsong" }
            ],
            message: "Ruins watch in silence… take a moment."
        },
        5: {
            background: "assets/images/stage5.png",
            audio: "assets/audio/stage5_playlist.mp3",
            radios: [
                {
                    name: "Cosmic",
                    info: "Cosmic – Out of this world",
                    stream: "http://example.com/stream25"
                },
                {
                    name: "Galactic",
                    info: "Galactic – Stellar soundscapes",
                    stream: "http://example.com/stream26"
                },
                {
                    name: "Stardust",
                    info: "Stardust – Dreamy and vast",
                    stream: "http://example.com/stream27"
                },
                {
                    name: "Nebula",
                    info: "Nebula – Ethereal vibes",
                    stream: "http://example.com/stream28"
                },
                {
                    name: "Orbit",
                    info: "Orbit – Circular journeys",
                    stream: "http://example.com/stream29"
                },
                {
                    name: "Eclipse",
                    info: "Eclipse – Dark and mysterious",
                    stream: "http://example.com/stream30"
                }
            ],
            soundEffects: [
                { name: "Cosmic", sound: "cosmic" },
                { name: "Nebula", sound: "nebula" }
            ],
            message: "Drift through cosmic dreams, effortlessly."
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
            // Update background and top message
            ambienceBackground.style.backgroundImage = `url('${ambienceData.background}')`;
            document.getElementById("ambience-message").textContent = ambienceData.message;

            // If no radio station is currently selected, load the ambience audio.
            if (!window.radioSelected) {
                radioAudio.src = ambienceData.audio;
            }
            // Preserve the current play state for radioAudio if a station is playing
            if (window.isPlaying) {
                radioAudio.play();
                customPlayBtn.textContent = "Pause";
            } else {
                radioAudio.pause();
                customPlayBtn.textContent = "Play";
            }
            // Only reset the radio selection variables if no radio is currently selected.
            if (!window.radioSelected) {
                window.currentStationType = "audio";
                window.currentYouTubeStream = null;
            }

            // Stop any currently playing sound effects from the previous ambience
            soundEffectsManager.pauseAll();

            // Update the sound effects menu based on the current ambience's configuration
            updateSoundEffectsMenu(ambienceData);

            // If the radio menu is currently open, update its station list to match the new ambience.
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

});