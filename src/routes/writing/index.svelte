<script>
    import { documentId, strokes } from '../../stores/document'
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
        api.downloadDocument($documentId).then((content) => {
            const strokesContent = JSON.parse(content);
            strokesContent.forEach((stroke) => {
                $strokes.push(stroke);
            });
            $strokes = $strokes;
        })
    }
</script>

{#if apiLoaded}
    <Wrapper />
{/if}