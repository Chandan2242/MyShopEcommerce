// src/pages/ConfirmOrders.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

export default function ConfirmOrders() {
  const navigate = useNavigate();

  const {
    cartItems,
    subtotal,
    shipping,
    gst,
    total,
    clearCart,
  } = useCart();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);

  const handleConfirmOrder = async () => {
    if (!address.trim()) {
      alert("Please enter your delivery address.");
      return;
    }

    if (!mobile.trim()) {
      alert("Please enter your mobile number.");
      return;
    }

    if (cartItems.length === 0) {
      alert("Cart is empty.");
      return;
    }

    const orderData = {
  userId: user._id,

  products: cartItems.map((item) => ({
    productId: item._id,
    quantity: item.quantity,
    price: Number(item.product_price),
  })),

  totalAmount: total,

  shippingAddress: {
    fullName: user.fullName,
    email: user.email,
    mobile: mobile,
    address: address,
  },

  paymentMethod: "UPI",

  paymentStatus: "Pending",

  orderStatus: "Pending",
};

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(orderData),
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("Order placed successfully.");

        clearCart();

        navigate("/orders");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 5 }}>
      <Grid container spacing={4}>
        {/* Left Section */}

        <Grid size={{ xs: 12, md: 8 }}>
          <Paper sx={{ p: 4 }}>
            <Typography
              variant="h5"
              fontWeight="bold"
              mb={3}
            >
              Delivery Details
            </Typography>

            <TextField
              fullWidth
              label="Full Name"
              value={user?.fullName || ""}
              sx={{ mb: 3 }}
              disabled
            />

            <TextField
              fullWidth
              label="Email"
              value={user?.email || ""}
              sx={{ mb: 3 }}
              disabled
            />

            <TextField
              fullWidth
              label="Mobile Number"
              value={mobile}
              onChange={(e) =>
                setMobile(e.target.value)
              }
              sx={{ mb: 3 }}
            />

            <TextField
              fullWidth
              multiline
              rows={4}
              label="Delivery Address"
              value={address}
              onChange={(e) =>
                setAddress(e.target.value)
              }
            />
          </Paper>

          <Paper sx={{ p: 4, mt: 4 }}>
            <Typography
              variant="h5"
              fontWeight="bold"
            >
              Order Items
            </Typography>

            <Divider sx={{ my: 3 }} />

            {cartItems.map((item) => (
              <Box
                key={item._id}
                display="flex"
                justifyContent="space-between"
                mb={2}
              >
                <Typography>
                  {item.product_name} × {item.quantity}
                </Typography>

                <Typography fontWeight="bold">
                  ₹
                  {(
                    item.product_price *
                    item.quantity
                  ).toLocaleString()}
                </Typography>
              </Box>
            ))}
          </Paper>
        </Grid>

        {/* Right Section */}

        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 4 }}>
            <Typography
              variant="h5"
              fontWeight="bold"
            >
              Payment Summary
            </Typography>

            <Divider sx={{ my: 3 }} />

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
              <Typography>GST</Typography>

              <Typography>
                ₹{gst.toFixed(2)}
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box
              display="flex"
              justifyContent="space-between"
              mb={3}
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

            <Box textAlign="center">
              <Typography
                fontWeight="bold"
                mb={2}
              >
                Scan QR to Pay
              </Typography>

              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=upi://pay?pa=smpubg420-1@oksbi&pn=MyShop&am=${total}&cu=INR`}
                alt="UPI QR"
              />
            </Box>

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 4 }}
              onClick={handleConfirmOrder}
              disabled={loading}
            >
              {loading
                ? "Placing Order..."
                : "Confirm Order"}
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}