import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
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
import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Signup_Post } from "./../../models/Models";

const theme = createTheme();

export default function SignUp() {
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const [signUpInfo, setSignUpInfo] = useState<Signup_Post>(new Signup_Post());
  const [vehicleType, setVehicleType] = useState("0");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    console.log(signUpInfo);
    let error = false;
    if (signUpInfo.license == "") {
      enqueueSnackbar("Please enter a vehicle number", {
        variant: "error",
      });
      error = true;
    }
    if (signUpInfo.vehicletype == "") {
      enqueueSnackbar("Please enter a vehicle type", {
        variant: "error",
      });
      error = true;
    }
    if (signUpInfo.nid == "") {
      enqueueSnackbar("Please enter NID no", {
        variant: "error",
      });
      error = true;
    }
    if (signUpInfo.fname == "") {
      enqueueSnackbar("Please enter first name", {
        variant: "error",
      });
      error = true;
    }
    if (signUpInfo.lname == "") {
      enqueueSnackbar("Please enter last name", {
        variant: "error",
      });
      error = true;
    }
    if (signUpInfo.mobileno == "") {
      enqueueSnackbar("Please enter a mobile no", {
        variant: "error",
      });
      error = true;
    }
    if (signUpInfo.email == "") {
      enqueueSnackbar("Please enter an email", {
        variant: "error",
      });
      error = true;
    }
    if (signUpInfo.address == "") {
      enqueueSnackbar("Please enter an address", {
        variant: "error",
      });
      error = true;
    }
    if (signUpInfo.password == "") {
      enqueueSnackbar("Please enter a password (again)", {
        variant: "error",
      });
      error = true;
    }
    if (password == "") {
      enqueueSnackbar("Please enter a password", {
        variant: "error",
      });
      error = true;
    }
    if (
      password != "" &&
      signUpInfo.password != "" &&
      password != signUpInfo.password
    ) {
      enqueueSnackbar("Password mismatch!!!", {
        variant: "error",
      });
      error = true;
    }
    if (error) return;
    axios.post(GLOBAL.HOST + `/signup/`, signUpInfo).then((response) => {
      console.log(response);
      if (response.data.signupSuccess) {
        history.push({ pathname: "/home" });
      } else {
        enqueueSnackbar("You have already an account. Please sign in", {
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
            marginTop: 3,
            marginBottom: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="vehicle-no"
              label="Vehicle no"
              name="vehicle-no"
              autoComplete="vehicle-no"
              autoFocus
              onBlur={(event) =>
                setSignUpInfo({ ...signUpInfo, license: event.target.value })
              }
            />
            <FormControl margin="normal" required fullWidth>
              <InputLabel>Vehicle type</InputLabel>
              <Select
                value={signUpInfo.vehicletype}
                label="Vehicle type"
                onChange={(event) =>
                  setSignUpInfo({
                    ...signUpInfo,
                    vehicletype: event.target.value,
                  })
                }
              >
                <MenuItem value="">-- Select type</MenuItem>
                <MenuItem value="car">Car</MenuItem>
                <MenuItem value="bus">Bus</MenuItem>
                <MenuItem value="motorbike">Motorbike</MenuItem>
              </Select>
            </FormControl>
            <TextField
              margin="normal"
              required
              fullWidth
              id="nid-no"
              label="NID card no"
              name="nid-no"
              autoComplete="nid-no"
              onBlur={(event) =>
                setSignUpInfo({ ...signUpInfo, nid: event.target.value })
              }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="first-name"
              label="First name"
              name="first-name"
              autoComplete="first-name"
              onBlur={(event) =>
                setSignUpInfo({ ...signUpInfo, fname: event.target.value })
              }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="last-name"
              label="Last name"
              name="last-name"
              autoComplete="last-name"
              onBlur={(event) =>
                setSignUpInfo({ ...signUpInfo, lname: event.target.value })
              }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="mobile-no"
              label="Mobile no"
              name="mobile-no"
              autoComplete="mobile-no"
              onBlur={(event) =>
                setSignUpInfo({ ...signUpInfo, mobileno: event.target.value })
              }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              type="email"
              onBlur={(event) =>
                setSignUpInfo({ ...signUpInfo, email: event.target.value })
              }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="address"
              label="Address"
              id="address"
              autoComplete="address"
              onBlur={(event) =>
                setSignUpInfo({ ...signUpInfo, address: event.target.value })
              }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onBlur={(event) => setPassword(event.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password-again"
              label="Password (again)"
              type="password"
              id="password-again"
              onBlur={(event) =>
                setSignUpInfo({ ...signUpInfo, password: event.target.value })
              }
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="center">
              <Grid item textAlign="center">
                <Link href="/signin" variant="body2">
                  {"Already have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
