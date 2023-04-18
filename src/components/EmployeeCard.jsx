import {
  Avatar,
  Card,
  CardContent,
  CardMedia,
  Skeleton,
  Typography,
} from "@mui/material";
import React from "react";
import { useAuth } from "../context/AuthProvider";

function EmployeeCard() {
  const { user } = useAuth();
  return (
    <Card sx={{ maxWidth: 240, minWidth: "fit-content" }}>
      {user.photoURL ? (
        <CardMedia
          sx={{ height: 140 }}
          image={user?.photoURL}
          title="Employee photo"
          component="img"
        />
      ) : (

        <Skeleton variant="rectangular" width={240} height={140} />
      )}
      <CardContent>
        {user ? (
          <>
            <Typography gutterBottom variant="h5" component="div">
              {user?.displayName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user?.email}
            </Typography>
          </>
        ) : (
          <Skeleton variant="rectangle"/>
        )}
      </CardContent>
    </Card>
  );
}

export default EmployeeCard;
