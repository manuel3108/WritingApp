<script>
    import { onMount } from "svelte";
    import { zoomMove } from '../TouchEvents.svelte'
    import Page from './Page.svelte'

    var drawingWrapper;

    var scale = 1;
	const scaleFactor = 2;
	const desktopScaleFactor = 0.25;
	var position = {
		x: 0,
		y: 0,
    };
    
    var pageSize = {
        x: 210,
        y: 297
    }

	function getTransform() {
		return "scale(" + scale + ") " + `translate(${position.x}px, ${position.y}px)`;
    }
    
    function setWrapperSizes() {
        var parentWidth = drawingWrapper.parentNode.clientWidth;
        var parentHeight = drawingWrapper.parentNode.clientHeight;


        var width, height = 0;
        height = parentHeight;
        // percentage = pageSize.y / height
        // height = pageSize.y / percentage
        // ==> width = pageSize.x / percentage
        var percentage = (pageSize.y / height);
        width = pageSize.x / percentage

        drawingWrapper.style.width = width + "px";
        drawingWrapper.style.height = height + "px";

        // align center
        drawingWrapper.style.left = (parentWidth/2 - width/2)  + "px"
    }

    document.addEventListener('keyup', (e) => {
        if (e.code === "ArrowUp") {
            scale += desktopScaleFactor;
            drawingWrapper.style.webkitTransform = drawingWrapper.style.transform = getTransform();
        }
        else if (e.code === "ArrowDown") {
            scale -= desktopScaleFactor;
            drawingWrapper.style.webkitTransform = drawingWrapper.style.transform = getTransform();       
        } 
    });

	onMount(() => {
        window.addEventListener("resize", setWrapperSizes)
        setWrapperSizes();

        zoomMove(drawingWrapper);
	});
</script>

<div class="drawing">
    <div bind:this={drawingWrapper}  class="drawing-wrapper">
        <Page />
    </div>
</div>


<style>
    .drawing {
		height: 100%;
		max-height: 100%;
		touch-action: none;
		user-select: none;
	}

    .drawing-wrapper {
        position: absolute;
		background-color: blue;
		width: 100px;
		height: 100px;
        transform-origin: center;
	}
</style>