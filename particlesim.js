class ParticleSimulation {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.width = canvas.width = window.innerWidth;
        this.height = canvas.height = window.innerHeight;
        this.particles = [];
        this.numParticles = 100;

        for (let i = 0; i < this.numParticles; i++) {
            this.particles.push(this.createParticle());
        }

        this.animate();
    }

    createParticle() {
        const colors = [
            'rgb(0, 0, 139)', // Dark Blue
            'rgb(25, 25, 112)', // Midnight Blue
            'rgb(70, 130, 180)', // Steel Blue
            'rgb(105, 105, 105)', // Dim Gray
            'rgb(169, 169, 169)' // Dark Gray
        ];
        return {
            x: Math.random() * this.width,
            y: Math.random() * this.height,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            color: colors[Math.floor(Math.random() * colors.length)]
        };
    }

    update() {
        for (let particle of this.particles) {
            particle.x += particle.vx;
            particle.y += particle.vy;

            if (particle.x < 0 || particle.x > this.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.height) particle.vy *= -1;
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        for (let particle of this.particles) {
            this.ctx.fillStyle = particle.color;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, 5, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }

    animate() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

const canvas = document.getElementById('waterCanvas');
const particleSimulation = new ParticleSimulation(canvas);