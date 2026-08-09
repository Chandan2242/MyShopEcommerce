import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    MenuItem,
    Select,
    Typography,
} from "@mui/material";

import {
    ArrowBack,
    LocalShipping,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

const AdminOrders = () => {
    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    // =========================
    // Get All Orders
    // =========================

    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                "http://localhost:5000/api/orders",
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            const data = await response.json();

            console.log("ADMIN ORDERS:", data);

            if (response.ok) {
                setOrders(data.data || data.orders || []);
            }

        } catch (error) {
            console.error("Orders fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    // =========================
    // Update Order Status
    // =========================

    const updateStatus = async (orderId, status) => {
    try {
        const token = localStorage.getItem("token");

        const response = await fetch(
            `http://localhost:5000/api/orders/${orderId}`,
            {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    orderStatus: status,
                }),
            }
        );

        const data = await response.json();

        console.log("STATUS UPDATE:", data);

        if (response.ok) {
            alert(`Order status changed to ${status}`);
            fetchOrders();
        } else {
            alert(data.message || "Status update failed");
        }

    } catch (error) {
        console.error("Status update error:", error);
    }
};

    return (
        <Box
            sx={{
                minHeight: "100vh",
                backgroundColor: "#f8fafc",
                py: 4,
            }}
        >
            <Container maxWidth="xl">

                {/* Header */}

                <div className="flex justify-between items-center mb-6">

                    <div>
                        <Typography
                            variant="h4"
                            fontWeight="bold"
                        >
                            Order Management
                        </Typography>

                        <Typography color="text.secondary">
                            Manage customer orders
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

                {/* Orders */}

                <Card>
                    <CardContent>

                        <Typography
                            variant="h6"
                            fontWeight="bold"
                            mb={3}
                        >
                            All Orders ({orders.length})
                        </Typography>

                        {loading ? (

                            <Typography>
                                Loading orders...
                            </Typography>

                        ) : orders.length === 0 ? (

                            <Typography
                                color="text.secondary"
                                sx={{
                                    py: 5,
                                    textAlign: "center",
                                }}
                            >
                                No orders found
                            </Typography>

                        ) : (

                            <div className="overflow-x-auto">

                                <div className="min-w-[900px]">

                                    {/* Header */}

                                    <div className="grid grid-cols-7 gap-4 font-bold border-b pb-3">

                                        <div>Order ID</div>
                                        <div>Customer</div>
                                        <div>Product</div>
                                        <div>Amount</div>
                                        <div>Date</div>
                                        <div>Status</div>
                                        <div>Action</div>

                                    </div>

                                    {/* Orders */}

                                    {orders.map((order) => (

                                        <div
                                            key={order._id}
                                            className="grid grid-cols-7 gap-4 items-center border-b py-4"
                                        >

                                            <div>
                                                #{order._id?.slice(-6)}
                                            </div>

                                            <div>
                                                {order.user?.name ||
                                                    order.user?.fullName ||
                                                    order.customer?.name ||
                                                    "Customer"}
                                            </div>

                                            <div>
                                                {order.product?.product_name ||
                                                    order.productName ||
                                                    "Product"}
                                            </div>

                                            <div>
                                                ₹{order.totalAmount ||
                                                    order.total ||
                                                    order.amount ||
                                                    0}
                                            </div>

                                            <div>
                                                {order.createdAt
                                                    ? new Date(
                                                        order.createdAt
                                                    ).toLocaleDateString()
                                                    : "N/A"}
                                            </div>

                                            {/* Status */}

                                            <div>
                                                <Select
                                                    size="small"
                                                    value={
                                                        order.status ||
                                                        "Pending"
                                                    }
                                                    onChange={(e) =>
                                                        updateStatus(
                                                            order._id,
                                                            e.target.value
                                                        )
                                                    }
                                                >
                                                    <MenuItem value="Pending">
                                                        Pending
                                                    </MenuItem>

                                                    <MenuItem value="Processing">
                                                        Processing
                                                    </MenuItem>

                                                    <MenuItem value="Shipped">
                                                        Shipped
                                                    </MenuItem>

                                                    <MenuItem value="Delivered">
                                                        Delivered
                                                    </MenuItem>

                                                    <MenuItem value="Cancelled">
                                                        Cancelled
                                                    </MenuItem>
                                                </Select>
                                            </div>

                                            <div>
                                                <Button
                                                    size="small"
                                                    variant="outlined"
                                                    startIcon={
                                                        <LocalShipping />
                                                    }
                                                    onClick={() =>
                                                        updateStatus(
                                                            order._id,
                                                            "Shipped"
                                                        )
                                                    }
                                                >
                                                    Ship
                                                </Button>
                                            </div>

                                        </div>

                                    ))}

                                </div>

                            </div>

                        )}

                    </CardContent>
                </Card>

            </Container>
        </Box>
    );
};

export default AdminOrders;