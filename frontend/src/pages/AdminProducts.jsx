
// src/pages/AdminProducts.jsx

import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    IconButton,
    Typography,
} from "@mui/material";

import {
    Add,
    Delete,
    Edit,
    ArrowBack,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

const AdminProducts = () => {
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);

    // =========================
    // Get Products
    // =========================

    const fetchProducts = async () => {
        try {
            const response = await fetch(
                "https://myshopecommerce-backend.onrender.com/api/productsdetails"
            );

            const data = await response.json();

            console.log("Products:", data);

            setProducts(data.data || []);

        } catch (error) {
            console.log("Products fetch error:", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // =========================
    // Delete Product
    // =========================

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmDelete) return;

        try {
            const response = await fetch(
                `https://myshopecommerce-backend.onrender.com/api/products/delete/${id}`,
                {
                    method: "DELETE",
                }
            );

            const data = await response.json();

            console.log("Delete response:", data);

            fetchProducts();

        } catch (error) {
            console.log("Delete error:", error);
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
                            Product Management
                        </Typography>

                        <Typography color="text.secondary">
                            Manage all products
                        </Typography>
                    </div>

                    <div className="flex gap-3">

                        <Button
                            variant="outlined"
                            startIcon={<ArrowBack />}
                            onClick={() =>
                                navigate("/admin-dashboard")
                            }
                        >
                            Dashboard
                        </Button>

                        <Button
                            variant="contained"
                            startIcon={<Add />}
                            onClick={() =>
                                navigate("/product-upload")
                            }
                        >
                            Add Product
                        </Button>

                    </div>

                </div>

                {/* Products */}

                <Card>

                    <CardContent>

                        <Typography
                            variant="h6"
                            fontWeight="bold"
                            mb={3}
                        >
                            All Products ({products.length})
                        </Typography>

                        {/* Desktop Header */}

                        <div className="hidden md:grid grid-cols-6 gap-4 font-bold border-b pb-3">

                            <div>Image</div>
                            <div>Name</div>
                            <div>Category</div>
                            <div>Price</div>
                            <div>Stock</div>
                            <div>Actions</div>

                        </div>

                        {/* Product List */}

                        {products.length === 0 ? (

                            <Typography
                                color="text.secondary"
                                sx={{
                                    py: 5,
                                    textAlign: "center",
                                }}
                            >
                                No products found
                            </Typography>

                        ) : (

                            products.map((product) => (

                                <div
                                    key={product._id}
                                    className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center border-b py-4"
                                >

                                    {/* Image */}

                                    <div>
                                        <img
                                            src={product.product_image}
                                            alt={product.product_name}
                                            className="w-16 h-16 object-cover rounded-lg border"
                                            onError={(e) => {
                                                e.target.src = "https://via.placeholder.com/80";
                                            }}
                                        />
                                    </div>

                                    {/* Name */}

                                    <div>
                                        <Typography fontWeight="bold">
                                            {product.product_name}
                                        </Typography>
                                    </div>

                                    {/* Category */}

                                    <div>
                                        {product.product_category ||
                                            "N/A"}
                                    </div>

                                    {/* Price */}

                                    <div>
                                        ₹
                                        {product.product_price}
                                    </div>

                                    {/* Stock */}

                                    <div>
                                        <span className="text-green-600 font-semibold">
                                            Available
                                        </span>
                                    </div>

                                    {/* Actions */}

                                    <div className="flex gap-2">

                                        <IconButton
                                            color="primary"
                                            onClick={() =>
                                                navigate(
                                                    `/admin/products/edit/${product._id}`
                                                )
                                            }
                                        >
                                            <Edit />
                                        </IconButton>

                                        <IconButton
                                            color="error"
                                            onClick={() =>
                                                handleDelete(
                                                    product._id
                                                )
                                            }
                                        >
                                            <Delete />
                                        </IconButton>

                                    </div>

                                </div>

                            ))
                        )}

                    </CardContent>

                </Card>

            </Container>
        </Box>
    );
};

export default AdminProducts;

