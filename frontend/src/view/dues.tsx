import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Toll } from "classes/Toll";
import User from "layout/User";
import MaterialTable from "material-table";
import { useState } from "react";
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

function DetailsDialog({
  toll,
  onClose,
}: {
  toll: Toll | null;
  onClose: () => void;
}) {
  return (
    <Dialog
      open={toll != null}
      TransitionComponent={SlidingUpTransition}
      keepMounted
      onClose={onClose}
    >
      <DialogTitle>name</DialogTitle>
      <DialogContent></DialogContent>
      <DialogActions>
        <Button variant="contained">Pay</Button>
      </DialogActions>
    </Dialog>
  );
}

export default function Dues() {
  const [selectedToll, setSelectedToll] = useState<Toll | null>(null);
  const [columns, setColumns] = useState([
    { title: "Toll Name", field: "tollName" },
    { title: "Amount", field: "amount" },
    {
      title: "",
      field: "",
      render: (item) => <Button variant="contained">See Details</Button>,
    },
  ]);
  return (
    <User title="Dues History">
      {/* <CssBaseline /> */}
      <MaterialTable
        style={{ width: "100%", marginTop: 20 }}
        // @ts-ignore
        columns={columns.map((item) => ({
          ...item,
          align: "center",
          editable: false,
        }))}
        title="Dues"
        data={data}
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
      <DetailsDialog
        toll={selectedToll}
        onClose={() => {
          setSelectedToll(null);
        }}
      />
    </User>
  );
}
