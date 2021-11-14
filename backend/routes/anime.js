const express = require("express")
const router = express.Router()
const axios = require("axios");

router.use(express.json());

const fs = require("fs")

router.get("/upcoming", (req,res) => {
    fs.readFile('./db/upcoming.json', 'utf8' , (err,data) => {
        res.send(data);
    })
    console.log("GET from anime route")
})

router.get("/top", (req,res) => {
    axios.get('https://api.jikan.moe/v3/top/anime').then((response) => {
        res.send(response.data)
    })
    console.log("GET from anime route")
})


module.exports = router;