import {
  Alert,
  Button,
  createTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  ThemeProvider,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import EmployeeCard from "../components/EmployeeCard";
import { database } from "../config/app";
import { useAuth } from "../context/AuthProvider";
import { get, onValue, push, ref, set, update } from "firebase/database";
import { Login, Logout } from "@mui/icons-material";

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
          // setClockIn(true);

          setAlertMessage(
            `You already clocked in today by ${new Date(
              data.clockIn
            ).toLocaleTimeString("en-US", options)}. Tommorrow is another day!`
          );
          setAlertSeverity("info");
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
      if (data.date === currentDate && data.clockOut === "") {
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
        setAlertMessage(
          `You already clocked out today by ${new Date(
            data.clockOut
          ).toLocaleTimeString("en-US", options)}`
        );
        setAlertSeverity("error");
      }
    } else {
      setClockIn(false);
      setAlertMessage("You have not clocked In today ");
      setAlertSeverity("error");
    }
  };

  const theme = createTheme({
    palette: {
      custom: {
        main: "#458b94",
dark:"#284c5a",
        contrastText: "#fff",
      },
    },
  });
  return (
    <Grid
      px="2rem"
      container
      spacing={8}
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      direction="column"
      mb="2rem"
    >
      {alertMessage && (
        <Grid mt={1} mb={"-2rem"} item>
          <Alert severity={alertSeverity} onClose={() => setAlertMessage("")}>
            {alertMessage}
          </Alert>
        </Grid>
      )}

      <Grid item xs={12} container justifyContent="center" alignItems="center">
        <Grid item mt={{ xs: "2rem" }}>
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
          {/* {clockedIn ? (
            <Button disabled variant="contained" color="info">
              Clock In
            </Button>
          ) : ( */}
          <ThemeProvider theme={theme}>
            <Button
              startIcon={<Login />}
              variant="contained"
              color="custom"
              onClick={handleClockIn}
              sx={{paddingX:"1.5rem"}}
            >
              Clock In
            </Button>
          </ThemeProvider>
          {/* )} */}
        </Grid>
        <Grid item>
          {/* {clockedIn ? ( */}
          <Button
            endIcon={<Logout />}
            variant="contained"
            color="error"
            onClick={handleClickOpen}
            sx={{paddingX:"1rem"}}
          >
            Clock Out
          </Button>
          {/* ) : (
            <Button disabled variant="outlined" color="warning">
              Clock Out
            </Button>
          )} */}
        </Grid>

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"You are about to clock out for the day?"}
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
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Grid>
  );
}

export default ClockInClockOut;
