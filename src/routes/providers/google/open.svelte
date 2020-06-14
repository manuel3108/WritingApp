<script>
    import { decode } from 'qss';
    import { documentId } from '../../../stores/document'
    import { goto } from '../../../components/GoTo.svelte'

    let { state } = decode(location.search.substring(1));
    state = JSON.parse(state);

    $documentId = state.ids[0];

    goto("/writing/");
</script>