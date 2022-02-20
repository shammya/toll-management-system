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
import { Gateway } from "classes/Objects";
import User from "layout/User";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { SlidingUpTransition } from "./../tools/tools";

const imageItem: Gateway[] = [
  {
    name: "Bkash",
    src: require("assets/img/bkash.png"),
  },
  {
    name: "Rocket",
    src: require("assets/img/rocket.png"),
  },
  {
    name: "Nagad",
    src: require("assets/img/nogod.png"),
  },
];

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
    // Code for backend api to successful recharge
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
        <Button variant="contained" color="primary" onClick={handleOnOkPressed}>
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

export default function Recharge() {
  const { enqueueSnackbar } = useSnackbar();
  const [rechargeAmount, setRechargeAmount] = useState(0);
  const [selectedGateway, setSelectedGateway] = useState<Gateway | null>(null);
  return (
    <User title="Recharge">
      <TextField
        sx={{ marginTop: 10, marginBottom: 10 }}
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
      <ImageList cols={2} rowHeight={110}>
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
