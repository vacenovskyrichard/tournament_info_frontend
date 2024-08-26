import React, { useState } from "react";
import {
  Box,
  Typography,
  CardMedia,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Collapse,
} from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

function KingQueen() {
  const [openRows, setOpenRows] = useState({});

  const handleExpandClick = (index) => {
    setOpenRows((prev) => ({ ...prev, [index]: !prev[index] }));
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
          King/Queen of the Court
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: "20px",
            alignItems: "center",
            marginTop: "20px",
            maxWidth: "1200px",
          }}
        >
          <CardMedia
            component="img"
            height="400"
            image="/king-queen2.jpg"
            alt="King/Queen of the Court"
            sx={{ objectFit: "cover", borderRadius: 2 }}
          />
          <Box sx={{ textAlign: "left", maxWidth: "600px" }}>
            <Typography variant="h5" component="div" sx={{ mb: 2 }}>
              King/Queen of the Court
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Staňte se kingem nebo queenou kurtu. Jedinečný formát inspirovaný
              světovou sérií, který v Praze ještě nebyl!
            </Typography>
          </Box>
        </Box>

        <Box sx={{ marginTop: 4, width: "100%", maxWidth: "1200px" }}>
          <Typography variant="h6" component="div" gutterBottom>
            Tabulka s turnaji
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Datum</TableCell>
                  <TableCell>Kapacita</TableCell>
                  <TableCell>Počet přihlášených týmů</TableCell>
                  <TableCell>Informace</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[
                  {
                    date: "01.02.2024",
                    capacity: 16,
                    teams: 12,
                    details:
                      "Podrobný popis turnaje, pravidla a další informace.",
                  },
                  {
                    date: "20.02.2024",
                    capacity: 16,
                    teams: 14,
                    details:
                      "Podrobný popis turnaje, pravidla a další informace.",
                  },
                ].map((row, index) => (
                  <React.Fragment key={index}>
                    <TableRow>
                      <TableCell>{row.date}</TableCell>
                      <TableCell>{row.capacity}</TableCell>
                      <TableCell>{row.teams}</TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => handleExpandClick(index)}
                          aria-expanded={openRows[index]}
                          aria-label="show more"
                        >
                          {openRows[index] ? (
                            <ExpandLessIcon />
                          ) : (
                            <ExpandMoreIcon />
                          )}
                        </IconButton>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={4}>
                        <Collapse in={openRows[index]}>
                          <Typography variant="body2" sx={{ padding: 2 }}>
                            {row.details}
                          </Typography>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}

export default KingQueen;
