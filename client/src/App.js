import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from "./components/layout/Header";
//import { PrivateRoute } from "./utils/components/PrivateRoute";
import { Home, Signin, Signup, SignInSessionExpired } from "./pages";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <div style={{ height: "64px" }} />

        <Switch>
          <Route path="/" component={Home} exact={true} />
          <Route path="/signin" component={Signin} exact={true} />
          <Route path="/signup" component={Signup} exact={true} />
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
