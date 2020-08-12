import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import useDarkMode from "use-dark-mode";

import { startUserLogout } from "../../../redux/actions/userActions";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MUILink from "@material-ui/core/Link";
import useStyles from "./useStyles";
import AccountCircle from "@material-ui/icons/AccountCircle";
import NightsStayIcon from "@material-ui/icons/NightsStay";
import FlareIcon from "@material-ui/icons/Flare";

const APP_NAME = "AUTHENTICATION REACT";

function Header({ userName, photoId, isAuthenticated, logout, isAdmin }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    logout();
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleLogout}>LOGOUT</MenuItem>
    </Menu>
  );

  const { value: isDark, toggle: toggleDarkMode } = useDarkMode();

  return (
    <div className={classes.grow}>
      <AppBar position="fixed" color="default">
        <Toolbar>
          <Link to="/">
            <MUILink
              style={
                isDark
                  ? { textDecoration: "none", color: "white" }
                  : { textDecoration: "none", color: "black" }
              }
            >
              <Typography className={classes.title} variant="h6" noWrap>
                {APP_NAME}
              </Typography>
            </MUILink>
          </Link>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <MUILink
              style={
                isDark
                  ? { textDecoration: "none", color: "white" }
                  : { textDecoration: "none", color: "black" }
              }
              onClick={toggleDarkMode}
              className={
                isAuthenticated ? classes.dashboardText : classes.signupin
              }
            >
              {isDark ? <FlareIcon /> : <NightsStayIcon />}
            </MUILink>

            {!isAuthenticated && (
              <Link to="/blogs">
                <MUILink
                  style={
                    isDark
                      ? { textDecoration: "none", color: "white" }
                      : { textDecoration: "none", color: "black" }
                  }
                >
                  <Typography className={classes.signupin}>BLOGS</Typography>
                </MUILink>
              </Link>
            )}

            {!isAuthenticated && (
              <Link to="/signin">
                <MUILink
                  style={
                    isDark
                      ? { textDecoration: "none", color: "white" }
                      : { textDecoration: "none", color: "black" }
                  }
                >
                  <Typography className={classes.signupin}>SIGNIN</Typography>
                </MUILink>
              </Link>
            )}

            {!isAuthenticated && (
              <Link to="/signup">
                <MUILink
                  style={
                    isDark
                      ? { textDecoration: "none", color: "white" }
                      : { textDecoration: "none", color: "black" }
                  }
                >
                  <Typography className={classes.signupin}>SIGNUP</Typography>
                </MUILink>
              </Link>
            )}

            {isAuthenticated && (
              <Link to="/newBlog">
                <MUILink
                  style={
                    isDark
                      ? { textDecoration: "none", color: "white" }
                      : { textDecoration: "none", color: "black" }
                  }
                >
                  <Typography className={classes.dashboardText}>
                    NEW BLOG
                  </Typography>
                </MUILink>
              </Link>
            )}

            {isAuthenticated && (
              <Link to="/blogs">
                <MUILink
                  style={
                    isDark
                      ? { textDecoration: "none", color: "white" }
                      : { textDecoration: "none", color: "black" }
                  }
                >
                  <Typography className={classes.dashboardText}>
                    BLOGS
                  </Typography>
                </MUILink>
              </Link>
            )}

            {isAuthenticated && !isAdmin && (
              <Link to="/user">
                <MUILink
                  style={
                    isDark
                      ? { textDecoration: "none", color: "white" }
                      : { textDecoration: "none", color: "black" }
                  }
                >
                  <Typography className={classes.dashboardText}>{`${
                    userName.toUpperCase().split(" ")[0]
                  }'S DASHBOARD`}</Typography>
                </MUILink>
              </Link>
            )}

            {isAuthenticated && (
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            )}
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.user.token,
  userName: state.user.userInfo.name,
  photoId: state.user.userInfo.username,
  isAdmin: Boolean(state.user.userInfo.role),
});

const mapDispatchToProps = { logout: startUserLogout };

export default connect(mapStateToProps, mapDispatchToProps)(Header);
