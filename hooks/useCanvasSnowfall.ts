import { RefObject, useEffect, useRef } from 'react';

class Particle {
    protected x: number;
    protected y: number;

    constructor(
        protected initX: number,
        protected initY: number,
        protected radius: number,
        protected color: string,
        protected radians: number,
        protected c2d: CanvasRenderingContext2D,
        protected velocity = 0.005,
    ) {
        this.x = initX;
        this.y = initY;
    }

    public update = () => {
        // Move these points over time
        this.radians += this.velocity;
        this.x = this.initX + Math.cos(this.radians) * 400 ;
        this.y = this.initY + Math.tan(this.radians) * 600 ;

        this.draw();
    }

    public draw = () => {
        this.c2d.beginPath()
        this.c2d.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        this.c2d.fillStyle = this.color
        this.c2d.fill()

        this.c2d.closePath()
    }
}

class Animation {
    constructor(
        protected canvas: HTMLCanvasElement,
        protected c2d: CanvasRenderingContext2D,
        public attributes = {
            particleCount: 400,   // Change amount of snowflakes
            particleSize: 3,      // Max size of a snowflake
            fallingSpeed: 1,      // Intensity of the snowfall horizontal
            colors: ['#ccc', '#eee', '#fff', '#ddd'] // Array of usable colors
        }
    ) {}

    protected particles: Array<Particle> = [];

    init() {
        this.particles = [];

        for (let i = 0; i < this.attributes.particleCount; i++) {
            this.particles.push(
                new Particle(
                    Math.random() * this.canvas.width,
                    Math.random() * this.canvas.height,
                    randomIntFromRange(0.5, this.attributes.particleSize),
                    randomColor(this.attributes.colors),
                    Math.random() * 80,
                    this.c2d,
                )
            );
        }
    }

    // Animation Loop
    animate() {
        requestAnimationFrame(() => this.animate());
        this.c2d.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach(particle => {
            particle.update();
        });
    }
}

function randomIntFromRange(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomColor(colors: Array<any>) {
    return colors[Math.floor(Math.random() * colors.length)]
}

function distance(x1: number, y1: number, x2: number, y2: number) {
    const xDist = x2 - x1
    const yDist = y2 - y1

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
}

function useCanvasSnowfall(canvasRef: RefObject<HTMLCanvasElement>) {
    const animation = useRef<Animation | undefined>();

    useEffect(() => {
        const canvas = canvasRef.current;
        const c2d = canvas?.getContext('2d');
        if (!canvas || !c2d) return;

        animation.current = new Animation(canvas, c2d);

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        addEventListener('resize', () => {
            canvas.width = innerWidth
            canvas.height = innerHeight
            animation.current?.init();
        })

        animation.current.init();
        animation.current.animate();
    }, [canvasRef])
}

export default useCanvasSnowfall;
