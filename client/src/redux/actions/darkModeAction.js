//TOGGLE DARK MODE
export const setDarkMode = (value) => {
  return { type: "TOGGLE_DARK_MODE", payload: value };
};

export const toggleDarkMode = (value) => {
  return (dispatch) => {
    dispatch(setDarkMode(value));
  };
};
