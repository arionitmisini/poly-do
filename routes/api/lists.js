const express = require("express");
const router = express.Router();

//@route GET api/lists/test
//@desc Tests lists route
//@acces public

router.get("/test" , (req,res) => res.json({msg:"Lists works"}));

module.exports = router;