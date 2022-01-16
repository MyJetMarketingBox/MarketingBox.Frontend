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

import { getAffiliates as onGetAffiliates  } from "../../store/actions";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Affiliates: React.FC = () => {

  const dispatch = useDispatch();

  const { affiliates, errorAff } = useSelector((state: any) => {
    return {
      affiliates: state.Affiliates.affiliates,
      errorAff: state.Affiliates.error,
    }
  });

  const [affiliateList, setAffiliateList] = useState(null);
  const [errorAffList, setErrorAffList] = useState<any>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isLoadAff, setLoadAff] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [actionBtn, setActionBtn] = useState<boolean>(false)

  const toggleAction = () => {
    console.log(1);
    setActionBtn(actionBtn ? false : true)
  }

  const columns = [
    {
      dataField: "actions",
      text: "Actions",
      sort:false,
      formatter: (cell: any, row: any) => (
        <>
          <div>
            <UncontrolledDropdown onClick={toggleAction}>
              <DropdownToggle tag="a" className="btn btn-light">
                <i className={`mdi ${actionBtn ? 'mdi-dots-horizontal' : ' mdi-dots-vertical'}`}></i>
              </DropdownToggle>

              <DropdownMenu className="float-start">
                <DropdownItem tag={Link} to={{ pathname: `/Affiliates/view/${row.id}`, state: { id: row.id }}}>edit</DropdownItem>
                <DropdownItem onClick={() => console.log(row.id)}>delete</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </>
      )
    },
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
    if (affiliates.items && !affiliates.items.length) {
      dispatch(onGetAffiliates(''))
    }
  }, []);

  // async function getAffiliates(){
  //   setLoading(true)
  //   const aff = await onGetAffiliates('');
  //   dispatch(aff);
  //   setLoading(false)
  // }

  useEffect(() => {
    if(affiliates){
      //console.log(affiliates);
      setAffiliateList(affiliates.items);
      setLoading(true)
    }
    setIsEdit(false);
  }, [affiliates]);

  // errorAff
  useEffect(() => {
    if(errorAff){
      setErrorAffList(errorAff.response);
    }
    setIsEdit(false);
  }, [errorAff]);

  useEffect(() => {
    setLoadAff(false)
  }, [affiliateList])

  // @ts-ignore
  const affiliateData = !(affiliateList) ? [] : affiliateList?.map(affiliate => {
    let color, status, role;
    switch (affiliate.generalInfo.state) {
      case 0: status = "active"; color = "success"; break;
      case 2: status = "notActive"; color = "warning"; break;
      case 1: status = "banned"; color = "danger"; break;
      default: color = "light"; break;
    }

    switch (affiliate.generalInfo.role) {
      case 0: role = "Affiliate"; break;
      case 1: role = "Master Affiliate"; break;
      case 2: role = "Affiliate Manager"; break;
      case 3: role = "Admin"; break;
      case 4: role = "Master Affiliate Referral"; break;
      default: role = "Undefined"; break;
    }

    return {
      id: affiliate.affiliateId,
      username: affiliate.generalInfo.username,
      role: role,
      ai: affiliate.affiliateId,
      email: affiliate.generalInfo.email,
      reportto: "Management",
      createdat: new Date(affiliate.generalInfo.createdAt).toLocaleDateString('ru-RU', {day:"2-digit", month:"2-digit", year:"2-digit"}),
      status: status,
      actions: '',
      color: color
    }
  });

  const defaultSorted: any = [
    {
      dataField: "id",
      order: "desc",
    },
  ];

  const pageOptions: any = {
    sizePerPage: affiliateData.length,
    totalSize: affiliateData.length, // replace later with size(customers),
    custom: true,
  };

  // Select All Button operation
  // const selectRow: any = {
  //   mode: "checkbox",
  // };

  const { SearchBar } = Search;

  async function loadMore() {
    if(affiliates.pagination.nextUrl) {
      setLoadAff(true)
      const moreAff = await onGetAffiliates(affiliates.pagination.nextUrl)
      dispatch(moreAff);
    }
  }

  if(errorAffList){
    console.log(errorAffList);
    // if(errorAffList.status === 401){
    //   location.replace('/logout');
    // }
  }


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
                          data={affiliateData}
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
                                      //selectRow={selectRow}
                                      classes={"table align-middle table-nowrap"}
                                      headerWrapperClasses={"thead-light"}
                                      {...toolkitProps.baseProps}
                                      {...paginationTableProps}
                                    />
                                  </div>
                                </Col>
                              </Row>

                              {/*<Row className="align-items-md-center mt-30">
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
                              </Row>*/}

                            </React.Fragment>
                          )}
                        </ToolkitProvider>
                      )}
                    </PaginationProvider>

                  )}


                  {affiliates.pagination.nextUrl && (
                    <div className="text-center">
                      <button
                        className="btn btnOrange waves-effect waves-light w-sm"
                        onClick={loadMore}
                      >
                        {console.log(isLoadAff)}
                        {!isLoadAff ? <i className='mdi mdi-download d-block font-size-16'> </i> : <i className='bx bx-loader bx-spin d-block font-size-16'> </i>}
                        {/*<i className={`${!isLoadAff ? 'mdi mdi-download' : 'bx bx-loader bx-spin'} d-block font-size-16`}></i> {" "}*/}
                        {" "}
                        Load More
                      </button>
                    </div>
                  )}


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
