import Point from './Point'

export let getRelative = (point, parent) => {
    return new Point(point.x / parent.clientWidth, point.y / parent.clientHeight, point.pressure)
}

export let getAbsolute = (point, parent) => {
    return new Point(point.x * parent.clientWidth, point.y * parent.clientHeight, point.pressure)
}