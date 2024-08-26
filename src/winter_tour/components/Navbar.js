import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Beach Volejbalové Turnaje
        </Typography>
        <Button
          component={Link}
          to="/wintertour"
          color="inherit"
          sx={{ marginRight: 2 }}
        >
          Domů
        </Button>
        <Button
          component={Link}
          to="/wintertour/o-nas"
          color="inherit"
          sx={{ marginRight: 2 }}
        >
          O nás
        </Button>
        <Button component={Link} to="/wintertour/kontakt" color="inherit">
          Kontakt
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
