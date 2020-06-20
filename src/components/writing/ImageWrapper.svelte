<script>
    import { images } from '../../stores/document'

    $: console.log($images)
</script>

<!-- <div class="image-wrapper"> -->
    {#each $images as image}
        <img src={image.content} alt="" class="writing-image" style="top: {image.top}px; left: {image.left}px;" on:click={() => console.log("image click")}>
    {/each}
<!-- </div> -->

<style>
    .image-wrapper {
        /* width: 100%;
        height: 100%; */
        /* z-index: 10; */
        height: 100%;
    }

    .writing-image {
        position: absolute;
    }
</style>