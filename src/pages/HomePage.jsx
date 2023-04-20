import { Container, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import EmployeeTable from "../components/EmployeeTable";

function HomePage() {
  const [selectedDate, setSelectedDate] = useState("");

  const handleSelectedDate = (event) => {
    setSelectedDate(event.target.value);
  };
  return (
    <Container
      maxWidth="md"
      sx={{
        marginTop: "2rem",
        marginBottom: "5rem",
      }}
    >
      <Typography variant="h4" gutterBottom component="h1">
        Attendance List
      </Typography>
      <TextField
        label="Filter by Date"
        type="date"
        value={selectedDate}
        onChange={handleSelectedDate}
        InputLabelProps={{
          shrink: true,
        }}
        style={{ marginTop: "1rem", marginBottom: "2rem" }}
      />
      <EmployeeTable selectedDate={selectedDate} />
    </Container>
  );
}

export default HomePage;
