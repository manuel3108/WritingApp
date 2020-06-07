<script context="module">
    var watch = false;

    var lastPointerOne = {
        x: 0,
        y: 0
    }
    var lastPointerTwo = {
        x: 0,
        y: 0
    }
    var startPointerOne = {
        x: 0,
        y: 0
    }
    var startPointerTwo = {
        x: 0,
        y: 0
    }
    let scale = 1;
    let lastScale = 0;
    let scaleFactor = 1;

    export function zoomMove(elem) {
        elem.ontouchstart = (e) => startHandler(e, elem);
        elem.ontouchmove = (e) => {
            if(watch) {
                moveHandler(e, elem);
                scaleHandler(e, elem)
            }
        }
        elem.ontouchcancel = endHandler;
        elem.ontouchend = endHandler;
    }

    function startHandler(e, elem) {
        // console.log("start", )
        if(e.targetTouches.length == 2) {
            watch = true;
            lastPointerOne = e.targetTouches[0];
            lastPointerTwo = e.targetTouches[1];

            startPointerOne = e.targetTouches[0];
            startPointerTwo = e.targetTouches[1];
        } else {
            watch = false;
        }
    }

    function moveHandler(e, elem) {
        let lastCenter = getCenterPoint(lastPointerOne, lastPointerTwo);
        let center = getCenterPoint(e.targetTouches[0], e.targetTouches[1]);

        let diff = {};
        diff.x = -(lastCenter.x - center.x);
        diff.y = -(lastCenter.y - center.y);

        lastPointerOne = e.targetTouches[0];
        lastPointerTwo = e.targetTouches[1];

        elem.style.left = parseFloat(elem.style.left) + diff.x + "px";
        elem.style.top = (parseFloat(elem.style.top) || 0) + diff.y + "px";
    }

    function scaleHandler(e, elem) {
        let currentScale = calcScale(e) * scale;
        lastScale = currentScale;

        elem.style.webkitTransform = elem.style.transform = "scale(" + currentScale + ")"
    }

    function endHandler(e) {
        if(watch) {
            watch = false;

            scale = lastScale;
        }
    }

    function getCenterPoint(e1, e2) {
        var center = {};

        center.x = e1.clientX + Math.abs(e1.clientX - e2.clientX) / 2
        center.y = e1.clientY + Math.abs(e1.clientY - e2.clientY) / 2

        return center;
    }

    function hypot(x, y) {
        return Math.sqrt(x * x + y * y)
    }

    function calcScale(e) {
        let diff = {};
        diff.x = startPointerOne.clientX - startPointerTwo.clientX;
        diff.y = startPointerOne.clientY - startPointerTwo.clientY;
        let firstDistance = hypot(diff.x, diff.y);

        diff = {};
        diff.x = e.targetTouches[0].clientX - e.targetTouches[1].clientX;
        diff.y = e.targetTouches[0].clientY - e.targetTouches[1].clientY;
        let distance = hypot(diff.x, diff.y);

        return (distance / firstDistance) / scaleFactor;
    }
</script>