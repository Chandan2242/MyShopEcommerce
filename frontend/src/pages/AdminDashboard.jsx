
// src/pages/AdminDashboard.jsx

import React, { useEffect, useState } from "react";

import {
  AppBar,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";

import {
  Dashboard,
  ShoppingBag,
  People,
  Category,
  Settings,
  Logout,
  Inventory,
  Add,
} from "@mui/icons-material";

import { Link, useNavigate } from "react-router-dom";

const drawerWidth = 250;

// =========================
// Statistics
// =========================

const stats = [
  {
    title: "Total Products",
    value: 250,
    icon: <Inventory />,
    color: "#1976d2",
  },
  {
    title: "Total Orders",
    value: 1245,
    icon: <ShoppingBag />,
    color: "#2e7d32",
  },
  {
    title: "Users",
    value: 845,
    icon: <People />,
    color: "#ed6c02",
  },
  {
    title: "Revenue",
    value: "₹8,45,000",
    icon: <Category />,
    color: "#9c27b0",
  },
];

export function AdminDashboard() {
  const navigate = useNavigate();

  // =========================
  // Recent Orders State
  // =========================

  const [recentOrders, setRecentOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  // =========================
  // Fetch Latest Orders
  // =========================

  useEffect(() => {
    fetchRecentOrders();
  }, []);

  const fetchRecentOrders = async () => {
    try {
      setOrdersLoading(true);

      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/orders",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      console.log("Admin Orders:", data);

      if (response.ok && data.success) {
        // Latest orders first
        const latestOrders = [...(data.data || [])]
          .sort(
            (a, b) =>
              new Date(b.createdAt) -
              new Date(a.createdAt)
          )
          .slice(0, 10);

        setRecentOrders(latestOrders);
      } else {
        console.log(
          "Orders fetch failed:",
          data.message
        );

        setRecentOrders([]);
      }
    } catch (error) {
      console.log(
        "Recent orders error:",
        error
      );

      setRecentOrders([]);
    } finally {
      setOrdersLoading(false);
    }
  };

  // =========================
  // Logout
  // =========================

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  // =========================
  // Sidebar Navigation
  // =========================

  const menuItems = [
    {
      name: "Dashboard",
      icon: <Dashboard />,
      path: "/admin-dashboard",
    },
    {
      name: "Products",
      icon: <Inventory />,
      path: "/admin/products",
    },
    {
      name: "Orders",
      icon: <ShoppingBag />,
      path: "/admin/orders",
    },
    {
      name: "Users",
      icon: <People />,
      path: "/admin-dashboard1",
    },
    {
      name: "Categories",
      icon: <Category />,
      path: "/categories",
    },
    {
      name: "Settings",
      icon: <Settings />,
      path: "/settings",
    },
  ];

  return (
    <Box sx={{ display: "flex" }}>

      {/* =========================
          Sidebar
      ========================= */}

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,

          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#0f172a",
            color: "#fff",
          },
        }}
      >
        <Typography
          variant="h5"
          sx={{
            p: 3,
            fontWeight: "bold",
            color: "#60a5fa",
          }}
        >
          MyShop Admin
        </Typography>

        <Divider
          sx={{
            bgcolor: "#334155",
          }}
        />

        <List>

          {menuItems.map((item) => (
            <ListItemButton
              key={item.name}
              onClick={() =>
                navigate(item.path)
              }
              sx={{
                "&:hover": {
                  backgroundColor: "#1e293b",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: "white",
                }}
              >
                {item.icon}
              </ListItemIcon>

              <ListItemText
                primary={item.name}
              />
            </ListItemButton>
          ))}

          {/* Logout */}

          <ListItemButton
            onClick={handleLogout}
            sx={{
              "&:hover": {
                backgroundColor: "#1e293b",
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: "white",
              }}
            >
              <Logout />
            </ListItemIcon>

            <ListItemText
              primary="Logout"
            />
          </ListItemButton>

        </List>
      </Drawer>

      {/* =========================
          Main Content
      ========================= */}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          backgroundColor: "#f8fafc",
          minHeight: "100vh",
        }}
      >

        {/* =========================
            Top Navbar
        ========================= */}

        <AppBar
          position="static"
          sx={{
            backgroundColor: "white",
            color: "black",
            boxShadow: 1,
          }}
        >
          <Toolbar className="flex justify-between">

            <Typography variant="h6">
              Dashboard
            </Typography>

            <div className="flex items-center gap-3">

              <Typography>
                Admin
              </Typography>

              <Avatar>
                A
              </Avatar>

            </div>

          </Toolbar>
        </AppBar>

        <Container
          maxWidth="xl"
          className="py-8"
        >

          {/* =========================
              Statistics
          ========================= */}

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

            {stats.map((item) => (
              <Card
                key={item.title}
                className="rounded-xl shadow-md hover:shadow-xl transition"
              >
                <CardContent className="flex justify-between items-center">

                  <div>

                    <Typography color="text.secondary">
                      {item.title}
                    </Typography>

                    <Typography
                      variant="h4"
                      fontWeight="bold"
                    >
                      {item.value}
                    </Typography>

                  </div>

                  <Avatar
                    sx={{
                      bgcolor: item.color,
                      width: 60,
                      height: 60,
                    }}
                  >
                    {item.icon}
                  </Avatar>

                </CardContent>
              </Card>
            ))}

          </div>

          {/* =========================
              Quick Actions
          ========================= */}

          <Paper className="p-6 mt-8 rounded-xl">

            <Typography
              variant="h6"
              fontWeight="bold"
              gutterBottom
            >
              Quick Actions
            </Typography>

            <div className="flex flex-wrap gap-3 mt-4">

              <Link to="/product-upload">
                <Button
                  variant="contained"
                  startIcon={<Add />}
                >
                  Add Product
                </Button>
              </Link>

              <Button
                variant="outlined"
                onClick={() =>
                  navigate("/admin/orders")
                }
              >
                Manage Orders
              </Button>

              <Button
                variant="outlined"
                onClick={() =>
                  navigate("/admin-dashboard1")
                }
              >
                Profile
              </Button>

              <Button
                variant="outlined"
                onClick={() =>
                  navigate("/categories")
                }
              >
                Categories
              </Button>

            </div>

          </Paper>

          {/* =========================
              Recent Orders
          ========================= */}

          <Paper className="p-6 mt-8 rounded-xl">

            {/* Header */}

            <div className="flex justify-between items-center mb-4">

              <div>

                <Typography
                  variant="h6"
                  fontWeight="bold"
                >
                  Recent Orders
                </Typography>

                <Typography
                  color="text.secondary"
                  variant="body2"
                >
                  Latest 10 customer orders
                </Typography>

              </div>

              <Button
                variant="outlined"
                onClick={() =>
                  navigate("/admin/orders")
                }
              >
                View All Orders
              </Button>

            </div>

            <Divider sx={{ mb: 2 }} />

            {/* Loading */}

            {ordersLoading ? (

              <Typography
                textAlign="center"
                py={5}
                color="text.secondary"
              >
                Loading orders...
              </Typography>

            ) : recentOrders.length === 0 ? (

              /* No Orders */

              <Typography
                textAlign="center"
                py={5}
                color="text.secondary"
              >
                No orders found
              </Typography>

            ) : (

              /* Orders */

              <div className="overflow-x-auto">

                {/* Table Header */}

                <div className="hidden md:grid grid-cols-5 gap-4 font-bold border-b pb-3">

                  <div>Order</div>
                  <div>Customer</div>
                  <div>Date</div>
                  <div>Amount</div>
                  <div>Status</div>

                </div>

                {/* Latest 10 Orders */}

                {recentOrders.map((order) => (

                  <div
                    key={order._id}
                    className="grid grid-cols-1 md:grid-cols-5 gap-2 md:gap-4 items-center border-b py-4"
                  >

                    {/* Order ID */}

                    <div>

                      <Typography
                        fontWeight="bold"
                      >
                        #
                        {order._id
                          ?.slice(-8)
                          .toUpperCase()}
                      </Typography>

                    </div>

                    {/* Customer */}

                    <div>

                      <Typography
                        fontWeight="bold"
                      >
                        {order.shippingAddress
                          ?.fullName ||
                          "Customer"}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                      >
                        {order.userId?.email ||
                          order.shippingAddress
                            ?.email ||
                          ""}
                      </Typography>

                    </div>

                    {/* Date */}

                    <div>

                      <Typography>
                        {new Date(
                          order.createdAt
                        ).toLocaleDateString()}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                      >
                        {new Date(
                          order.createdAt
                        ).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </Typography>

                    </div>

                    {/* Amount */}

                    <div>

                      <Typography fontWeight="bold">
                        ₹
                        {Number(
                          order.totalAmount
                        ).toLocaleString("en-IN")}
                      </Typography>

                    </div>

                    {/* Status */}

                    <div>

                      <span
                        className={`
                          inline-block
                          px-3
                          py-1
                          rounded-full
                          text-sm
                          font-semibold
                          ${
                            order.orderStatus ===
                            "Delivered"
                              ? "bg-green-100 text-green-700"
                              : order.orderStatus ===
                                "Shipped"
                              ? "bg-blue-100 text-blue-700"
                              : order.orderStatus ===
                                "Processing"
                              ? "bg-orange-100 text-orange-700"
                              : order.orderStatus ===
                                "Confirmed"
                              ? "bg-cyan-100 text-cyan-700"
                              : order.orderStatus ===
                                "Cancelled"
                              ? "bg-red-100 text-red-700"
                              : "bg-gray-100 text-gray-700"
                          }
                        `}
                      >
                        {order.orderStatus ||
                          "Pending"}
                      </span>

                    </div>

                  </div>

                ))}

              </div>

            )}

          </Paper>

        </Container>

      </Box>

    </Box>
  );
}