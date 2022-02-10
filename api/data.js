const apiVariables = {

    getTokenVars: {
        resource: 'https://internal-crm-api.deloitteresources.com/v1/marketing',
        url: 'https://login.microsoftonline.com:443/36da45f1-dd2c-4d1f-af13-5abe46b99921/oauth2/token'
    },
    createLeadVars: {
        host: 'crm-api.deloitteresources.com',
        pathToKey: '../../keys/Prod SSL',
        pathToLocalKey: '../../keys/Prod SSL',
        pathToLead: '/v1/marketing/leadBulk'
    }


}

module.exports.apiVariables = apiVariables;