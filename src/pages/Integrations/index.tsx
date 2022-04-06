import React, { useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import {
  Col,
  Container,
  Row
} from "reactstrap";
import AddIntegrationForm from "./components/addInteration";
import { useDispatch, useSelector } from "react-redux";
import { clearIntegrations, getIntegrations } from "../../store/integrations/actions";
import CardIntegration from "./components/card";
import BtnLoadMore from "../../components/UI/btns/BtnLoadMore";

const Integrations: React.FC = () => {
  const dispatch = useDispatch();

  const [modal, setModal] = useState<boolean>(false);


  const {integrations, nextUrl, loading} = useSelector((state: any) => {
    return {
      integrations: state.Integrations.value.items,
      nextUrl: state.Integrations.value.pagination.nextUrl,
      loading: state.Integrations.loading,
    }
  });

  useEffect(() => {
    dispatch(getIntegrations(null, {order: 1}));
    return () => {
      dispatch(clearIntegrations());
    }
  }, [])

  async function loadMore() {
    if (nextUrl) {
      dispatch(getIntegrations(nextUrl, {order: 1}));
    }
  }

  const toggleModal = () => {
    setModal(prev => !prev);
  };


  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Integrations | TraffMe</title>
        </MetaTags>

        <Container fluid>
          <Breadcrumbs title="TraffMe" breadcrumbItem="Integrations" />

          <Row className="align-items-center">
            <Col md={12}>
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
            {integrations.map((integration : any) =>
              <CardIntegration integration={integration} key={integration.id} />
            )}
          </Row>

          {
            nextUrl &&
            <Row>
              <Col className="col-12">
                <div className="text-center">
                  <BtnLoadMore
                    loading={loading}
                    handeClick={loadMore}
                  />
                </div>
              </Col>
            </Row>
          }

        </Container>

      </div>
      <AddIntegrationForm isOpen={modal} toggle={toggleModal} />
    </React.Fragment>
  )
}

export default Integrations;