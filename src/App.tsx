import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
// Lauouts
import RouteLayout from "./routes/RouteLayout";
// Import scss
import "./assets/scss/theme.scss";
import "./assets/scss/preloader.scss";
import BadRequestContainer from "./components/BadRequestContainer/BadRequestContainer";
import { useSelector } from "react-redux";
import { injectInterceptor } from "./helpers/api_helper";

const App = () => {
  return (
    <React.Fragment>
      <BadRequestContainer />
      <Router>
        <RouteLayout />
      </Router>
    </React.Fragment>
  );
};

export default App;
