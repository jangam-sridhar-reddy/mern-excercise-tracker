const express = require("express");
const router = express.Router();

let Excercise = require("../models/excercise.model");

router.get("/", (req, res) => {
  Excercise.find()
    .then((response) => res.json(response))
    .catch((err) => res.status(400).json({ msg: err }));
});

router.post("/add", (req, res) => {
  const body = req.body;
  const username = body.username;
  const description = body.description;
  const duration = body.duration;
  const date = body.date;

  const newExcercise = new Excercise({
    username,
    description,
    duration,
    date,
  });

  newExcercise
    .save()
    .then(() => res.json({ msg: "excercise added" }))
    .catch((err) => res.status(400).json({ msg: err }));
});

router.get("/:id", (req, res) => {
  Excercise.findById(req.params.id)
    .then((excercise) => res.json(excercise))
    .catch((err) => res.status(400).json({ error: err }));
});

router.delete("/:id", (req, res) => {
  Excercise.findByIdAndDelete(req.params.id)
    .then(() => res.json({ msg: `excercise deleted ${req.params.id}` }))
    .catch((err) => res.status(400).json({ err: err }));
});

router.put("/update/:id", (req, res) => {
  Excercise.findById(req.params.id)
    .then((excercise) => {
      const body = req.body;
      excercise.username = body.username;
      excercise.description = body.description;
      excercise.duration = Number(body.duration);
      excercise.date = Date.parse(body.date);

      excercise
        .save()
        .then(() => res.json("Exercise updated!"))
        .catch((err) => res.status(400).json({ error: err }));
    })
    .catch((err) => res.status(400).json({ msg: err }));
});

module.exports = router;
