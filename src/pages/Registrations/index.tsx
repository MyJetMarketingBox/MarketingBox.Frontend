import React, { useEffect, useState } from "react";

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
import { AffiliateRole, AffiliateState, Currency, RegistrationStatus } from "../../common/utils/model";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RegisterDetail from "./RegisterDetail";
//import Loader from "../../components/UI/loader";

const Registrations: React.FC = () => {

  const dispatch = useDispatch();

  const { registrations, errorReg, loading, layoutMode } = useSelector((state: any) => {
    return {
      registrations: state.Registrations.registrations,
      errorReg: state.Registrations.error,
      loading: state.Registrations.loading,
      layoutMode: state.Layout.layoutMode
    }
  });

  const [registrationsList, setRegistrationsList] = useState<any>(null);
  const [errorRegList, setErrorRegList] = useState<any>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isLoadReg, setLoadReg] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [actionBtn, setActionBtn] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const [regId, setRegId] = useState(null);

  /** toast error **/
  useEffect(() => {
    if(errorReg.message) {
      console.log(errorReg.status);
      let autoClose : any = 5000;
      let message : any = errorReg.message + " \n " + "Something went wrong! try a little later...";

      if(errorReg.message == "Network Error"){
        autoClose = false;
        message = errorReg.message;
      }

      let optionToast : any = {
        position: "top-right",
        autoClose: autoClose,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      }

      if(layoutMode && layoutMode != 'light') optionToast.theme = "dark";

      toast.error(message, optionToast);
    }
  }, [errorReg]);

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
    //console.log(registration);

    return {
      id: registration.registrationId,
      uniqueId: registration.uniqueId,
      country: registration.generalInfo.country,
      status: RegistrationStatus[registration.status],
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
    setModal(!modal);
    if (!modal && !isEmpty(registrations) && !!isEdit) {
      setTimeout(() => {
        setIsEdit(false);
      }, 500);
    }
  };

  const tableRowEvents = {
    onClick: (e:any, row:any, rowIndex:any) => {
      console.log(row.id);
      setRegId(row.id);
      toggle();
    }
  }

  return (
    <React.Fragment>
      <ToastContainer />
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

                  {loading ? (
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

                                    {(registrationsList && registrationsList.length > 0) ? (<BootstrapTable
                                      // responsive
                                      bordered={false}
                                      striped={false}
                                      defaultSorted={defaultSorted}
                                      //selectRow={selectRow}
                                      classes={"table align-middle table-nowrap"}
                                      headerWrapperClasses={"thead-light"}
                                      {...toolkitProps.baseProps}
                                      {...paginationTableProps}
                                      rowEvents={tableRowEvents}
                                    />) : (
                                      <div style={{'textAlign': 'center', 'padding': '30px 0'}}>
                                        <h3>No Data Available</h3>
                                      </div>
                                    )}

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

      <Modal isOpen={modal} toggle={toggle} centered={true} size="xl" >
        <ModalHeader toggle={toggle} tag="h4">
          ModalHeader
        </ModalHeader>
        <ModalBody>
          <RegisterDetail regId={regId} />
        </ModalBody>
      </Modal>


    </React.Fragment>
  );
};

export default Registrations;
