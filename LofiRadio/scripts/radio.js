/* ============================================================= */
/*                        RADIO MENU CLASS                       */
/* ============================================================= */
class RadioMenu {
    constructor(menuId, closeBtnId, listId) {
        // Get main DOM elements for the radio menu
        this.menu = document.getElementById(menuId);
        this.closeBtn = document.getElementById(closeBtnId);
        this.listContainer = document.getElementById(listId);

        // Get the audio element (for standard streams) and the iframe container (for YouTube streams)
        this.audioPlayer = document.getElementById("radio-audio");
        this.iframeContainer = document.getElementById("radio-iframe-container");

        // Attach event to close the menu
        this.closeBtn.addEventListener("click", () => {
            this.hide();
        });
    }

    /* ============================================================= */
    /*                    POPULATE STATION LIST                      */
    /* ============================================================= */
    populate(stations) {
        // Clear previous list
        this.listContainer.innerHTML = "";

        stations.forEach(station => {
            let btn = document.createElement("button");
            btn.textContent = station.name;

            // When a station button is clicked:
            btn.addEventListener("click", () => {
                /* ----- Stop any current stream ----- */
                this.audioPlayer.pause();
                this.audioPlayer.currentTime = 0;
                this.audioPlayer.src = "";
                this.iframeContainer.innerHTML = "";

                // Store the current station type globally
                window.currentStationType = station.type || "audio";
                // If it's a YouTube station, store its stream URL globally; else clear it.
                if (station.type === "youtube") {
                    window.currentYouTubeStream = station.stream;
                } else {
                    window.currentYouTubeStream = null;
                }

                // If no stream is provided, do nothing further
                if (!station.stream) {
                    this.highlightButton(null);
                    return;
                }

                /* ----- Load the new stream based on its type ----- */
                if (station.type === "youtube") {
                    // For YouTube streams, hide the audio element and load the iframe
                    this.audioPlayer.style.display = "none";
                    this.iframeContainer.innerHTML = `<iframe src="${station.stream}&autoplay=1&controls=0&modestbranding=1&rel=0" frameborder="0" allow="autoplay" allowfullscreen></iframe>`;
                    this.iframeContainer.style.display = "block";
                } else {
                    // For standard streams, hide the iframe and use the audio element
                    this.iframeContainer.style.display = "none";
                    this.audioPlayer.style.display = "block";
                    this.audioPlayer.src = station.stream;
                    this.audioPlayer.play();
                }

                // Set global flags: a radio is selected and music is playing
                window.radioSelected = true;
                window.isPlaying = true;
                // Update the custom play button text
                document.getElementById("custom-play").textContent = "Pause";

                // Highlight the active station button
                this.highlightButton(btn);
            });
            this.listContainer.appendChild(btn);
        });
    }

    /* ============================================================= */
    /*                HIGHLIGHT ACTIVE STATION BUTTON              */
    /* ============================================================= */
    highlightButton(selectedBtn) {
        const buttons = this.listContainer.querySelectorAll("button");
        buttons.forEach(btn => btn.classList.remove("active"));
        if (selectedBtn) {
            selectedBtn.classList.add("active");
        }
    }

    /* ============================================================= */
    /*                   SHOW & HIDE RADIO MENU                      */
    /* ============================================================= */
    show(stations) {
        this.populate(stations);
        this.menu.classList.add("show");
    }
    hide() {
        this.menu.classList.remove("show");
    }
}

/* ============================================================= */
/*           MAKE RADIO MENU INSTANCE GLOBALLY AVAILABLE         */
/* ============================================================= */
window.radioMenu = new RadioMenu("radio-menu", "close-radio-menu", "radio-list");