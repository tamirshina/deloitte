var https = require('https');
var qs = require('querystring');
var axios = require('axios');
var fs = require('fs');
const path = require("path");
const { apiVariables } = require('./data');

async function getRequestData(req) {

    return new Promise(function (resolve, reject) {
        let bodyStr = '';

        req.on("data", function (chunk) {
            bodyStr += chunk.toString();
        });
        req.on('end', () => {
            console.log("our full string is - ", bodyStr);
            resolve(bodyStr)
        });
        req.on('error', function (e) {
            console.log('our error is ' + e);
            reject(e)
        });
    })
}

function getToken() {

    return new Promise(function (resolve, reject) {

        let token = '';

        var data = qs.stringify({
            'grant_type': 'client_credentials',
            'client_id': process.env.client_id_token,
            'client_secret': process.env.client_secret_token,
            'resource': apiVariables.getTokenVars.resource
        });
        var config = {
            method: 'post',
            url: apiVariables.getTokenVars.url,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data
        };
        axios(config)
            .then(function (response) {
                token = response.data.access_token;
                console.log('got token');
                resolve(token);
            })
            .catch(function (error) {
                console.log('we have a problem ' + error);
                reject(error);
            });
    });
}

function postLead(accessToken, companyName, firstName, lastName, personEmail, message, phone, subjectInterest) {

    process.stdout.write('posting lead');
    return new Promise(function (resolve, reject) {

        var leadData = JSON.stringify([
            {
                "company": companyName || "",
                "leadStatus": "New",
                "phone": "",
                "email": personEmail,
                "title": "",
                "country": "IL",
                "salutation": "",
                "firstName": firstName,
                "lastName": lastName,
                "description": message || "",
                "website": "",
                "industry": "",
                "sector": "",
                "currency": "ILS",
                "leadSource": "Web",
                "rating": "Hot",
                "mobilePhone": phone || "",
                "subjectOfInterest": subjectInterest || "",
                "deloitteAlumnus": true,
                "jobTitle": [
                    "Chief Marketing Officer"
                ]
            }
        ]);

        var options = {
            hostname: apiVariables.createLeadVars.host,
            port: 443,
            path: apiVariables.createLeadVars.pathToLead,
            method: 'POST',
            key: process.env.ssl_key || fs.readFileSync(path.resolve(__dirname, apiVariables.createLeadVars.pathToLocalKey + '/key.pem')),
            cert: process.env.ssl_certificate || fs.readFileSync(path.resolve(__dirname, apiVariables.createLeadVars.pathToLocalKey + '/cert.pem')),
            headers: {
                'client_id': process.env.client_id_lead,
                'client_secret': process.env.client_secret_lead,
                'Authorization': 'Bearer' + ' ' + accessToken,
                'Content-Type': 'application/json',
            }
        };

        const request = https.request(options, function (response) {

            var chunks = [];
            console.log(response.statusCode);
            console.log(response.statusMessage);

            response.on('data', function (chunk) {
                chunks.push(chunk);
            });
            response.on('end', () => {
                var leadResponse = Buffer.concat(chunks).toString();
                console.log('server response with lead data ', leadResponse);
                resolve(JSON.parse(leadResponse)[0])
            });
        });
        request.write(leadData);
        request.end();
    })
}

function dummyApi() {

    return new Promise(function (resolve, reject) {

        let data = '';

        var url = 'https://rickandmortyapi.com/api/character';

        const request = https.request(url, function (response) {
            console.log(response.statusCode)
            console.log(response.statusMessage)
            response.on('data', function (chunk) {
                //console.log('server response for lead:' + chunk)
                data += chunk;
            });
            response.on('end', () => {
                let parsedData = JSON.parse(data)
                console.log(parsedData);
                resolve(parsedData.info)
            });
        });
        request.on('error', error => {
            console.error('we got an error -' + error)
            process.stdout.write('got error on lead -' + error);
            reject(error);
        })
        request.end();
    });
}


module.exports.getToken = getToken;
module.exports.postLead = postLead;
module.exports.dummyApi = dummyApi;
module.exports.getRequestData = getRequestData;