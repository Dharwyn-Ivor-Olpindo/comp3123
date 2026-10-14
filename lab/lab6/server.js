const express = require('express')
const mongoose = require('mongoose')
const notesRoutes = require('./routes/notesRoutes.js')


const PORT = process.env.PORT || 8081
const DB_URL = "mongodb+srv://olpindoivor_db_user:m8WkuV3mzlWggqSS@week06cluster.msbvn58.mongodb.net/"

const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (request, response) => {
    response.send("<h1>Welcome to the root path of the server</h1>")})

app.use("/notes", notesRoutes)

mongoose.connect(DB_URL)
    .then(() => {
        console.log("Connected to the MongoDB Atlass server")
        app.listen(PORT, () => {
            console.log(`Server is listening at port ${PORT}`)
        })
    })
    .catch((error) => {
        console.log(error)
        console.error("Could not connect to the MongoDB server")
        process.exit(1)
    })