// src/pages/ProductDetailsPage.jsx

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Grid,
  IconButton,
  Paper,
  Rating,
  Typography,
} from "@mui/material";

import {
  Add,
  Remove,
  FavoriteBorder,
  ShoppingCart,
  FlashOn,
} from "@mui/icons-material";

import { useCart } from "../context/CartContext";

export function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/productsdetails/${id}`
      );

      const data = await response.json();

      if (data.success) {
        setProduct(data.data);
        setSelectedImage(data.data.product_image);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity,
    });

    alert("Product added to cart");
  };

  const handleBuyNow = () => {
    addToCart({
      ...product,
      quantity,
    });

    navigate("/cart");
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        mt={10}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!product) {
    return (
      <Typography
        align="center"
        mt={10}
        variant="h5"
      >
        Product Not Found
      </Typography>
    );
  }

  return (
    <Container maxWidth="xl" className="py-10">
      <Grid container spacing={5}>
        {/* Left */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Paper className="p-4 rounded-xl">

            <img
              src={selectedImage}
              alt={product.product_name}
              className="w-full h-[450px] object-cover rounded-lg"
            />

            <div className="flex gap-3 mt-4">
              <img
                src={product.product_image}
                alt={product.product_name}
                onClick={() =>
                  setSelectedImage(product.product_image)
                }
                className="w-24 h-24 rounded-lg border-2 border-blue-600 cursor-pointer"
              />
            </div>

          </Paper>
        </Grid>

        {/* Right */}
        <Grid size={{ xs: 12, md: 7 }}>

          <Typography
            variant="h4"
            fontWeight="bold"
          >
            {product.product_name}
          </Typography>

          <Typography
            color="text.secondary"
            mt={1}
          >
            Brand : MyShop
          </Typography>

          <Typography color="text.secondary">
            Category : {product.product_category}
          </Typography>

          <Box
            display="flex"
            alignItems="center"
            gap={2}
            mt={2}
          >
            <Rating
              value={4.5}
              precision={0.5}
              readOnly
            />

            <Typography>
              (120 Reviews)
            </Typography>
          </Box>

          <Box
            display="flex"
            alignItems="center"
            gap={2}
            mt={4}
          >
            <Typography
              variant="h4"
              color="primary"
              fontWeight="bold"
            >
              ₹
              {Number(
                product.product_price
              ).toLocaleString()}
            </Typography>

            <Chip
              label="Latest"
              color="success"
            />
          </Box>

          <Typography
            color="green"
            mt={2}
            fontWeight="bold"
          >
            In Stock
          </Typography>

          <Typography
            mt={3}
            lineHeight={2}
          >
            {product.product_description}
          </Typography>

          {/* Quantity */}

          <Box
            display="flex"
            alignItems="center"
            gap={3}
            mt={5}
          >
            <Typography fontWeight="bold">
              Quantity
            </Typography>

            <Box className="border rounded-lg flex items-center">

              <IconButton
                onClick={() =>
                  quantity > 1 &&
                  setQuantity(quantity - 1)
                }
              >
                <Remove />
              </IconButton>

              <Typography px={2}>
                {quantity}
              </Typography>

              <IconButton
                onClick={() =>
                  setQuantity(quantity + 1)
                }
              >
                <Add />
              </IconButton>

            </Box>

          </Box>

          {/* Buttons */}

          <Box
            display="flex"
            gap={2}
            mt={5}
            flexWrap="wrap"
          >

            <Button
              variant="contained"
              startIcon={<ShoppingCart />}
              onClick={handleAddToCart}
            >
              Add To Cart
            </Button>

            <Button
              variant="contained"
              color="warning"
              startIcon={<FlashOn />}
              onClick={handleBuyNow}
            >
              Buy Now
            </Button>

            <Button
              variant="outlined"
              startIcon={<FavoriteBorder />}
            >
              Wishlist
            </Button>

          </Box>

          {/* Specifications */}

          <Paper className="p-5 mt-8 rounded-xl">

            <Typography
              variant="h6"
              fontWeight="bold"
            >
              Product Information
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography>
              <strong>Name :</strong>{" "}
              {product.product_name}
            </Typography>

            <Typography>
              <strong>Category :</strong>{" "}
              {product.product_category}
            </Typography>

            <Typography>
              <strong>Price :</strong> ₹
              {Number(
                product.product_price
              ).toLocaleString()}
            </Typography>

            <Typography mt={2}>
              <strong>Description :</strong>
            </Typography>

            <Typography>
              {product.product_description}
            </Typography>

          </Paper>

        </Grid>
      </Grid>

      {/* Reviews */}

      <Paper className="p-6 mt-10 rounded-xl">

        <Typography
          variant="h5"
          fontWeight="bold"
        >
          Customer Reviews
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography fontWeight="bold">
          Rahul Sharma
        </Typography>

        <Rating
          value={5}
          readOnly
          size="small"
        />

        <Typography mt={1}>
          Amazing product. Highly recommended.
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography fontWeight="bold">
          Priya Singh
        </Typography>

        <Rating
          value={4.5}
          readOnly
          size="small"
        />

        <Typography mt={1}>
          Worth buying. Excellent quality.
        </Typography>

      </Paper>
    </Container>
  );
}