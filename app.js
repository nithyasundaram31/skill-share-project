const express = require("express");

const errorRoute = require("./utils/errorRoute");

// const cors = require('cors');


const app = express();



  

// Middleware to parse JSON request bodies
// app.use(express.json());

//parsing incoming JSON request
// app.use(express.json({ limit: '50mb' }));
// app.use(express.urlencoded({ limit: '50mb', extended: true }));


// Middleware to handle 404 errors
app.use(errorRoute);

module.exports = app;