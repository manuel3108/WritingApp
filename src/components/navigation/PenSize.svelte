<script>
    import Slider from '../Slider.svelte'
    import { penSize } from '../../stores/pen'
</script>

<span>PenSize: {$penSize}</span>
<Slider bind:value={$penSize}></Slider>