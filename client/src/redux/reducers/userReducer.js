//const initialState = {};

export default (state = {}, { type, payload }) => {
  switch (type) {
    case "SET_USER": {
      return payload;
    }
    case "PURGE_USERS": {
      return {};
    }
    default:
      return state;
  }
};
