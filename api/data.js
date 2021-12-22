const apiVariables = {

    getTokenVars: {

        client_id: '0ea34b53-f759-4559-93d3-25481847b392',
        client_secret: 'XA6w-E~mHpXduNL7_W_-f080V_aa7uYJ9x',
        resource: 'https://internal-crm-api-sandbox.deloitteresources.com/qa/v1/marketing',
        url: 'https://login.microsoftonline.com:443/36da45f1-dd2c-4d1f-af13-5abe46b99921/oauth2/token'
    },
    createLeadVars: {
        client_id: 'f9ba45d3480840c18ab01c3f46d151ec',
        client_secret: '4e6f2A5d30C2480fB14F130ff9a89793',
        pathToKey: '../keys/ssl-certificate/ssl-certificate',
        host: 'crm-api-sandbox.deloitteresources.com',
        pathToLead: '/qa/v1/marketing/leadBulk'
    }


}

module.exports.apiVariables = apiVariables;