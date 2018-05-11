const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require('morgan');
const passport = require("passport");

const users = require("./routes/api/users");
const tasks = require("./routes/api/tasks");
const lists = require("./routes/api/lists");
const profile = require("./routes/api/profile");

const app = express();

app.use(morgan('combined'));

// DB Config
const db = require("./config/keys").mongoURI;

// Body parser middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(db).then(()=>{
    console.log("connected to DB");
}).catch(err => {
    console.log(err);
})

// Passport middleware 
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

app.get("/", (req, res) => res.send("hello"))

app.use("/api/users", users);
app.use("/api/tasks", tasks);
app.use("/api/lists", lists);
app.use("/api/tasks", tasks);
app.use("/api/profile", profile);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log('Server running on port'));   