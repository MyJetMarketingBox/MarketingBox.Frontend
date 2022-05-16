import React from "react";
import MetaTags from "react-meta-tags";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { Row } from "reactstrap";

const Redistribution = () => {


  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Redistribution | TraffMe </title>
        </MetaTags>
        <div className="container-fluid">
          <Breadcrumbs title="TraffMe" breadcrumbItem="Redistribution" />

          <Row>
            <h1> Fucking Redistribution </h1>
          </Row>

        </div>
      </div>
    </React.Fragment>
  )
}

export default Redistribution;