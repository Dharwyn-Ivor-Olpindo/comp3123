const express = require("express");
const router = express.Router();

router.route("/java")
    .get((request, response) => {
        response.send("Used GET method - /books/computers/java");
    });

router.route("/python")
    .get((request, response) => {
        response.send("Used GET method - /books/computers/python");
    });

router.route("/game-dev")
    .get((request, response) => {
        response.send("Used GET method - /books/computers/game-dev");
    })

module.exports = router