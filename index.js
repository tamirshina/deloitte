const express = require("express");
const jupiterRouter = require('./api/jupiterCall');
const utilities = require('./api/utilities')


const PORT = process.env.PORT || 3001;

const app = express();

app.use('/delloite', jupiterRouter);

app.post("/data", (req, res) => {

    var bodyStr = '';

    req.on("data", function (chunk) {
        bodyStr += chunk.toString();
        console.log("our body string is - ", bodyStr)
        postDataToJupiter(bodyStr)
    });
    res.header("Access-Control-Allow-Origin", "*");
    req.on("end", function () {
        res.send(bodyStr);
    });

});

function postDataToJupiter(data) {

    console.log('starting posting data to jupiter')

    let parsedData = JSON.parse(data)

    let accessToken = await utilities.getToken()
        .then(console.log('token promise done '))
        .catch(error => console.log('promise token error', error))

    let response = await utilities.postLead(accessToken, parsedData.companyName, parsedData.companyId, parsedData.personName, parsedData.personEmail, parsedData.message, parsedData.personPhone)
        .then(res => console.log('postLead promise res', res))
        .catch(error => console.log('postLead promise error', error))

    res.header("Access-Control-Allow-Origin", "*");

    res.json({
        message: "Hello from postDataToJupiter!!",
        data: response
    });

}

//let dummyRes = await utilities.dummyApi();

app.get("/api", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.json({ message: "Hello from server!" });
});



app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});