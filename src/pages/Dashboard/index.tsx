import React from "react";
import MetaTags from "react-meta-tags";

//import Breadcrumbs
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { Col, Row } from "reactstrap";
import Indicators from "./Indicators";
import TopOffers from "./TopOffers";
import Map from "./Map";

import c from "./index.module.scss";

const Dashboard = () => {
  return (
    <React.Fragment>
      <MetaTags>
        <title>Dashboard</title>
      </MetaTags>
      <div className="page-content full d-flex">
        <div className={c.dashboard}>
          <div className={c.top}>
            <Breadcrumbs title="Your statistics (last week)" breadcrumbItem="Dashboard" />
            <Row>
              <Indicators />
            </Row>
          </div>
          <div className={c.bottom}>
            <div className={c.bottomContent}>
              <div className={c.colLeft}>
                <TopOffers />
              </div>
              <div className={c.colRight}>
                <Map />
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
