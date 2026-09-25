
import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  MenuItem,
  Rating,
  TextField,
  Typography,
} from "@mui/material";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useCart } from "../context/CartContext";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    console.log(product);
    addToCart(product);
    alert("Product added to cart");
  };

  const handleViewDetails = (id) => {
    navigate(`/products/${id}`);
  };

  // Fetch Products
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "https://myshopecommerce-backend.onrender.com/api/productsdetails"
      );

      const data = await response.json();

      console.log("Products API Response:", data);

      if (data.success && Array.isArray(data.data)) {
        setProducts(data.data);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Fetch Products Error:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Dynamic Categories
  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(products.map((p) => p.product_category)),
    ];

    return ["All", ...uniqueCategories];
  }, [products]);

  // Search + Filter
  const filteredProducts = products.filter((product) => {
    const productName = product.product_name || "";

    const matchesSearch = productName
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" ||
      product.product_category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <Container maxWidth="xl" sx={{ py: 5 }}>
      {/* Page Heading */}
      <Typography variant="h4" fontWeight="bold">
        Our Products
      </Typography>

      <Typography color="text.secondary" mb={4}>
        Browse our latest collection.
      </Typography>

      {/* Search + Category */}
      <Box
        display="flex"
        gap={2}
        flexDirection={{ xs: "column", md: "row" }}
        mb={5}
      >
        <TextField
          label="Search Products"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <TextField
          select
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          sx={{ minWidth: 220 }}
        >
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      {/* Loading */}
      {loading ? (
        <Box display="flex" justifyContent="center" mt={8}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={4}>
          {filteredProducts.map((product) => (
            <Grid
              key={product._id}
              size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
            >
              <Card
                sx={{
                  overflow: "hidden",
                  transition: "0.3s",
                  height: "fit-content",
                  "&:hover": {
                    boxShadow: 8,
                  },
                }}
              >
                {/* Product Image */}
                <Box
                  position="relative"
                  sx={{
                    width: "100%",
                    height: 220,
                    backgroundColor: "#f5f5f5",
                  }}
                >
                  <Link
                    to={`/products/${product._id}`}
                    style={{
                      display: "block",
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={product.product_image}
                      alt={product.product_name}
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        display: "block",
                      }}
                    />
                  </Link>

                  {/* Category */}
                  <Chip
                    label={product.product_category}
                    color="primary"
                    size="small"
                    sx={{
                      position: "absolute",
                      top: 10,
                      left: 10,
                    }}
                  />

                  {/* Favorite */}
                  <IconButton
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      bgcolor: "white",
                      "&:hover": {
                        bgcolor: "white",
                      },
                    }}
                  >
                    <FavoriteBorderIcon />
                  </IconButton>
                </Box>

                {/* Product Content */}
                <CardContent>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{
                      minHeight: 32,
                    }}
                  >
                    {product.product_name}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    mt={1}
                    sx={{
                      minHeight: 40,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {product.product_description}
                  </Typography>

                  {/* Rating */}
                  <Rating
                    value={4.5}
                    precision={0.5}
                    readOnly
                    sx={{ mt: 2 }}
                  />

                  {/* Price */}
                  <Typography
                    variant="h6"
                    color="primary"
                    fontWeight="bold"
                    mt={2}
                  >
                    ₹{Number(product.product_price).toLocaleString()}
                  </Typography>
                </CardContent>

                {/* Buttons */}
                <CardActions
                  sx={{
                    p: 2,
                    pt: 0,
                  }}
                >
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={() => handleViewDetails(product._id)}
                  >
                    View Details
                  </Button>

                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* No Products */}
      {!loading && filteredProducts.length === 0 && (
        <Box textAlign="center" mt={10}>
          <Typography variant="h5">
            No Products Found
          </Typography>

          <Typography color="text.secondary">
            Try another search or category.
          </Typography>
        </Box>
      )}
    </Container>
  );
}

