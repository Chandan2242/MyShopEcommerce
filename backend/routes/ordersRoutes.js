const express = require("express");

const router = express.Router();

const {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
} = require("../controller/ordersController");

 

router.post("/", createOrder);

router.get("/", getAllOrders);

router.get("/:id", getOrderById);

router.put("/:id", updateOrderStatus);

router.delete("/:id", deleteOrder);

module.exports = router;