/* Purpose: Act as an API developer and create a new Promise to either Resolve or reject */ 
async function fetch_games(){
    let promise_games =new Promise ((resolve, reject) => {
        let isRegistered = true
    setTimeout(() => {
        if (isRegistered) {
            const gamesJSON = {
                monday: "leafs",
                tuesday: "raptors"
            }
            let gamesJSONStr= JSON.stringify(gamesJSON)
            resolve(gamesJSONStr)
            } else {
                reject("You must be a registered member first!")
            }
        }, 2000)
    })
    let result_from_promise = await promise_games
    console.log(result_from_promise)
    const gamesJSONparsed = JSON.parse(result_from_promise)
    console.log(gamesJSONparsed)
    console.log(gamesJSONparsed.monday)
}
fetch_games()
let someStrToPrint = "bob"
console.log(someStrToPrint)
