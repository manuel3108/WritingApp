<script>
    import { images } from '../../stores/document'
    import { getRelative, getAbsolute } from './PointHelper'
    import { contains } from './ImageHelper'
    import Point from './Point'

    let parent;
    let imageToDrag = null;

    export function onPointerDown(e) {
        let watch = false;
        $images.forEach(image => {
            if(contains(image, new Point(e.offsetX, e.offsetY), parent)) {
                imageToDrag = image;
                watch = true;
            }
        });

        return watch;
    }

    export function onPointerUp() {
        imageToDrag = null;        
    }

    export function onPointerMove(e) {
        if(imageToDrag !== null) {
            imageToDrag.position = getRelative(new Point(e.offsetX, e.offsetY), parent);

            $images = $images
        }
    }

    function getComputedStyle(image) {
        let position = getAbsolute(image.position, parent);
        let size = getAbsolute(image.size, parent);
        return `top: ${position.y}px; left: ${position.x}px; width: ${size.x}px; height: ${size.y}px;`
    }
</script>

<div class="image-wrapper" bind:this={parent}>
    {#each $images as image}
        <img src={image.content} alt="" class="writing-image" style={getComputedStyle(image)}>
    {/each}
</div>

<style>
    .image-wrapper {
        /* width: 100%;
        height: 100%; */
        height: 100%;
    }

    .writing-image {
        position: absolute;
    }
</style>