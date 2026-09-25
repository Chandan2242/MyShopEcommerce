const Products = require("../models/Product.model");
const cloudinary = require("../config/cloudinary");

const uploadToCloudinary = (buffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: "images",
                resource_type: "image",
            },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        );

        stream.end(buffer);
    });
};

const ProductData = async (req, res) => {
    try {
        const {
            product_name,
            product_description,
            product_category,
            product_price,
        } = req.body;

        // Check if image is uploaded
        if (!req.file) {
            return res.status(400).json({
                message: "Please upload a product image",
            });
        }

        // Upload image to Cloudinary
        const result = await uploadToCloudinary(req.file.buffer);

        // Save product in MongoDB
        const productinfo = await Products.create({
            product_name,
            product_description,
            product_category,
            product_price,

            // Cloudinary details
            product_image: result.secure_url,
            public_id: result.public_id,
        });

        res.status(201).json({
            success: true,
            message: "Product Created Successfully",
            productinfo,
        });
    } catch (err) {
        console.error("Product Create Error:", err);

        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

module.exports = ProductData;