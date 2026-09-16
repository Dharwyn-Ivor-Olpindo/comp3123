let url ="https://isitdownstatus.com/api/v1/status/netflix"
fetch(url)
.then((response) => {
    return response.json()
})
.then((dataJSONDb) => {
    console.log(dataJSONDb)
    console.log(dataJSONDb.data.status)
})
.catch((error) => {console.log('Error:', error)})