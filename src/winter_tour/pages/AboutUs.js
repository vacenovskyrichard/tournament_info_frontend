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
          backgroundImage: "url(/about-us-background.jpg)",
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
            Naše mise
          </Typography>
          <Typography variant="body1" paragraph>
            Jsme nadšenci do beach volejbalu a organizujeme turnaje, které
            spojují lidi a podporují sportovní ducha. Naší misí je vytvářet
            skvělé příležitosti pro hráče všech úrovní, aby se mohli zlepšovat a
            bavit.
          </Typography>
          <Typography variant="h5" gutterBottom>
            Náš tým
          </Typography>
          <Typography variant="body1" paragraph>
            Náš tým se skládá z profesionálních organizátorů sportovních
            událostí, trenérů a dobrovolníků, kteří jsou oddaní vytváření
            nezapomenutelných zážitků. Společně pracujeme na každém detailu, aby
            každý turnaj probíhal hladce.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}

export default AboutUs;
