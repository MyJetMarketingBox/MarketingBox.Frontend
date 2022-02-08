import React, { useEffect } from "react";
import MetaTags from "react-meta-tags";
import { Link, withRouter } from "react-router-dom";
import {
  Col,
  Container,
  Row,
} from "reactstrap";
import { map } from "lodash";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import CardCampaigns from "./other/CardCampaigns";

const CampaignsGrid = () => {

  const campaigns : any = [
    {
      id: 1,
      name: "Карамелька",
    },
    {
      id: 2,
      name: "Компот",
    },
    {
      id: 3,
      name: "Коржик",
    }
  ]


  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Campaigns | TraffMe</title>
        </MetaTags>
        <Container fluid>
          {/** Render Breadcrumbs **/}
          <Breadcrumbs title="TraffMe" breadcrumbItem="Campaigns" />

          <Row className="align-items-center">
            <Col md={6}>
              <div className="mb-3">
                <h5 className="card-title">
                  Campaigns List{" "}
                  <span className="text-muted fw-normal ms-2">(834)</span>
                </h5>
              </div>
            </Col>

            <Col md={6}>
              <div className="d-flex flex-wrap align-items-center justify-content-end gap-2 mb-3">

                <div>
                  <Link to="#" className="btn btn-light">
                    <i className="bx bx-plus me-1"></i> Add New
                  </Link>
                </div>

              </div>
            </Col>
          </Row>

          <Row>
            {map(campaigns, (campaign, key) => {
              return <CardCampaigns campaign={campaign} key={"_campaign_" + key} />
            })}
          </Row>

          <Row>
            <Col xs="12">
              <div className="text-center my-3">
                <Link to="#" className="text-success">
                  <i className="bx bx-hourglass bx-spin me-2" />
                  Load more
                </Link>
              </div>
            </Col>
          </Row>

        </Container>
      </div>
    </React.Fragment>
  )
}

export default CampaignsGrid