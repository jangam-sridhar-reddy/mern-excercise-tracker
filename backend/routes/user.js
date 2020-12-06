const express = require("express");
const router = express.Router();

let User = require("../models/user.model");

router.get("/", (req, res) => {
  User.find({})
    .then((response) => res.json(response))
    .catch((err) => res.status(400).json({ err: err }));
});

router.post("/add", (req, res) => {
  const username = req.body.username;

  const newUser = new User({ username });

  newUser
    .save()
    .then(() => res.json({ msg: "user added" }))
    .catch((err) => res.status(400).json({ msg: "error" }));
});

module.exports = router;
