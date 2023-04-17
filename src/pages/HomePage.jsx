import { Container, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import EmployeeTable from "../components/EmployeeTable";

function HomePage() {
  const [filterDate, setFilterDate] = useState("");

  const handleFilterChange = (event) => {
    setFilterDate(event.target.value);
  };
  return (
    <Container maxWidth="md" sx={{ marginTop: "2rem", marginBottom: "5rem" }}>
      <Typography variant="h4" gutterBottom component="h1">
        Attendance List
      </Typography>
      <TextField
        label="Filter by Date"
        type="date"
        value={filterDate}
        onChange={handleFilterChange}
        InputLabelProps={{
          shrink: true,
        }}
        style={{ marginTop: "1rem", marginBottom: "2rem" }}
      />
      <EmployeeTable />
    </Container>
  );
}

export default HomePage;
