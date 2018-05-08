const express = require("express");
const mongoose = require("mongoose");

const app = express();
//DB Config
const db = require("./config/keys").mongoURI;

//Connect to MongoDB
mongoose.connect(db).then(()=>{
    console.log("connected to DB");
}).catch(err => {
    console.log("error connecting to DB");
})

app.get("/", (req, res) => {res.send("hello");})
const port = process.env.PORT || 5000;
app.listen(port, ()=> console.log('Server running on port 5000'));   