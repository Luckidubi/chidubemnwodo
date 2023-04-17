import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  Avatar,
  Drawer,
  IconButton,
  List,
  ListItemButton,
} from "@mui/material";
import { Menu } from "@mui/icons-material";
import { useAuth } from "../context/AuthProvider";

function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { user, logOut } = useAuth();
  console.log(user);
  const name = user?.displayName;
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box bgcolor="#54AEB2" py={2} px="2rem">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mx={2}
      >
        <NavLink to="/" style={{ textDecoration: "none" }}>
          <Typography variant="h6" component="span" color="#fff">
            avcic
          </Typography>
        </NavLink>
        <Box display="flex">
          <Box
            display={{ xs: "none", sm: "flex" }}
            justifyContent="space-evenly"
            mr="1rem"
            className="navlinks"
          >
            <NavLink to="/" style={{ textDecoration: "none" }}>
              <Typography variant="body1" component="span" mr={2}>
                Home
              </Typography>
            </NavLink>
            <NavLink to="/attendance" style={{ textDecoration: "none" }}>
              <Typography variant="body1" component="span" mr="1rem">
                Clock In
              </Typography>
            </NavLink>
            {/* <NavLink to="/employees" style={{ textDecoration: "none" }}>
              <Typography variant="body1" component="span" mr="1rem">
                Colleagues
              </Typography>
            </NavLink> */}

            <NavLink to="/profile" style={{ textDecoration: "none" }}>
              <Typography mr="1rem" variant="body1" component="span">
                Profile
              </Typography>
            </NavLink>
            <NavLink
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                gap: ".5rem",
              }}
            >
              <Avatar
                src={user?.photoURL}
                sx={{ alignSelf: "base", width: "25px", height: "25px" }}
              />
              <Typography style={{ color: "#fff" }} mr="1rem" component="p">
                {name}
              </Typography>
            </NavLink>
            <NavLink onClick={handleSignOut} style={{ textDecoration: "none" }}>
              <Typography variant="body1" component="span">
                Sign Out
              </Typography>
            </NavLink>
          </Box>
          <Box display={{ xs: "flex", sm: "none" }}>
            <IconButton edge="end" onClick={toggleDrawer} aria-label="menu">
              <Menu style={{ color: "white" }} />
            </IconButton>
            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
              <List
                sx={{
                  bgcolor: "#fff",
                  width: 250,
                  minHeight: "100vh",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginTop: "1rem",
                  padding: "1rem",
                }}
              >
                <NavLink
                  to="/"
                  style={{ textDecoration: "none" }}
                  className="active-link"
                >
                  <ListItemButton
                    sx={{
                      color: "#325F70",
                      "& .Mui-hover": {
                        bgColor: "#54AEB2",
                      },
                    }}
                  >
                    <Typography
                      variant="body1"
                      component="span"
                      color="#325F70"
                    >
                      Home
                    </Typography>
                  </ListItemButton>
                </NavLink>
                <NavLink
                  to="/attendance"
                  style={{ textDecoration: "none" }}
                  className="active-link"
                >
                  <ListItemButton
                    sx={{
                      color: "#325F70",
                      "& .Mui-hover": {
                        bgColor: "#54AEB2",
                      },
                    }}
                  >
                    <Typography
                      variant="body1"
                      component="span"
                      color="#325F70"
                    >
                      ClockIn / ClockOut
                    </Typography>
                  </ListItemButton>
                </NavLink>
                {/* <NavLink to="/employees" style={{ textDecoration: "none" }}>
                  <ListItemButton
                    sx={{
                      color: "#325F70",
                      "& .Mui-hover": {
                        bgColor: "#54AEB2",
                        cursor: "pointer",
                      },
                    }}
                  >
                    <Typography variant="body1" component="span">
                      Colleagues
                    </Typography>
                  </ListItemButton>
                </NavLink> */}
                <Link to="/profile" style={{ textDecoration: "none" }}>
                  <ListItemButton
                    sx={{
                      color: "#325F70",
                      "& .Mui-hover": {
                        bgColor: "#54AEB2",
                        cursor: "pointer",
                      },
                    }}
                  >
                    <Typography variant="body1" component="span">
                      Profile
                    </Typography>
                  </ListItemButton>
                </Link>
                <Link
                  style={{
                    textDecoration: "none",

                  }}
                >
                  <ListItemButton
                   style={{
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    gap: ".5rem",
                   }}
                  >
                    <Avatar
                      src={user?.photoURL}
                      sx={{ alignSelf: "base", width: "25px", height: "25px" }}
                    />
                    <Typography
                      style={{ color: "#325F70" }}
                      mr="1rem"
                      component="p"
                    >
                      {name}
                    </Typography>
                  </ListItemButton>
                </Link>
                <Link
                  onClick={handleSignOut}
                  style={{ textDecoration: "none" }}
                >
                  <ListItemButton
                    sx={{
                      color: "#325F70",
                      "& .Mui-hover": {
                        bgColor: "#54AEB2",
                        cursor: "pointer",
                      },
                    }}
                  >
                    <Typography variant="body1" component="span">
                      Sign Out
                    </Typography>
                  </ListItemButton>
                </Link>
              </List>
            </Drawer>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Header;
