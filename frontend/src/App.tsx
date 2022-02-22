import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Home from "view/home";
import "./App.css";
import SignIn from "./view/auth/sign-in";
import Recharge from "./view/recharge";
import Dues from "./view/dues";
import BrowseRoute from "./view/browse-route";
import SignUp from "./view/auth/sign-up";
import { SnackbarProvider } from "notistack";
import { Button, IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

function App() {
  const notistackRef: React.RefObject<SnackbarProvider> = React.createRef();
  const onClickDismiss = (key) => () => {
    notistackRef.current?.closeSnackbar(key);
  };
  return (
    <div className="App">
      <SnackbarProvider
        maxSnack={6}
        ref={notistackRef}
        action={(key) => (
          <IconButton onClick={onClickDismiss(key)}>
            <ClearIcon sx={{ color: "white" }} />
          </IconButton>
        )}
      >
        <Switch>
          <Route path="/signin" component={SignIn} />
          <Route path="/home" component={Home} />
          <Route path="/recharge" component={Recharge} />
          <Route path="/browse" component={BrowseRoute} />
          <Route path="/signup" component={SignUp} />
          <Route path="/dues" component={Dues} />
          <Redirect from="/" to="/signin" />
        </Switch>
      </SnackbarProvider>
    </div>
  );
}

export default App;
