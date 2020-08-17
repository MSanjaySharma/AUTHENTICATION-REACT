import React from "react";
import { Redirect, Route } from "react-router-dom";
import { getCookie } from "../functions/cookie";

export const PublicRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      !getCookie("isAuthenticated") ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/home", state: { from: props.location } }} />
      )
    }
  />
);
