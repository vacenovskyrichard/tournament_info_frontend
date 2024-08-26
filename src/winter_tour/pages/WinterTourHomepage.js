import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
} from "@mui/material";
import { Event, Info } from "@mui/icons-material";
import { Link } from "react-router-dom"; // Importujeme Link
import Navbar from "../components/Navbar"; // Importujeme Navbar

function WinterTourHomepage() {
  return (
    <Box>
      <Navbar /> {/* Přidáme Navbar */}
      <Box
        sx={{
          textAlign: "center",
          padding: "20px",
          minHeight: "100vh",
          backgroundImage: "url(/beach-background.jpg)", // URL pozadí v public
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{ color: "white", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)" }}
        >
          Beach Volejbalové Turnaje
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            marginTop: "30px",
          }}
        >
          <Link
            to="/wintertour/mixova-serie"
            style={{ textDecoration: "none" }}
          >
            <Card sx={{ maxWidth: 345, cursor: "pointer" }}>
              <CardMedia
                component="img"
                height="140"
                image="/mix-series.jpg" // Použití obrázku z public
                alt="Mixová Série"
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  Mixová Série
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Přijďte se podívat na mixové turnaje, kde se muži a ženy
                  utkávají ve vzrušujících zápasech.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary" startIcon={<Event />}>
                  Zobrazit Turnaje
                </Button>
              </CardActions>
            </Card>
          </Link>

          <Link to="/wintertour/king-queen" style={{ textDecoration: "none" }}>
            <Card sx={{ maxWidth: 345, cursor: "pointer" }}>
              <CardMedia
                component="img"
                height="140"
                image="/king-queen.jpg" // Použití obrázku z public
                alt="King/Queen of the Court"
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  King/Queen of the Court
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Staňte se králem nebo královnou kurtu v těchto napínavých
                  turnajích s jedinečným formátem.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary" startIcon={<Info />}>
                  Více Informací
                </Button>
              </CardActions>
            </Card>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}

export default WinterTourHomepage;
