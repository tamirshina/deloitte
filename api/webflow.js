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

const dataToGetFormPage = [{ tag: 'Company-Name-SF-2', name: 'companyName' }, { tag: 'Company-ID-number-2', name: 'companyId' }, { tag: 'Person-Name', name: 'personName' }, { tag: 'Person-Email', name: 'personEmail' }, { tag: 'Message', name: 'message' }, { tag: 'name-2', name: 'personPhone' }]

let dataArray = []

const form = document.getElementById('email-form-2')

dataToGetFormPage.forEach(item => dataArray.push({ name: item.name, value: document.getElementById(item.tag) }))

function logAndSubmit() {

    console.log(dataArray)

    let objectToSend = {}

    dataArray.forEach(ele => {
        let eleValue = ele.value.value ? ele.value.value : 'noValue'
        objectToSend[ele.name] = eleValue
    })

    console.log(objectToSend)
    console.log(JSON.stringify(objectToSend))
    //postData(JSON.stringify(objectToSend))
}

form.addEventListener('submit', logAndSubmit);

//credentials -

//user - mfroind@delloite.co.il
//password - Mm046291959!

//url - https://webflow.com/design/awesome2020

// {"companyName":"another check","companyId":"12345","personName":"checker","personEmail":"tamirshina@walla.com","message":"text text ","personPhone":"0528211277"}