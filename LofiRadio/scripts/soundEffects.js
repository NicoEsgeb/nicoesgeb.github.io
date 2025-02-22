// soundEffects.js

class SoundEffects {
    constructor(options = {}) {
        // Base path for audio files, default to 'assets/audio/'
        this.basePath = options.basePath || "assets/sounds/";
        // Store audio objects by sound name
        this.sounds = {};
    }

    // Create or retrieve an Audio object for a given sound
    _getSound(soundName) {
        if (!this.sounds[soundName]) {
            // Use .wav instead of .mp3
            const audio = new Audio(`${this.basePath}${soundName}.wav`);
            audio.loop = true; // Loop the sound if desired
            this.sounds[soundName] = audio;
        }
        return this.sounds[soundName];
    }

    // Play a sound effect at a given volume
    play(soundName, volume = 0.5) {
        const sound = this._getSound(soundName);
        sound.volume = volume;
        sound.play();
    }

    // Pause a sound effect
    pause(soundName) {
        const sound = this._getSound(soundName);
        sound.pause();
    }

    // Toggle playback: play if paused, pause if playing
    toggle(soundName, volume = 0.5) {
        const sound = this._getSound(soundName);
        if (sound.paused) {
            sound.volume = volume;
            sound.play();
        } else {
            sound.pause();
        }
    }

    // Set the volume of a sound effect
    setVolume(soundName, volume) {
        const sound = this._getSound(soundName);
        sound.volume = volume;
    }
}

// If you are using ES6 modules, you can uncomment the following line:
// export default SoundEffects;