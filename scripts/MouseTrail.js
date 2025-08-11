// Very light mouse trail (capped points, sprite glow, no blur)
function makeTrailSprite(){
    const s = 64;
    const c = document.createElement("canvas");
    c.width = c.height = s;
    const g = c.getContext("2d");
    const grad = g.createRadialGradient(s/2,s/2,0,s/2,s/2,s/2);
    grad.addColorStop(0.0, "rgba(180,220,255,0.9)");
    grad.addColorStop(0.5, "rgba(180,220,255,0.35)");
    grad.addColorStop(1.0, "rgba(0,0,0,0)");
    g.fillStyle = grad; g.fillRect(0,0,s,s);
    return c;
}
const TRAIL_SPRITE = makeTrailSprite();

class MouseTrail {
    constructor(opts = {}) {
        this.points = [];
        this.lifetime = opts.lifetime ?? 320; // ms
        this.radius = opts.radius ?? 10;
        this.maxPoints = opts.maxPoints ?? 18;
        this._lastAt = 0;
    }
    addPoint(x, y) {
        const now = performance.now();
        // Throttle to ~60Hz
        if (now - this._lastAt < 16) return;
        this._lastAt = now;
        this.points.push({ x, y, t: now });
        if (this.points.length > this.maxPoints) this.points.shift();
    }
    draw(ctx, now) {
        // prune
        const life = this.lifetime;
        this.points = this.points.filter(p => now - p.t < life);
        if (this.points.length === 0) return;

        const base = this.radius * 4.8;
        for (let p of this.points) {
            const age = (now - p.t) / life; // 0..1
            const alpha = 1 - age;
            const size = base * (0.85 + (1 - age) * 0.25);
            ctx.globalAlpha = 0.32 * alpha;
            ctx.drawImage(TRAIL_SPRITE, p.x - size/2, p.y - size/2, size, size);
        }
    }
}

