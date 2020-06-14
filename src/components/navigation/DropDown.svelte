<script>
    import { onMount } from 'svelte'
    import clickOutside from "svelte-outside-click";

    export let Component;

    let isActive = false;

    let trigger;
    
    onMount(() => {
        trigger.onclick = () => {
            isActive = !isActive;
        }
    })

    function outside() {
        isActive = false;
    }
</script>

<style>
    .dropdown-content {
		padding: 0;
	}
    
    .dropdown-trigger {
        cursor: pointer;
    }
</style>

<div class="dropdown is-right" class:is-active={isActive} use:clickOutside={outside}>
    <div class="dropdown-trigger" bind:this={trigger}>
        <slot></slot>
    </div>
    <div class="dropdown-menu" id="dropdown-menu2" role="menu">
        <div class="dropdown-content">
            <svelte:component this={Component}/>
        </div>
    </div>
</div>