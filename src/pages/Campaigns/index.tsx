import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import MetaTags from "react-meta-tags";

import {
  Col,
  Container,
  Row,
} from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import CardCampaigns from "./components/CardCampaigns";

import { clearCampaigns, getCampaigns } from "../../store/campaigns/actions";
import AddCampaignForm from './components/addCampaign/AddCampaignForm';

const CampaignsGrid = () => {
  const dispatch = useDispatch();
  const { campaigns, nextUrl, loaded, loading, error } = useSelector((state: any) => ({
      campaigns: state.Campaigns.campaigns.items,
      nextUrl: state.Campaigns.campaigns.pagination.nextUrl,
      loaded: state.Campaigns.loaded,
      loading: state.Campaigns.loading,
      error: state.Campaigns.error,
    }));

  const [modal, setModal] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getCampaigns(null, { order: 1 }));

    return () => {
      dispatch(clearCampaigns());
    }
  }, []);

  const toggleModal = () => {
    setModal(prev => !prev);
  };

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
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={toggleModal}
                  >
                    <i className="bx bx-plus me-1"></i> Add New
                  </button>
                </div>
              </div>
            </Col>
          </Row>

          <Row>
            {campaigns.map((campaign: any) =>
              <CardCampaigns campaign={campaign} key={campaign.id} />
            )}
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
      <AddCampaignForm isOpen={modal} toggle={toggleModal} />
    </React.Fragment>
  )
}

export default CampaignsGrid
