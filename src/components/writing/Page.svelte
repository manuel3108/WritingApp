<script>
    import InputWrapper from './InputWrapper.svelte';
    import StrokeWrapper from './StrokeWrapper.svelte'
    import ImageWrapper from './ImageWrapper.svelte';

    let components = [
        ImageWrapper,
        StrokeWrapper
    ]

    let instances = [];

</script>


<div class='writing-wrapper'>
    {#each components as component,i}
        <svelte:component this={component} bind:this={instances[i]}/>
    {/each}
    <InputWrapper components={instances}/>
</div>

<style>
    .writing-wrapper {
        width: 100%;
        height: 100%;
    }
</style>