import {Firework} from './Firework';
import {Particle} from './Particle';
import {random} from './utils';

export class Animation {
    static readonly PARTICLES_COUNT = 60;

    // particle collection
    protected particles: Particle[] = [];
    // firework collection
    protected fireworks: Firework[] = [];
    // starting hue
    protected hue = 150;
    // this will time the auto launches of fireworks; one launch per 80 loop ticks
    protected timerTotal = 40;
    protected timerTick = 0;

    constructor(
        protected canvas: HTMLCanvasElement,
        protected c2d: CanvasRenderingContext2D,
    ) {}

    // create particle group/explosion
    createParticles(x: number, y: number) {
        for (let i = 0; i < Animation.PARTICLES_COUNT; i++) {
            this.particles.push(new Particle({x, y}, this.hue, this.c2d));
        }
    }

    init() {
        this.fireworks.push(
            new Firework(
                this.canvas.width / 2,
                this.canvas.height,
                random(0, this.canvas.width),
                random(0, this.canvas.height / 2),
                this.c2d,
            ),
        );
    }

    // Animation Loop
    animate() {
        // this function will run endlessly with requestAnimationFrame
        requestAnimationFrame(() => this.animate());

        // increase the hue to get different colored fireworks over time
        this.hue += 0.5;

        // normally, clearRect() would be used to clear the canvas
        // we want to create a trailing effect though
        // setting the composite operation to destination-out will allow us to clear the canvas at a specific opacity, rather than wiping it entirely
        this.c2d.globalCompositeOperation = 'destination-out';
        // decrease the alpha property to create more prominent trails
        // this.c2d.fillRect(0, 0, this.canvas.width, this.canvas.height);
        // change the composite operation back to our main mode
        // lighter creates bright highlight points as the fireworks and particles overlap each other
        this.c2d.globalCompositeOperation = 'lighter';

        // loop over each firework, draw it, update it
        let i = this.fireworks.length;
        while (i--) {
            this.fireworks[i].draw(this.hue);
            this.fireworks[i].update();
            // if the distance traveled, including velocities, is greater than the initial distance to the target, then the target has been reached
            if (
                this.fireworks[i].distanceTraveled >=
                this.fireworks[i].distanceToTarget
            ) {
                this.createParticles(
                    this.fireworks[i].tx,
                    this.fireworks[i].ty,
                );
                // remove the firework, use the index passed into the update function to determine which to remove
                this.fireworks.splice(i, 1);
            }
        }

        // loop over each particle, draw it, update it
        i = this.particles.length;
        while (i--) {
            this.particles[i].draw();
            this.particles[i].update();

            // remove the particle once the alpha is low enough, based on the passed in index
            if (this.particles[i].alpha <= this.particles[i].decay) {
                this.particles.splice(i, 1);
            }
        }

        // launch fireworks automatically to random coordinates, when the mouse isn't down
        if (this.timerTick >= this.timerTotal) {
            // start the firework at the bottom middle of the screen, then set the random target coordinates, the random y coordinates will be set within the range of the top half of the screen
            this.fireworks.push(
                new Firework(
                    this.canvas.width / 2,
                    this.canvas.height,
                    random(0, this.canvas.width),
                    random(0, this.canvas.height / 2),
                    this.c2d,
                ),
            );
            this.timerTick = 0;
        } else {
            this.timerTick++;
        }
    }
}
