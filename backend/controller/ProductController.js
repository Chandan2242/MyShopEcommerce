const Products = require("../models/Product.model")

const ProductData = async(req, res) => {
    

    

    try{


         const {product_name, product_description, product_category, product_price} = req.body
    
         // Check if image is uploaded
        if (!req.file) {
            return res.status(400).json({
                message: "Please upload a product image"
            });
        }

    const productinfo = await Products.create({
        product_name,
        product_description,
        product_category,
        product_price,

        // Image details
        product_image: req.file.path,        // Cloudinary URL
        public_id: req.file.filename         // Cloudinary Public ID
    })

    res.status(201).json({message: "Product Created Successfully", productinfo})
    // res.json(productinfo)
}
catch(err) {
     res.status(500).json({message: err.message})   
}

}

module.exports = ProductData