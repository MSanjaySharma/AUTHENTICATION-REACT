import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import App from "./App";
import { store, persistor } from "./store/configureStore";

function MyApp() {
  /*   store.subscribe(() => {
    console.log(store.getState());
  }); */

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
}

ReactDOM.render(<MyApp />, document.getElementById("root"));
