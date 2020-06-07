<script>
    import { onMount } from "svelte";
    import { zoomMove } from '../TouchEvents'
	// import interact from "interactjs";

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

        // interact(drawingWrapper)
		// 	.gesturable({
		// 		onmove: function (event) {
		// 			var elem = event.target;

		// 			scale += event.ds * scaleFactor;

		// 			elem.style.webkitTransform = elem.style.transform = getTransform();
		// 		},
		// 	})
		// 	.draggable({
		// 		listeners: {
		// 			move(event) {
		// 				position.x += event.dx * (1 / scale);
		// 				position.y += event.dy * (1 / scale);

		// 				event.target.style.transform = getTransform();
		// 			},
		// 		},
		// 	});
	});
</script>

<div bind:this={drawingWrapper}  class="drawing-wrapper">
    <svg width="100" height="100">
      <circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" />
    </svg>
</div>


<style>
    .drawing-wrapper {
        position: absolute;
		background-color: blue;
		width: 100px;
		height: 100px;
        transform-origin: center;
	}
</style>