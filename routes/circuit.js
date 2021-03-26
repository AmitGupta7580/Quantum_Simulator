var express = require('express');

var router = express.Router();

router.get("/", (req, res) => {
  res.render("circuit.ejs");
});

router.get("/circuit", (req, res) => {
  res.render("circuit.ejs");
});


module.exports = router;