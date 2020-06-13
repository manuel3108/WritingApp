const express = require('express')
const app = express()
const port = process.env.PORT || 3000
var enableWs = require("express-ws");
const ws_process = require("./ws_server")

enableWs(app)
var live = express.static('public');

app.ws('/echo', (ws, req) => {
    ws_process(ws)
})
app.use(live);
app.get('/*', function (req, res) {
    res.sendFile("index.html", {root: "public"});
})
// app.use(ws_server);

app.listen(port, () => console.log(`App listening at http://localhost:${port}`))

