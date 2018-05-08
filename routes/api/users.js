const express = require("express");
const router = express.Router();

//Load User Model
const User = require("../../models/User");


//@route GET api/users/test
//@desc Tests users route
//@acces public
router.get("/test" , (req,res) => res.json({msg:"User works"}));

//@route POST api/users/register
//@desc Tests users route
//@acces public
router.post("/register" , (req,res) => {
    User.findOne({email : req.body.email})
    .then(user => {
        if(user){
            return res.status(400).json({email:"Email already exists"})      
        }
        else{
            const newUser = new User({
                name: req.body.name,
                suername: req.body.suername,
                username: req.body.username,
                password: req.body.password,
                avatar: req.body.avatar,
                date: req.body.date
            })
        }
    })
});

module.exports = router;