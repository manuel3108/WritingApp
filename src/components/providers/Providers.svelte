<script>
    import { list, name, api, apiLoaded } from '../../stores/providers.js'
    import { goto } from '../GoTo.svelte'

    var promises = [];

    $list.forEach(provider => {
        var promise = provider.api.load();
        
        promises.push(promise);

        promise.then(() => {
            if(provider.api.isLoggedIn()) {
                console.log("logged in with", provider.name)
                $name = provider.name;
                $api = provider.api;
                $apiLoaded = true;

                $api.saveUserProfile();
            }
        })
    });

    Promise.all(promises).then(() => {
        if(!$apiLoaded) {
            // goto("/providers")
        }
    })

</script>