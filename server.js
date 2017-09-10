const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

const ActivityApi = require('./models/apiModels'); //created model loading here

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/ActivityApi');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const routes = require('./routes/apiRoutes'); //importing route
routes(app); //register the route
//
// app.listen(port);
//
//
// console.log('Activity RESTful API server started on: ' + port);


app.listen(port, function () {
    console.log(`RESTful API server running on http://localhost:${port}/.`)
});
