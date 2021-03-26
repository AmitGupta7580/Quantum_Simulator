var express = require('express');

var router = express.Router();

router.get("/example", (req, res) => {
  res.render("example.ejs");
});


module.exports = router;