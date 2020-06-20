<script>
    import { SVG, Path } from 'svelte-svg'
    import paper from 'paper'
    import { strokes, documentId } from '../../stores/document'
    import { connect, send, setMessageCallback } from '../Connector.svelte'
    import { RECEIPIENTS, TOPICS } from '../../shared/ws_terms'
    import { penColor, penSize } from '../../stores/pen'
    import { onMount } from 'svelte';
    import Stroke from './Stroke'
    import PressurePoint from './PressurePoint'

    export let parent;

    let currentStroke;
    let registerEvents = false;
    let lastPoint;
    let pointerCount = 0;

    onMount(() => {
        if ($documentId === null) {
            throw "$documentId cannot be null"
        }

        connect((window.location.protocol === "http:" ? "ws://" : "wss://" ) + window.location.host + "/echo").then(() => {
            send({
                receipient: RECEIPIENTS.SERVER, 
                topic: TOPICS.JOIN, 
                message: $documentId
            })
            
            setMessageCallback((data) => {
                if(data.topic === TOPICS.ADD_STROKE) {
                    console.log("got message", data)
                    $strokes.push(data.message)
                    $strokes = $strokes;
                    console.log("compare", $strokes[0], data)
                }
            })
        });
    });

    function onPointerDown() {
        registerEvents = true;

        currentStroke = new Stroke($penColor);

        pointerCount++;
    }

    function onPointerUp() {
        registerEvents = false;
        lastPoint = undefined;

        $strokes.push(currentStroke);
        $strokes = $strokes;

        pointerCount--;

        send({topic: TOPICS.ADD_STROKE, message: currentStroke})



        normalizePoint(new PressurePoint(100, 200, 10))
    }

    function onPointerMove(event) {
        if (registerEvents && pointerCount == 1) {
            const { pressure } = event;
            const point = new PressurePoint(event.offsetX, event.offsetY, pressure);
            addPoint(point);
        
            currentStroke = currentStroke;
        }
    }

    function addPoint(point) {
		const paperPoint = new paper.Point(point.x, point.y);

		if (lastPoint !== undefined) {
			const pressure = point.pressure * $penSize;

			let delta = paperPoint.subtract(lastPoint);
			delta = delta.normalize().multiply(pressure);
			const step = delta.divide(2);
			step.angle += 90;

			const middlePoint = paperPoint.add(lastPoint).divide(2);
			lastPoint = paperPoint;

			const p1 = middlePoint.add(step);
			const p2 = middlePoint.subtract(step);

			if (p1.x == null || p1.y == null || p2.x == null || p2.y == null) {
				return;
			}

			if (currentStroke !== undefined) {
                currentStroke.addPoint(normalizePoint(new PressurePoint(p1.x, p1.y, pressure)), normalizePoint(new PressurePoint(p2.x, p2.y, pressure)));
			}
		} else {
			lastPoint = paperPoint;
		}
    }
    
    function normalizePoint(point) {
        return new PressurePoint(point.x / parent.clientWidth, point.y / parent.clientHeight, point.pressure)
    }

    function unnormalizePoint(point) {
        return new PressurePoint(point.x * parent.clientWidth, point.y * parent.clientHeight, point.pressure)
    }

    function unnormalizePoints(points) {
        let newPoints = [];
        points.forEach(point => {
            newPoints.push(unnormalizePoint(point))
        });
        return newPoints;
    }
</script>

<div class="stroke-wrapper" on:pointerdown={onPointerDown} on:pointerup={onPointerUp} on:pointermove={onPointerMove} bind:this={parent}>
    <SVG>
        {#each $strokes as stroke}
            <Path points={unnormalizePoints(stroke.points)} fill={stroke.color} stroke='transparent'/>
        {/each}
        {#if currentStroke !== undefined}
            <Path points={unnormalizePoints(currentStroke.points)} fill={currentStroke.color} stroke='transparent'/>
        {/if}
    </SVG>
</div>

<style>
    .stroke-wrapper {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        /* z-index: 20; */
    }
</style>