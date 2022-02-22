import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { GLOBAL } from "Configure";
import { useSnackbar } from "notistack";
import * as React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { homeDataReload } from "view/home";
import { Login_Post } from "./../../models/Models";

const theme = createTheme();

export default function SignIn() {
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const [loginInfo, setLoginInfo] = React.useState<Login_Post>({
    vehicle: "",
    password: "",
  });
  const handleSubmit = (event) => {
    console.log(loginInfo);
    let error = false;
    if (loginInfo.vehicle == "") {
      enqueueSnackbar("Please enter a vehicle number", { variant: "error" });
      error = true;
    }
    if (loginInfo.password == "") {
      enqueueSnackbar("Please enter a password", { variant: "error" });
      error = true;
    }
    if (error) return;
    axios
      .post(GLOBAL.HOST + `/login/`, {
        vehicle: loginInfo.vehicle,
        password: loginInfo.password,
      })
      .then((response) => {
        console.log(response);
        if (response.data.loginSuccess) {
          homeDataReload(() => {
            history.push({
              pathname: "/home",
            });
          });
        } else {
          enqueueSnackbar("Vehicle no or password mismatch!! Try again", {
            variant: "error",
          });
        }
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="Vehicle-no"
              label="Vehicle no"
              name="Vehicle-no"
              autoComplete="Vehicle-no"
              autoFocus
              onBlur={(event) => {
                setLoginInfo({ ...loginInfo, vehicle: event.target.value });
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onBlur={(event) => {
                setLoginInfo({ ...loginInfo, password: event.target.value });
              }}
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </ThemeProvider>
  );
}
