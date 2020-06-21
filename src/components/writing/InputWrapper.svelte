<script>
    export let components;

    let activeComponent = null;

    function onPointerDown(e) {
        for (let component of components) {
            if(component.onPointerDown(e)) {
                activeComponent = component;
                break;
            }
        }
    }

    function onPointerUp(e) {
        if(activeComponent != null) {
            activeComponent.onPointerUp(e)
            activeComponent = null;
        }
    }

    function onPointerMove(e) {
        if(activeComponent !== null) {
            activeComponent.onPointerMove(e)
        }
    }
</script>

<div class="input-wrapper" on:pointerdown={onPointerDown} on:pointerup={onPointerUp} on:pointermove={onPointerMove}></div>

<style>
    .input-wrapper {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
    }
</style>