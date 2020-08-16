import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { store, persistor } from "./redux/store/configureStore";

import Loader from "./utils/components/Loader";
import "./styles/globalStyles/link.css";
import AppWrapper from "./AppWrapper";

function MyApp() {
  store.subscribe(() => {
    console.log(store.getState());
  });

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<Loader />}>
        <AppWrapper />
      </PersistGate>
    </Provider>
  );
}

ReactDOM.render(<MyApp />, document.getElementById("root"));
