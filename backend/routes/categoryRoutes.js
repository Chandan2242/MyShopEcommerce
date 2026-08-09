
const express = require("express");

const router = express.Router();

const {
  getAllCategories,
  createCategory,
  deleteCategory,
} = require("../controller/CategoryController");

// GET all categories
router.get("/", getAllCategories);

// POST create category
router.post("/", createCategory);

// DELETE category
router.delete("/:id", deleteCategory);

module.exports = router;