import React, { useEffect, useState } from "react";
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Container,
    Divider,
    Grid,
    Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

export function Profile() {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getProfile();
    }, []);

    const getProfile = async () => {
        try {
            const token = localStorage.getItem("token");

            console.log("Token:", token);

            if (!token) {
                navigate("/login");
                return;
            }

            const response = await fetch(
                "http://localhost:5000/api/users/profile",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();

            console.log("Profile Status:", response.status);
            console.log("Profile Response:", data);

            if (response.ok) {
                // Backend response ke according user/data dono handle
                const profileUser = data.user || data.data;

                if (profileUser) {
                    setUser(profileUser);
                } else {
                    console.log("User data not found:", data);
                    alert(data.message || "Profile data not found");
                }
            } else {
                console.log("Profile API Error:", data);

                localStorage.removeItem("token");
                localStorage.removeItem("user");

                navigate("/login");
            }

        } catch (error) {
            console.error("Profile Error:", error);
            alert("Server Error");
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
    };

    if (loading) {
        return (
            <Container
                sx={{
                    mt: 10,
                    textAlign: "center",
                }}
            >
                <CircularProgress />

                <Typography mt={2}>
                    Loading Profile...
                </Typography>
            </Container>
        );
    }

    if (!user) {
        return (
            <Container
                sx={{
                    mt: 10,
                    textAlign: "center",
                }}
            >
                <Typography variant="h6">
                    Profile not found
                </Typography>

                <Button
                    variant="contained"
                    sx={{ mt: 2 }}
                    onClick={() => navigate("/login")}
                >
                    Go to Login
                </Button>
            </Container>
        );
    }

    return (
        <Container
            maxWidth="md"
            sx={{
                mt: 5,
                mb: 5,
            }}
        >
            <Card elevation={4}>
                <CardContent sx={{ p: 5 }}>

                    {/* Profile Header */}

                    <Box
                        sx={{
                            textAlign: "center",
                        }}
                    >
                        <Avatar
                            sx={{
                                width: 120,
                                height: 120,
                                fontSize: 45,
                                margin: "auto",
                            }}
                        >
                            {(
                                user.fullName ||
                                user.name ||
                                "U"
                            )
                                .charAt(0)
                                .toUpperCase()}
                        </Avatar>

                        <Typography
                            variant="h4"
                            mt={2}
                            fontWeight="bold"
                        >
                            {user.fullName || user.name}
                        </Typography>

                        <Typography color="text.secondary">
                            {user.email}
                        </Typography>
                    </Box>

                    <Divider sx={{ my: 4 }} />

                    {/* User Information */}

                    <Grid container spacing={3}>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <Typography fontWeight="bold">
                                Full Name
                            </Typography>

                            <Typography>
                                {user.fullName || user.name || "N/A"}
                            </Typography>
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <Typography fontWeight="bold">
                                Email
                            </Typography>

                            <Typography>
                                {user.email || "N/A"}
                            </Typography>
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <Typography fontWeight="bold">
                                Phone
                            </Typography>

                            <Typography>
                                {user.phone || "N/A"}
                            </Typography>
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <Typography fontWeight="bold">
                                Role
                            </Typography>

                            <Typography
                                sx={{
                                    textTransform: "capitalize",
                                    fontWeight: "bold",
                                }}
                            >
                                {user.role || "user"}
                            </Typography>
                        </Grid>

                    </Grid>

                    {/* Logout */}

                    <Box mt={5}>
                        <Button
                            color="error"
                            variant="contained"
                            fullWidth
                            onClick={logout}
                        >
                            Logout
                        </Button>
                    </Box>

                </CardContent>
            </Card>
        </Container>
    );
}