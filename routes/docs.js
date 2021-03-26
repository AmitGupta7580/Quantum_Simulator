var express = require('express');

var router = express.Router();

router.get("/docs", (req, res) => {
  res.render("docs.ejs");
});


module.exports = router;