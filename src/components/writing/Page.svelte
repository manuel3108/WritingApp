<script>
    class Stroke {
        constructor(color) {
            this.color = color;
            this.points = [];
        }

        addPoint(p1, p2) {
            this.points.push(p1);
            this.points.splice(0, 0, p2);
        }

        getPoints() {
            return this.points;
        }
    }

    class Point {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
    }


    class PressurePoint extends Point {
        constructor(x, y, pressure) {
            super(x, y);
            this.pressure = pressure;
        }
    }


    import { SVG, Rect, Path } from 'svelte-svg'
    import paper from 'paper'

    let strokes = [];

    let currentStroke;
    let registerEvents = false;
    let lastPoint;
    let pointerCount = 0;

    function onPointerDown() {
        registerEvents = true;

        currentStroke = new Stroke("#fff");

        pointerCount++;
    }

    function onPointerUp() {
        registerEvents = false;
        lastPoint = undefined;

        strokes.push(currentStroke);
        strokes = strokes;

        pointerCount--;
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
			const pressure = point.pressure * 10;

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
				currentStroke.addPoint(new PressurePoint(p1.x, p1.y, pressure), new PressurePoint(p2.x, p2.y, pressure));
			}
		} else {
			lastPoint = paperPoint;
		}
	}
</script>


<div class='writing-svg-wrapper' on:pointerdown={onPointerDown} on:pointerup={onPointerUp} on:pointermove={onPointerMove}>
    <SVG>
        {#each strokes as stroke}
            <Path points={stroke.points} fill={stroke.color} stroke='transparent'/>
        {/each}
        {#if currentStroke !== undefined}
            <Path points={currentStroke.points} fill={currentStroke.color} stroke='transparent'/>
        {/if}
    </SVG>
</div>

<style>
    .writing-svg-wrapper {
        width: 100%;
        height: 100%;
    }
</style>