<script context="module">
    export function goto(url) {
        history.pushState("", "", url)
    }
</script>