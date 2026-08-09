// src/pages/ProductForm.jsx

import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

export default function ProductForm() {
  const [product, setProduct] = useState({
    product_name: "",
    product_description: "",
    product_category: "",
    product_price: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    setImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("product_name", product.product_name);
      formData.append(
        "product_description",
        product.product_description
      );
      formData.append(
        "product_category",
        product.product_category
      );
      formData.append(
        "product_price",
        product.product_price
      );

      // This name MUST match upload.single("product_image")
      formData.append("product_image", image);

      const response = await fetch(
        "http://localhost:5000/api/products",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert(data.message);

        setProduct({
          product_name: "",
          product_description: "",
          product_category: "",
          product_price: "",
        });

        setImage(null);
        setPreview("");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
      <Paper elevation={4} sx={{ p: 4 }}>
        <Typography
          variant="h4"
          align="center"
          fontWeight="bold"
          gutterBottom
        >
          Add Product
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
        >
          <TextField
            fullWidth
            label="Product Name"
            name="product_name"
            value={product.product_name}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            multiline
            rows={4}
            label="Product Description"
            name="product_description"
            value={product.product_description}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField
            select
            fullWidth
            label="Category"
            name="product_category"
            value={product.product_category}
            onChange={handleChange}
            margin="normal"
            required
          >
            <MenuItem value="Electronics">
              Electronics
            </MenuItem>

            <MenuItem value="Fashion">
              Fashion
            </MenuItem>

            <MenuItem value="Accessories">
              Accessories
            </MenuItem>

            <MenuItem value="Furniture">
              Furniture
            </MenuItem>

            <MenuItem value="Sports">
              Sports
            </MenuItem>
          </TextField>

          <TextField
            fullWidth
            type="number"
            label="Price"
            name="product_price"
            value={product.product_price}
            onChange={handleChange}
            margin="normal"
            required
          />

          <Box mt={3}>
            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
            />
          </Box>

          {preview && (
            <Box mt={3}>
              <img
                src={preview}
                alt="Preview"
                style={{
                  width: "220px",
                  borderRadius: "10px",
                }}
              />
            </Box>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 4 }}
            disabled={loading}
          >
            {loading
              ? "Uploading..."
              : "Add Product"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}