const express = require("express");
const app = express();

app.use(express.static('.'))

app.get("/", (req, res) => res.sendFile("./index.html", { root: __dirname }));

app.listen(80, () =>
    console.log(`Hexgeneration running. visit http://localhost:80`)
);
