import Point from './Point'

export default class PressurePoint extends Point {
    constructor(x, y, pressure) {
        super(x, y);
        this.pressure = pressure;
    }
}