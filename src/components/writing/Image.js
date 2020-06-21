import Point from './Point'

export default class Image {
    constructor(content, width, height) {
        this.content = content;
        this.position = new Point(0, 0);

        let newWidth = 0.5
        this.size = new Point(newWidth, (newWidth / width) * height)
    }
}