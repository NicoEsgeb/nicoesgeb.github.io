

class Firefly {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 2.5 + 1;
        this.alpha = Math.random() * 0.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.noiseOffsetX = Math.random() * 1000;
        this.noiseOffsetY = Math.random() * 1000;
        this.glowFactor = Math.random() * 0.2 + 0.8;
        this.hue = Math.random() < 0.5 ? 180 : 50;
    }

    update() {
        this.noiseOffsetX += 0.002;
        this.noiseOffsetY += 0.002;
        this.x += Math.cos(this.noiseOffsetX) * 0.5;
        this.y += Math.sin(this.noiseOffsetY) * 0.5;

        if (mouse.x && mouse.y) {
            let dx = this.x - mouse.x;
            let dy = this.y - mouse.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < mouse.radius && distance > 10) {
                let angle = Math.atan2(dy, dx);
                let force = (mouse.radius - distance) / mouse.radius;
                this.x -= Math.cos(angle) * force * 0.5;
                this.y -= Math.sin(angle) * force * 0.5;
            }
        }

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        let glowColor = `hsla(${this.hue}, 100%, 60%, ${this.alpha * this.glowFactor})`;
        ctx.fillStyle = glowColor;
        ctx.shadowBlur = 15;
        ctx.shadowColor = glowColor;
        ctx.fill();
    }
}