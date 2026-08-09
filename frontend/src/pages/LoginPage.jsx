// src/pages/LoginPage.jsx

import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import {
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  Google,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

import loginImage from "../assets/login.avif";

export function LoginPage() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      console.log(data)
      if (data.user.role === "user") {
        localStorage.setItem("token", data.token);

        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );

        // alert("Login Successful");

        navigate("/profile");
      }
      else if (data.user.role === "admin"){
         navigate("/admin-dashboard");
      }
      else {
        alert(data.message || "Login Failed");
      }
    } catch (error) {
      console.log(error);
      alert("Server Error");
    }
  };

  return (
    <Container maxWidth="lg" className="py-10">
      <Paper
        elevation={5}
        className="rounded-3xl overflow-hidden"
      >
        <div className="grid grid-cols-1 md:grid-cols-2">

          {/* Left Image */}
          <div className="hidden md:flex items-center justify-center bg-blue-50 p-8">
            <img
              src={loginImage}
              alt="Login"
              className="w-full max-w-md"
            />
          </div>

          {/* Login Form */}
          <Box className="p-8 md:p-12">
            <Typography
              variant="h4"
              fontWeight="bold"
              gutterBottom
            >
              Welcome Back 👋
            </Typography>

            <Typography color="text.secondary" mb={4}>
              Sign in to continue shopping.
            </Typography>

            <form onSubmit={handleSubmit}>

              <TextField
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                margin="normal"
                required
                value={formData.email}
                onChange={handleChange}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email />
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <TextField
                fullWidth
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                margin="normal"
                required
                value={formData.password}
                onChange={handleChange}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() =>
                            setShowPassword(!showPassword)
                          }
                        >
                          {showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <div className="flex justify-between items-center mt-3">

                <FormControlLabel
                  control={<Checkbox />}
                  label="Remember Me"
                />

                <Link href="#" underline="hover">
                  Forgot Password?
                </Link>

              </div>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{
                  mt: 3,
                  py: 1.5,
                }}
              >
                Login
              </Button>

              <Button
                fullWidth
                variant="outlined"
                startIcon={<Google />}
                sx={{
                  mt: 2,
                  py: 1.5,
                }}
              >
                Continue with Google
              </Button>

              <Typography
                align="center"
                mt={4}
              >
                Don't have an account?{" "}
                <Link href="/signup">
                  Sign Up
                </Link>
              </Typography>

            </form>
          </Box>
        </div>
      </Paper>
    </Container>
  );
}