import React, { useEffect } from "react";
import Loader from "../../components/UI/loader";
import MetaTags from "react-meta-tags";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { Card, CardBody, Col, Row } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { clearReports, getReports } from "../../store/reports/actions";

const Report = () => {
  const dispatch = useDispatch();

  const { loaded, loading, reports, nextUrl } = useSelector((state: any) => {
    return {
      reports: state.Reports.reports.items,
      nextUrl: state.Reports.reports.pagination.nextUrl,
      loaded: state.Reports.loaded,
      loading: state.Reports.loading,
    }
  })

  const filter = {
    order: 1,
    limit: 50
  }

  useEffect(() => {
    dispatch(getReports('', filter))
    return () => {
      dispatch(clearReports())
    }
  }, [])

  return (
    <React.Fragment>
      { !loaded && loading && <Loader /> }
      <div className="page-content">
        <MetaTags>
          <title>Report | TraffMe </title>
        </MetaTags>
        <div className="container-fluid">
          <Breadcrumbs title="TraffMe" breadcrumbItem="Report" />

          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>
                  <Row>
                    <h1>здеся будет фильтр</h1>
                  </Row>

                  <Row className="mb-4">
                    <Col xl="12">
                      <div className="table-responsive">

                        <h1>тута таблица</h1>

                      </div>
                    </Col>
                  </Row>

                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
          </Row>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Report;