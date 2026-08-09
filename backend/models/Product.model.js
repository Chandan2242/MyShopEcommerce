const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({

    product_name:{
        type: String
    },
    product_description:{
        type: String
    },

    product_category:{
        type: String
    },

    product_price:{
        type: String
    },

    product_image:{
        type: String
    },

      public_id: {
        type: String
    }

})

const ProductModel = mongoose.model("products", ProductSchema)

module.exports = ProductModel