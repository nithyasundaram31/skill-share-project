const app = require('./app');
const mongoose = require("mongoose");
const { MONGODB_URI } = require("./utils/config");

mongoose.connect(MONGODB_URI)
.then(()=>{
    console.log("connected to the mongodb")
})
.catch((err)=>{
    console.log(`error connecting to the mongodb:${err.message}`)
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running @ http://127.0.0.1:${PORT}`);
});




