const initialState = {};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_USER": {
      return { ...payload };
    }
    case "PURGE_USERS": {
      return initialState;
    }
    default:
      return state;
  }
};
