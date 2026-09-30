/*
Purpose: 
- Serve multiple paths from an Express server using routes 
- Serve a static html file 
- Extract GET params (compare with GET query)
*/

const express = require("express")
const app = express()

const SERVER_PORT = process.env.PORT || 3000

// --------------------------------------------Set up middleware for Express------------------------------------------------------
//Serve static files 
app.use("/static", express.static("public"))
//Serve JSON 
app.use(express.json())
//Read URL params or queries 
app.use(express.urlencoded({extended: true}))
//---------------------------------------------------------------------------------------------------------------------------
app.get("/", (request, response) => {
    response.send("<h1> Welcome to the root of the server - using GET method </h1>")
})

app.get("/hello", (reqquest, response) => {
    response.status(200).send("<h1>Wlecome to the /hello path on the server</h1>")
})

app.get("/college", (request, response) => {
    const college = {
        name: "George Brown Polytechnic",
        location: "Toronto", 
        estabilished: "1967"
    }
    response.json(college)
})

app.get("/students", (request, response) => {
    if(!request.query.name || !request.query.age){
        return response.status(400).json({
            error: "Missing query parameters"
        })
    }
    console.log(request.query)
    const name = request.query.name
    const age = request.query.age 
    response.json ({
        student_name: name, 
        student_age: age
    })    
})

app.get("/students/:name/:age", (request, response) => {
    console.log(request.params)

    if(!request.params.name || !request.params.age){
        return response.status(400).json({error: "You must pass in name and age"})
    }
    const name = request.params.name 
    const age = request.params.age 
    response.json({
        student_name:name,
        student_age:age
    })
})

// ---Try using POST, PUT, DELETE methods------
app.post("/students", (request, response) => {
    const student = request.body
    console.log(student)

    const {name, age } = student 

    if(!student.name || !student.age){
        return response.status(400).json({error:"Missing either name or age in body"})
    }

    response.json({
        student_name:name, 
        student_age:age
    })
})
//--------------------------------
app.listen(SERVER_PORT, () => {
    console.log("Server is running on http://localhost: " + SERVER_PORT)
})