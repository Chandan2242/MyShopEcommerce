// src/components/Footer.jsx

import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider,
} from "@mui/material";

import {
  Facebook,
  Instagram,
  Twitter,
  LinkedIn,
  GitHub,
} from "@mui/icons-material";

export function Footer() {
  return (
    <Box className="bg-gray-900 text-white mt-10">
      <Container maxWidth="xl" className="py-10">
        <Grid container spacing={5}>
          {/* Logo */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography
              variant="h4"
              className="font-bold text-blue-400"
            >
              MyShop
            </Typography>

            <Typography
              variant="body2"
              className="mt-4 text-gray-300 leading-7"
            >
              MyShop is your one-stop destination for quality products,
              fast delivery, secure payments, and the best shopping
              experience.
            </Typography>

            <Box className="flex gap-2 mt-5">
              <IconButton sx={{ color: "white" }}>
                <Facebook />
              </IconButton>

              <IconButton sx={{ color: "white" }}>
                <Instagram />
              </IconButton>

              <IconButton sx={{ color: "white" }}>
                <Twitter />
              </IconButton>

              <IconButton sx={{ color: "white" }}>
                <LinkedIn />
              </IconButton>

              <IconButton sx={{ color: "white" }}>
                <GitHub />
              </IconButton>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography
              variant="h6"
              className="font-semibold mb-4"
            >
              Quick Links
            </Typography>

            <Box className="flex flex-col gap-2">
              <Link href="#" underline="hover" color="inherit">
                Home
              </Link>

              <Link href="#" underline="hover" color="inherit">
                Products
              </Link>

              <Link href="#" underline="hover" color="inherit">
                Orders
              </Link>

              <Link href="#" underline="hover" color="inherit">
                Cart
              </Link>

              <Link href="#" underline="hover" color="inherit">
                Contact Us
              </Link>
            </Box>
          </Grid>

          {/* Customer Support */}
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography
              variant="h6"
              className="font-semibold mb-4"
            >
              Customer Support
            </Typography>

            <Typography className="mb-2">
              📧 support@myshop.com
            </Typography>

            <Typography className="mb-2">
              📞 +91 9876543210
            </Typography>

            <Typography className="mb-2">
              📍 New Delhi, India
            </Typography>

            <Typography>
              Mon - Sat : 9:00 AM - 7:00 PM
            </Typography>
          </Grid>
        </Grid>

        <Divider
          sx={{
            backgroundColor: "#555",
            marginTop: "30px",
            marginBottom: "20px",
          }}
        />

        <Typography
          align="center"
          className="text-gray-400"
        >
          © {new Date().getFullYear()} MyShop. All Rights Reserved.
        </Typography>
      </Container>
    </Box>
  );
}