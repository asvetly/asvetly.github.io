import {Particle} from './Particle';

export class Animation {
    constructor(
        protected canvas: HTMLCanvasElement,
        protected c2d: CanvasRenderingContext2D,
    ) {}

    protected particles: Array<Particle> = [];
    protected frame = (Math.random() * 360) | 0;
    protected pentaRadiant = (Math.PI * 2) / 5;
    protected size: [number, number] = [20, 60];
    protected shineDir: [number, number] = [0.01, 0.05];
    protected angSpeed: [number, number] = [0.01, 0.04];

    init() {
        this.particles = [];
    }

    // Animation Loop
    animate() {
        requestAnimationFrame(() => this.animate());
        this.frame += 1;

        this.c2d.globalCompositeOperation = 'destination-out';
        this.c2d.fillStyle = 'rgba(0, 0, 0, .1)';
        this.c2d.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.c2d.globalCompositeOperation = 'lighter';

        if (Math.random() < 0.3)
            this.particles.push(
                new Particle(
                    this.c2d,
                    this.pentaRadiant,
                    this.size,
                    this.canvas.width,
                    this.shineDir,
                    this.frame,
                    this.angSpeed,
                ),
            );

        for (let s = 0; s < this.particles.length; ++s) {
            this.particles[s].update();

            if (this.particles[s].x + this.particles[s].size < 0) {
                this.particles.splice(s, 1);
                --s;
            }
        }
    }
}
