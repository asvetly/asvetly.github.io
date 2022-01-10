export function randomIntFromRange(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function randomColor(colors: Array<string>) {
    return colors[Math.floor(Math.random() * colors.length)];
}

// get a random number within a range
export function random(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

// calculate the distance between two points
export function calculateDistance(
    p1x: number,
    p1y: number,
    p2x: number,
    p2y: number,
) {
    const xDistance = p1x - p2x;
    const yDistance = p1y - p2y;
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}
