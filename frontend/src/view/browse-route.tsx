import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  Drawer,
  Grid,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import User from "layout/User";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { SlidingUpTransition } from "tools/tools";
import { GLOBAL } from "./../Configure";
import { Home_Get, Route } from "./../models/Models";
import { homeDataReload } from "./home";
import { rechargeAction } from "./recharge";

const drawerHeight = 205;

function TollInfo({ toll }: { toll: Route | null }) {
  return (
    <Grid container direction="column">
      <Typography variant="h5">{toll?.location}</Typography>
      {/* <Typography>Date : {toll?.tollAmount}</Typography> */}
      <Typography variant="h4">{toll?.tollAmount} tk</Typography>
    </Grid>
  );
}

function PaymentDialog({ open, onClose, selectedTolls }) {
  let homeInfo: Home_Get = JSON.parse(localStorage.getItem("info") + "");
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  let totalAmount = 0;
  selectedTolls.map((item) => (totalAmount += item.tollAmount));
  function confirmPayment() {
    if (totalAmount > homeInfo.userdata.balance) {
      enqueueSnackbar("Insufficient balance.", {
        variant: "error",
        autoHideDuration: 2000,
        action: rechargeAction(() => {
          history.push({ pathname: "/recharge" });
        }),
      });
      return;
    }
    axios
      .post(GLOBAL.HOST + "/finance/payment/", selectedTolls)
      .then((response) => {
        if (response.data) {
          homeDataReload(() => {
            history.push({ pathname: "/home" });
          });
          enqueueSnackbar("Payment successful", { variant: "success" });
        }
      });
  }

  return (
    <Dialog open={open} keepMounted TransitionComponent={SlidingUpTransition}>
      <DialogContent>
        <List>
          {selectedTolls.map((toll) => (
            <>
              <ListItem key={toll}>
                <TollInfo toll={toll} />
              </ListItem>
              <Divider />
            </>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Grid
          container
          direction="column"
          justifyContent="space-between"
          spacing={1}
        >
          <Grid item container justifyContent="center">
            <Typography variant="h6" sx={{ textAlign: "center" }}>
              You are paying {totalAmount} tk
            </Typography>
          </Grid>
          <Grid item>
            <Grid container direction="row" spacing={2} justifyContent="center">
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={confirmPayment}
                >
                  Confirm
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary" onClick={onClose}>
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
}

function BottomDrawer({
  open,
  onClose,
  selectedTolls,
  lastSelectedToll,
  onSelectAllPressed,
  onPayClicked,
}: {
  open: boolean;
  onClose: () => void;
  selectedTolls: Route[];
  lastSelectedToll: Route | null;
  onSelectAllPressed: () => void;
  onPayClicked: () => void;
}) {
  let totalAmount = 0;
  selectedTolls.map((item) => (totalAmount += item.tollAmount));
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
            <img width={70} src={require("assets/img/booth.png")} />
          </Grid>
          <Grid item>
            <Grid container direction="column">
              <Typography variant="h5">{lastSelectedToll?.location}</Typography>
              <Typography variant="h4">
                {lastSelectedToll?.tollAmount} tk
              </Typography>
            </Grid>
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
            <Typography variant="h6">
              Total amount : {totalAmount} tk
            </Typography>
          </Grid>
        </Grid>
        <Grid item container direction="row" spacing={2}>
          <Grid item xs={4}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ fontSize: "0.77rem" }}
              onClick={onSelectAllPressed}
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
              onClick={onPayClicked}
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
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const [tolls, setTolls] = useState<Route[]>([]);
  const [destination, setDestination] = useState("");
  const [selectedTolls, setSelectedToll] = useState<Route[]>([]);
  const [lastSelectedToll, setLastSelectedToll] = useState<Route | null>(null);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);

  const [showMap, setShowMap] = useState(false);
  function loadTollAmount() {}
  function queryForMap() {
    console.log("query for map");
    axios.get(GLOBAL.HOST + "/finance/route/").then(async (response) => {
      // console.log(response.data);
      if (response.data) {
        setTolls(response.data);
        setShowMap(true);
      }
    });
  }

  console.log(tolls);

  function queryForTollAmount(selectedTolls: Route[]) {
    axios
      .post(GLOBAL.HOST + "/finance/route/", selectedTolls)
      .then((response) => {
        console.log(response.data);
      });
  }

  return (
    <User title="Browse Map">
      <PaymentDialog
        open={showPaymentDialog}
        selectedTolls={selectedTolls}
        onClose={() => setShowPaymentDialog(false)}
      />
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
              onBlur={(event) => {}}
              onKeyPress={(event) => {
                if (event.key == "Enter") {
                  //@ts-ignore
                  setDestination(event.target.value);
                  queryForMap();
                }
              }}
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
        {showMap && (
          <Grid
            item
            sx={{ position: "relative", overflow: "scroll", height: "460px" }}
          >
            <Main open={selectedTolls.length != 0}>
              <img src={require("assets/img/map.jpg")} />
              <IconButton
                key={100}
                sx={{
                  position: "absolute",
                  zIndex: 99,
                  left: 414,
                  top: -5,
                }}
              >
                <LocationOnIcon
                  sx={{
                    color: "blue",
                    fontSize: "50px",
                  }}
                />
              </IconButton>
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
              onSelectAllPressed={() => {
                setSelectedToll([...tolls]);
              }}
              onPayClicked={() => setShowPaymentDialog(true)}
            />
          </Grid>
        )}
      </Grid>
    </User>
  );
}
