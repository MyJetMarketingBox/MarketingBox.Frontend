import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
// Lauouts
import RouteLayout from "./routes/RouteLayout";
// Import scss
import "./assets/scss/theme.scss";
import "./assets/scss/preloader.scss";
import BadRequestContainer from "./components/BadRequestContainer/BadRequestContainer";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <React.Fragment>
      <ToastContainer autoClose={2000} />
      <BadRequestContainer />
      <Router>
        <RouteLayout />
      </Router>
    </React.Fragment>
  );
};

export default App;
