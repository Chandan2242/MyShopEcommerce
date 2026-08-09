const express = require("express");
const router = express.Router();
const{getSingleProduct} = require("../controller/GetProductById")
router.get("/productsdetails/:id", getSingleProduct);


module.exports = router;