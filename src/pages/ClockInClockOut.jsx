import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
} from "@mui/material";
import React, { useState } from "react";
import EmployeeCard from "../components/EmployeeCard";
import { database } from "../config/app";
import { useAuth } from "../context/AuthProvider";
import { get, onValue, push, ref, set, update } from "firebase/database";

function ClockInClockOut() {
  const { user } = useAuth();
  const [clockedIn, setClockIn] = useState(false);

  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const options = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: "Africa/Lagos",
  };

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
          .then(() => {
            console.log("successful");
            setClockIn(true);

            setAlertMessage("Clocked in successfully!");
            setAlertSeverity("success");
          })
          .catch((error) => {
            console.error(
              "Error writing clock in data to the database:",
              error
            );

            setAlertMessage("Error clocking in!");
            setAlertSeverity("error");
          });
      } else {
        const data = snapshot.val();
        const currentDate = new Date().toISOString().slice(0, 10);
        if (data.date !== currentDate) {
          push(employeeRef, employeeData)
            .then(() => {
              setClockIn(true);

              setAlertMessage("Clocked in successfully!");
              setAlertSeverity("success");
            })
            .catch((error) => {
              console.error(
                "Error writing clock in data to the database:",
                error
              );

              setAlertMessage("Error clocking in!");
              setAlertSeverity("error");
            });
        } else {
          setClockIn(true);

          setAlertMessage("Clocked in successfully!");
          setAlertSeverity("success");
        }
      }
    });
  };

  const handleClockOut = async () => {
    // handle clock out logic
    setOpen(false);
    const employeeRef = ref(
      database,
      `employees/${user.uid}/${new Date().toISOString().slice(0, 10)}`
    );

    const snapshot = await get(employeeRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      const currentDate = new Date().toISOString().slice(0, 10);
      if (data.date === currentDate) {
        update(employeeRef, {
          clockOut: new Date().toISOString(),
        })
          .then(() => {
            setClockIn(false);
            setAlertMessage("Clocked out successfully");
            setAlertSeverity("success");
          })
          .catch((error) => {
            console.error(
              "Error writing clock out data to the database:",
              error
            );
          });
      } else {
        const employeeData = {
          name: user.displayName,
          email: user.email,
          clockIn: "",
          clockOut: new Date().toISOString(),
          date: new Date().toISOString().slice(0, 10),
        };
        push(employeeRef, employeeData)
          .then(() => setClockIn(false))
          .catch((error) => {
            console.error("Error clocking out:", error);
            setAlertMessage("You have not clocked In today ");
            setAlertSeverity("error");
          });
      }
    } else {
      setClockIn(false);
      setAlertMessage("You have not clocked In today ");
      setAlertSeverity("error");
    }
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
      mb="1rem"
    >
      {alertMessage && (
        <Grid mt={1} mb={"-2rem"} item>
          <Alert severity={alertSeverity} onClose={() => setAlertMessage("")}>
            {alertMessage}
          </Alert>
        </Grid>
      )}

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
            <Button
              variant="outlined"
              color="warning"
              onClick={handleClickOpen}
            >
              Clock Out
            </Button>
          ) : (
            <Button disabled variant="outlined" color="warning">
              Clock Out
            </Button>
          )}
        </Grid>

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"You are about to Clock Out for the day?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              It's {new Date().toLocaleTimeString("en-US", options)}. You have
              decided to go now?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>No</Button>
            <Button onClick={handleClockOut} autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Grid>
  );
}

export default ClockInClockOut;
