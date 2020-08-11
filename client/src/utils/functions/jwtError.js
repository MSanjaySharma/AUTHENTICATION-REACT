import { removeCookie } from "./cookie";

export default (dispatch) => {
  removeCookie("token");
  dispatch({ type: "PURGE_USERS" });
  window.location.href = "/signInSessionExpired?redirected=true";
};
