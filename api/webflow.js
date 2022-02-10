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
function getName() {

    let fullName = {}
    const name = document.getElementById('Person-Name').value

    if (name.indexOf(' ') === -1) {
        fullName.first = name
        fullName.last = name
    } else {
        let spaceIndex = name.indexOf(' ')
        let first = name.substring(0, spaceIndex)
        let last = name.substring(spaceIndex)

        fullName.first = first
        fullName.last = last
    }
    return fullName
}

function getSubjects() {

    let subjects = []
    let nodeList = document.querySelectorAll('input[type="checkbox"]:checked')
    nodeList.forEach(el => subjects.push(el.name.substring(0, el.name.indexOf('-checkbox'))))
    return subjects
}

const dataToGetFormPage = [{ tag: 'Company-Name-SF-2', name: 'companyName' }, { tag: 'Person-Email', name: 'personEmail' }, { tag: 'Message', name: 'message' }, { tag: 'name-2', name: 'personPhone' }]

let dataArray = []

const form = document.getElementById('wf-form-Contact-Form-2')

dataToGetFormPage.forEach(item => dataArray.push({ name: item.name, value: document.getElementById(item.tag) }))

function logAndSubmit() {

    let objectToSend = {}

    dataArray.forEach(ele => {
        let eleValue = ele.value.value ? ele.value.value : 'noValue'
        objectToSend[ele.name] = eleValue
    })

    objectToSend['subjectInterest'] = getSubjects()
    objectToSend['firstName'] = getName().first
    objectToSend['lastName'] = getName().last
    objectToSend['address'] = { country: "Israel" }

    console.log(objectToSend)
    console.log(JSON.stringify(objectToSend))
    //postData(JSON.stringify(objectToSend))
}

form.addEventListener('submit', logAndSubmit);