/*
Purpose: Create multiple server paths to access 

/
/user 
/userlist 
/name


*/
let http = require("http") //Hypertext Transfer Protocol
let fs = require("fs")
let users = require("./data.js")

const PORT = 8088

//Create the server and the multiple paths below. 
var server = http.createServer((request, response) => {
    if(request.url == "/"){
        response.write("<h1>NodeJS Web Server at the Root</h1>")
        response.write("<p>Welcome to the root path at the server</p>")
        response.end()
    }
    if(request.url == "/users"){
        //How do we convert from JSON obj to JSON string
        let data = JSON.stringify(users.users.id) //Must use the file as a namepsace object
        //and then go depper into it by using the dot operator and access the object 
        //from the namespace object
        response.write(data)
        response.end()
    }
    if(request.url == "/name"){
        response.writeHead(200, {"Content-Type":"text/html"})
        response.write("<article>Dharwyn Ivor Olpindo</article>")
        response.end()
    }
    if(request.url == "/userlist"){
        fs.readFile(__dirname + "/employees.json", "utf-8", (error, data) => {
            response.write(data)
            response.end()
        })
    }
})

server.listen(PORT)
console.log("Server started at port number: ${PORT}")