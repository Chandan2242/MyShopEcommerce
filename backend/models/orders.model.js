const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    // User who placed the order
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Ordered Products
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products", // Use your Product model name here
          required: true,
        },

        quantity: {
          type: Number,
          
          default: 1,
        },

        price: {
          type: Number,
          
        },
      },
    ],

    // Total Bill
    totalAmount: {
      type: Number,
     
    },

    // Shipping Address
    shippingAddress: {
      fullName: {
        type: String,
       
      },

      email: {
        type: String,
        required: true,
      },

      mobile: {
        type: String,
        required: true,
      },

      address: {
        type: String,
        required: true,
      },
    },

    // Payment
    paymentMethod: {
      type: String,
      enum: ["UPI", "Cash on Delivery", "Card", "Net Banking"],
      default: "UPI",
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },

    // Order Status
    orderStatus: {
      type: String,
      enum: [
        "Pending",
        "Confirmed",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
      ],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);