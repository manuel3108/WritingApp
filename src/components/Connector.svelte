<script context="module">
    let ws = null;
    
    export function connect(host) {
        return new Promise((resolve) => {
            ws = new WebSocket("ws://" + host);

            ws.onopen = () => {
                ws.onmessage = (e) => {
                    console.log("recieved message", e)
                }

                resolve();
            }
        })
    }

    export function send(data) {
        ws.send(JSON.stringify(data));
    }
    
    export function setMessageCallback(callback) {
        ws.onmessage = (e) => callback(JSON.parse(e.data))
    }
    
</script>