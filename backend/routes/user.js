const express = require("express");
const router = express.Router();
const axios = require("axios");
const bcrypt = require("bcrypt");

router.use(express.json());

const fs = require("fs");

// GET users
router.get("/", (req, res) => {
  fs.readFile("./db/user.json", "utf8", (err, data) => {
    res.send(data);
  });
});



// ADD new user SignUp
router.post("/signup", (req, res) => {
  fs.readFile("./db/user.json", "utf8", (err, data) => {
    let arr = JSON.parse(data);

    const user = arr.find((user) => user.email == req.body.email);
    if (user) {
      return res.status(400).send("Email already exist");
    }
     else {
      const newUser = { email: req.body.email, password: req.body.password };
      arr.push(newUser);
      fs.writeFile("./db/user.json", JSON.stringify(arr), (err) => {
        res.send("added");
      });
    }
  });
});

// Login
router.post("/login", (req, res) => {
  fs.readFile("./db/user.json", "utf8", (err, data) => {
    let arr = JSON.parse(data);

    const user = arr.find((user) => user.email == req.body.email);

    // console.log(user?.email);
    // console.log(user?.password);

    if (user == null) {
      return res.status(400).send("Cannot find user");
    }
    if (user.password !== req.body.password) {
      return res.status(400).send("Password is NOT correct");
    }
    return res.send("Success");
  });
});

module.exports = router;