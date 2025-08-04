import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const navItems = [
  { label: "Beranda", path: "/" },
  { label: "Lapor", path: "/lapor" },
  { label: "Riwayat", path: "/riwayat" },
  { label: "Berita", path: "/berita" },
  { label: "Admin", path: "/admin" },
];

export default function NavbarComponent() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  // Simulasi login user 
  const user = {
    name: "Admin Desa",
    isLoggedIn: true,
  };

  const toggleDrawer = () => setMobileOpen(!mobileOpen);

  const handleAvatarClick = (event) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);
  const handleLogout = () => {
    handleCloseMenu();
    // tambah logika logout
    alert("Anda telah logout");
  };

  const drawer = (
    <Box onClick={toggleDrawer} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        🌱 Lapor Sampah
      </Typography>
      <List>
        {navItems.map((item) => (
          <ListItemButton
            key={item.label}
            component={NavLink}
            to={item.path}
            sx={{
              "&.active": {
                backgroundColor: "#e0f2f1",
              },
            }}
          >
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
        {user.isLoggedIn && (
          <ListItemButton onClick={handleLogout}>
            <ListItemText primary="Logout" />
          </ListItemButton>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          <Typography
            variant="h6"
            component={NavLink}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: "none",
              color: "inherit",
              fontWeight: "bold",
            }}
          >
             <img src="public/Favicon.png" alt="LOGO" style={{ width: "35px", marginRight: "10px" }} />
             Lapor Sampah
          </Typography>

          {/* Menu Mobile */}
          <Box sx={{ display: { xs: "block", md: "none" } }}>
            <IconButton color="inherit" onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
          </Box>

          {/* Menu Desktop */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2, alignItems: "center" }}>
            {navItems.map((item) => (
              <Button
                key={item.label}
                component={NavLink}
                to={item.path}
                sx={{
                  color: "text.primary",
                  fontWeight: "medium",
                  textTransform: "none",
                  "&.active": {
                    color: "#2e7d32",
                    borderBottom: "2px solid #2e7d32",
                    borderRadius: 0,
                  },
                }}
              >
                {item.label}
              </Button>
            ))}

            {/* foto ye */}
            {user.isLoggedIn ? (
              <>
                <IconButton onClick={handleAvatarClick} sx={{ ml: 2 }}>
                  <Avatar sx={{ bgcolor: "#2e7d32", width: 32, height: 32 }}>
                    {user.name[0]}
                  </Avatar>
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleCloseMenu}
                >
                  <MenuItem disabled>{user.name}</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <Button variant="outlined" size="small" sx={{ ml: 2 }}>
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={toggleDrawer}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { width: 240 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}
