const express = require("express");
const jupiterRouter = require('./api/jupiterCall');
const dataRouter = require('./api/receiveData');

const PORT = process.env.PORT || 3001;

const app = express();

app.use('/delloite', jupiterRouter);

app.post("/data", (req, res) => {

    var bodyStr = '';

    req.on("data", function (chunk) {
        bodyStr += chunk.toString();
        console.log("our body string is - ", bodyStr)
    });
    res.header("Access-Control-Allow-Origin", "*");
    req.on("end", function () {
        res.send(bodyStr);
    });

});

//let dummyRes = await utilities.dummyApi();

app.get("/api", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.json({ message: "Hello from server!" });
});



app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});