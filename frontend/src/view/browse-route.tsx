import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  Drawer,
  Grid,
  IconButton,
  InputAdornment,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import User from "layout/User";
import { useState } from "react";
import { Route } from "./../models/Models";

const tolls: Route[] = [
  {
    boothID: 1,
    posX: 10,
    posY: 20,
    location: "Jatrabari1",
  },
  {
    boothID: 2,
    posX: 100,
    posY: 20,
    location: "Jatrabari2",
  },
  {
    boothID: 3,
    posX: 10,
    posY: 200,
    location: "Jatrabari3",
  },
  {
    boothID: 4,
    posX: 300,
    posY: 200,
    location: "Jatrabari4",
  },
  {
    boothID: 5,
    posX: 20,
    posY: 200,
    location: "Jatrabari5",
  },
];
const drawerHeight = 205;

function BottomDrawer({
  open,
  onClose,
  selectedTolls,
  lastSelectedToll,
}: {
  open: boolean;
  onClose: () => void;
  selectedTolls: Route[];
  lastSelectedToll: Route | null;
}) {
  return (
    <Drawer
      hideBackdrop
      anchor="bottom"
      open={open}
      onClose={onClose}
      variant="persistent"
      sx={{
        height: drawerHeight,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          height: drawerHeight,
        },
      }}
    >
      <Grid container padding={2} direction="column">
        <Grid item container direction="row" spacing={3}>
          <Grid item>
            <img width={100} src={require("assets/img/booth.png")} />
          </Grid>
          <Grid item direction="column">
            <Typography variant="h4">{lastSelectedToll?.location}</Typography>
            <Typography variant="h3">300 tk</Typography>
          </Grid>
        </Grid>
        <Grid
          item
          container
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid item>
            <Typography variant="body1">
              {" "}
              {selectedTolls.length} toll{selectedTolls.length > 1 ? "s" : ""}{" "}
              selected{" "}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6">Total amount : 300 tk</Typography>
          </Grid>
        </Grid>
        <Grid item container direction="row" spacing={2}>
          <Grid item xs={4}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ fontSize: "0.77rem" }}
            >
              Select all
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ fontSize: "0.77rem" }}
            >
              Pay
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ fontSize: "0.77rem" }}
              onClick={onClose}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Drawer>
  );
}

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(!open && {
    marginBottom: -drawerHeight,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  }),
}));

export default function BrowseRoute() {
  const [destination, setDestination] = useState("");
  const [selectedTolls, setSelectedToll] = useState<Route[]>([]);
  const [lastSelectedToll, setLastSelectedToll] = useState<Route | null>(null);

  return (
    <User title="Browse Map">
      <Grid container>
        <Grid
          sx={{ paddingTop: 2, paddingBottom: 1 }}
          container
          direction="column"
          spacing={2}
        >
          <Grid item>
            <TextField
              fullWidth
              label="Source"
              placeholder="Your location"
              variant="outlined"
              onBlur={(event) => setDestination(event.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationSearchingIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item>
            <TextField
              fullWidth
              label="Destination"
              placeholder="Search destination"
              variant="outlined"
              onBlur={(event) => setDestination(event.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>

        <Grid
          item
          sx={{ position: "relative", overflow: "scroll", height: "460px" }}
        >
          <Main open={selectedTolls.length != 0}>
            <img src={require("assets/img/map.jpg")} />
            {tolls.map((toll: Route) => (
              <IconButton
                key={toll.boothID}
                onClick={(event) => {
                  if (
                    selectedTolls.find((item) => item.boothID == toll.boothID)
                  ) {
                    setSelectedToll(
                      selectedTolls.filter(
                        (item) => item.boothID != toll.boothID
                      )
                    );
                    setLastSelectedToll(toll);
                  } else {
                    setSelectedToll([...selectedTolls, toll]);
                    setLastSelectedToll(toll);
                  }
                }}
                sx={{
                  position: "absolute",
                  zIndex: 99,
                  left: toll.posX,
                  top: toll.posY,
                }}
              >
                <LocationOnIcon
                  sx={{
                    color: selectedTolls.find(
                      (item) => item.boothID == toll.boothID
                    )
                      ? "#890101"
                      : "red",
                    fontSize: "50px",
                  }}
                />
              </IconButton>
            ))}
          </Main>
          <BottomDrawer
            open={selectedTolls.length != 0}
            selectedTolls={selectedTolls}
            lastSelectedToll={lastSelectedToll}
            onClose={() => {
              setSelectedToll([]);
            }}
          />
        </Grid>
      </Grid>
    </User>
  );
}
