var express = require('express');
var router = express.Router();
const utilities = require('./utilities');


router.get("/jupiter", async function (req, res) {

    console.log('getting things going')

    var bodyStr = 'bodyStr';

    // req.on("data", function (chunk) {
    //     bodyStr += chunk.toString();
    //     console.log("our body string is - ", bodyStr)
    // });

    let accessToken = await utilities.getToken();
    let notResponse = await utilities.postLead(accessToken);

    //let dummyRes = await utilities.dummyApi();

    res.header("Access-Control-Allow-Origin", "*");

    res.json({
        message: "Hello from jupiter!!",
        data: notResponse
    });
});


module.exports = router;