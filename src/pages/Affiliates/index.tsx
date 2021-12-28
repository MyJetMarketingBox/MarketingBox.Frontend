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
import "./datatables.scss";

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
  /*const productData = [
    {
      id: 1,
      username: "Airi Satou",
      name: "Airi Satou",
      role: "Affiliate",
      ai: "2190296",
      email: "test@gm.com",
      reportto: "Management",
      createdat: "2021-11-21 10:42:54",
      note: "",
      status: '',
      actions: '',
    },

    {
      id: 2,
      username: "Angelica Ramos",
      name: "Angelica Ramos",
      role: "GeneralManager",
      office: "London",
      age: "47",
      startdate: "2009/10/09",
      salary: "$1,200,000",
    },

    {
      id: 3,
      username: "Ashton Cox",
      role: "Junior Technical Author",
      office: "San Francisco",
      age: "66",
      startdate: "2009/01/12",
      salary: "$86,000",
    },

    {
      id: 4,
      username: "Bradley Greer",
      role: "Software Engineer",
      office: "London",
      age: "41",
      startdate: "2012/10/13",
      salary: "$132,000",
    },

    {
      id: 5,
      username: "Brenden Wagner",
      role: "Software Engineer",
      office: "San Francisco",
      age: "28",
      startdate: "2011/06/07",
      salary: "$206,850",
    },

    {
      id: 6,
      username: "Brielle Williamson",
      role: "Integration Specialist",
      office: "New York",
      age: "61",
      startdate: "2012/12/02",
      salary: "$372,000",
    },

    {
      id: 7,
      username: "Bruno Nash",
      role: "Software Engineer",
      office: "London",
      age: "38",
      startdate: "2011/05/03",
      salary: "$163,500",
    },

    {
      id: 8,
      username: "Caesar Vance",
      role: "Pre-Sales Support",
      office: "New York",
      age: "21",
      startdate: "2011/12/12",
      salary: "$106,450",
    },

    {
      id: 9,
      username: "Cara Stevens",
      role: "Sales Assistant",
      office: "New York",
      age: "46",
      startdate: "2011/12/06",
      salary: "$145,600",
    },

    {
      id: 10,
      username: "Cedric Kelly",
      role: "Senior Javascript Developer",
      office: "Edinburgh",
      age: "22",
      startdate: "2012/03/29",
      salary: "$433,060",
    },

    {
      id: 11,
      username: "Marshall",
      role: "Regional Director",
      office: "San Francisco",
      age: "36",
      startdate: "2008/10/16",
      salary: "$470,600",
    },

    {
      id: 12,
      username: "Hurst",
      role: "Javascript Developer",
      office: "San Francisco",
      age: "39",
      startdate: "2009/09/15",
      salary: "$205,500",
    },

    {
      id: 13,
      username: "Rios",
      role: "Personnel Lead",
      office: "Edinburgh",
      age: "35",
      startdate: "2012/09/26",
      salary: "$217,500",
    },

    {
      id: 14,
      username: "Snider",
      role: "Customer Support",
      office: "New York",
      age: "27",
      startdate: "2011/01/25",
      salary: "$112,000",
    },

    {
      id: 15,
      username: "Wilder",
      role: "Sales Assistant",
      office: "Sidney",
      age: "23",
      startdate: "2010/09/20",
      salary: "$85,600",
    },

    {
      id: 16,
      username: "Camacho",
      role: "Support Engineer",
      office: "San Francisco",
      age: "47",
      startdate: "2009/07/07",
      salary: "$87,500",
    },

    {
      id: 17,
      username: "Green",
      role: "Chief Operating Officer (COO)",
      office: "San Francisco",
      age: "48",
      startdate: "2010/03/11",
      salary: "$850,000",
    },

    {
      id: 18,
      username: "Winters",
      role: "Accountant",
      office: "Tokyo",
      age: "63",
      startdate: "2011/07/25",
      salary: "$170,750",
    },

    {
      id: 19,
      username: "Cortez",
      role: "Team Leader",
      office: "San Francisco",
      age: "22",
      startdate: "2008/10/26",
      salary: "$235,500",
    },

    {
      id: 20,
      username: "Joyce",
      role: "Developer",
      office: "Edinburgh",
      age: "42",
      startdate: "2010/12/22",
      salary: "$92,575",
    },

    {
      id: 21,
      username: "Gloria Little",
      role: "Systems Administrator",
      office: "New York",
      age: "59",
      startdate: "2009/04/10",
      salary: "$237,500",
    },

    {
      id: 22,
      username: "Haley Kennedy",
      role: "Senior Marketing Desi,ner",
      office: "London",
      age: "43",
      startdate: "2012/12/18",
      salary: "$313,500",
    },

    {
      id: 23,
      username: "Hermione Butler",
      role: "Regional Director",
      office: "London",
      age: "47",
      startdate: "2011/03/21",
      salary: "$356,250",
    },

    {
      id: 24,
      username: "Herrod Chandler",
      role: "Sales Assistant",
      office: "San Francisco",
      age: "59",
      startdate: "2012/08/06",
      salary: "$137,500",
    },

    {
      id: 25,
      username: "Hope Fuentes",
      role: "Secretary",
      office: "San Francisco",
      age: "41",
      startdate: "2010/02/12",
      salary: "$109,850",
    },

    {
      id: 26,
      username: "Howard Hatfield",
      role: "Office Manager",
      office: "San Francisco",
      age: "51",
      startdate: "2008/12/16",
      salary: "$164,500",
    },

    {
      id: 27,
      username: "Jackson Bradshaw",
      role: "Director",
      office: "New York",
      age: "65",
      startdate: "2008/09/26",
      salary: "$645,750",
    },

    {
      id: 28,
      username: "Jena Gaines",
      role: "Office Manager",
      office: "London",
      age: "30",
      startdate: "2008/12/19",
      salary: "$90,560",
    },

    {
      id: 29,
      username: "Jenette Caldwell",
      role: "Development Lead",
      office: "New York",
      age: "30",
      startdate: "2011/09/03",
      salary: "$345,000",
    },

    {
      id: 30,
      username: "Jennifer Acosta",
      role: "Junior Javascript Devel,per",
      office: "Edinburgh",
      age: "43",
      startdate: "2013/02/01",
      salary: "$75,650",
    },
  ];*/

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
