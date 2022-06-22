import React, { useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { Card, CardBody, Col, Row } from "reactstrap";

import { clearPostbackLogs, getPostbackLogs } from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import TableLogs from "./components/table/index";
import ModalDetail from "./components/detail/ModalDetail";
import Filter from "./components/filter/";
import Loader from "../../components/UI/loader";
import BtnLoadMore from "../../components/UI/btns/BtnLoadMore";

const PostbackLogs: React.FC = () => {
  const dispatch = useDispatch();

  const [modal, setModal] = useState<boolean>(false);
  const [ID, setID] = useState(null);

  const {logs, nextURL, loading, errorLog, layoutMode, loaded, total } = useSelector((state: any ) => {
    return {
      logs: state.PostbackLogs.logs.items,
      nextURL: state.PostbackLogs.logs.pagination?.nextUrl,
      errorLog: state.PostbackLogs.error,
      loading: state.PostbackLogs.loading,
      loaded: state.PostbackLogs.loaded,
      layoutMode: state.Layout.layoutMode,
      total: state.PostbackLogs.logs.pagination?.total,
    }
  });

  let filter = {
    order: 1, //DESC
    limit: 50,
  }

  useEffect(() => {
    dispatch(getPostbackLogs('', filter))
    return () => {
      dispatch(clearPostbackLogs());
    }
  }, [])

  async function loadMore() {
    if(nextURL) {
      dispatch(getPostbackLogs(nextURL, {}));
    }
  }

  const toggleModal = () => {
    setModal(prev => !prev);
  };


  return (
    <React.Fragment>
      { !loaded && loading && <Loader /> }

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

                <Row>
                  <Filter />
                  <div className="col-xl-12 text-muted mb-3">
                    Showing {logs.length} / {total} results
                  </div>
                </Row>

                <Row className="mb-4">
                  <Col xl="12">
                      {logs.length
                        ? <TableLogs logs={logs} setID={setID} toggle={toggleModal}/>
                        : <div style={{ "textAlign": "center", "padding": "30px 0" }}>
                            <h3>No Data Available</h3>
                          </div>
                      }
                  </Col>
                </Row>

                {nextURL && (
                  <Row>
                    <Col className="col-12">
                      <div className="text-center">
                        <BtnLoadMore loading={loading} handeClick={loadMore} />
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

    </React.Fragment>
  )
}

export default PostbackLogs;