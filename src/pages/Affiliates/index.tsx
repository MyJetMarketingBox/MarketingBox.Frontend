import React, { useEffect, useState } from "react";
import axios from "axios";

//import {getAffiliates} from "../../helpers/fakebackend_helper";

//import { Row, Col, Card, CardBody, CardTitle } from "reactstrap";
import MetaTags from "react-meta-tags";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledDropdown,
  Dropdown,
  ButtonDropdown,
  Button,
  Form,
  Label,
  Input,
} from "reactstrap";

// datatable related plugins
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
  SizePerPageDropdownStandalone,
} from "react-bootstrap-table2-paginator";

import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import "../../assets/scss/datatables.scss";

import "flatpickr/dist/themes/material_orange.css";
import Flatpickr from "react-flatpickr";
import VerticalLayout from "../../components/VerticalLayout";


import { getAffiliates as onGetAffiliates  } from "../../store/actions";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Affiliates = () => {

  const dispatch = useDispatch();

  const { affiliates } = useSelector((state: any) => ({
    affiliates: state.Affiliates.affiliates,
  }));

  const [affiliateList, setAffiliateList] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [dateFilter, setDateFilter] = useState('12-01-2021 to 25-01-2021')
  const [isEdit, setIsEdit] = useState<boolean>(false);

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
    {
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
    }
  ];

  // Table Data

  /*const apiURL = 'https://mb-affiliate-api.mnftx.biz/api/affiliates';
  const config = {
    headers: {
      'accept': 'text/plain',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJtYXJrZXRpbmctYm94LWFmZmlsaWF0ZSIsInVzZXItbmFtZSI6IkdlbmVyYWxVc2VyIiwidGVuYW50LWlkIjoiZGVmYXVsdC10ZW5hbnQtaWQiLCJyb2xlIjoiQWRtaW4iLCJ1c2VyLWlkIjoiR2VuZXJhbE1hbmFnZXIiLCJuYmYiOjE2NDA0MDk4ODEsImV4cCI6MTY0MDUzOTQ4MSwiaWF0IjoxNjQwNDA5ODgxfQ.3YSF1rxgReyO8OG2mhlQOsVtSeA7parVuwT1O9sm5o8'
    }
  };

  const getAffiliatesData = async () => {
    try {
        const response = await axios.get(apiURL, config);
        //const response = await axios.get('http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline');
        // console.log(response);
        // debugger
        // @ts-ignore
      if(setAffiliateList(response.data.items)){
          setLoading(true);
      }
    }catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    //setTimeout(function() {
    try {
      const getAff = getAffiliatesData();
      console.log(getAff);
      debugger
    }catch (e) {
      console.log(e);
    }
    //}, 2000)
  }, []);*/

  useEffect(() => {
    if (!isLoading) {
      dispatch(onGetAffiliates(''));
      setIsEdit(false);
    }
  }, [dispatch]);

  useEffect(() => {
    if(affiliates){
      console.log(affiliates);
      setAffiliateList(affiliates.items);
      setLoading(true)
    }
    setIsEdit(false);
  }, [affiliates]);

  // @ts-ignore
  const productData = !(affiliateList) ? [] : affiliateList?.map(affiliate => {
    let color = "";
    switch (affiliate.generalInfo.state) {
      case "active": color = "success"; break;
      case "notActive": color = "warning"; break;
      case "banned": color = "danger"; break;
      default: color = "light"; break;
    }

    return {
      id: affiliate.affiliateId,
      username: affiliate.generalInfo.username,
      role: affiliate.generalInfo.role,
      ai: affiliate.affiliateId,
      email: affiliate.generalInfo.email,
      reportto: "Management",
      createdat: new Date(affiliate.generalInfo.createdAt).toLocaleDateString('ru-RU', {day:"2-digit", month:"2-digit", year:"2-digit"}),
      status: affiliate.generalInfo.state,
      actions: '',
      color: color
    }
  });
  //const productData = [{}]

  const defaultSorted: any = [
    {
      dataField: "id",
      order: "asc",
    },
  ];

  const pageOptions: any = {
    sizePerPage: 10,
    totalSize: productData.length, // replace later with size(customers),
    custom: true,
  };

  // Select All Button operation
  const selectRow: any = {
    mode: "checkbox",
  };

  const { SearchBar } = Search;

  if(dateFilter){
    console.log(dateFilter);
  }

  function loadMore() {
    console.log(affiliates.pagination.nextUrl);
    if(affiliates.pagination.nextUrl) {
      dispatch(onGetAffiliates(affiliates.pagination.nextUrl));
    }
  }

  // @ts-ignore
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Affiliates | TraffMe </title>
        </MetaTags>
        <div className="container-fluid">
          <Breadcrumbs title="TraffMe" breadcrumbItem="Affiliates" />

          <Row>
            <Col className="col-12">
              <Card>
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
                      // columns={columns}
                      // data={productData}
                    >
                      {({ paginationProps, paginationTableProps }) => (
                        <ToolkitProvider
                          keyField="id"
                          columns={columns}
                          data={productData}
                          search
                        >
                          {toolkitProps => (
                            <React.Fragment>
                              <Row className="mb-2">
                                <Col md="4">
                                  <div className="search-box me-2 mb-2 d-inline-block">
                                    <div className="position-relative">
                                      <SearchBar {...toolkitProps.searchProps} />
                                      <i className="bx bx-search-alt search-icon" />
                                    </div>
                                  </div>

                                  <Flatpickr
                                    className="form-control d-block"
                                    placeholder="Y-m-d to Y-m-d"
                                    options={{
                                      mode: "range",
                                      dateFormat: "d-m-Y",
                                    }}
                                    value={dateFilter}
                                    onChange={setDateFilter(dateFilter)}
                                  />
                                </Col>
                                <Col md="8">
                                  <div className="text-right float-end">
                                    <button type="submit" className="btn btn-success ">
                                      <i className="bx bx-plus"></i> new affiliate
                                    </button>
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

                  <div className="text-center">
                    <button
                      className="btn btnOrange waves-effect waves-light w-sm"
                      onClick={loadMore}
                    >
                      <i className="mdi mdi-download d-block font-size-16"></i>{" "}
                      Load More
                    </button>
                  </div>

                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Affiliates;
