// Faster bonfire using a cached ember sprite + additive blending
function makeEmberSprite() {
    const s = 80;
    const c = document.createElement("canvas");
    c.width = c.height = s;
    const g = c.getContext("2d");
    const grad = g.createRadialGradient(s/2, s/2, 0, s/2, s/2, s/2);
    grad.addColorStop(0.0, "hsla(30,100%,60%,1)");
    grad.addColorStop(0.5, "hsla(18,100%,55%,0.6)");
    grad.addColorStop(1.0, "hsla(0,0%,0%,0)");
    g.fillStyle = grad;
    g.fillRect(0,0,s,s);
    return c;
}
const EMBER_SPRITE = makeEmberSprite();

class Ember {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = Math.random() * 2 + 1;
        this.life = Math.random() * 900 + 500;
        this.start = performance.now();
        this.vx = (Math.random() - 0.5) * 0.45;
        this.vy = -Math.random() * 1.4 - 0.55;
        this.hue = 30 + Math.random() * 30;
        this.alpha = 1;
        this._expired = false;
    }
    update(now) {
        const elapsed = now - this.start;
        if (elapsed > this.life) {
            this._expired = true; return;
        }
        this.x += this.vx;
        this.y += this.vy;
        this.alpha = 1 - elapsed / this.life;
    }
    draw(ctx) {
        const size = (this.radius + 2) * 6;
        ctx.globalAlpha = this.alpha;
        ctx.drawImage(EMBER_SPRITE, this.x - size/2, this.y - size/2, size, size);
    }
    get expired(){ return this._expired; }
}

class Bonfire {
    constructor(x, y) {
        this.x = x; this.y = y;
        this.start = performance.now();
        this.duration = 2600;
        this.particles = [];
        for (let i = 0; i < 24; i++) this.particles.push(new Ember(this.x, this.y));
    }
    update(now) {
        for (let e of this.particles) e.update(now);
        if (Math.random() < 0.10) this.particles.push(new Ember(this.x, this.y));
        this.particles = this.particles.filter(p => !p.expired);
    }
    draw(ctx) {
        for (let e of this.particles) e.draw(ctx);
    }
    expired(now) { return now - this.start > this.duration; }
}
