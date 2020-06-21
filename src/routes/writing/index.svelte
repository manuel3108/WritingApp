<script>
    import { documentId, strokes, images } from '../../stores/document'
    import { api } from '../../stores/providers'
    import Wrapper from "../../components/writing/Wrapper.svelte";


    let apiLoaded = false;

    $: {
        if($api !== null) {
            apiLoaded = true;
            loadDocument($api);
        }
    }

    function loadDocument(api) {
        api.downloadDocument($documentId).then((text) => {
            const content = JSON.parse(text);
            content.strokes.forEach((stroke) => {
                $strokes.push(stroke);
            });
            $strokes = $strokes;

            content.images.forEach((image) => {
                $images.push(image);
            });
            $images = $images;
        })
    }
</script>

{#if apiLoaded}
    <Wrapper />
{/if}