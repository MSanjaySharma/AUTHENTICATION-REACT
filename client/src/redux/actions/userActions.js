import axios from "../../config/axios";
import {
  getCookie,
  //setCookie,
  removeCookie,
} from "../../utils/functions/cookie";
import jwtError from "../../utils/functions/jwtError";

//SET USER
export const setUser = (user) => {
  return { type: "SET_USER", payload: user };
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
      .post("/users/signin", formData, { withCredentials: true })
      .then((response) => {
        if (response.data.hasOwnProperty("error")) {
          changeState("", response.data.error);
        } else {
          const user = response.data;
          dispatch(setUser(user));
          changeState("Succesfully logged in", "");
        }
      })
      .catch((error) => {
        if (error.response) {
          changeState("", error.response.data);
        } else {
          changeState("", "Couldn't Login!!! try again later");
        }
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
  console.log(getCookie("token"));
  return (dispatch) => {
    axios
      .delete("/users/signout")
      .then((response) => {
        if (response.data.message) {
          removeCookie("token");
          dispatch({ type: "PURGE_USERS" });
          window.location.href = "/";
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          //jwtError(dispatch);
        } else {
          alert("couldnt logout!!! try again");
        }
        //changeState("", "Couldn't logout!!! try again");
      });
  };
};
