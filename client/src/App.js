import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from "./components/layout/Header";
import { PrivateRoute } from "./utils/components/PrivateRoute";
import { PublicRoute } from "./utils/components/PublicRoute";
import {
  Home,
  Signin,
  Signup,
  SignInSessionExpired,
  PrivateComp,
} from "./pages";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <div style={{ height: "64px" }} />

        <Switch>
          <Route path="/" component={Home} exact={true} />
          <PrivateRoute
            path="/privateRoute"
            component={PrivateComp}
            exact={true}
          />
          <PublicRoute path="/signin" component={Signin} exact={true} />
          <PublicRoute path="/signup" component={Signup} exact={true} />
          <Route
            path="/signInSessionExpired"
            component={SignInSessionExpired}
            exact={true}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
