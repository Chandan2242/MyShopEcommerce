// src/components/Header.jsx

import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  TextField,
  InputAdornment,
  Badge,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
} from "@mui/material";

import {
  Search,
  ShoppingCart,
  AccountCircle,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
   const { cartItems } = useCart();
  const navigate = useNavigate();

const user = JSON.parse(localStorage.getItem("user"));

  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={2}
        sx={{
          bgcolor: "#fff",
          color: "#000",
        }}
      >
        <Toolbar className="flex justify-between">

          {/* Left */}
          <div className="flex items-center gap-6">

            {/* Mobile Menu */}
            <IconButton
              className="md:hidden"
              onClick={toggleDrawer}
            >
              <MenuIcon />
            </IconButton>

            {/* Logo */}
            <Typography
              variant="h5"
              className="font-bold text-blue-600"
            >
              MyShop
            </Typography>

            {/* Desktop Navigation */}
            <div className="hidden md:flex gap-2">
              <NavLink color="inherit" to="/">Home</NavLink>
              <NavLink color="inherit" to="/products">Products</NavLink>
              <NavLink color="inherit" to="/orders">Orders</NavLink>
            </div>

          </div>

          {/* Desktop Search */}
          <Box className="hidden lg:block w-[380px]">
            <TextField
              fullWidth
              size="small"
              placeholder="Search products..."
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                        <IconButton size="small">
                      <Search />
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Box>

          {/* Right */}
          <div className="flex items-center gap-2">

            {/* Mobile Search */}
            {/* <IconButton className="lg:hidden">
              <Search />
            </IconButton> */}

            {/* Cart */}
            <IconButton>
              <NavLink to="/cart">
              <Badge badgeContent={cartItems.length} color="error">
                <ShoppingCart />
              </Badge>
              </NavLink>
            </IconButton>

            {/* Profile */}
            <IconButton onClick={handleProfileOpen}>
              <AccountCircle />
            </IconButton>

            {/* Desktop Buttons */}
            <div className="hidden md:flex gap-2">

              <Button variant="outlined">
                <NavLink to="/login">
                Login
                </NavLink>
              </Button>

              <Button variant="contained">
                <NavLink to="/signup">
                Sign Up
                </NavLink>
              </Button>
            </div>

          </div>
        </Toolbar>
      </AppBar>

      {/* Profile Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleProfileClose}
      >
        <MenuItem
  onClick={() => {
    navigate("/profile");
    handleProfileClose();
  }}
>
  Profile
</MenuItem>

<MenuItem
  onClick={() => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    navigate("/login");

    handleProfileClose();
  }}
>
  Logout
</MenuItem>
      </Menu>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={toggleDrawer}
      >
        <Box sx={{ width: 260 }}>

          <Typography
            variant="h5"
            className="p-5 font-bold text-blue-600"
          >
            MyShop
          </Typography>

          <div className="px-4 pb-4">
            <TextField
              fullWidth
              size="small"
              placeholder="Search products..."
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                        <IconButton size="small">
                      <Search />
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          </div>

          <List>
              <NavLink to="/">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>
              </NavLink>

              <NavLink to="/products">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Products" />
              </ListItemButton>
            </ListItem>
              </NavLink>

              <NavLink to="/orders">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Orders" />
              </ListItemButton>
            </ListItem>
              </NavLink>
              <NavLink to="/cart">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Cart" />
              </ListItemButton>
            </ListItem>
            </NavLink>

          </List>

          <div className="flex flex-col gap-3 p-4">
              <NavLink to="/login">
            <Button
              variant="outlined"
              fullWidth
            >
              Login
            </Button>
                </NavLink>

                <NavLink to="/signup">
            <Button
              variant="contained"
              fullWidth
            >
              Sign Up
            </Button>
              </NavLink>
          </div>

        </Box>
      </Drawer>
    </>
  );
}