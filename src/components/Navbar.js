// winter_tour/components/Navbar.js

import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#1e1e1e" }}>
      {" "}
      {/* Tmavé pozadí */}
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, color: "#FF5722" }}>
          Beach Volejbalové Turnaje
        </Typography>
        <Box sx={{ display: "flex", gap: "16px" }}>
          <Link to="/wintertour" style={{ textDecoration: "none" }}>
            <Button color="inherit" sx={{ color: "#e0e0e0" }}>
              Domů
            </Button>
          </Link>
          <Link to="/wintertour/o-nas" style={{ textDecoration: "none" }}>
            <Button color="inherit" sx={{ color: "#e0e0e0" }}>
              O nás
            </Button>
          </Link>
          <Link to="/wintertour/kontakt" style={{ textDecoration: "none" }}>
            <Button color="inherit" sx={{ color: "#e0e0e0" }}>
              Kontakt
            </Button>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
