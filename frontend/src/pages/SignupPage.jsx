// src/pages/SignupPage.jsx

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
  Person,
  Email,
  Phone,
  Lock,
  Visibility,
  VisibilityOff,
  Google,
} from "@mui/icons-material";

import signupImage from "../assets/login.avif";

export function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [fullName, setfullName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setconfirmPassword] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();

     // Check password and confirm password
  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }


  try {
    const response = await fetch(
      "http://localhost:5000/api/users/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: fullName,
          email: email,
          phone: phone,
          password: password,
        }),
      }
    );

    const result = await response.json();

    if (response.ok) {
      alert(result.message);

      // Clear form
     setfullName("")
     setEmail("")
     setPhone("")
     setPassword("")
     setconfirmPassword("")

      // Redirect to login page if using React Router
      // navigate("/login");
    } else {
      alert(result.message);
    }
  } catch (error) {
    console.error(error);
    alert("Server Error");
  }

    console.log("Signup Successful");
  };

  return (
    <Container maxWidth="lg" className="py-10">
      <Paper
        elevation={6}
        className="rounded-3xl overflow-hidden"
      >
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Side Image */}
          <div className="hidden md:flex items-center justify-center bg-indigo-50 p-8">
            <img
              src={signupImage}
              alt="Signup"
              className="w-full max-w-md"
            />
          </div>

          {/* Right Side Form */}
          <Box className="p-8 md:p-12">
            <Typography
              variant="h4"
              fontWeight="bold"
              gutterBottom
            >
              Create Your Account 🚀
            </Typography>

            <Typography color="text.secondary" mb={4}>
              Join MyShop and start shopping today.
            </Typography>

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Full Name"
                name="fullName"
                value={fullName}
                onChange={(e)=> setfullName(e.target.value)}
                margin="normal"
                required
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person />
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <TextField
                fullWidth
                label="Email Address"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                required
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
                label="Phone Number"
                type="tel"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                margin="normal"
                required
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Phone />
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <TextField
                fullWidth
                label="Password"
                 name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                margin="normal"
                required
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

              <TextField
                fullWidth
                label="Confirm Password"
                
                value={confirmPassword}
                onChange={(e) => setconfirmPassword(e.target.value)}
                type={showConfirmPassword ? "text" : "password"}
                margin="normal"
                required
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
                            setShowConfirmPassword(
                              !showConfirmPassword
                            )
                          }
                        >
                          {showConfirmPassword ? (
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

              <FormControlLabel
                control={<Checkbox required />}
                label="I agree to the Terms & Conditions"
                sx={{ mt: 2 }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{
                  mt: 3,
                  py: 1.5,
                  borderRadius: 2,
                }}
              >
                Create Account
              </Button>

              <Button
                fullWidth
                variant="outlined"
                startIcon={<Google />}
                sx={{
                  mt: 2,
                  py: 1.5,
                  borderRadius: 2,
                }}
              >
                Continue with Google
              </Button>

              <Typography
                align="center"
                mt={4}
              >
                Already have an account?{" "}
                <Link href="/login" underline="hover">
                  Login
                </Link>
              </Typography>
            </form>
          </Box>
        </div>
      </Paper>
    </Container>
  );
}