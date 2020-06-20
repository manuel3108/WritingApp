export default class Stroke {
    constructor(color) {
        this.color = color;
        this.points = [];
    }

    addPoint(p1, p2) {
        this.points.push(p1);
        this.points.splice(0, 0, p2);
    }

    getPoints() {
        return this.points;
    }
}