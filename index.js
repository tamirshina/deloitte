const express = require("express");
const jupiterRouter = require('./api/jupiterCall');
const utilities = require('./api/utilities');


const PORT = process.env.PORT || 3001;

const app = express();

app.use('/deloitte', jupiterRouter);

app.post("/data", async (req, res) => {

    try {
        let data = await utilities.getRequestData(req)

        let responseFromServer = await postDataToJupiter(data)

        res.header("Access-Control-Allow-Origin", "*");

        res.json({
            message: responseFromServer
        })

    } catch (error) {
        res.header("Access-Control-Allow-Origin", "*");

        res.json({
            message: "error " + error
        })
    }


});

async function postDataToJupiter(data) {

    console.log('starting posting data to jupiter', data);

    let parsedData = JSON.parse(data);

    let accessToken = await utilities.getToken()

    return utilities.postLead(accessToken, parsedData.companyName, parsedData.companyId, parsedData.personName, parsedData.personEmail, parsedData.message, parsedData.personPhone)

}

app.get("/api", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.json({ message: "Hello from server!" });
});



app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});