const express = require("express");
const app = express();
const port = 9000;

app.get("/", (req, res) => {
    res.send("Ola");
});

app.listen(port, () => {
    console.log(`The server is running on ${port} port`)
});