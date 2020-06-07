const express = require('express')
const app = express()
const port = process.env.PORT || 3000

var live = express.static('public');

app.use(live);
app.get('/*', function (req, res) {
    res.sendFile("index.html", {root: "public"});
})

app.listen(port, () => console.log(`App listening at http://localhost:${port}`))