import React from "react";
import MetaTags from "react-meta-tags";

//import Breadcrumbs
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { Container, Row } from "reactstrap";
import Widgets from "./Widgets";


const options: Object = {
  chart: {
    height: 50,
    type: "line",
    toolbar: { show: false },
  },
  colors: ["#f1734f"],
  stroke: {
    curve: "smooth",
    width: 2,
  },
  xaxis: {
    labels: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
  },
  yaxis: {
    labels: {
      show: false,
    },
  },
  tooltip: {
    fixed: {
      enabled: false,
    },
    x: {
      show: false,
    },
    y: {
      title: {
        formatter: function (seriesName: any) {
          return "";
        },
      },
    },
    marker: {
      show: false,
    },
  },
};

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

          <Row>
            <div className="text-left">
              <h5>Your statistics</h5>
            </div>
            <Widgets  options={options}/>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
