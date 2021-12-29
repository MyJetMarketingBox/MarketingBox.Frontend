import React, { useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { Card, CardBody, Col, DropdownItem, DropdownMenu, DropdownToggle, Row, UncontrolledDropdown } from "reactstrap";
import paginationFactory, {
  PaginationListStandalone,
  PaginationProvider,
  SizePerPageDropdownStandalone
} from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import Flatpickr from "react-flatpickr";
import BootstrapTable from "react-bootstrap-table-next";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getReports } from "../../store/reports/actions";

const Reports = () => {

  const dispatch = useDispatch();

  const { reports } = useSelector((state: any) => ({
    reports: state.Reports.reports,
  }));

  const [isLoading, setLoading] = useState<boolean>(false);
  const [dateFilter, setDateFilter] = useState('2021-10-01 to 2021-11-30')
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [reportList, setReportList] = useState(null)

  useEffect(() => {
    if(!isLoading){
      dispatch(getReports(dateFilter))
      debugger
      setIsEdit(false);
    }
  }, [dispatch])

  useEffect(() => {
    if(reports){
      console.log(reports);
      setReportList(reports.items);
      setLoading(true)
    }
    setIsEdit(false);
  }, [reports]);

  // @ts-ignore
  const reportsData = !(reportList) ? [] : reportList?.map(report => {
    console.log(report);
    return {
      id: report.affiliateId,
      registrationsCount: report.registrationsCount
    }
  });

  const columns = [
    {
      dataField: "username",
      text: "Username",
      sort: true,
    },
    {
      dataField: "role",
      text: "Role",
      sort: true,
    },
    {
      dataField: "ai",
      text: "AI",
      sort: true,
    },
    {
      dataField: "email",
      text: "Email",
      sort: true,
    },
    {
      dataField: "reportto",
      text: "Report To",
      sort: true,
    },
    {
      dataField: "createdat",
      text: "Created At",
      sort: true,
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,
      formatter: (cellContent: any, productData: any) => (
        <>
          <div
            className={"badge badge-soft-" + productData.color + " font-size-12"}
          >
            {productData.status}
          </div>
        </>
      ),
    },
    /*{
      dataField: "actions",
      text: "Actions",
      sort:false,
      formatter: (cell: any, row: any) => (
        <>
          <div>
            <UncontrolledDropdown>
              <DropdownToggle tag="a" className="btn btn-light">
                <i className="mdi mdi-dots-vertical"></i>
              </DropdownToggle>

              <DropdownMenu className="float-start">
                <DropdownItem tag={Link} to={{ pathname: `/Affiliates/view/${row.id}`, state: { id: row.id }}}>edit</DropdownItem>
                <DropdownItem onClick={() => console.log(row.id)}>delete</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </>
      )
    }*/
  ];

  const defaultSorted: any = [
    {
      dataField: "id",
      order: "asc",
    },
  ];

  const pageOptions: any = {
    sizePerPage: 10,
    totalSize: reportsData.length, // replace later with size(customers),
    custom: true,
  };

  // Select All Button operation
  const selectRow: any = {
    mode: "checkbox",
  };

  if(dateFilter.length > 1){
    console.log(dateFilter);
  }

  const { SearchBar } = Search;

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Reports | TraffMe </title>
        </MetaTags>
        <div className="container-fluid">
          <Breadcrumbs title="TraffMe" breadcrumbItem="Reports" />

          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>

                  <CardBody>
                    {/*<CardTitle className="h4">Default Datatable </CardTitle>
                  <p className="card-title-desc">
                    react-bootstrap-table-next plugin has most features enabled
                    by default, so all you need to do to use it with your own
                    tables is to call the construction function:{" "}
                    <code>react-bootstrap-table-next </code>.
                  </p>*/}

                    {!isLoading ? (
                      <div style={{ textAlign: "center" }}>
                        <h1>Loading...</h1>
                      </div>
                    ):(

                      <PaginationProvider
                        pagination={paginationFactory(pageOptions)}
                      >
                        {({ paginationProps, paginationTableProps }) => (
                          <ToolkitProvider
                            keyField="id"
                            columns={columns}
                            data={reportsData}
                            search
                          >
                            {toolkitProps => (
                              <React.Fragment>
                                <Row className="mb-2">
                                  <Col md="12">
                                    <div className="search-box me-2 mb-2 d-inline-block">
                                      <div className="position-relative">
                                        <SearchBar {...toolkitProps.searchProps} />
                                        <i className="bx bx-search-alt search-icon" />
                                      </div>
                                    </div>

                                    <div className="me-3 mb-3 d-inline-block col-3">
                                      <Flatpickr
                                        className="form-control d-block"
                                        placeholder="Y-m-d to Y-m-d"
                                        options={{
                                          mode: "range",
                                          dateFormat: "Y-m-d",
                                        }}
                                        value={dateFilter}
                                        onChange={(date: any) => setDateFilter(date)}
                                      />
                                    </div>
                                  </Col>
                                  {/*<Col md="8">
                                    <div className="text-right float-end">
                                      <button type="submit" className="btn btn-success ">
                                        <i className="bx bx-plus"></i> new affiliate
                                      </button>
                                    </div>
                                  </Col>*/}
                                </Row>

                                <Row>
                                  <Col xl="12">
                                    <div className="table-responsive">
                                      <BootstrapTable
                                        // responsive
                                        bordered={false}
                                        striped={false}
                                        defaultSorted={defaultSorted}
                                        selectRow={selectRow}
                                        classes={"table align-middle table-nowrap"}
                                        headerWrapperClasses={"thead-light"}
                                        {...toolkitProps.baseProps}
                                        {...paginationTableProps}
                                      />
                                    </div>
                                  </Col>
                                </Row>

                                <Row className="align-items-md-center mt-30">
                                  <Col className="inner-custom-pagination d-flex">
                                    <div className="d-inline">
                                      <SizePerPageDropdownStandalone
                                        {...paginationProps}
                                      />
                                    </div>
                                    <div className="text-md-right ms-auto">
                                      <PaginationListStandalone
                                        {...paginationProps}
                                      />
                                    </div>
                                  </Col>
                                </Row>

                              </React.Fragment>
                            )}
                          </ToolkitProvider>
                        )}
                      </PaginationProvider>

                    )}

                  </CardBody>

                </CardBody>
              </Card>
            </Col>
          </Row>

        </div>
      </div>
    </React.Fragment>
  )

}

export default Reports;