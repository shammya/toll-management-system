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
import * as React from "react";
import { useState } from "react";

const theme = createTheme();

export default function SignUp() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  const [vehicleType, setVehicleType] = useState("0");
  function handleVehicleTypeChange(event) {
    setVehicleType(event.target.value);
  }

  const [dob, setDob] = useState(new Date());
  function handleDobChange(newValue) {
    setDob(newValue);
  }

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
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="mobile-no"
              label="Mobile no"
              name="mobile-no"
              autoComplete="mobile-no"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="first-name"
              label="First name"
              name="first-name"
              autoComplete="first-name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="last-name"
              label="Last name"
              name="last-name"
              autoComplete="last-name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="vehicle-no"
              label="Vehicle no"
              name="vehicle-no"
              autoComplete="vehicle-no"
              autoFocus
            />
            <FormControl margin="normal" required fullWidth>
              <InputLabel>Vehicle type</InputLabel>
              <Select
                value={vehicleType}
                label="Vehicle type"
                onChange={handleVehicleTypeChange}
              >
                <MenuItem value="0">-- Select type</MenuItem>
                <MenuItem value="Car">Car</MenuItem>
                <MenuItem value="Truck">Truck</MenuItem>
                <MenuItem value="Bus">Bus</MenuItem>
              </Select>
            </FormControl>
            <TextField
              margin="normal"
              required
              fullWidth
              name="license-no"
              label="License no"
              id="license-no"
              autoComplete="license-no"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="occupation"
              label="Occupation"
              id="occupation"
              autoComplete="occupation"
            />
            {/* <FormControl required margin="normal" fullWidth>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack spacing={3}>
                  <MobileDatePicker
                    label="Date mobile"
                    inputFormat="dd/MM/yyyy"
                    value={dob}
                    onChange={handleDobChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Stack>
              </LocalizationProvider>
            </FormControl> */}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password-again"
              label="Password (again)"
              type="password"
              id="password-again"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="center">
              <Grid item textAlign="center">
                <Link href="#" variant="body2">
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
