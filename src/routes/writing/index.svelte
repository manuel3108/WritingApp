<script>
    import { documentId, strokes } from '../../stores/document'
    import { api } from '../../stores/providers'
	import Wrapper from "../../components/writing/Wrapper.svelte";


    //TODO 
    $documentId = "1HNdL9-9MPAmbCWILaHNGSh3AGNcz880r";
    console.log($documentId)

    $: {
        if($api !== null) {
            $api.downloadDocument($documentId).then((content) => {
                const strokesContent = JSON.parse(content);
                strokesContent.forEach((stroke) => {
                    $strokes.push(stroke);
                });
                $strokes = $strokes;
            })
        }
    }

</script>

<Wrapper />
