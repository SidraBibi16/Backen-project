const express = require("express");
const router = express.Router();
const {signin}  = require("../controller/signincontroller");
router.post("/signin", signin);

module.exports = router;
