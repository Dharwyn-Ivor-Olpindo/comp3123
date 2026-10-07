const express = require("express")
const fs = require("fs")
var dateFormat = require("dateformat")
var books = require("./Books.js")
var computers = require("./Computers.js")

const app = express()

let writeData = (data) => {
    data += "\n"
    fs.appendFile("sever_log.txt", data, function (error) {
        if (error) {
            throw error
        }
        console.log("Log Saved!")
    })
}

let logger = (request, response, next) => {
    const todays = dateFormat(new Date(), "dddd, mmmm dS, yyyy, h:MM:ss TT")
    let data = `[${todays}] ${request.originalUrl}]`
    writeData(data)
    next()
}

app.use(logger)

let booksLogger = (request, response, next) => {
    console.log("Books logger called")
    next()
}

app.use("/books", booksLogger, books)
app.use("/books/computers", computers)

const HOST = process.argv[2] || "localhost"
const PORT = process.argv[3] || 8081

app.listen(PORT, HOST, () => {
    console.log(`Web server is listening at port: ${PORT}`)
}) 