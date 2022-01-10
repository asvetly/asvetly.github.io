import {randomIntFromRange} from '../../utils';

export class Particle {
    public size: number;
    public x: number;
    protected y: number;
    protected vy: number;
    protected vx: number;
    protected ay: number;
    protected shine: number;
    protected shineDir: number;
    protected color: string;
    protected rot: number;
    protected omega: number;

    constructor(
        protected c2d: CanvasRenderingContext2D,
        protected pentaRadiant: number,
        size: [number, number],
        width: number,
        shineDir: [number, number],
        frame: number,
        angSpeed: [number, number],
    ) {
        this.size = randomIntFromRange(...size);
        this.x = Math.random() * width;
        this.y = -this.size * 2;
        this.vy = this.size / 10;
        this.vx = Math.random() * 6 - 3;
        this.ay = this.size / 5000;
        this.shine = 0;
        this.shineDir = randomIntFromRange(...shineDir);
        this.color = 'hsla(hue, 80%, brightness%, .15)'.replace(
            'hue',
            '' + (frame % 360),
        );
        this.rot = Math.random() * 2 * Math.PI;
        this.omega = randomIntFromRange(...angSpeed);
        if (Math.random() < 0.5) this.omega *= -1;
    }

    public update = () => {
        this.x += this.vx;
        this.y += this.vy += this.ay;

        const newShine = this.shine + this.shineDir;
        if (newShine < 0 || newShine > 1) this.shineDir *= -1;
        else this.shine = newShine;
        this.rot += this.omega;

        this.draw();
    };

    public draw = () => {
        this.c2d.translate(this.x, this.y);
        this.c2d.rotate(this.rot);
        this.c2d.fillStyle = this.color.replace(
            'brightness',
            '' + (0.25 + this.shine / 2) * 100,
        );
        this.c2d.beginPath();
        this.c2d.moveTo(this.size, 0);

        for (let i = 0; i < 5; ++i) {
            const rad = this.pentaRadiant * i,
                halfRad = rad + this.pentaRadiant / 2;
            this.c2d.lineTo(
                Math.cos(rad) * this.size,
                Math.sin(rad) * this.size,
            );
            this.c2d.lineTo(
                (Math.cos(halfRad) * this.size) / 2,
                (Math.sin(halfRad) * this.size) / 2,
            );
        }
        this.c2d.closePath();

        this.c2d.fill();

        this.c2d.rotate(-this.rot);
        this.c2d.translate(-this.x, -this.y);
    };
}
