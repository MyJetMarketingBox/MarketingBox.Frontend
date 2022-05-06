import React, { useEffect, useState } from "react";

import MetaTags from "react-meta-tags";
import {
  Card,
  CardBody,
  Col,
  Row,
} from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

import "../../assets/scss/datatables.scss";

import {
  clearRegistrations,
  getRegistrations as onGetRegistrations
} from "../../store/actions";
import { isEmpty, size, map } from "lodash";

import { useDispatch, useSelector } from "react-redux";
import 'react-toastify/dist/ReactToastify.css';
import TableReg from "./components/table/TableRegistrations";
import ModalDetail from "./components/detail/ModalDetail";
import { Link } from "react-router-dom";
import Filter from "./components/filter/Filter";
import BtnLoadMore from "../../components/UI/btns/BtnLoadMore";
import SearchRegistration from "./components/search/index";

//import Loader from "../../components/UI/loader";

const Registrations: React.FC = () => {

  const dispatch = useDispatch();

  const { registrations, errorReg, loading, layoutMode, nextURL } = useSelector((state: any) => {
    return {
      registrations: state.Registrations.registrations.items,
      nextURL: state.Registrations.registrations.pagination.nextUrl,
      errorReg: state.Registrations.error,
      loading: state.Registrations.loading,
      layoutMode: state.Layout.layoutMode
    }
  });

  const [modal, setModal] = useState<boolean>(false);
  const [regId, setRegId] = useState(null);

  let filter = {
    order: 1, //DESC
    type: 2,
    limit: 50
  }

  useEffect(() => {
    dispatch(onGetRegistrations('', filter))
    return () => {
      dispatch(clearRegistrations());
    }
  }, []);

  async function loadMore() {
    if(nextURL) {
      dispatch(onGetRegistrations(nextURL, {}));
    }
  }


  const toggleModal = () => {
    setModal(prev => !prev);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Registrations | TraffMe </title>
        </MetaTags>
        <div className="container-fluid">
          <Breadcrumbs title="TraffMe" breadcrumbItem="Registrations" />

          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>

                  <Row className="mb-4">
                      {/*<Filter />*/}
                    <Col className="col-md-4">
                      <SearchRegistration />
                    </Col>
                  </Row>

                  <Row className="mb-4">
                    <Col xl="12">
                      <div className="table-responsive">
                        {registrations.length ? <TableReg registrations={registrations} setRegId={setRegId} toggle={toggleModal}/> : null }
                      </div>
                    </Col>
                  </Row>

                  {nextURL &&
                    <Row>
                      <Col xs="12">
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
      </div>

      { regId ? <ModalDetail regId={regId} toggle={toggleModal} isOpen={modal}/> : null }

    </React.Fragment>
  );
};

export default Registrations;
