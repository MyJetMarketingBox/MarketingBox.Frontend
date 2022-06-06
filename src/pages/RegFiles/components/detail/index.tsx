import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardBody, Col, Row } from "reactstrap";
import Table from "./table";
import BtnLoadMore from "../../../../components/UI/btns/BtnLoadMore";
import { clearRegDetailFile, getRegDetailFile, getRegFiles } from "../../../../store/regFiles/actions";
import { useParams } from "react-router";
import Loader from "../../../../components/UI/loader";
import MetaTags from "react-meta-tags";
import Breadcrumbs from "../../../../components/Common/Breadcrumb";
import { useHistory } from "react-router";


const RegFileDetail = () => {
  const dispatch = useDispatch()
  const { id } = useParams<{ id: string; }>();
  const history = useHistory();

  const { loaded, loading, dataList, nextUrl, total } = useSelector((state : any) => {
    return {
      loaded: state.RegFiles.loaded,
      loading: state.RegFiles.loading,
      dataList: state.RegFiles.data.items,
      nextUrl: state.RegFiles.data.pagination.nextUrl,
      total: state.RegFiles.data.pagination.total
    }
  })

  let filter = {
    order: 1,
    limit: 50
  }

  useEffect(() => {
    const currFilter = { ...filter, FileId: id}
    dispatch(getRegDetailFile("", currFilter))
    return () => {
      dispatch(clearRegDetailFile())
    }
  }, []);

  async function loadMore() {
    if(nextUrl){
      dispatch(getRegFiles(nextUrl, {}))
    }
  }

  const handleBack = () => {
    history.goBack()
  }

  return (
    <React.Fragment>
      { !loaded && loading && <Loader /> }
      <div className="page-content">
        <MetaTags>
          <title>Detail File | TraffMe </title>
        </MetaTags>
        <div className="container-fluid">
          <Breadcrumbs title="TraffMe" breadcrumbItem="Detail File" />
        </div>

        <Row>
          <Col className="col-12">
            <Card>
              <CardBody>
          <Row className="mb-4">
            {/*<Col className="col-xs-12 col-md-6 col-xl-4 mb-3">
              <Search />
            </Col>*/}

            <div className="col-xl-12 mb-3 inline-flex">
              <i className="bx bx-chevron-left font-size-20 text-orange"></i>
              <a onClick={handleBack} className="text-orange pointer">
                Back to main screen
              </a>
            </div>

            <div className="col-xl-12 text-muted">
              Showing {dataList.length} / {total} results
            </div>
          </Row>

          <Row className="mb-4">
            <Col xl="12">
              <div className="table-responsive">
                {dataList.length ? <Table data={dataList} /> : null}
                {
                  (!dataList.length && loaded)
                    ? <div style={{ "textAlign": "center", "padding": "30px 0" }}>
                      <h3>No Data Available</h3>
                    </div>
                    : null
                }
              </div>
            </Col>
          </Row>

          {nextUrl &&
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
    </React.Fragment>
  )

}

export default RegFileDetail;