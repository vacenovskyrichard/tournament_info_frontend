// winter_tour/components/Navbar.js

import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#333333" }}>
      {" "}
      {/* Tmavé pozadí */}
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, color: "#FFFFFF" }}>
          Beach Volejbalové Turnaje
        </Typography>
        <Box sx={{ display: "flex", gap: "16px" }}>
          <Link to="/wintertour" style={{ textDecoration: "none" }}>
            <Button color="inherit" sx={{ color: "#FFFFFF" }}>
              Domů
            </Button>
          </Link>
          <Link to="/wintertour/o-nas" style={{ textDecoration: "none" }}>
            <Button color="inherit" sx={{ color: "#FFFFFF" }}>
              O nás
            </Button>
          </Link>
          <Link to="/wintertour/kontakt" style={{ textDecoration: "none" }}>
            <Button color="inherit" sx={{ color: "#FFFFFF" }}>
              Kontakt
            </Button>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
