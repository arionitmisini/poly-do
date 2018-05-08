const express = require("express");
const router = express.Router();

//@route GET api/tasks/test
//@desc Tests tasks route
//@acces public

router.get("/test" , (req,res) => res.json({msg:"Tasks works"}));

module.exports = router;