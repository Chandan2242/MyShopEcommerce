import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";

import banner from "../assets/banner.jpg";
import { useCart } from "../context/CartContext";

export function HomePage() {
  const [products, setProducts] = useState([]);
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
      const response = await fetch(
        "http://localhost:5000/api/productsdetails"
      );

      const data = await response.json();

      if (data.success) {
        // Show only first 6 products
        setProducts(data.data.slice(0, 6));
      }


      

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="bg-gray-100 min-h-screen">
      {/* Hero Banner */}
      <Box
        sx={{
          height: { xs: 250, md: 450 },
          backgroundImage: `url(${banner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Container>
          <Typography
            variant="h3"
            color="white"
            fontWeight="bold"
          >
            Welcome to MyShop
          </Typography>

          <Typography
            variant="h6"
            color="white"
            mt={2}
          >
            Discover amazing products at unbeatable prices.
          </Typography>

          <Button
            variant="contained"
          size="large"
          sx={{ mt: 4 }}
          onClick={() => navigate("/products")}
          >
          Shop Now
          </Button>
        </Container>
      </Box>

      {/* Featured Products */}
      <Container sx={{ py: 6 }}>
        <Typography
          variant="h4"
          align="center"
          fontWeight="bold"
          gutterBottom
        >
          Featured Products
        </Typography>

        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            mt={5}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={4} mt={2}>
            {products.map((product) => (
              <Grid
                key={product._id}
                size={{ xs: 12, sm: 6, md: 4 }}
              >
                <Card
                  className="rounded-xl hover:shadow-2xl transition duration-300"
                  sx={{ height: "100%" }}
                >
                  <CardMedia
                    component="img"
                    height="220"
                    image={product.product_image}
                    alt={product.product_name}
                  />

                  <CardContent>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                    >
                      {product.product_name}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mt: 1,
                        minHeight: "45px",
                      }}
                    >
                      {product.product_description}
                    </Typography>

                    <Typography
                      color="primary"
                      fontWeight="bold"
                      mt={2}
                    >
                      ₹{Number(product.product_price).toLocaleString()}
                    </Typography>

                    <Box
                      display="flex"
                      gap={1}
                      mt={2}
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
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      {/* Why Choose Us */}
      <Box className="bg-white py-12">
        <Container>
          <Typography
            variant="h4"
            align="center"
            fontWeight="bold"
            gutterBottom
          >
            Why Choose MyShop?
          </Typography>

          <Grid container spacing={4} mt={3}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Box className="text-center p-6 shadow rounded-lg">
                <Typography variant="h2">🚚</Typography>

                <Typography
                  variant="h6"
                  fontWeight="bold"
                >
                  Fast Delivery
                </Typography>

                <Typography mt={2}>
                  Get your products delivered quickly across India.
                </Typography>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Box className="text-center p-6 shadow rounded-lg">
                <Typography variant="h2">💳</Typography>

                <Typography
                  variant="h6"
                  fontWeight="bold"
                >
                  Secure Payment
                </Typography>

                <Typography mt={2}>
                  100% safe and secure payment options.
                </Typography>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Box className="text-center p-6 shadow rounded-lg">
                <Typography variant="h2">🎧</Typography>

                <Typography
                  variant="h6"
                  fontWeight="bold"
                >
                  24/7 Support
                </Typography>

                <Typography mt={2}>
                  Our support team is available anytime for you.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}