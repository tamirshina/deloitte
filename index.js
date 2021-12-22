const express = require("express");


const PORT = process.env.PORT || 3001;

const app = express();

const jupiterRouter = require('./api/jupiterCall');

app.use('/delloite', jupiterRouter);

app.get("/api", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.json({ message: "Hello from server!" });
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});