const express = require("express")
const router = express.Router() // Router level Middleware
const verifyToken = require("../middleware/auth")

router.get("/dashboard", verifyToken, (req, res) =>{
    res.json({
        message:"Welcome to the Dashboard",
        user: req.user
    })
})

module.exports = router;