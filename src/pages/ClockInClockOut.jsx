import { Button, Grid } from "@mui/material";
import React, { useState } from "react";
import EmployeeCard from "../components/EmployeeCard";
import { database } from "../config/app";
import { useAuth } from "../context/AuthProvider";
import { onValue, push, ref, set, update } from "firebase/database";

function ClockInClockOut() {
  const { user } = useAuth();
  const [clockedIn, setClockIn] = useState(false);

  console.log(database);

  const handleClockIn = async () => {
    // handle clock in logic

    const employeeRef = ref(
      database,
      `employees/${user.uid}/${new Date().toISOString().slice(0, 10)}`
    );

    const employeeData = {
      name: user.displayName,
      email: user.email,
      clockIn: new Date().toISOString(),
      clockOut: "",
      date: new Date().toISOString().slice(0, 10),
    };

    await onValue(employeeRef, (snapshot) => {
      if (!snapshot.exists()) {
        set(employeeRef, employeeData)
          .then(() => console.log("successful"))
          .catch((error) => {
            console.error(
              "Error writing clock in data to the database:",
              error
            );
          });
      } else {
        const data = snapshot.val();
        const currentDate = new Date().toISOString().slice(0, 10);
        if (data.date !== currentDate) {
          push(employeeRef, employeeData);
        }
      }
    });

    setClockIn(true);
  };

  const handleClockOut = async () => {
    // handle clock out logic

    const employeeRef = ref(
      database,
      `employees/${user.uid}/${new Date().toISOString().slice(0, 10)}`
    );

    await onValue(employeeRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const currentDate = new Date().toISOString().slice(0, 10);
        if (data.date === currentDate) {
          update(employeeRef, {
            clockOut: new Date().toISOString(),
          });
          setClockIn(false);
        } else {
          const employeeData = {
            name: user.displayName,
            email: user.email,
            clockIn: "",
            clockOut: new Date().toISOString(),
            date: new Date().toISOString().slice(0, 10),
          };
          push(employeeRef, employeeData);
          setClockIn(false);
        }
      }
    });
  };
  return (
    <Grid
      px="2rem"
      container
      spacing={8}
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      direction="column"
    >
      <Grid item xs={12} container justifyContent="center" alignItems="center">
        <Grid item>
          <EmployeeCard />
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        container
        justifyContent="center"
        alignItems="center"
        spacing="1rem"
      >
        <Grid item>
          {clockedIn ? (
            <Button disabled variant="contained" color="info">
              Clock In
            </Button>
          ) : (
            <Button variant="contained" color="info" onClick={handleClockIn}>
              Clock In
            </Button>
          )}
        </Grid>
        <Grid item>
          {clockedIn ? (
            <Button variant="outlined" color="warning" onClick={handleClockOut}>
              Clock Out
            </Button>
          ) : (
            <Button disabled variant="outlined" color="warning">
              Clock Out
            </Button>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ClockInClockOut;
