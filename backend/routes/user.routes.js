const express = require("express");
const router = express.Router();

const { registerUser } = require("../controller/user.controller");

// Register
router.post("/register", registerUser);

module.exports = router;