import React from "react";

import BadRequestContainer from "./components/BadRequestContainer/BadRequestContainer";
import { ToastContainer } from "react-toastify";
import { configureStore } from "./store";
import { injectInterceptor } from "./helpers/api_helper";
import { Provider } from "react-redux";
import AppWithProviders from "./AppWithProviders";

import "./assets/scss/theme.scss";
import "./assets/scss/preloader.scss";

let store = configureStore({});
injectInterceptor(store);

const App = () => {
  return (
    <Provider store={store}>
      <ToastContainer autoClose={2000} />
      <BadRequestContainer />

      <AppWithProviders />
    </Provider>
  );
};

export default App;
