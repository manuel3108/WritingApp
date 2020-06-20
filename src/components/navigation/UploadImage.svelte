<script>
    import Icon from "../ui/Icon.svelte";
    import { mdiImagePlus } from '@mdi/js'
    import CardModal from "../ui/CardModal.svelte";
    import FileUpload from "../ui/FileUpload.svelte";
    import Image from '../writing/Image'
    import { images } from '../../stores/document'

    let isOpen = false;
    let imageContent = null;

    function addImage(content) {
        let image = new Image(imageContent);
        $images.push(image);
        $images = $images;
    }
</script>

<div class="upload-image-container" on:click={() => isOpen = true}>
    <Icon path={mdiImagePlus} />
</div>

<CardModal bind:isOpen title="Upload image" onSubmit={addImage}> 
    <FileUpload bind:content={imageContent} text="Upload image"/>
    <br>
    <img class="preview-image" src={imageContent} alt=""/>
</CardModal>

<style>
    .upload-image-container {
        cursor: pointer;
    }

    .preview-image {
        max-height: 100%;
    }
</style>
