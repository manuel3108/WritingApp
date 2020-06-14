<script>
    import { api, apiLoaded, name as providerName } from '../../../stores/providers';
    import * as googleApi from '../../../components/providers/google/Api.svelte'
    import { name } from '../../../stores/user'
    import { goto } from '../../../components/GoTo.svelte'

    $api = googleApi;

    var loggedIn = false;

        
    $api.load().then(() => {
        $api.login().then(() => {
            $api.saveUserProfile();
            loggedIn = true;

            setTimeout(() => goto("/"), 1000)
        });
    })
</script>

{#if !loggedIn}
    Awaiting login
{:else}
    Logged in
{/if}