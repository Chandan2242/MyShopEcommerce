const User = require("../models/users.model")
const bcrypt = require("bcryptjs")

const jwt = require("jsonwebtoken")

const LoginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email});

        // Check if user exists
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        // Check password
        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid password"
            });
        }
       

        const  secretkey = "this_is_biggest_bug" 

        const token = jwt.sign({user: user._id}, secretkey, {expiresIn: "1h"} )




        res.status(200).json({
            message: "Login successful",
            token,
            user
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

// controller/LoginDashboard.js
module.exports = { LoginUser };