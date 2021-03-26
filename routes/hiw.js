var express = require('express');

var router = express.Router();

router.get("/howitworks", (req, res) => {
  res.render("hiw.ejs");
});


module.exports = router;