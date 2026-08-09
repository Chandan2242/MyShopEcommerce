const express = require("express");
const router = express.Router();
const {getAllProducts} = require("../controller/GetProductController")
router.get("/productsdetails", getAllProducts);


module.exports = router;