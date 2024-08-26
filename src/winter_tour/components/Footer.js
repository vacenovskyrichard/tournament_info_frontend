// winter_tour/components/Footer.js

import React from "react";
import { Box, Typography } from "@mui/material";

function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: "#333333", // Tmavé pozadí
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderTop: "1px solid #444444", // Jemná čára pro oddělení
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <Typography
        variant="h6"
        component="div"
        sx={{
          color: "#FF5722", // Akcentová barva pro text
          fontWeight: "bold",
          marginBottom: 2,
          textTransform: "uppercase",
        }}
      >
        Sponzoři
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: "20px",
          alignItems: "center",
        }}
      >
        <img
          src="/sponsor1.jpg"
          alt="Sponzor 1"
          style={{ height: 40, borderRadius: 8 }}
        />
        {/* <img
          src="/sponsor2.jpg"
          alt="Sponzor 2"
          style={{ height: 40, borderRadius: 8 }}
        />
        <img
          src="/sponsor3.jpg"
          alt="Sponzor 3"
          style={{ height: 40, borderRadius: 8 }}
        /> */}
      </Box>
    </Box>
  );
}

export default Footer;
