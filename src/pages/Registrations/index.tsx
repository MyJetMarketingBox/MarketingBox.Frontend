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
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TableReg from "./components/table/TableRegistrations";
import ModalDetail from "./components/detail/ModalDetail";
import { Link } from "react-router-dom";
import Filter from "./components/filter/Filter";

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

  const [errorRegList, setErrorRegList] = useState<any>(null);
  const [modal, setModal] = useState<boolean>(false);
  const [regId, setRegId] = useState(null);

  let filter = {
    order: 1, //DESC
    ReportType: 2
  }

  useEffect(() => {
    dispatch(onGetRegistrations('', filter))
    return () => {
      dispatch(clearRegistrations());
    }
  }, []);


  /** toast error **/
  useEffect(() => {
    if(errorReg.message) {
      console.log(errorReg.status);
      let autoClose : any = 5000;
      let message : any = errorReg.message + " \n " + "Something went wrong! try a little later...";

      if(errorReg.message == "Network Error"){
        autoClose = false;
        message = errorReg.message;
      }

      let optionToast : any = {
        position: "top-right",
        autoClose: autoClose,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      }

      if(layoutMode && layoutMode != 'light') optionToast.theme = "dark";

      toast.error(message, optionToast);
    }
  }, [errorReg]);

  async function loadMore() {
    if(nextURL) {
      dispatch(onGetRegistrations(nextURL, {}));
    }
  }

  if(errorRegList){
    console.log(errorRegList);
    // if(errorAffList.status === 401){
    //   location.replace('/logout');
    // }
  }

  const toggleModal = () => {
    setModal(prev => !prev);
  };

  return (
    <React.Fragment>
      <ToastContainer />
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
                      <Filter />
                  </Row>

                  <Row>
                    <Col xl="12">
                      <div className="table-responsive">
                        {registrations.length ? <TableReg registrations={registrations} setRegId={setRegId} toggle={toggleModal}/> : null }
                      </div>
                    </Col>
                  </Row>

                  {nextURL && (
                    <Row>
                      <Col xs="12">
                        <div className="text-center my-3">
                          <Link to="#" onClick={loadMore} className="text-success">
                            <i className={`${!loading ? 'mdi mdi-download' : 'bx bx-hourglass bx-spin'} me-2 font-size-16`}></i> {" "}
                            Load more
                          </Link>
                        </div>
                      </Col>
                    </Row>
                  )}

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
