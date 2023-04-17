import {

  Card,
  CardContent,
  
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import { useAuth } from "../context/AuthProvider";

function EmployeeCard() {
  const { user } = useAuth();
  return (
    <Card sx={{ maxWidth: 240, minWidth: "fit-content" }}>
      <CardMedia
        sx={{ height: 140 }}
        image={user?.photoURL}
        title="Employee photo"
        component="img"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {user?.displayName || "Name"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {user?.email || "example.mail@mail.com"}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default EmployeeCard;
