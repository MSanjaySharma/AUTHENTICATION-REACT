import axios from "../../config/axios";
import {
  getCookie,
  setCookie,
  removeCookie,
} from "../../utils/functions/cookie";
import jwtError from "../../utils/functions/jwtError";

//SET USER
export const setUser = (user) => {
  return { type: "SET_USER", payload: user };
};

//SET TOKEN
export const setToken = (token) => {
  return { type: "SET_TOKEN", payload: token };
};

//REMOVE TOKEN AND USER
export const removeUserToken = () => {
  return { type: "REMOVE_USER_TOKEN" };
};

//REGISTER
export const startRegisterUser = (formData, changeState) => {
  return (dispatch) => {
    axios
      .post("/users/signup", formData)
      .then((response) => {
        if (response.data.hasOwnProperty("error")) {
          changeState("", response.data.error);
        } else {
          changeState("You have registered succesfully", "");
        }
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response) {
          changeState("", error.response.data);
        } else {
          changeState("", "Unable to Register. Try again later");
        }
      });
  };
};

//LOGIN
export const startLoginUser = (formData, changeState) => {
  return (dispatch) => {
    axios
      .post("/users/login", formData)
      .then((response) => {
        if (response.data.hasOwnProperty("error")) {
          changeState("", response.data.error);
        } else {
          setCookie("token", response.data.token);
          const tokenData = response.data.token;
          axios
            .get("/users/account", {
              headers: {
                Authorization: getCookie("token"),
              },
            })
            .then((response) => {
              if (response.data.hasOwnProperty("error")) {
                changeState("", response.data.error);
              } else {
                const user = response.data;
                dispatch(setUser(user));
                dispatch(setToken(tokenData));
                changeState("Succesfully logged in", "");
              }
            })
            .catch((err) => {
              changeState("", "Couldn't Login!!! try again later");
              dispatch(removeUserToken());
            });
        }
      })
      .catch((err) => {
        changeState("", "Couldn't Login!!! try again later");
        dispatch(removeUserToken());
      });
  };
};

//GET USER DETAILS
export const startGetUser = () => {
  return (dispatch) => {
    axios
      .get("/users/account", {
        headers: { Authorization: getCookie("token") },
      })
      .then((response) => {
        const user = response.data;
        dispatch(setUser(user));
      })
      .catch((err) => {
        if (err.response.status === 401) {
          jwtError(dispatch);
        } else {
          alert("err");
        }
      });
  };
};

//LOGOUT
export const startUserLogout = () => {
  return (dispatch) => {
    axios
      .delete("/users/logout", {
        headers: { Authorization: getCookie("token") },
      })
      .then((response) => {
        if (response.data.message) {
          removeCookie("token");
          dispatch({ type: "PURGE_USERS" });
          window.location.href = "/";
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          jwtError(dispatch);
        } else {
          alert("couldnt logout!!! try again");
        }
        //changeState("", "Couldn't logout!!! try again");
      });
  };
};

//REAUTHENTICATE
export const reauthenticate = (token) => {
  return (dispatch) => {
    dispatch(setToken(token));
  };
};
