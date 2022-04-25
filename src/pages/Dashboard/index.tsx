import React from "react";
import MetaTags from "react-meta-tags";

//import Breadcrumbs
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { Col, Container, Row } from "reactstrap";
// import Widgets from "./Widgets";
import Indicators from "./Indicators";
import TopOffers from "./TopOffers";
import Map from "./Map";


// const options: Object = {
//   chart: {
//     height: 50,
//     type: "line",
//     toolbar: { show: false },
//   },
//   colors: ["#f1734f"],
//   stroke: {
//     curve: "smooth",
//     width: 2,
//   },
//   xaxis: {
//     labels: {
//       show: false,
//     },
//     axisTicks: {
//       show: false,
//     },
//     axisBorder: {
//       show: false,
//     },
//   },
//   yaxis: {
//     labels: {
//       show: false,
//     },
//   },
//   tooltip: {
//     fixed: {
//       enabled: false,
//     },
//     x: {
//       show: false,
//     },
//     y: {
//       title: {
//         formatter: function (seriesName: any) {
//           return "";
//         },
//       },
//     },
//     marker: {
//       show: false,
//     },
//   },
// };

const Dashboard = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Dashboard</title>
        </MetaTags>
        <div>
          <Breadcrumbs title="Your statistics (last week)" breadcrumbItem="Dashboard" />

          <Row>
            {/*<Widgets options={options}/>*/}
            <Indicators />
          </Row>
          <Row>
            <Col md={6}>
              <TopOffers />
            </Col>
            <Col md={6}>
              <Map />
            </Col>
          </Row>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
