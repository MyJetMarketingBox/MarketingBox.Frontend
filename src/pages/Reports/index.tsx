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

import "flatpickr/dist/themes/material_orange.css";
import "../../assets/scss/datatables.scss";
import affiliates from "../../store/affiliates/reducer";

const Reports = () => {

  const dispatch = useDispatch();

  const { reports } = useSelector((state: any) => ({
    reports: state.Reports.reports,
  }));


  // const dateEnd = new Date().toJSON().slice(0, 10);
  // const dateStart = new Date(new Date().setDate(new Date().getDate() - 61)).toJSON().slice(0, 10);
  //
  // let filter = {
  //   fromDate: dateStart,
  //   toDate: "2021-11-30"
  // }

  const [isLoading, setLoading] = useState<boolean>(false);
  const [fromDate, setFromDate] = useState(new Date(new Date().setDate(new Date().getDate() - 61)).toJSON().slice(0, 10))
  const [toDate, setToDate] = useState(new Date().toJSON().slice(0, 10))
  const [dateFilter, setDateFilter] = useState(`${fromDate} to ${toDate}`)
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [reportList, setReportList] = useState(null)
  const [filter, setFilter] = useState<object>({ fromDate: fromDate, toDate: "2021-11-30" })

  //let filter = {}

  useEffect(() => {
    console.log(1);
    if(reports.items && !reports.items.length){
      console.log(2);
      // filter = {
      //   fromDate: fromDate,
      //   toDate: "2021-11-30"
      // }
      dispatch(getReports(filter))
      setIsEdit(false);
    }
  }, [dispatch, filter])

  useEffect(() => {
    if(reports){
      // console.log(reports);
      // debugger
      setReportList(reports.items);
      setLoading(true)
    }
    setIsEdit(false);
  }, [reports]);

  // useEffect(() => {
  //   setDateFilter(`${fromDate} to ${toDate}`)
  // });

  // useEffect(() => {
  //   console.log(filter);
  //   dispatch(getReports(filter))
  // }, [filter]);

  // @ts-ignore
  const reportsData = !(reportList) ? [] : reportList?.map(report => {
    //console.log(report);
    return {
      id: report.affiliateId,
      cr: (report.cr).toFixed(2),
      ftdCount: report.ftdCount,
      payout: report.payout,
      registrationsCount: report.registrationsCount,
      revenue: report.revenue
    }
  });

  const columns = [
    {
      dataField: "id",
      text: "affiliateId",
      sort: true,
    },
    {
      dataField: "cr",
      text: "CR",
      sort: true,
    },
    {
      dataField: "ftdCount",
      text: "FTD",
      sort: true,
    },
    {
      dataField: "payout",
      text: "Payout",
      sort: true,
    },
    {
      dataField: "registrationsCount",
      text: "Registrations",
      sort: true,
    },
    {
      dataField: "revenue",
      text: "Revenue",
      sort: true,
    }
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

  // select All Button operation
  // const selectRow: any = {
  //   mode: "checkbox",
  // };

  const fullWidth = {
    width: '100%'
  }

  useEffect(() => {
    console.log(dateFilter);
  }, [dateFilter]);

  const setDateOnFilter = (data: any) => {
    if(data.length > 1){

      const utcFrom = data[0].getTime();
      const from = new Date(utcFrom + (3600000*2)).toJSON().slice(0, 10);

      const utcTo = data[1].getTime();
      const to = new Date(utcTo + (3600000*2)).toJSON().slice(0, 10);

      setFromDate(from)
      setToDate(to)

      setDateFilter(`${from} to ${to}`);

      setTimeout(() => {
        console.log(dateFilter);
        console.log(from);
        console.log(to);
      },1000)


      //setFilter({ fromDate: fromDate, toDate: toDate })
      // setTimeout(() => {
      //   console.log("2: ",filter)
      // }, 2000);
      //dispatch(getReports(filter))


    }
  }

  //console.log(dateFilter)


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


                                    <div className="me-2 mb-2 d-inline-block col-md-3">
                                      <label className="search-label" style={fullWidth}>
                                        <Flatpickr
                                          className="form-control d-block"
                                          placeholder="Y-m-d to Y-m-d"
                                          options={{
                                            mode: "range",
                                            dateFormat: "Y-m-d",
                                          }}
                                          value={dateFilter}
                                          onChange={(date: any) => setDateOnFilter(date)}
                                        />
                                      </label>
                                    </div>

                                    <div className="search-box me-2 mb-2 d-inline-block">
                                      <div className="position-relative">
                                        <SearchBar {...toolkitProps.searchProps} />
                                        <i className="bx bx-search-alt search-icon" />
                                      </div>
                                    </div>

                                  </Col>
                                </Row>

                                <Row>
                                  <Col xl="12">
                                    <div className="table-responsive">
                                      <BootstrapTable
                                        // responsive
                                        bordered={false}
                                        striped={false}
                                        defaultSorted={defaultSorted}
                                        //selectRow={selectRow}
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
