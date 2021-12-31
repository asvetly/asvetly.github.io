import {calculateDistance, random} from "./utils";

export class Firework {
    protected x: number;
    protected y: number;
    protected sx: number;
    protected sy: number;
    public tx: number;
    public ty: number;
    public distanceToTarget: number;
    public distanceTraveled: number;
    protected coordinates: [number, number][];
    protected coordinateCount: number;
    protected angle: number;
    protected speed: number;
    protected acceleration: number;
    protected brightness: number;
    protected targetRadius: number;

    constructor(
        sx: number, sy: number, tx: number, ty: number,
        protected c2d: CanvasRenderingContext2D,
    ) {
        // actual coordinates
        this.x = sx;
        this.y = sy;
        // starting coordinates
        this.sx = sx;
        this.sy = sy;
        // target coordinates
        this.tx = tx;
        this.ty = ty;
        // distance from starting point to target
        this.distanceToTarget = calculateDistance( sx, sy, tx, ty );
        this.distanceTraveled = 0;
        // track the past coordinates of each firework to create a trail effect, increase the coordinate count to create more prominent trails
        this.coordinates = [];
        this.coordinateCount = 3;
        // populate initial coordinate collection with the current coordinates
        while( this.coordinateCount-- ) {
            this.coordinates.push( [ this.x, this.y ] );
        }
        this.angle = Math.atan2( ty - sy, tx - sx );
        this.speed = 20;
        this.acceleration = 1.05;
        this.brightness = random( 50, 70 );
        // circle target indicator radius
        this.targetRadius = 1;
    }

    // update firework
    update() {
        // remove last item in coordinates array
        this.coordinates.pop();
        // add current coordinates to the start of the array
        this.coordinates.unshift( [ this.x, this.y ] );

        // cycle the circle target indicator radius
        if( this.targetRadius < 8 ) {
            this.targetRadius += 0.3;
        } else {
            this.targetRadius = 1;
        }

        // speed up the firework
        this.speed *= this.acceleration;

        // get the current velocities based on angle and speed
        const vx = Math.cos(this.angle) * this.speed;
        const vy = Math.sin(this.angle) * this.speed;
        // how far will the firework have traveled with velocities applied?
        this.distanceTraveled = calculateDistance(this.sx, this.sy, this.x + vx, this.y + vy);

        // if the distance traveled, including velocities, is greater than the initial distance to the target, then the target has been reached
        if (this.distanceTraveled < this.distanceToTarget) {
            // target not reached, keep traveling
            this.x += vx;
            this.y += vy;
        }
    }

    // draw firework
    draw(hue: number) {
        this.c2d.beginPath();
        // move to the last tracked coordinate in the set, then draw a line to the current x and y
        this.c2d.moveTo(this.coordinates[ this.coordinates.length - 1][ 0 ], this.coordinates[ this.coordinates.length - 1][ 1 ]);
        this.c2d.lineTo(this.x, this.y);
        this.c2d.strokeStyle = 'hsl(' + hue + ', 100%, ' + this.brightness + '%)';
        this.c2d.stroke();
    }
}
