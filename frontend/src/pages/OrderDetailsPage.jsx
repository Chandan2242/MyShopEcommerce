
// src/pages/OrderDetailsPage.jsx

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Typography,
} from "@mui/material";

import { useNavigate, useParams } from "react-router-dom";

const getStatusColor = (status) => {
  switch (status) {
    case "Delivered":
      return "success";

    case "Shipped":
      return "primary";

    case "Processing":
      return "warning";

    case "Confirmed":
      return "info";

    case "Cancelled":
      return "error";

    case "Pending":
      return "default";

    default:
      return "default";
  }
};

const OrderDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrderDetails();
  }, [id]);

  const fetchOrderDetails = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/orders/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      console.log("Order Details:", data);

      if (response.ok && data.success) {
        setOrder(data.data);
      } else {
        alert(data.message || "Order not found");
      }
    } catch (error) {
      console.log("Order details error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!order) {
    return (
      <Container sx={{ py: 8, textAlign: "center" }}>
        <Typography variant="h5">
          Order not found
        </Typography>

        <Button
          variant="contained"
          sx={{ mt: 3 }}
          onClick={() => navigate("/orders")}
        >
          Back to Orders
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>

      {/* Header */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <div>
          <Typography variant="h4" fontWeight="bold">
            Order Details
          </Typography>

          <Typography color="text.secondary">
            Order #{order._id.slice(-8).toUpperCase()}
          </Typography>
        </div>

        <Button
          variant="outlined"
          onClick={() => navigate("/orders")}
        >
          Back to Orders
        </Button>
      </Box>

      {/* Order Status */}

      <Card sx={{ mb: 3 }}>
        <CardContent>

          <Typography variant="h6" fontWeight="bold">
            Order Status
          </Typography>

          <Box sx={{ mt: 2 }}>
            <Chip
              label={order.orderStatus}
              color={getStatusColor(order.orderStatus)}
              sx={{ fontWeight: "bold" }}
            />
          </Box>

          <Typography
            color="text.secondary"
            sx={{ mt: 2 }}
          >
            Order Date:{" "}
            {new Date(order.createdAt).toLocaleString()}
          </Typography>

          <Typography sx={{ mt: 1 }}>
            Payment Method:{" "}
            <strong>{order.paymentMethod}</strong>
          </Typography>

          <Typography sx={{ mt: 1 }}>
            Payment Status:{" "}
            <strong>{order.paymentStatus}</strong>
          </Typography>

        </CardContent>
      </Card>

      {/* Products */}

      <Card sx={{ mb: 3 }}>
        <CardContent>

          <Typography
            variant="h6"
            fontWeight="bold"
            mb={3}
          >
            Products
          </Typography>

          {order.products.map((item) => {

            const product = item.productId;

            return (
              <Box key={item._id} sx={{ mb: 3 }}>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 3,
                  }}
                >

                  {/* Product Image */}

                  <img
                    src={product?.product_image}
                    alt={product?.product_name}
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: "10px",
                      border: "1px solid #ddd",
                    }}
                  />

                  {/* Product Information */}

                  <Box sx={{ flexGrow: 1 }}>

                    <Typography
                      variant="h6"
                      fontWeight="bold"
                    >
                      {product?.product_name}
                    </Typography>

                    <Typography color="text.secondary">
                      Category:{" "}
                      {product?.product_category}
                    </Typography>

                    <Typography sx={{ mt: 1 }}>
                      Quantity:{" "}
                      <strong>{item.quantity}</strong>
                    </Typography>

                    <Typography>
                      Price: ₹
                      {Number(item.price).toLocaleString()}
                    </Typography>

                  </Box>

                  {/* Product Total */}

                  <Box>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                    >
                      ₹
                      {(
                        Number(item.price) *
                        item.quantity
                      ).toLocaleString()}
                    </Typography>
                  </Box>

                </Box>

                <Divider sx={{ mt: 3 }} />

              </Box>
            );
          })}

          {/* Total */}

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mt: 3,
            }}
          >
            <Typography
              variant="h5"
              fontWeight="bold"
            >
              Total: ₹
              {Number(
                order.totalAmount
              ).toLocaleString()}
            </Typography>
          </Box>

        </CardContent>
      </Card>

      {/* Shipping Address */}

      <Card sx={{ mb: 3 }}>
        <CardContent>

          <Typography
            variant="h6"
            fontWeight="bold"
            mb={2}
          >
            Shipping Address
          </Typography>

          <Typography>
            <strong>
              {order.shippingAddress?.fullName}
            </strong>
          </Typography>

          <Typography>
            {order.shippingAddress?.email}
          </Typography>

          <Typography>
            Mobile: {order.shippingAddress?.mobile}
          </Typography>

          <Typography sx={{ mt: 1 }}>
            {order.shippingAddress?.address}
          </Typography>

        </CardContent>
      </Card>

    </Container>
  );
};

export default OrderDetailsPage;

