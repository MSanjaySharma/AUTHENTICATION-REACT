import React from "react";
import { connect } from "react-redux";
import themeDark from "./utils/functions/themeDark";
import themeLight from "./utils/functions/themeLight";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import App from "./App";

const AppWrapper = (isDark) => {
  return (
    <>
      <ThemeProvider theme={isDark.isDark ? themeDark : themeLight}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </>
  );
};

const mapStateToProps = (state) => ({ isDark: state.darkMode });

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AppWrapper);
