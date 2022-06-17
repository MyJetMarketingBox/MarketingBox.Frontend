import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
// Lauouts
import RouteLayout from "./routes/RouteLayout";
// Import scss
import "./assets/scss/theme.scss";
import "./assets/scss/preloader.scss";

const App = () => {
  return (
    <Router>
      <RouteLayout />
    </Router>
  );
};

export default App;
