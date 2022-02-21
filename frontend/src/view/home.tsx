import { Card, CardActionArea, CardContent, Chip } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import { createTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { GLOBAL } from "Configure";
import { Home_Get, Offer } from "models/Models";
import { useSnackbar } from "notistack";
import * as React from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { stringAvatar } from "tools/tools";
import User from "../layout/User";

const theme = createTheme();

const pages = [
  {
    name: "Recharge",
    src: "/recharge",
  },
  {
    name: "Browse Route",
    src: "/browse",
  },
  {
    name: "Dues",
    src: "/dues",
  },
];

export function OfferInfo({ offers = [] }: { offers: Offer[] | undefined }) {
  return (
    <Grid container spacing={1} sx={{ marginTop: 2, marginBottom: 2 }}>
      {offers.map((offer, idx) => (
        <Grid item xs={4} key={idx}>
          <Card>
            <CardContent>
              <Grid container direction="column">
                <Typography variant="h3">{offer.offerAmount}%</Typography>
                <Typography variant="h6">cashback</Typography>
                <Typography variant="body2">
                  Till : {offer.offerTime.toLocaleTimeString}
                </Typography>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default function Home() {
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [homeInfo, setHomeInfo] = useState<Home_Get>();
  useEffect(() => {
    axios.get(GLOBAL.HOST).then((response) => {
      console.log(response);
      setHomeInfo(response.data);
    });
  }, []);

  function signOut() {
    axios.post(GLOBAL.HOST + "/logout/").then((response) => {
      console.log(response);
      if (response.data.logoutSuccess) {
        history.push({ pathname: "/home" });
        enqueueSnackbar("Successfully log out", { variant: "success" });
      }
    });
  }

  return (
    <User title="Home" signOut={signOut}>
      <Grid
        container
        padding={2}
        spacing={2}
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xs={8}>
          <Grid container spacing={2}>
            <Grid item container>
              <Chip
                label={homeInfo?.userdata?.email}
                sx={{ width: "100%", textAlign: "center", fontSize: 30 }}
              />
            </Grid>
            <Grid item container>
              <Chip
                label={homeInfo?.userdata?.username}
                sx={{ width: "100%", textAlign: "center", fontSize: 30 }}
              />
            </Grid>
            <Grid item container>
              <Chip
                label={"Balance " + homeInfo?.userdata?.balance}
                sx={{ width: "100%", textAlign: "center", fontSize: 20 }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4} justifyContent="center">
          <Avatar
            {...stringAvatar(
              homeInfo?.userdata?.username ? homeInfo?.userdata?.username : ""
            )}
            sx={{ width: 100, height: 100 }}
          />
        </Grid>
      </Grid>
      <OfferInfo offers={homeInfo?.offers} />
      <Grid container spacing={2}>
        {pages.map((page) => (
          <Grid item xs={6}>
            <Card>
              <CardActionArea
                onClick={(event) => {
                  history.push(page.src);
                }}
              >
                <CardContent sx={{ height: 100 }}>
                  <Grid
                    sx={{ height: "100%" }}
                    container
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Grid item>
                      <Typography variant="h5">{page.name}</Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </User>
  );
}
