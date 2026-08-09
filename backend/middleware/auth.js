const jwt = require("jsonwebtoken")

const secretkey = "this_is_biggest_bug"

const verifyToken = (req, res, next) => {

    try {
        const authHeader = req.headers.authorization

        if(!authHeader.startsWith("Bearer ")){
            return res.status(401).json({
                message: "Token not provided"
            })
        }
        // Expected format:
        // Authorization: Bearer eyJhbGciOiJIUzI1Ni...

        const token = authHeader.split(" ")[1]

        const decoded = jwt.verify(token, secretkey);

req.user = {
  id: decoded.user,
};

           next();
    }

     catch (err) {
        return res.status(401).json({
            message: "Invalid or Expired Token"
        });
    }

}

module.exports = verifyToken;