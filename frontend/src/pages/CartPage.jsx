import React from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";

import {
  Add,
  Remove,
  Delete,
  ShoppingCartCheckout,
} from "@mui/icons-material";

import { useCart } from "../context/CartContext";

export function CartPage() {
  const navigate = useNavigate();

  const {
    cartItems,
    increaseQty,
    decreaseQty,
    removeItem,
    subtotal,
    shipping,
    gst,
    total,
  } = useCart();

  const handleCheckout = () => {
    alert("Proceeding to Checkout...");
     navigate("/confirm-order");
    // Later you can navigate("/checkout")
  };

  return (
    <Container maxWidth="xl" sx={{ py: 5 }}>
      <Typography variant="h4" fontWeight="bold" mb={4}>
        Shopping Cart
      </Typography>

      {cartItems.length === 0 ? (
        <Paper
          elevation={3}
          sx={{
            p: 8,
            textAlign: "center",
            borderRadius: 3,
          }}
        >
          <Typography variant="h5">
            Your Cart is Empty
          </Typography>

          <Typography color="text.secondary" mt={2}>
            Start shopping to add products to your cart.
          </Typography>

          <Button
            variant="contained"
            sx={{ mt: 4 }}
            onClick={() => navigate("/products")}
          >
            Continue Shopping
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={4}>
          {/* Cart Items */}

          <Grid size={{ xs: 12, lg: 8 }}>
            {cartItems.map((item) => (
              <Card
                key={item._id}
                sx={{
                  display: "flex",
                  mb: 3,
                  borderRadius: 3,
                }}
              >
                <CardMedia
                  component="img"
                  image={item.product_image}
                  alt={item.product_name}
                  sx={{
                    width: 180,
                    height: 180,
                    objectFit: "cover",
                  }}
                />

                <CardContent
                  sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                    >
                      {item.product_name}
                    </Typography>

                    <Typography
                      color="text.secondary"
                      mt={1}
                    >
                      {item.product_description}
                    </Typography>

                    <Typography
                      color="primary"
                      fontWeight="bold"
                      mt={2}
                    >
                      ₹
                      {Number(
                        item.product_price
                      ).toLocaleString()}
                    </Typography>
                  </Box>

                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mt={3}
                  >
                    {/* Quantity */}

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        border: "1px solid #ddd",
                        borderRadius: 2,
                        px: 1,
                      }}
                    >
                      <IconButton
                        onClick={() =>
                          decreaseQty(item._id)
                        }
                      >
                        <Remove />
                      </IconButton>

                      <Typography px={2}>
                        {item.quantity}
                      </Typography>

                      <IconButton
                        onClick={() =>
                          increaseQty(item._id)
                        }
                      >
                        <Add />
                      </IconButton>
                    </Box>

                    <IconButton
                      color="error"
                      onClick={() =>
                        removeItem(item._id)
                      }
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Grid>

          {/* Order Summary */}

          <Grid size={{ xs: 12, lg: 4 }}>
            <Paper
              elevation={4}
              sx={{
                p: 4,
                borderRadius: 3,
                position: "sticky",
                top: 90,
              }}
            >
              <Typography
                variant="h5"
                fontWeight="bold"
                gutterBottom
              >
                Order Summary
              </Typography>

              <Divider sx={{ mb: 3 }} />

              <Box
                display="flex"
                justifyContent="space-between"
                mb={2}
              >
                <Typography>Subtotal</Typography>

                <Typography>
                  ₹{subtotal.toLocaleString()}
                </Typography>
              </Box>

              <Box
                display="flex"
                justifyContent="space-between"
                mb={2}
              >
                <Typography>Shipping</Typography>

                <Typography>
                  ₹{shipping.toLocaleString()}
                </Typography>
              </Box>

              <Box
                display="flex"
                justifyContent="space-between"
                mb={2}
              >
                <Typography>GST (18%)</Typography>

                <Typography>
                  ₹{gst.toFixed(2)}
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box
                display="flex"
                justifyContent="space-between"
                mb={4}
              >
                <Typography
                  variant="h6"
                  fontWeight="bold"
                >
                  Total
                </Typography>

                <Typography
                  variant="h6"
                  color="primary"
                  fontWeight="bold"
                >
                  ₹{total.toFixed(2)}
                </Typography>
              </Box>

              <Button
                variant="contained"
                fullWidth
                size="large"
                startIcon={
                  <ShoppingCartCheckout />
                }
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </Button>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}