import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Home from "view/home";
import "./App.css";
import SignIn from "./view/auth/sign-in";
import Recharge from "./view/recharge";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/signin" component={SignIn} />
        <Route path="/home" component={Home} />
        <Route path="/recharge" component={Recharge} />
        <Redirect from="/" to="/home" />
      </Switch>
    </div>
  );
}

export default App;
