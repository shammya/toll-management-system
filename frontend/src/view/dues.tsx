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
import User from "layout/User";
import MaterialTable from "material-table";
import { useState } from "react";
import { DueInfo } from "./../models/Models";
import { SlidingUpTransition } from "./../tools/tools";

const data = [
  {
    tollName: "ok toll",
    amount: 320,
  },
  {
    tollName: "ok toll",
    amount: 320,
  },
  {
    tollName: "ok toll",
    amount: 320,
  },
  {
    tollName: "ok toll",
    amount: 320,
  },
];

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
        <Button variant="contained">Pay now</Button>
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
  let total = 0;
  dueInfos.map((dueInfo) => (total = total + dueInfo.dueAmount));
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
        <Button variant="contained">Pay total {total}tk</Button>
      </DialogActions>
    </Dialog>
  );
}

export default function Dues() {
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
  const [columns, setColumns] = useState([
    { title: "Booth name", field: "boothName" },
    { title: "Due", field: "dueAmount" },
    {
      title: "",
      field: "",
      render: (item) => (
        <Button variant="contained" onClick={(event) => setSelectedToll(item)}>
          See Details
        </Button>
      ),
    },
  ]);
  return (
    <User title="Dues History">
      <MaterialTable
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
      />
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
