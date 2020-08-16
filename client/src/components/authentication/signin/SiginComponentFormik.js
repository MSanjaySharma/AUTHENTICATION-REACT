import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import useStyles from "./useStyles";
import { startLoginUser } from "../../../redux/actions/userActions";
import CustomizedSnackbars from "../../../utils/components/SnackBar";
import schema from "./schema";

const initialValues = {
  email: "user2@gmail.com",
  password: "123456789",
};

export const SiginComponentFormik = ({ startLoginUser }) => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const [state, setState] = useState({
    showPassword: false,
    error: "",
    loading: false,
    message: "",
  });

  const handleClickShowPassword = () => {
    setState((prevState) => ({
      ...state,
      showPassword: !prevState.showPassword,
    }));
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const changeState = (message, error) => {
    setState({
      ...state,
      loading: false,
      message,
      error,
    });
  };

  const redirect = () => {
    return history.push("/");
  };

  const handleSubmit = (values) => {
    const formData = {
      name: values.name,
      email: values.email,
      password: values.password,
    };
    setState({ ...state, loading: true });
    startLoginUser(formData, changeState);
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        {!location.search && (
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
        )}
        {location.search && (
          <Typography component="h1" variant="h5">
            Session Expired. Please Signin.
          </Typography>
        )}

        <Formik
          initialValues={initialValues}
          onSubmit={(values) => handleSubmit(values)}
          validationSchema={schema}
        >
          {({ setFieldValue, setFieldTouched, values, errors, touched }) => (
            <Form className={classes.form}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    helperText={<ErrorMessage name="email"></ErrorMessage>}
                    error={touched.email && Boolean(errors.email)}
                    as={TextField}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type={state.showPassword ? "text" : "password"}
                    id="password"
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {state.showPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      ),
                    }}
                    helperText={<ErrorMessage name="password"></ErrorMessage>}
                    error={touched.password && Boolean(errors.password)}
                    as={TextField}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
              <div className={classes.linkDiv}>
                <Link to="/signup">
                  <Typography variant="body2" style={{ color: "#3f51b5" }}>
                    {"Don't have an account? Sign Up"}
                  </Typography>
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <CustomizedSnackbars
        changeState={changeState}
        message={state.message}
        error={state.error}
        redirect={redirect}
      />
    </Container>
  );
};

const mapDispatchToProps = { startLoginUser };

export default connect(null, mapDispatchToProps)(SiginComponentFormik);
