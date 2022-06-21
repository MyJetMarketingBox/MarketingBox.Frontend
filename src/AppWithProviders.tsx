import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import RouteLayout from "./routes/RouteLayout";

const AppWithProviders = () => {
  return (
    <>
      <Router>
        <RouteLayout />
      </Router>
    </>
  );
};

export default AppWithProviders;
