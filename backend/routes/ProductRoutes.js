const express = require("express")

const router = express.Router() // Router level middleware

const Product = require("../controller/ProductController")

const upload = require("../middleware/upload")

router.post("/products", upload.single("product_image"),  Product)

module.exports = router