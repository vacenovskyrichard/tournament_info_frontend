import React from "react";
import {
  Box,
  Typography,
  Container,
  Paper,
  TextField,
  Button,
} from "@mui/material";
import Navbar from "../components/Navbar"; // Importujeme Navbar

function Contact() {
  return (
    <Box>
      <Navbar /> {/* Přidáme Navbar */}
      <Box
        sx={{
          textAlign: "center",
          padding: "20px",
          backgroundImage: "url(/contact-background.jpg)",
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
            Rádi vás uslyšíme
          </Typography>
          <Typography variant="body1" paragraph>
            Pokud máte jakékoliv dotazy, neváhejte nás kontaktovat
            prostřednictvím níže uvedeného formuláře. Budeme se snažit odpovědět
            co nejdříve.
          </Typography>
          <form>
            <TextField
              label="Vaše jméno"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Zpráva"
              variant="outlined"
              fullWidth
              margin="normal"
              multiline
              rows={4}
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ mt: 2 }}
            >
              Odeslat
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}

export default Contact;
