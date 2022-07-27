import React, { useEffect, useState } from "react";
import Loader from "../../components/UI/loader";
import MetaTags from "react-meta-tags";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { Card, CardBody, Col, Row } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { clearReports, getReports } from "../../store/reports/actions";
import TableReport from "./components/table"
import BtnLoadMore from "../../components/UI/btns/BtnLoadMore";
import FilterReport from "./components/filter"

const Report = () => {
  const dispatch = useDispatch();

  const [filter, setFilter] = useState<Object>({
    order: 1,
    limit: 20,
    DateFrom: new Date(new Date().setDate(new Date().getDate() - 7)).toISOString().split('T')[0],
    DateTo:  new Date().toISOString().split('T')[0],
  });

  const { loaded, loading, reports, nextURL, total } = useSelector((state: any) => {
    return {
      reports: state.Reports.reports.items,
      nextURL: state.Reports.reports.pagination.nextUrl,
      loaded: state.Reports.loaded,
      loading: state.Reports.loading,
      total: state.Reports.reports.pagination.total,
    }
  })

  useEffect(() => {
    dispatch(getReports('', filter))

    return () => {
      dispatch(clearReports())
    }
  }, []);

  async function loadMore() {
    if (nextURL) {
      dispatch(getReports(nextURL, {}));
    }
  }

    return (
    <React.Fragment>
      { loading && <Loader /> }
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
                    <FilterReport filter={filter}/>
                    <div className="col-xl-12 mb-3 text-muted">
                      Showing {reports.length} / {total} results
                    </div>
                  </Row>

                  <Row className="mb-4">
                    <Col xl="12">
                      <div className="table-responsive">
                        {reports.length ? (
                          <TableReport reports={reports}/>
                        ) : null}

                        {!reports.length && loaded ? (
                          <div style={{ textAlign: "center", padding: "30px 0" }}>
                            <h3>No Data Available</h3>
                          </div>
                        ) : null}
                      </div>
                    </Col>
                  </Row>

                  {nextURL && (
                    <Row>
                      <Col xs="12">
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
      </div>
    </React.Fragment>
  )
}

export default Report;