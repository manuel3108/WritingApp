<script>
    import Modal from "./Modal.svelte";

    export let isOpen = false;
	export let title;
	export let onSubmit;

	function submit() {
		isOpen = false;
		if(onSubmit) {
			onSubmit();
		}
	}
</script>

<Modal bind:isOpen>
    <div class="modal-background" on:click={() => isOpen = false}></div>
	<div class="modal-card">
		<header class="modal-card-head">
			<p class="modal-card-title">{title}</p>
			<button class="delete" aria-label="close" on:click={() => isOpen = false}></button>
		</header>
		<section class="modal-card-body">
			<slot></slot>
		</section>
		<footer class="modal-card-foot">
			<button class="button is-success" on:click={submit}>Save changes</button>
		</footer>
	</div>
</Modal>