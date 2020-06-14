<script>
    import { decode } from 'qss';
    import { goto } from '../../../components/GoTo.svelte'
    import { api } from '../../../stores/providers'
    import { documentId } from '../../../stores/document'
    import { onMount } from 'svelte'

    let { state } = decode(location.search.substring(1));
    state = JSON.parse(state);

    $: onApiChange($api)

    function onApiChange(api) {
        if (api !== null) {
            $api.createFile(state.folderId).then((fileId) => {
                $documentId = fileId;
                goto('/writing');
            });
        }
    }
    
</script>