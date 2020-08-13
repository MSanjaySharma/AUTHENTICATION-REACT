import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import useDarkMode from "use-dark-mode";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MUILink from "@material-ui/core/Link";
import NightsStayIcon from "@material-ui/icons/NightsStay";
import FlareIcon from "@material-ui/icons/Flare";
import useStyles from "./useStyles";

import { startUserLogout } from "../../redux/actions/userActions";
import { getCookie } from "../../utils/functions/cookie";

function Header({ logout }) {
  const classes = useStyles();
  const isAuthenticated = !!getCookie("token");

  const handleLogout = () => {
    logout();
  };

  const { value: isDark, toggle: toggleDarkMode } = useDarkMode();

  const linkStyle = isDark
    ? { textDecoration: "none", color: "white" }
    : { textDecoration: "none", color: "black" };

  return (
    <div className={classes.grow}>
      <AppBar position="fixed" color="default">
        <Toolbar>
          <Link style={linkStyle} to="/">
            <Typography className={classes.title} variant="h6" noWrap>
              {"AUTHENTICATION REACT"}
            </Typography>
          </Link>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <MUILink
              style={linkStyle}
              onClick={toggleDarkMode}
              className={classes.signupin}
            >
              {isDark ? <FlareIcon /> : <NightsStayIcon />}
            </MUILink>

            <Link style={linkStyle} to="/">
              <Typography className={classes.signupin}>HOME</Typography>
            </Link>

            {!isAuthenticated && (
              <Link style={linkStyle} to="/signin">
                <Typography className={classes.signupin}>SIGNIN</Typography>
              </Link>
            )}

            {!isAuthenticated && (
              <Link style={linkStyle} to="/signup">
                <Typography className={classes.signupin}>SIGNUP</Typography>
              </Link>
            )}

            {isAuthenticated && (
              <MUILink style={linkStyle} onClick={handleLogout}>
                <Typography className={classes.signupin}>LOGOUT</Typography>
              </MUILink>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = { logout: startUserLogout };

export default connect(mapStateToProps, mapDispatchToProps)(Header);