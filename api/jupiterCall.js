var express = require('express');
var router = express.Router();
const utilities = require('./utilities');


router.get("/jupiter", async function (req, res) {

    console.log('getting things going')

    // let accessToken = await utilities.getToken()
    //     .then(console.log('token promise done '))
    //     .catch(error => console.log('promise token error', error))
    // let response = await utilities.postLead(accessToken)
    //     .then(res => console.log('postLead promise res', res))
    //     .catch(error => console.log('postLead promise error', error))

    let dummyRes = await utilities.dummyApi();

    res.header("Access-Control-Allow-Origin", "*");

    res.json({
        message: "Hello from jupiter!!",
        data: dummyRes
    });
});


module.exports = router;