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

    let accessToken = await utilities.getToken()
        .then(console.log('token promise done '))
        .catch(console.log('promise token error'))
    let notResponse = await utilities.postLead(accessToken)
        .then(res => console.log('postLead promise res', res))
        .catch(error => console.log('postLead promise error', error))

    //let dummyRes = await utilities.dummyApi();

    res.header("Access-Control-Allow-Origin", "*");

    res.json({
        message: "Hello from jupiter!!",
        data: notResponse
    });
});


module.exports = router;