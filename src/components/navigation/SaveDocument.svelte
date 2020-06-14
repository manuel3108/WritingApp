<script>
    import Icon from "../Icon.svelte";
    import { mdiContentSave } from '@mdi/js'
    import { strokes, documentId } from '../../stores/document'
    import { api } from '../../stores/providers'

    function save() {
        const content = [];
        $strokes.forEach((stroke) => {
            content.push(stroke);
        });

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
