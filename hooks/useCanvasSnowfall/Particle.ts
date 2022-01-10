export class Particle {
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
        this.radians += this.velocity;
        this.x = this.initX + Math.cos(this.radians) * 200;
        this.y = this.initY + Math.tan(this.radians) * 300;

        this.draw();
    };

    public draw = () => {
        this.c2d.beginPath();
        this.c2d.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.c2d.fillStyle = this.color;
        this.c2d.fill();

        this.c2d.closePath();
    };
}
