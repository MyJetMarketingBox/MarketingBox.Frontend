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
  Modal,
  ModalHeader,
  ModalBody,
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

import {
  getRegistrations as onGetRegistrations,
} from "../../store/actions";
import { isEmpty, size, map } from "lodash";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AvField, AvForm } from "availity-reactstrap-validation";
import { RegistrationStatus } from "../../common/utils/model";
//import Loader from "../../components/UI/loader";

const Registrations: React.FC = () => {

  const dispatch = useDispatch();

  const { registrations, errorReg, loading } = useSelector((state: any) => {
    return {
      registrations: state.Registrations.registrations,
      errorReg: state.Registrations.error,
      loading: state.Affiliates.loading,
    }
  });

  /*const { register } = useSelector((state: any) => {
    const registerList = state.Registrations.registrations.items;

    // @ts-ignore
    const registerItem = registerList.filter(item => (item.registrationId === id))
    console.log(registerItem);
    return registerItem;
  });*/

  const [registrationsList, setRegistrationsList] = useState<any>(null);
  const [errorRegList, setErrorRegList] = useState<any>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isLoadReg, setLoadReg] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [actionBtn, setActionBtn] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);

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
                <DropdownItem onClick={() => console.log('del')}>delete</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </>
      )
    },
    {
      dataField: "id",
      text: "Registration ID",
      sort: true,
    },
    {
      dataField: "uniqueId",
      text: "Unique ID",
      sort: true,
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,
    },
    {
      dataField: "sequence",
      text: "Sequence",
      sort: true,
    },
    {
      dataField: "createdAt",
      text: "Created At",
      sort: true,
    },
    {
      dataField: "depositedAt",
      text: "Deposited At",
      sort: true,
    },
  ];

  let filter = {
    order: 1 //DESC
  }

  useEffect(() => {
    if (registrations.items && !registrations.items.length) {
      dispatch(onGetRegistrations('', filter))
    }
  }, []);


  useEffect(() => {
    if(registrations){
      console.log(registrations);
      setRegistrationsList(registrations.items);
      setLoading(true)
    }
    setIsEdit(false);
  }, [registrations]);

  // errorReg
  useEffect(() => {
    if(errorReg){
      setErrorRegList(errorReg.response);
    }
    setIsEdit(false);
  }, [errorReg]);

  useEffect(() => {
    setLoadReg(false)
  }, [registrationsList])

  // @ts-ignore
  const registrationData = !(registrationsList) ? [] : registrationsList?.map(registration => {
    /*let color, status, role;
    switch (registration.generalInfo.state) {
      case 0: status = "active"; color = "success"; break;
      case 2: status = "notActive"; color = "warning"; break;
      case 1: status = "banned"; color = "danger"; break;
      default: color = "light"; break;
    }

    switch (registration.generalInfo.role) {
      case 0: role = "Affiliate"; break;
      case 1: role = "Master Affiliate"; break;
      case 2: role = "Affiliate Manager"; break;
      case 3: role = "Admin"; break;
      case 4: role = "Master Affiliate Referral"; break;
      default: role = "Undefined"; break;
    }*/

    //console.log(registration);

    return {
      id: registration.registrationId,
      uniqueId: registration.uniqueId,
      country: registration.generalInfo.country,
      status: RegistrationStatus.filter((item, key) => key === registration.status),
      sequence: registration.sequence,
      createdAt: new Date(registration.generalInfo.createdAt).toLocaleDateString('ru-RU', {day:"2-digit", month:"2-digit", year:"2-digit", hour: "2-digit", minute: "2-digit", second: "numeric"}),
      depositedAt: (registration.generalInfo.depositedAt) ? new Date(registration.generalInfo.depositedAt).toLocaleDateString('ru-RU', {day:"2-digit", month:"2-digit", year:"2-digit", hour: "2-digit", minute: "2-digit", second: "numeric"}) : "",
    }
  });

  const defaultSorted: any = [
    {
      dataField: "id",
      order: "desc",
    },
  ];

  const pageOptions: any = {
    sizePerPage: registrationData.length,
    totalSize: registrationData.length, // replace later with size(customers),
    custom: true,
  };

  // Select All Button operation
  // const selectRow: any = {
  //   mode: "checkbox",
  // };

  const { SearchBar } = Search;

  async function loadMore() {
    if(registrations.pagination.nextUrl) {
      setLoadReg(true)
      const moreReg = await onGetRegistrations(registrations.pagination.nextUrl, {})
      dispatch(moreReg);
    }
  }

  if(errorRegList){
    console.log(errorRegList);
    // if(errorAffList.status === 401){
    //   location.replace('/logout');
    // }
  }

  const toggle = () => {
    console.log('toggle');
    setModal(!modal);
    if (!modal && !isEmpty(registrations) && !!isEdit) {
      setTimeout(() => {
        setRegistrationsList(registrations.items);
        setIsEdit(false);
        /*<Modal id={id} />*/
      }, 500);
    }
  };

  const handleAffiliateClicks = () => {
    toggle();
  };

  const tableRowEvents = {
    onClick: (e:any, row:any, rowIndex:any) => {
      console.log(row);
      handleAffiliateClicks();
    }
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Registrations | TraffMe </title>
        </MetaTags>
        <div className="container-fluid">
          <Breadcrumbs title="TraffMe" breadcrumbItem="Registrations" />

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
                          data={registrationData}
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
                                {/*<Col md="8">
                                  <div className="text-right float-end">
                                    <Link
                                      to="#"
                                      className="btn btn-success"
                                      onClick={handleAffiliateClicks}
                                    >
                                      <i className="bx bx-plus me-1"></i> Add
                                      New
                                    </Link>
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
                                      //selectRow={selectRow}
                                      classes={"table align-middle table-nowrap"}
                                      headerWrapperClasses={"thead-light"}
                                      {...toolkitProps.baseProps}
                                      {...paginationTableProps}
                                      rowEvents={ tableRowEvents }
                                    />


                                    {/*<Modal isOpen={modal} toggle={toggle}>
                                      {loading && <Loader />}
                                      <ModalHeader toggle={toggle} tag="h4">
                                        Add Affiliate
                                      </ModalHeader>
                                      <ModalBody>

                                        <AvForm
                                          onValidSubmit={(
                                            e: any,
                                            values: any
                                          ) => {
                                            handleValidAffiliateSubmit(values);
                                          }}
                                        >
                                          <Row form>
                                            <Col xs={12}>
                                              <div className="mb-3">
                                                <AvField
                                                  name="username"
                                                  label="Name"
                                                  type="text"
                                                  errorMessage="Invalid name"
                                                  validate={{
                                                    required: { value: true },
                                                  }}
                                                  value={""}
                                                />
                                              </div>
                                              <div className="mb-3">
                                                <AvField
                                                  name="email"
                                                  label="Email"
                                                  type="email"
                                                  errorMessage="Invalid Email"
                                                  validate={{
                                                    required: { value: true },
                                                  }}
                                                  value={""}
                                                />
                                              </div>
                                              <div className="mb-3">
                                                <AvField
                                                  name="password"
                                                  label="Password"
                                                  type="password"
                                                  errorMessage="Invalid Designation"
                                                  validate={{
                                                    required: { value: true },
                                                  }}
                                                  value={""}
                                                />
                                              </div>

                                              <div className="mb-3">
                                                <AvField
                                                  type="select"
                                                  name="role"
                                                  className="form-select"
                                                  label="Role"
                                                  required
                                                  value={""}
                                                >
                                                  <option value={""}>Select role</option>
                                                  {AffiliateRole.map((val, i) => <option key={i} value={i} >{val}</option>)}
                                                </AvField>
                                              </div>

                                              <div className="mb-3">
                                                <AvField
                                                  type="select"
                                                  name="state"
                                                  className="form-select"
                                                  label="State"
                                                  required
                                                  value={""}
                                                >
                                                  <option value={""}>Select sate</option>
                                                  {AffiliateState.map((val, i) => <option key={i} value={i} >{val}</option>)}
                                                </AvField>
                                              </div>

                                              <div className="mb-3">
                                                <AvField
                                                  type="select"
                                                  name="currency"
                                                  className="form-select"
                                                  label="Currency"
                                                  required
                                                  value={""}
                                                >
                                                  <option value={""}>Select sate</option>
                                                  {Currency.map((val, i) => <option key={i} value={i} >{val}</option>)}
                                                </AvField>
                                              </div>

                                              <div className="mb-3">
                                                <AvField
                                                  type="select"
                                                  name="tags"
                                                  className="form-select"
                                                  label="Option"
                                                  helpMessage="MULTIPLE!"
                                                  multiple={true}
                                                  required
                                                  value={""}
                                                >
                                                  <option>Photoshop</option>
                                                  <option>illustrator</option>
                                                  <option>Html</option>
                                                  <option>Php</option>
                                                  <option>Java</option>
                                                  <option>Python</option>
                                                  <option>UI/UX Designer</option>
                                                  <option>Ruby</option>
                                                  <option>Css</option>
                                                </AvField>
                                              </div>
                                              <div className="mb-3">
                                                <AvField
                                                  name="projects"
                                                  label="Projects"
                                                  type="text"
                                                  errorMessage="Invalid Projects"
                                                  validate={{
                                                    required: { value: true },
                                                  }}
                                                  value={""}
                                                />
                                              </div>
                                            </Col>
                                          </Row>
                                          <Row>
                                            <Col>
                                              <div className="text-end">
                                                <button
                                                  type="submit"
                                                  className="btn btn-success save-user"
                                                >
                                                  Save
                                                </button>
                                              </div>
                                            </Col>
                                          </Row>
                                        </AvForm>
                                      </ModalBody>
                                    </Modal>*/}

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


                  {registrations.pagination.nextUrl && (
                    <div className="text-center">
                      <button
                        className="btn btnOrange waves-effect waves-light w-sm"
                        onClick={loadMore}
                      >
                        <i className={`${!isLoadReg ? 'mdi mdi-download' : 'bx bx-loader bx-spin'} d-block font-size-16`}></i> {" "}
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

export default Registrations;
