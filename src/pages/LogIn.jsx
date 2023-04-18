import { Avatar, Box, Button, Container, Typography } from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { useAuth } from "../context/AuthProvider";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import googleLogo from "../assets/google.svg";
function LogIn() {
  const navigate = useNavigate();
  const { signInWithGoogle, user } = useAuth();
  const handleSignInWithGoogle = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user !== null) {
      navigate("/attendance");
    }
  }, [user]);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in to continue
        </Typography>
        <Box sx={{ mt: 1 }}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSignInWithGoogle}
            startIcon={<img src={googleLogo} />}
          >
            Sign In With Google
          </Button>
          {/* <Grid container>

              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid> */}
        </Box>
      </Box>
    </Container>
  );
}

export default LogIn;
