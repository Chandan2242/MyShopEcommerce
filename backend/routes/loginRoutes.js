const express = require("express");
const router = express.Router();
const { LoginUser } = require("../controller/LoginController");
router.post("/login", LoginUser);


module.exports = router;