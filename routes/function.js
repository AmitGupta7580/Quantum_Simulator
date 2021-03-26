var express = require('express');

var router = express.Router();

router.get("/function", (req, res) => {
  res.render("function.ejs");
});


module.exports = router;