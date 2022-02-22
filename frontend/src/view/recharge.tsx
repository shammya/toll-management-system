import PaidIcon from "@mui/icons-material/Paid";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  ImageList,
  ImageListItem,
  InputAdornment,
  TextField,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import axios from "axios";
import User from "layout/User";
import { Home_Get } from "models/Models";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { homeDataReload } from "view/home";
import { GLOBAL } from "./../Configure";
import { SlidingUpTransition } from "./../tools/tools";
import { OfferInfo } from "./home";

class Gateway {
  name: string;
  src: string;
  field: string;
}

const imageItem: Gateway[] = [
  {
    name: "Bkash",
    field: "bkash",
    src: require("assets/img/bkash.png"),
  },
  {
    name: "Rocket",
    field: "rocket",
    src: require("assets/img/rocket.png"),
  },
  {
    name: "Nagad",
    field: "nagad",
    src: require("assets/img/nogod.png"),
  },
];

export default function Recharge() {
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  let homeInfo: Home_Get = JSON.parse(localStorage.getItem("info") + "");
  const [rechargeAmount, setRechargeAmount] = useState(0);
  const [selectedGateway, setSelectedGateway] = useState<Gateway | null>(null);

  function ConfirmGateway({
    gateway,
    amount,
    onClose,
  }: {
    gateway: Gateway | null;
    amount: number;
    onClose: () => void;
  }) {
    function handleOnOkPressed(event) {
      axios
        .post(GLOBAL.HOST + `/finance/recharge/`, {
          offerID: 1,
          gatewayName: selectedGateway?.field,
          amount: rechargeAmount,
        })
        .then((response) => {
          console.log(response);
          if (response.data) {
            homeDataReload(() => {
              history.push({
                pathname: "/home",
              });
            });
            enqueueSnackbar("Recharge successful", { variant: "success" });
          }
        });
    }
    function handleOnCancelPressed(event) {
      onClose();
    }
    return (
      <Dialog
        open={gateway != null}
        TransitionComponent={SlidingUpTransition}
        keepMounted
        onClose={onClose}
      >
        <DialogTitle>{gateway?.name}</DialogTitle>
        <DialogContent>
          <ImageListItem>
            <img src={gateway?.src} />
          </ImageListItem>
          <Typography variant="h6">
            You are recharging {amount} tk in your wallet from {gateway?.name}.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOnOkPressed}
          >
            Ok
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleOnCancelPressed}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  return (
    <User title="Recharge">
      <OfferInfo offers={homeInfo.offers} />
      <TextField
        sx={{ marginTop: 2, marginBottom: 2 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PaidIcon />
            </InputAdornment>
          ),
        }}
        onBlur={(event) =>
          setRechargeAmount(event.target.value as unknown as number)
        }
        variant="outlined"
        fullWidth
        label="Recharge amount"
      />
      <Typography variant="h5">Select payment gateway</Typography>
      <ImageList cols={2} rowHeight={100}>
        {imageItem.map((item) => (
          <ImageListItem
            key={item.name}
            sx={{ padding: 2 }}
            onClick={(event) => {
              if (rechargeAmount == 0) {
                enqueueSnackbar("Please give a recharge amount", {
                  variant: "warning",
                });
              } else {
                setSelectedGateway(item);
              }
            }}
          >
            <img src={item.src} alt={item.name} loading="lazy" />
          </ImageListItem>
        ))}
      </ImageList>
      <ConfirmGateway
        gateway={selectedGateway}
        amount={rechargeAmount}
        onClose={() => {
          setSelectedGateway(null);
        }}
      />
    </User>
  );
}
