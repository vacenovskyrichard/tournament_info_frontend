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

function MixSeries() {
  const tournaments = [
    { date: "September 15, 2024", location: "Praha" },
    { date: "October 20, 2024", location: "Brno" },
    { date: "November 18, 2024", location: "Ostrava" },
    { date: "December 16, 2024", location: "Plzeň" },
    { date: "January 13, 2025", location: "Liberec" },
    { date: "February 10, 2025", location: "Olomouc" },
    { date: "March 17, 2025", location: "Hradec Králové" },
  ];

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Mixová Série
      </Typography>
      <Typography variant="body1" gutterBottom>
        Mixová série je vzrušující formát turnajů, kde muži a ženy hrají
        společně. Každý měsíc se koná jeden turnaj na různých místech v České
        republice.
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

export default MixSeries;
