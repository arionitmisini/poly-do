const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const keys = require("../../config/keys")
const jwt = require("jsonwebtoken")
const passport = require("passport");

//Load User Model
const User = require("../../models/User");


//@route GET api/users/test
//@desc Tests users route
//@acces public
router.get("/test" , (req,res) => res.json({msg:"User works"}));

//@route POST api/users/register
//@desc Tests users route
//@acces public
router.post("/register", (req, res) => {
    User.findOne({email: req.body.email})
        .then(user => {
            if(user){
                return res.status(400).json({email:"Email already exists"})      
            } else{ 
                const avatar = gravatar.url(req.body.email, {
                    s: "200", // Size
                    r:"pg", // Ratings
                    d:"mmm" // Default
                });

                console.log(req.body);
                const newUser = new User({
                    name: req.body.name,
                    surname: req.body.surname,
                    username: req.body.username,
                    email: req.body.email,
                    avatar: avatar,
                    password: req.body.password,
                    date: req.body.date
                })

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash)=>{
                        if (err) console.log(err);
                        newUser.password = hash;
                        newUser.save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                    })
                })
            }
        }).catch(err => {
            console.log(err);
        });
});

// @GET api/user/login
// @desc Log User / Returning JWT Token
// @acces Public 
router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    //Find user by email
    User.findOne({email})
    .then(user =>{
        if (!user){
            return res.status(404).json({email:"User not found"});
        }
       
        // Check password
        bcrypt.compare(password, user.password)
        .then(isMatch =>{
            if(isMatch){
                // User matched
                const payload = {id:user.id, name: user.name, username: user.username, avatar:user.avatar} // Create JWT PayLoad
                //Sign token
                jwt.sign(payload, keys.secretOrKey, {expiresIn: 3600},(err, token) => {
                    res.json({
                        succes:true,
                        token: "Bearer" + token
                    })
                })
            }else{
                return res.status(400).json({password: "Password is incorrect"});
            }
        })
        .catch(err=> {
            console.log(err);
        })
    });
});

// @GET api/user/current
// @desc Return current user 
// @acces Private 
router.get("/current", passport.authenticate("jwt",{session: false }), (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
}); 

module.exports = router;