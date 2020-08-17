import React from "react";
import { connect } from "react-redux";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

const PrivateComp = ({ user }) => {
  return (
    <>
      <Paper style={{ width: "90%", margin: "2vh auto", marginTop: "5vh" }}>
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item style={{ width: "100%" }}>
            <Typography variant="h4" align="center">
              Welcome {user} !!! This is a Private Route
            </Typography>
          </Grid>

          <Grid item style={{ width: "100%" }}></Grid>
        </Grid>
      </Paper>
    </>
  );
};

const mapStateToProps = (state) => ({ user: state.user.username });

export default connect(mapStateToProps, null)(PrivateComp);
