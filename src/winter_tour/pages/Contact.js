import React from "react";
import { Box, Typography, Container, Paper } from "@mui/material";
import Navbar from "../components/Navbar"; // Importujeme Navbar

function Contact() {
  return (
    <Box>
      <Navbar /> {/* Přidáme Navbar */}
      <Box
        sx={{
          textAlign: "center",
          padding: "20px",
          backgroundImage: "url(/contact-background.jpg)", // URL pozadí v public
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Typography variant="h3" component="h1" sx={{ color: "white", mb: 4 }}>
          Kontaktujte nás
        </Typography>
      </Box>
      <Container sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Typography variant="h5" gutterBottom>
            Kontaktní informace
          </Typography>
          <Typography variant="body1" paragraph>
            Pokud máte jakékoli dotazy nebo potřebujete více informací,
            neváhejte nás kontaktovat prostřednictvím níže uvedených kontaktních
            údajů.
          </Typography>

          <Typography variant="h6" gutterBottom>
            Jméno organizátora
          </Typography>
          <Typography variant="body1" paragraph>
            Jan Novák
          </Typography>

          <Typography variant="h6" gutterBottom>
            E-mail
          </Typography>
          <Typography variant="body1" paragraph>
            <a
              href="mailto:jan.novak@example.com"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              jan.novak@example.com
            </a>
          </Typography>

          <Typography variant="h6" gutterBottom>
            Telefon
          </Typography>
          <Typography variant="body1" paragraph>
            +420 123 456 789
          </Typography>

          <Typography variant="h6" gutterBottom>
            Sociální sítě
          </Typography>
          <Typography variant="body1">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              Facebook
            </a>
            <br />
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              Twitter
            </a>
            <br />
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              Instagram
            </a>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}

export default Contact;
