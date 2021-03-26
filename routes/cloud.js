var express = require('express');

var router = express.Router();

router.get("/cloud", (req, res) => {
  res.render("cloud.ejs");
});


module.exports = router;