import { getRelative } from './PointHelper'

export let contains = (image, point, parent) => {
    let position = getRelative(point, parent);
    if(position.x > image.position.x && position.x < image.position.x + image.size.x
        && position.y > image.position.y && position.y < image.position.y + image.size.y) {
            return true;
    }
    return false;
}