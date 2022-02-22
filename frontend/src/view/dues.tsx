import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import axios from "axios";
import User from "layout/User";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { GLOBAL } from "./../Configure";
import { DueInfo, Home_Get } from "./../models/Models";
import { SlidingUpTransition } from "./../tools/tools";
import { homeDataReload } from "./home";
import { rechargeAction } from "./recharge";

function DueInfoDetail({ dueInfo }: { dueInfo: DueInfo | null }) {
  return (
    <>
      <Typography variant="h5">Vehicle no : {dueInfo?.vehicleRegNo}</Typography>
      <Typography>Date : {dueInfo?.date.toLocaleDateString}</Typography>
      <Typography variant="h3">{dueInfo?.dueAmount}</Typography>
    </>
  );
}

function DetailsDialog({
  dueInfo,
  onClose,
}: {
  dueInfo: DueInfo | null;
  onClose: () => void;
}) {
  let homeInfo: Home_Get = JSON.parse(localStorage.getItem("info") + "");
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  function confirmPayment() {
    if (
      dueInfo?.dueAmount != undefined &&
      dueInfo?.dueAmount > homeInfo.userdata.balance
    ) {
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
      .post(GLOBAL.HOST + "/finance/payment/", [dueInfo])
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
    <Dialog
      open={dueInfo != null}
      TransitionComponent={SlidingUpTransition}
      // keepMounted
      onClose={onClose}
    >
      <DialogTitle>{dueInfo?.boothName}</DialogTitle>
      <DialogContent>
        <DueInfoDetail dueInfo={dueInfo} />
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
              You are paying {dueInfo?.dueAmount} tk
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

function AllDueDetails({
  dueInfos,
  open,
  onClose,
}: {
  dueInfos: DueInfo[];
  open: boolean;
  onClose: () => void;
}) {
  let homeInfo: Home_Get = JSON.parse(localStorage.getItem("info") + "");
  let total = 0;
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  dueInfos.map((dueInfo) => (total = total + dueInfo.dueAmount));

  function confirmPayment() {
    if (total > homeInfo.userdata.balance) {
      enqueueSnackbar("Insufficient balance.", {
        variant: "error",
        autoHideDuration: 2000,
        action: rechargeAction(() => {
          history.push({ pathname: "/recharge" });
        }),
      });
      return;
    }
    axios.post(GLOBAL.HOST + "/finance/due/", dueInfos).then((response) => {
      if (response.data) {
        homeDataReload(() => {
          history.push({ pathname: "/home" });
        });
        enqueueSnackbar("Payment successful", { variant: "success" });
      }
    });
  }
  return (
    <Dialog
      open={open}
      TransitionComponent={SlidingUpTransition}
      keepMounted
      onClose={onClose}
    >
      <DialogTitle>Total Due Information</DialogTitle>
      <DialogContent>
        <List>
          {dueInfos.map((dueInfo) => (
            <>
              <ListItem>
                <ListItemText
                  primary={
                    <>
                      <Typography variant="h4">{dueInfo.boothName}</Typography>
                      <DueInfoDetail dueInfo={dueInfo} />
                    </>
                  }
                />
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
              You are paying {total} tk
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

export default function Dues() {
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [dues, setDues] = useState<DueInfo[]>([]);

  useEffect(() => {
    axios.get(GLOBAL.HOST + "/finance/due/").then((response) => {
      console.log(response);
      setDues(response.data);
    });
  }, []);

  const [dueInfos, setDueInfos] = useState<DueInfo[]>([
    {
      vehicleRegNo: "sdfghjkreyoiasdjfk",
      boothName: "Jatrabari s1",
      dueAmount: 60,
      date: new Date(),
    },
    {
      vehicleRegNo: "sdfghjkreyoiasdjfk",
      boothName: "Jatrabari s2",
      dueAmount: 60,
      date: new Date(),
    },
    {
      vehicleRegNo: "sdfghjkreyoiasdjfk",
      boothName: "Jatrabari s3",
      dueAmount: 60,
      date: new Date(),
    },
    {
      vehicleRegNo: "sdfghjkreyoiasdjfk",
      boothName: "Jatrabari s4",
      dueAmount: 60,
      date: new Date(),
    },
    {
      vehicleRegNo: "sdfghjkreyoiasdjfk",
      boothName: "Jatrabari s5",
      dueAmount: 60,
      date: new Date(),
    },
  ]);
  const [selectedToll, setSelectedToll] = useState<DueInfo | null>(null);
  const [showAllPayDialog, setShowAllPayDialog] = useState(false);
  // const [columns, setColumns] = useState([
  //   { title: "Booth name", field: "boothName" },
  //   { title: "Due", field: "dueAmount" },
  //   {
  //     title: "",
  //     field: "",
  //     render: (item) => (
  //       <Button variant="contained" onClick={(event) => setSelectedToll(item)}>
  //         See Details
  //       </Button>
  //     ),
  //   },
  // ]);
  return (
    <User title="Dues History">
      <List>
        <ListItem>
          <Grid container direction="row" alignItems="center">
            <Grid item xs={6}>
              <Typography variant="h6">Booth name</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="h6">Due</Typography>
            </Grid>
          </Grid>
        </ListItem>
        <Divider />
        <Divider />
        {dueInfos.map((dueInfo) => (
          <>
            <ListItem>
              <Grid container direction="row" alignItems="center">
                <Grid item xs={6}>
                  <Typography variant="body1">{dueInfo.boothName}</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="body1">{dueInfo.dueAmount}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={(event) => setSelectedToll(dueInfo)}
                    sx={{ fontSize: "11px" }}
                  >
                    See details
                  </Button>
                </Grid>
              </Grid>
            </ListItem>
            <Divider />
          </>
        ))}
      </List>
      {/* <MaterialTable
        style={{ width: "100%", marginTop: 20 }}
        // @ts-ignore
        columns={columns.map((item) => ({
          ...item,
          align: "center",
          editable: false,
        }))}
        title="Dues"
        data={dueInfos}
        options={{
          paging: data.length > 10,
          headerStyle: { textAlign: "center" },
          actionsColumnIndex: -1,
          addRowPosition: "first",
          pageSize: 10,
          search: false,
        }}
        // actions={[
        //   {
        //     icon: "visibility",
        //     tooltip: "see teacher",
        //     onClick: (event, rowData) => {
        //       console.log(rowData);
        //       history.push(`/profile/${rowData.username}`);
        //     },
        //   },
        // ]}
      /> */}
      <Grid
        container
        justifyContent="center"
        sx={{ marginTop: 4, marginBottom: 4 }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={(event) => setShowAllPayDialog(true)}
        >
          Pay all
        </Button>
      </Grid>
      <DetailsDialog
        dueInfo={selectedToll}
        onClose={() => {
          setSelectedToll(null);
        }}
      />
      <AllDueDetails
        open={showAllPayDialog}
        dueInfos={dueInfos}
        onClose={() => setShowAllPayDialog(false)}
      />
    </User>
  );
}
