const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const enableWs = require('express-ws')

var live = express.static('public');
enableWs(app)

app.ws('/echo', (ws, req) => {
    ws.on('message', msg => {
        console.log("recieved message", msg)
        ws.send(msg)
    })

    ws.on('close', () => {
        console.log('WebSocket was closed')
    })
})
app.use(live);
app.get('/*', function (req, res) {
    res.sendFile("index.html", {root: "public"});
})

app.listen(port, () => console.log(`App listening at http://localhost:${port}`))

