const express = require("express");

const errorRoute = require("./utils/errorRoute");
const cors = require('cors');
const userRoute = require("./routers/userRoute");
const categoryRoute = require("./routers/categoryRoute");
const termRoute = require("./routers/termRoute");
const resourceRoute = require("./routers/resourceRoute");
const commentRoute = require("./routers/commentRoute");


const app = express();

app.use(cors({
    origin: 'https://resilient-brioche-1cb6d6.netlify.app', // Replace with your frontend URL
    credentials: true, // Allow credentials to be sent


  //   origin: 'http://localhost:5173', // your Netlify frontend URL
  // credentials: true, 

}));

//Middleware to parse JSON request bodies
app.use(express.json());

app.use('/api/auth',userRoute);
 app.use('/api/term',termRoute);
 app.use('/api/category',categoryRoute);
  app.use('/api/resource',resourceRoute);
   app.use('/api/comment',commentRoute);
  

app.get("/", (req, res) => {
    res.send("server is running..")
})



// Middleware to handle 404 errors
app.use(errorRoute);

module.exports = app;