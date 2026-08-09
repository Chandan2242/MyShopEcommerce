// src/pages/OrdersPage.jsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Container,
  Typography,
  Paper,
  Chip,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
} from "@mui/material";

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

    default:
      return "default";
  }
};

export function OrdersPage() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/orders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      console.log(data);

      if (response.ok && data.success) {
        setOrders(data.data);
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container sx={{ mt: 10, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
      >
        My Orders
      </Typography>

      <Typography
        color="text.secondary"
        mb={4}
      >
        View and track all your previous orders.
      </Typography>

      {orders.length > 0 ? (
        <TableContainer
          component={Paper}
          elevation={3}
        >
          <Table>

            <TableHead>

              <TableRow
                sx={{ backgroundColor: "#f5f5f5" }}
              >
                <TableCell>
                  <strong>Order ID</strong>
                </TableCell>

                <TableCell>
                  <strong>Date</strong>
                </TableCell>

                <TableCell>
                  <strong>Products</strong>
                </TableCell>

                <TableCell>
                  <strong>Quantity</strong>
                </TableCell>

                <TableCell>
                  <strong>Total</strong>
                </TableCell>

                <TableCell>
                  <strong>Status</strong>
                </TableCell>

                <TableCell align="center">
                  <strong>Action</strong>
                </TableCell>

              </TableRow>

            </TableHead>

            <TableBody>

              {orders.map((order) => {

                const totalQty = order.products.reduce(
                  (sum, item) => sum + item.quantity,
                  0
                );

                const productNames = order.products
                  .map((item) =>
                    item.productId?.product_name || "Product"
                  )
                  .join(", ");

                return (
                  <TableRow
                    key={order._id}
                    hover
                  >
                    <TableCell>
                      {order._id.slice(-8).toUpperCase()}
                    </TableCell>

                    <TableCell>
                      {new Date(
                        order.createdAt
                      ).toLocaleDateString()}
                    </TableCell>

                    <TableCell>
                      {productNames}
                    </TableCell>

                    <TableCell>
                      {totalQty}
                    </TableCell>

                    <TableCell>
                      ₹
                      {Number(
                        order.totalAmount
                      ).toLocaleString()}
                    </TableCell>

                    <TableCell>

                      <Chip
                        label={order.orderStatus}
                        color={getStatusColor(
                          order.orderStatus
                        )}
                        size="small"
                      />

                    </TableCell>

                    <TableCell align="center">

                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() =>
                          navigate(
                            `/orders/${order._id}`
                          )
                        }
                      >
                        View Details
                      </Button>

                    </TableCell>

                  </TableRow>
                );
              })}

            </TableBody>

          </Table>
        </TableContainer>
      ) : (
        <Box
          textAlign="center"
          py={10}
        >
          <Typography variant="h5">
            No Orders Found
          </Typography>

          <Typography
            color="text.secondary"
            mt={2}
          >
            You haven't placed any orders yet.
          </Typography>

          <Button
            variant="contained"
            sx={{ mt: 3 }}
            onClick={() => navigate("/products")}
          >
            Shop Now
          </Button>
        </Box>
      )}
    </Container>
  );
}