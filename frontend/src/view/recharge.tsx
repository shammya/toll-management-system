import { Grid, Icon, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import User from "layout/User";

export default function Recharge() {
  return (
    <User title="Recharge">
      <Icon></Icon>
      <TextField variant="outlined" />
      <Typography variant="h5">Select payment gateway</Typography>
      <Grid justifyContent="center" alignItems="center" container>
        <Grid item xs={6}>
          <img src={require("assets/img/bkash.png")} />
        </Grid>
        <Grid item xs={6}>
          <img src={require("assets/img/rocket.png")} />
        </Grid>
        <Grid item xs={6}>
          <img src={require("assets/img/nogod.png")} />
        </Grid>
      </Grid>
    </User>
  );
}
