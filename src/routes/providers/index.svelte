<script>
    import { list } from '../../stores/providers.js'
    
</script>

{#each $list as provider}
    <a href="/providers/{provider.name}/login" class="button is-primary">{provider.displayName}</a><br />
{/each}