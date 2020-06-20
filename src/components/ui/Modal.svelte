<script>
	export let isOpen = false;
</script>

<div class="modal" class:is-active={isOpen}>
	<slot></slot>
</div>