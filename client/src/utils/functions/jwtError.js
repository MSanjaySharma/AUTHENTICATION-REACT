export default (dispatch) => {
  dispatch({ type: "PURGE_USERS" });
  window.location.href = "/signInSessionExpired?redirected=true";
};
