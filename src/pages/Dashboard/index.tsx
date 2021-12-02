import React from "react";
import MetaTags from "react-meta-tags";

//import Breadcrumbs
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { Container } from "reactstrap";


const Dashboard = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Dashboard</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Dashboard" breadcrumbItem="Dashboard" />

          <div className="text-center">
            <h1> FUCK I CAN </h1>
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
