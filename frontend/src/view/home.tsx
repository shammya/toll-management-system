import { Card, CardActionArea, CardContent, Chip, Link } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import { createTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { GLOBAL } from "Configure";
import { Offer } from "models/Models";
import { useSnackbar } from "notistack";
import * as React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { stringAvatar } from "tools/tools";
import User from "../layout/User";
import { Home_Get } from "./../models/Models";

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

const bgColor = "#ACE1E1";

export function OfferInfo({ offers = [] }: { offers: Offer[] | undefined }) {
  let d = new Date();
  d.setDate(d.getDate() + 10);
  return (
    <Grid container spacing={2} sx={{ marginTop: 2, marginBottom: 2 }}>
      {offers.map((offer, idx) => (
        <Grid item xs={12} key={idx}>
          <Card sx={{ backgroundColor: "#E88572" }}>
            <CardContent>
              <Grid container direction="row" spacing={2} alignItems="center">
                <Grid item>
                  <Typography variant="h3">{offer.offerAmount}%</Typography>
                </Grid>
                <Grid item direction="column">
                  <Typography
                    variant="h6"
                    sx={{
                      lineHeight: "1",
                      textAlign: "center",
                      marginBottom: "4px",
                    }}
                  >
                    bonus on recharge
                  </Typography>
                  <Typography variant="body2">
                    Till : {d.toLocaleDateString()}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export function homeDataReload(onExit: () => void) {
  axios.get(GLOBAL.HOST).then((response) => {
    console.log(response);
    localStorage.setItem("info", JSON.stringify(response.data));
    onExit();
  });
}

export default function Home() {
  let homeInfo: Home_Get = JSON.parse(localStorage.getItem("info") + "");
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  function signOut() {
    axios.post(GLOBAL.HOST + "/logout/").then((response) => {
      console.log(response);
      if (response.data.logoutSuccess) {
        history.push({ pathname: "/signin" });
        enqueueSnackbar("Successfully log out", { variant: "success" });
      }
    });
  }

  console.log(homeInfo);

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
            {/* <Grid item container>
              <Chip
                label={homeInfo?.userdata?.email}
                sx={{ width: "100%", textAlign: "center", fontSize: 20 }}
              />
            </Grid> */}
            <Grid item container>
              <Chip
                label={homeInfo?.userdata?.username}
                sx={{
                  backgroundColor: bgColor,
                  width: "100%",
                  textAlign: "center",
                  fontSize: 20,
                }}
              />
            </Grid>
            <Grid item container>
              <Chip
                label={"Balance : " + homeInfo?.userdata?.balance}
                sx={{
                  backgroundColor: bgColor,
                  width: "100%",
                  textAlign: "center",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4} justifyContent="center">
          <Avatar
            {...stringAvatar(
              homeInfo?.userdata?.username ? homeInfo?.userdata?.username : ""
            )}
            sx={{
              backgroundColor: bgColor,
              color: "black",
              width: 100,
              height: 100,
              fontSize: "3rem",
            }}
          />
        </Grid>
      </Grid>
      <OfferInfo offers={homeInfo?.offers} />
      <Grid container spacing={2}>
        {pages.map((page, idx) => (
          <Grid item xs={6} key={idx}>
            <Link href={page.src}>
              <Card>
                <CardActionArea
                  // onClick={(event) => {
                  //   history.push(page.src);
                  // }}
                  sx={{ backgroundColor: bgColor }}
                >
                  <CardContent sx={{ height: 100 }}>
                    <Grid
                      sx={{ height: "100%" }}
                      container
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Grid item>
                        <Typography
                          variant="h5"
                          sx={{ textAlign: "center", fontWeight: "bold" }}
                        >
                          {page.name}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </User>
  );
}
