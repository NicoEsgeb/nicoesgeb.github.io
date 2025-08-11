// Fast fireflies using cached glow sprites + additive blending
function makeGlowSprite(hue) {
    const s = 64;
    const c = document.createElement("canvas");
    c.width = c.height = s;
    const g = c.getContext("2d");
    const grad = g.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
    grad.addColorStop(0.0, `hsla(${hue},100%,70%,1)`);
    grad.addColorStop(0.5, `hsla(${hue},100%,70%,0.45)`);
    grad.addColorStop(1.0, `hsla(${hue},100%,70%,0)`);
    g.fillStyle = grad;
    g.fillRect(0, 0, s, s);
    return c;
}

const FIREFLY_SPRITES = {
    180: makeGlowSprite(180), // teal-blue
    50: makeGlowSprite(50),   // amber
};

class Firefly {
    constructor() {
        this.x = Math.random() * canvas.width;   // uses global canvas from main.js
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 2 + 1.5;
        this.alpha = Math.random() * 0.5 + 0.5;
        this.noiseX = Math.random() * 1000;
        this.noiseY = Math.random() * 1000;
        this.hue = Math.random() < 0.55 ? 180 : 50;
        this.orbitDirection = Math.random() < 0.5 ? -1 : 1;
        this.t = Math.random() * 100;
    }

    update(dt) {
        // Gentle float
        this.noiseX += 0.35 * dt;
        this.noiseY += 0.35 * dt;
        this.x += Math.cos(this.noiseX) * 0.45;
        this.y += Math.sin(this.noiseY) * 0.45;

        // Mouse attraction (global mouse from main.js)
        if (mouse.x != null && mouse.y != null) {
            const dx = this.x - mouse.x;
            const dy = this.y - mouse.y;
            const d2 = dx * dx + dy * dy;
            const r = mouse.radius * mouse.radius;
            if (d2 < r && d2 > 100) {
                const d = Math.sqrt(d2);
                const force = (mouse.radius - d) / mouse.radius;
                const ang = Math.atan2(dy, dx);
                this.x -= Math.cos(ang) * force * 0.4;
                this.y -= Math.sin(ang) * force * 0.4;
            }
        }

        // Bonfire orbit pull (global bonfires from main.js)
        for (let b of bonfires) {
            const dx = this.x - b.x;
            const dy = this.y - b.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < 150 * 150) {
                const d = Math.sqrt(d2) || 1;
                const factor = (150 - d) / 150;
                const kGrav = 0.045 * factor;
                const kTang = 0.09 * factor;
                // radial pull
                this.x += (-dx) * kGrav;
                this.y += (-dy) * kGrav;
                // tangential swirl
                this.x += (-dy / d) * kTang * this.orbitDirection * 2.2;
                this.y += ( dx / d) * kTang * this.orbitDirection * 2.2;
            }
        }

        // Wrap
        const W = canvas.width, H = canvas.height;
        if (this.x > W) this.x = 0;
        else if (this.x < 0) this.x = W;
        if (this.y > H) this.y = 0;
        else if (this.y < 0) this.y = H;

        // Pulse
        this.t += dt;
        this.glow = 0.85 + Math.sin(this.t * 2.1 + this.noiseX) * 0.15;
    }

    draw(ctx) {
        const sprite = FIREFLY_SPRITES[this.hue];
        const size = this.radius * 6; // visual glow size
        ctx.globalAlpha = this.alpha * this.glow;
        ctx.drawImage(sprite, this.x - size / 2, this.y - size / 2, size, size);
    }
}
