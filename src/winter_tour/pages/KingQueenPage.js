import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";

function KingQueen() {
  const tournaments = [
    { date: "September 22, 2024", location: "Praha" },
    { date: "October 27, 2024", location: "Brno" },
    { date: "November 24, 2024", location: "Ostrava" },
    { date: "December 22, 2024", location: "Plzeň" },
    { date: "January 20, 2025", location: "Liberec" },
    { date: "February 17, 2025", location: "Olomouc" },
    { date: "March 24, 2025", location: "Hradec Králové" },
  ];

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" component="h2" gutterBottom>
        King/Queen of the Court
      </Typography>
      <Typography variant="body1" gutterBottom>
        Staňte se králem nebo královnou kurtu v tomto jedinečném formátu
        turnajů. Přijďte a ukažte, kdo je nejlepší!
      </Typography>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Datum</TableCell>
              <TableCell>Místo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tournaments.map((tournament, index) => (
              <TableRow key={index}>
                <TableCell>{tournament.date}</TableCell>
                <TableCell>{tournament.location}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/wintertour"
        sx={{ marginTop: "20px" }}
      >
        Zpět na hlavní stránku
      </Button>
    </Box>
  );
}

export default KingQueen;
