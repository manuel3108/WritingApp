<script>
    import Icon from "../ui/Icon.svelte";
    import { mdiContentSave } from '@mdi/js'
    import { strokes, documentId, images } from '../../stores/document'
    import { api } from '../../stores/providers'

    function save() {
        const content = {
            "strokes": $strokes,
            "images": $images
        };

        $api.uploadFile($documentId, JSON.stringify(content));
    }
</script>

<div class="save-container" on:click={save}>
    <Icon path={mdiContentSave} />
</div>

<style>
    .save-container {
        cursor: pointer;
    }
</style>
