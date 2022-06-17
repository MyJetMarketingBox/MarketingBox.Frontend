import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
// Lauouts
import RouteLayout from "./routes/RouteLayout";
// Import scss
import "./assets/scss/theme.scss";
import "./assets/scss/preloader.scss";
import BadRequestContainer from "./components/BadRequestContainer/BadRequestContainer";
import { ToastContainer } from "react-toastify";
import { configureStore } from "./store";
import { injectInterceptor } from "./helpers/api_helper";
import { Provider } from "react-redux";

let store = configureStore({});

injectInterceptor(store);

const App = () => {
  return (
    <React.Fragment>
      <Provider store={store}>
        <ToastContainer autoClose={2000} />
        <BadRequestContainer />
        <Router>
          <RouteLayout />
        </Router>
      </Provider>
    </React.Fragment>
  );
};

export default App;
