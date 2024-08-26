import React from "react";
import { Box, Typography, Container, Paper } from "@mui/material";
import Navbar from "../components/Navbar"; // Importujeme Navbar

function MixovaSerie() {
  return (
    <Box>
      <Navbar /> {/* Přidáme Navbar */}
      <Box
        sx={{
          textAlign: "center",
          padding: "20px",
          backgroundImage: "url(/mix-series-background.jpg)", // URL pozadí v public
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Typography variant="h3" component="h1" sx={{ color: "white", mb: 4 }}>
          Mixová Série
        </Typography>
      </Box>
      <Container sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Typography variant="h5" gutterBottom>
            Formát turnaje
          </Typography>
          <Typography variant="body1" paragraph>
            Popis formátu turnaje, pravidla, a vše, co potřebujete vědět o
            mixových zápasech.
          </Typography>
          {/* Tabulka s termíny turnajů */}
          <Typography variant="h6" gutterBottom>
            Termíny turnajů
          </Typography>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="body2">
              Září: 15.9.2024
              <br />
              Říjen: 12.10.2024
              <br />
              Listopad: 9.11.2024
              <br />
              Prosinec: 14.12.2024
              <br />
              Leden: 11.1.2025
              <br />
              Únor: 8.2.2025
              <br />
              Březen: 15.3.2025
              <br />
              Duben: 12.4.2025
              <br />
            </Typography>
          </Paper>
        </Paper>
      </Container>
    </Box>
  );
}

export default MixovaSerie;
