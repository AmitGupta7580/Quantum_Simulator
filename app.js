const express = require('express')
const path = require('path')
var bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const csrf = require("csurf");

const csrfMiddleware = csrf({ cookie: true });

const PORT = 3000

//Requiring Routes.
const circuitRouter = require('./routes/circuit')
const cloudRouter = require('./routes/cloud')
const functionRouter = require('./routes/function')
const analysisRouter = require('./routes/analysis')
const exampleRouter = require('./routes/example')
const docRouter = require('./routes/docs')
const hiwRouter = require('./routes/hiw')
const infoRouter = require('./routes/info')

// Initializing app
const app = express();

// Setting up our view engine and static files
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/public', express.static('public'));

// Parses the body for POST, PUT, DELETE, etc.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

// cookie parser and csrf middleware
app.use(cookieParser());
app.use(csrfMiddleware);

// intercept all requests and verify csrf token
app.all("*", (req, res, next) => {
  res.cookie("XSRF-TOKEN", req.csrfToken());
  next();
});

// Telling express to use Routes
app.use('/',circuitRouter);
app.use('/',cloudRouter);
app.use('/',functionRouter);
app.use('/',analysisRouter);
app.use('/',exampleRouter);
app.use('/',docRouter);
app.use('/',hiwRouter);
app.use('/',infoRouter);

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`)
})