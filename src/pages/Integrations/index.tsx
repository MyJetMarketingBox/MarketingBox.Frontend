import React, { useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import {
  Card, CardBody,
  Col,
  Container,
  Row
} from "reactstrap";
import AddIntegrationForm from "./components/addInteration";
import { useDispatch, useSelector } from "react-redux";
import { clearIntegrations, getIntegrations } from "../../store/integrations/actions";
import CardIntegration from "./components/card";
import BtnLoadMore from "../../components/UI/btns/BtnLoadMore";
import SearchIntegration from "./components/search"
import Loader from "../../components/UI/loader";

const Integrations: React.FC = () => {
  const dispatch = useDispatch();

  const [modal, setModal] = useState<boolean>(false);
  const [filter, setFilter] = useState<object>({order: 1, limit: 50})

  const {integrations, nextUrl, loading, loaded} = useSelector((state: any) => {
    return {
      integrations: state.Integrations.value.items,
      nextUrl: state.Integrations.value.pagination.nextUrl,
      loading: state.Integrations.loading,
      loaded: state.Integrations.loaded,
    }
  });

  useEffect(() => {
    dispatch(getIntegrations(null, filter));
    return () => {
      dispatch(clearIntegrations());
    }
  }, [])

  async function loadMore() {
    if (nextUrl) {
      dispatch(getIntegrations(nextUrl, {}));
    }
  }

  const toggleModal = () => {
    setModal(prev => !prev);
  };


  return (
    <React.Fragment>
      {!loaded && loading && <Loader />}
      <div className="page-content">
        <MetaTags>
          <title>Integrations | TraffMe</title>
        </MetaTags>
        <div className="container-fluid">
          <Breadcrumbs title="TraffMe" breadcrumbItem="Integrations" />
        </div>

        <Row>
          <Col className="col-12">
            <Card>
              <CardBody>

                <Row className="mb-2">
                  <Col className="col-md-4 mb-4">
                    <SearchIntegration />
                  </Col>

                  <Col className="col-md-4 offset-4 text-end">
                    {/*<button
                      type="button"
                      className="btn btn-light"
                      onClick={toggleModal}
                    >
                      <i className="bx bx-plus me-1"></i> Add New
                    </button>*/}
                  </Col>
                </Row>

                <Row className="mb-4">
                  {integrations.length ? integrations.map((integration : any) =>
                    <CardIntegration integration={integration} key={integration.id} />
                  ) : null}
                  {!integrations.length && loaded ? (
                    <div style={{ textAlign: "center", padding: "30px 0" }}>
                      <h3>No Data Available</h3>
                    </div>
                  ) : null}
                </Row>

                {
                  nextUrl &&
                  <Row >
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
              </CardBody>
            </Card>
          </Col>
        </Row>

      </div>
      {modal && <AddIntegrationForm isOpen={modal} toggle={toggleModal}/>}
    </React.Fragment>
  )
}

export default Integrations;