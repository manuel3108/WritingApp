<script>
	import * as AColorPicker from 'a-color-picker'
	import { onMount } from 'svelte'
	import { penColor } from '../../stores/pen'

	let picker;

	onMount(() => {
		AColorPicker.from(picker).on('change', (picker) => {
			$penColor = picker.rgbhex;
		});;
	})
</script>

<div bind:this={picker}></div>