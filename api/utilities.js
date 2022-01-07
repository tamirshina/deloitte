var https = require('https');
var qs = require('querystring');
var axios = require('axios');
var fs = require('fs');
const path = require("path");
var bodyParser = require('body-parser')

const { apiVariables } = require('./data');
const { localVars } = require('../local');

function getToken() {

    return new Promise(function (resolve, reject) {

        let token = '';

        var data = qs.stringify({
            'grant_type': 'client_credentials',
            'client_id': process.env.client_id_token || localVars.client_id_token,
            'client_secret': process.env.client_secret_token || localVars.client_secret_token,
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
                process.stdout.write('got token');
                resolve(token);
            })
            .catch(function (error) {
                process.stdout.write('we have a problem ' + error);
                reject(error);
            });

    });
}

function postLead(accessToken) {

    process.stdout.write('posting lead');
    return new Promise(function (resolve, reject) {

        var leadData = JSON.stringify([
            {
                "company": "Shina Inc.",
                "leadStatus": "New",
                "phone": "01234-5678900",
                "email": "harris@company.co.uk",
                "title": "CEO",
                "country": "GB",
                "address": {
                    "addressLine1": "308 Negra Arroyo Lane",
                    "city": "Albuquerque",
                    "postalCode": "BT0 0AB",
                    "country": "US"
                },
                "salutation": "Mr.",
                "firstName": "Walter",
                "lastName": "black",
                "description": "This lead is from Jupiter",
                "website": "www.google.com",
                "industry": "Technology, Media and Telecom",
                "sector": "Technology",
                "currency": "GBP",
                "leadSource": "Partner",
                "rating": "Hot",
                "mobilePhone": "+91 893426992",
                "departmentSegmentation": "Strategy",
                "deloitteAlumnus": true,
                "jobTitle": [
                    "Analyst"
                ]
            }
        ]);

        var options = {
            hostname: apiVariables.createLeadVars.host,
            port: 443,
            path: apiVariables.createLeadVars.pathToLead,
            method: 'POST',
            body: leadData,
            key: process.env.ssl_key || fs.readFileSync(path.resolve(__dirname, apiVariables.createLeadVars.pathToLocalKey + '/key.pem')),
            cert: process.env.ssl_certificate || fs.readFileSync(path.resolve(__dirname, apiVariables.createLeadVars.pathToLocalKey + '/cert.pem')),
            headers: {
                'client_id': process.env.client_id_lead || localVars.client_id_lead,
                'client_secret': process.env.client_secret_lead || localVars.client_secret_lead,
                'Authorization': 'Bearer' + ' ' + accessToken,
                'Content-Type': 'application/json',
            }
        };

        const request = https.request(options, function (response) {
            console.log(response.statusCode)
            console.log(response.statusMessage)
            resolve(response.statusMessage)
            response.on('data', function (d) {
                console.log('server response for lead:' + d)
            });
        });
        request.write(leadData);

        request.on('error', error => {
            console.error('we got an error -' + error)
            process.stdout.write('got error on lead -' + error);
            reject(error);
        })
        request.end();
    })
}

function dummyApi() {

    return new Promise(function (resolve, reject) {

        var url = 'https://rickandmortyapi.com/api/character';

        axios.get(url)
            .then(function (response) {
                console.log('the response isss -' + response.data);
                resolve(response.data);
            })
            .catch(function (error) {
                console.log(error);
                reject(error);
            });
    });
}


module.exports.getToken = getToken;
module.exports.postLead = postLead;
module.exports.dummyApi = dummyApi;