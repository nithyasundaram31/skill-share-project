const express = require("express");

const errorRoute = require("./utils/errorRoute");
const userRoute = require("./routers/userRoute");
const categoryRoute = require("./routers/categoryRoute");
const termRoute = require("./routers/termRoute");
const resourceRoute = require("./routers/resourceRoute");
const commentRoute = require("./routers/commentRoute");

// const cors = require('cors');


const app = express();
//Middleware to parse JSON request bodies
app.use(express.json());

app.use('/api/auth',userRoute);
 app.use('/api/term',termRoute);
 app.use('/api/category',categoryRoute);
  app.use('/api/resource',resourceRoute);
   app.use('/api/comment',commentRoute);
  



//parsing incoming JSON request
// app.use(express.json({ limit: '50mb' }));
// app.use(express.urlencoded({ limit: '50mb', extended: true }));


// Middleware to handle 404 errors
app.use(errorRoute);

module.exports = app;