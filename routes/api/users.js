const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const keys = require("../../config/keys")
const jwt = require("jsonwebtoken")
const passport = require("passport");
const ObjectId = require("mongoose").Types.ObjectId;

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

//Load User Model
const User = require("../../models/User");

// CREATE
router.post('/', (req, res) => {
    console.log('USERI', req.user);

    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email })
        .then(user => {

            if (user) {
                return res.status(400).json({ email: "Email  exists" })
            }
            else {
                const newUser = new User({
                    name: req.body.name,
                    surname: req.body.surname,
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    confirmPassword: req.body.confirmPassword,
                })

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) console.log(err);
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    })
                })
            }
        })

        .catch(err => {
            console.log(err);
        });
});

// LOG IN
router.post("/login", (req, res) => {

    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    //Find user by email
    User.findOne({ email })
        .then(user => {
            if (!user) {
                errors.email = "User not found";
                return res.status(404).json(errors);
            }

            // Check password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        // User matched
                        const payload = { id: user.id, name: user.name, username: user.username } // Create JWT PayLoad
                        //Sign token
                        jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                            res.json({
                                succes: true,
                                token: "Bearer " + token
                            })
                        })
                    } else {
                        errors.password = "Password is incorrect"
                        return res.status(400).json(errors.password);
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        });
});

// GET CURRENT USER
router.get("/current", passport.authenticate("jwt", { session: false }), (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
});

//UPDATE

router.put('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {

    // Get fields
    const updatedUserData = {
        name: req.body.name,
        surname: req.body.surname,
        username: req.body.username
    };

    User.findOneAndUpdate(
        { _id: ObjectId(req.params.id) },
        { $set: updatedUserData },
        { new: true }
    ).then(updatedUserData => res.json(updatedUserData))
        .catch(err => res.json(err));
});

module.exports = router;

