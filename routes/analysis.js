var express = require('express');

var router = express.Router();

router.get("/analysis", (req, res) => {
  res.render("analysis.ejs");
});


module.exports = router;