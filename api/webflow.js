function postData(data) {
    var myHeaders = new Headers()
    myHeaders.append("Content-Type", "text/plain")
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: data,
        redirect: 'follow'
    }
    fetch("https://arcane-cliffs-82253.herokuapp.com/data", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}

let dataArray = []

const form = document.getElementById('email-form-2')
const companyName = document.getElementById('Company-Name-SF-2')
dataArray.push({ name: 'companyName', value: companyName })
const companyId = document.getElementById('Company-ID-number-2')
dataArray.push({ name: 'companyId', value: companyId })
const personName = document.getElementById('Person-Name')
dataArray.push({ name: 'personName', value: personName })
const personEmail = document.getElementById('Person-Email')
dataArray.push({ name: 'personEmail', value: personEmail })
const message = document.getElementById('Message')
dataArray.push({ name: 'message', value: message })
const personPhone = document.getElementById('name-2')
dataArray.push({ name: 'personPhone', value: personPhone })

function logSubmit() {
    console.log(companyName.value, companyId.value, personName.value, personEmail.value, personName.value, personPhone.value);

    let objectToSend = {}

    dataArray.forEach(ele => {
        let eleValue = ele.value.value ? ele.value.value : 'noValue'
        objectToSend[ele.name] = eleValue
    })
    postData(JSON.stringify(objectToSend))
}

form.addEventListener('submit', logSubmit);