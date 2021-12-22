var express = require('express');
var router = express.Router();
const utilities = require('./utilities');


router.get("/jupiter", async function (req, res) {

    // let accessToken = await utilities.getToken();
    // utilities.postLead(accessToken);

    let dummyRes = await utilities.dummyApi();

    console.log(dummyRes);

    res.header("Access-Control-Allow-Origin", "*");

    res.json({
        message: "Hello from jupiter!",
        data: dummyRes.info.count
    });
});


module.exports = router;