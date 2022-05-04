import React from "react";
import { Switch, BrowserRouter as Router } from "react-router-dom";

// Lauouts
import RouteLayout from "./routes/RouteLayout";

// Import scss
import "./assets/scss/theme.scss";
import "./assets/scss/preloader.scss";

const App = () => {
  return (
    <React.Fragment>
      <Router>
        <RouteLayout />
      </Router>
    </React.Fragment>
  );
};

export default App;
