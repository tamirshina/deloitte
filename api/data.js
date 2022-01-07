const apiVariables = {

    getTokenVars: {
        resource: 'https://internal-crm-api-sandbox.deloitteresources.com/qa/v1/marketing',
        url: 'https://login.microsoftonline.com:443/36da45f1-dd2c-4d1f-af13-5abe46b99921/oauth2/token'
    },
    createLeadVars: {
        host: 'crm-api-sandbox.deloitteresources.com',
        pathToKey: '../../keys/ssl-certificate/ssl-certificate',
        pathToLocalKey: '../../keys/ssl-certificate/ssl-certificate',
        pathToLead: '/qa/v1/marketing/leadBulk'
    }


}

module.exports.apiVariables = apiVariables;