import React from "react";
import { connect } from "react-redux";
import useDarkMode from "use-dark-mode";

import { startUserLogout } from "../../../redux/actions/userActions";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MoreIcon from "@material-ui/icons/MoreVert";
import MUILink from "@material-ui/core/Link";
import useStyles from "./useStyles";
import Avatar from "@material-ui/core/Avatar";
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

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleLogout = () => {
    handleMenuClose();
    logout();
  };

  const handleMenuDashboard = () => {
    isAdmin ? Router.push("/admin") : Router.push("/user");
  };

  const handleMenuBlogs = () => {
    Router.push("/blogs");
  };

  const handleMenuProfile = () => {
    Router.push(`/profile/${photoId}`);
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
      <MenuItem onClick={handleMenuBlogs}>BLOGS</MenuItem>
      <MenuItem onClick={handleMenuProfile}>PROFILE</MenuItem>
      <MenuItem onClick={handleMenuDashboard}>DASHBOARD</MenuItem>
      <MenuItem onClick={handleLogout}>LOGOUT</MenuItem>
    </Menu>
  );

  const { value: isDark, toggle: toggleDarkMode } = useDarkMode();

  return (
    <div className={classes.grow}>
      <AppBar position="fixed" color="default">
        <Toolbar>
          <Link href="/">
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
          <div className={classes.search}>
            <DynamicSearch />
          </div>
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
              <Link href="/blogs">
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
              <Link href="/signin">
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
              <Link href="/signup">
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
              <Link href="/newBlog">
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
              <Link href="/blogs">
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

            {isAuthenticated && isAdmin && (
              <Link href="/admin">
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

            {isAuthenticated && !isAdmin && (
              <Link href="/user">
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
                <Avatar src={`${API}/users/photo/${photoId}`} />
                {/* <AccountCircle /> */}
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
