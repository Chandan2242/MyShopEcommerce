import React, { useEffect, useState } from "react";

import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";

import {
  Add,
  Delete,
  ArrowBack,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

const Categories = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(false);

  // Get categories
  const fetchCategories = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/categories"
      );

      const data = await response.json();

      console.log("Categories:", data);

      setCategories(data.data || []);
    } catch (error) {
      console.log("Category fetch error:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Add category
  const handleAddCategory = async () => {
    if (!categoryName.trim()) {
      alert("Please enter category name");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/categories",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: categoryName,
          }),
        }
      );

      const data = await response.json();

      console.log("Add category:", data);

      if (response.ok && data.success) {
        alert("Category added successfully");

        setCategoryName("");

        fetchCategories();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log("Add category error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete category
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/categories/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      console.log("Delete category:", data);

      if (response.ok && data.success) {
        fetchCategories();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log("Delete category error:", error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f8fafc",
        py: 5,
      }}
    >
      <Container maxWidth="lg">

        {/* Header */}

        <div className="flex justify-between items-center mb-6">

          <div>
            <Typography
              variant="h4"
              fontWeight="bold"
            >
              Categories
            </Typography>

            <Typography color="text.secondary">
              Manage your product categories
            </Typography>
          </div>

          <Button
            variant="outlined"
            startIcon={<ArrowBack />}
            onClick={() =>
              navigate("/admin-dashboard")
            }
          >
            Dashboard
          </Button>

        </div>

        {/* Add Category */}

        <Card sx={{ mb: 4 }}>
          <CardContent>

            <Typography
              variant="h6"
              fontWeight="bold"
              mb={2}
            >
              Add New Category
            </Typography>

            <div className="flex gap-3">

              <TextField
                fullWidth
                label="Category Name"
                placeholder="e.g. Electronics"
                value={categoryName}
                onChange={(e) =>
                  setCategoryName(e.target.value)
                }
              />

              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={handleAddCategory}
                disabled={loading}
              >
                Add
              </Button>

            </div>

          </CardContent>
        </Card>

        {/* Categories */}

        <Card>
          <CardContent>

            <Typography
              variant="h6"
              fontWeight="bold"
              mb={3}
            >
              All Categories ({categories.length})
            </Typography>

            {categories.length === 0 ? (
              <Typography
                color="text.secondary"
                textAlign="center"
                py={5}
              >
                No categories found
              </Typography>
            ) : (
              <div className="space-y-3">

                {categories.map((category) => (
                  <div
                    key={category._id}
                    className="flex justify-between items-center border rounded-lg p-4"
                  >

                    <div>
                      <Typography fontWeight="bold">
                        {category.name}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                      >
                        Category ID: {category._id}
                      </Typography>
                    </div>

                    <IconButton
                      color="error"
                      onClick={() =>
                        handleDelete(category._id)
                      }
                    >
                      <Delete />
                    </IconButton>

                  </div>
                ))}

              </div>
            )}

          </CardContent>
        </Card>

      </Container>
    </Box>
  );
};

export default Categories;