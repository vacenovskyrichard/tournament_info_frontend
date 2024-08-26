import React from "react";
import { Box, Typography, Container, Paper } from "@mui/material";
import Navbar from "../components/Navbar"; // Importujeme Navbar

function AboutUs() {
  return (
    <Box>
      <Navbar /> {/* Přidáme Navbar */}
      <Box
        sx={{
          textAlign: "center",
          padding: "20px",
          backgroundImage: "url(/about-background.jpg)", // URL pozadí v public
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Typography variant="h3" component="h1" sx={{ color: "white", mb: 4 }}>
          O nás
        </Typography>
      </Box>
      <Container sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Typography variant="h5" gutterBottom>
            Kdo jsme
          </Typography>
          <Typography variant="body1" paragraph>
            Jsme nadšení organizátoři beach volejbalových turnajů s cílem
            přinést radost a vzrušení do každého zápasu. Naše turnaje jsou
            navrženy tak, aby vyhovovaly všem úrovním hráčů a poskytovaly
            skvělou příležitost pro zábavu a soutěžení.
          </Typography>
          <Typography variant="body1" paragraph>
            Naší misí je vytvářet nezapomenutelné zážitky a podporovat sportovní
            komunitu.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}

export default AboutUs;
