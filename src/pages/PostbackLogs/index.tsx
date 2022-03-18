import React, { useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { Card, CardBody, Col, Row } from "reactstrap";

import { clearPostbackLogs, getPostbackLogs, getRegistrations as onGetRegistrations } from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import TableLogs from "./components/table/index";
import { Link } from "react-router-dom";
import ModalDetail from "./components/detail/ModalDetail";
import Filter from "./components/filter/Filter";
import { toast, ToastContainer } from "react-toastify";

const PostbackLogs: React.FC = () => {
  const dispatch = useDispatch();

  const [modal, setModal] = useState<boolean>(false);
  const [ID, setID] = useState(null);

  const {logs, nextURL, loading, errorLog, layoutMode } = useSelector((state: any ) => {
    return {
      logs: state.PostbackLogs.logs.items,
      nextURL: state.PostbackLogs.logs.pagination.nextUrl,
      errorLog: state.PostbackLogs.error,
      loading: state.PostbackLogs.loading,
      layoutMode: state.Layout.layoutMode
    }
  });

  let filter = {
    order: 1, //DESC
    //limit: 12,
  }

  useEffect(() => {
    dispatch(getPostbackLogs('', filter))
    return () => {
      dispatch(clearPostbackLogs());
    }
  }, [])

  async function loadMore() {
    if(nextURL) {
      dispatch(onGetRegistrations(nextURL, {}));
    }
  }

  const toggleModal = () => {
    setModal(prev => !prev);
  };

  /** toast error **/
  /*useEffect(() => {
    if(errorLog.statusText) {

      let autoClose : any = 5000;
      let message : any = errorLog.statusText;

      if(errorLog.statusText == "Network Error"){
        autoClose = false;
        message = errorLog.message;
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
      if(errorLog.status === 401) optionToast.onClose = () => location.replace('/logout');

      toast.error(message, optionToast);
    }
  }, [errorLog]);*/

  return (
    <React.Fragment>
      <div className="page-content">

        <MetaTags>
          <title>Postback Logs | TraffMe </title>
        </MetaTags>
        <div className="container-fluid">
          <Breadcrumbs title="TraffMe" breadcrumbItem="Postback logs" />
        </div>

        <Row>
          <Col className="col-12">
            <Card>
              <CardBody>

                <Row className="mb-4">
                  {/*<Filter />*/}
                </Row>

                <Row>
                  <Col xl="12">
                    <div className="table-responsive">
                      {logs.length
                        ? <TableLogs logs={logs} setID={setID} toggle={toggleModal}/>
                        : <div style={{ "textAlign": "center", "padding": "30px 0" }}>
                            <h3>No Data Available</h3>
                          </div>
                      }
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

      { ID ? <ModalDetail id={ID} toggle={toggleModal} isOpen={modal}/> : null }
      <ToastContainer />

    </React.Fragment>
  )
}

export default PostbackLogs;