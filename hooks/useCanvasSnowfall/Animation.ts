import {Particle} from './Particle';

function randomIntFromRange(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors: Array<string>) {
    return colors[Math.floor(Math.random() * colors.length)];
}

export class Animation {
    constructor(
        protected canvas: HTMLCanvasElement,
        protected c2d: CanvasRenderingContext2D,
        public attributes = {
            particleCount: 400, // Change amount of snowflakes
            particleSize: 1.8, // Max size of a snowflake
            fallingSpeed: 1, // Intensity of the snowfall horizontal
            colors: ['#ccc', '#eee', '#fff', '#ddd'], // Array of usable colors
        },
    ) {}

    protected particles: Array<Particle> = [];

    init() {
        this.particles = [];

        for (let i = 0; i < this.attributes.particleCount; i++) {
            this.particles.push(
                new Particle(
                    Math.random() * this.canvas.width,
                    Math.random() * this.canvas.height,
                    randomIntFromRange(0.1, this.attributes.particleSize),
                    randomColor(this.attributes.colors),
                    Math.random() * 80,
                    this.c2d,
                ),
            );
        }
    }

    // Animation Loop
    animate() {
        requestAnimationFrame(() => this.animate());
        this.c2d.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach((particle) => {
            particle.update();
        });
    }
}
