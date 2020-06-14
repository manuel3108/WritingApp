<script>
    import 'bulma-slider/dist/css/bulma-slider.min.css'
    
    export let value;
</script>

<input class="slider is-fullwidth" step="1" min="0" max="100" bind:value={value} type="range">