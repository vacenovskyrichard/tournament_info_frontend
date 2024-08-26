import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Card, CardContent, CardMedia } from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function WinterTourHomepage() {
  const navigate = useNavigate();

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <Box
      sx={{
        backgroundColor: "#F5F5F5", // Světlé pozadí
        color: "#333333", // Tmavý text
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar />
      <Box
        sx={{
          textAlign: "center",
          padding: "20px",
          flex: 1,
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
          sx={{
            color: "#FF5722",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
          }} // Akcentová barva pro nadpis
        >
          Zimní série na Pankráci
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            marginTop: "30px",
            flexWrap: "wrap",
          }}
        >
          <Card
            sx={{
              maxWidth: 600,
              cursor: "pointer",
              backgroundColor: "#FFFFFF",
              color: "#333333",
            }}
            onClick={() => handleCardClick("/wintertour/mixova-serie")}
          >
            <CardMedia
              component="img"
              height="400"
              image="/mix-series2.jpg"
              alt="Mr. Mango mixy o Prize Money"
              sx={{ objectFit: "cover" }}
            />
            <CardContent>
              <Typography variant="h5" component="div">
                Mr. Mango mixy o 150 000,-
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Přichází zima s ní je tady další série mixových turnajů o
                nějakou tu kačku. Přijď si zahrát kvalitní beach volejbal a
                shrábnout výhru, která čeká nejen na první 3 týmy!
              </Typography>
            </CardContent>
          </Card>

          <Card
            sx={{
              maxWidth: 600,
              cursor: "pointer",
              backgroundColor: "#FFFFFF",
              color: "#333333",
            }}
            onClick={() => handleCardClick("/wintertour/king-queen")}
          >
            <CardMedia
              component="img"
              height="400"
              image="/king-queen2.jpg"
              alt="King/Queen of the Court"
              sx={{ objectFit: "cover" }}
            />
            <CardContent>
              <Typography variant="h5" component="div">
                King/Queen of the Court
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Staňte se kingem nebo qeenou kurtu. Jedinečný formát inspirovaný
                světovou sérií, který v Praze ještě nebyl!
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}

export default WinterTourHomepage;
