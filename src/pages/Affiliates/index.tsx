import React, { useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import {
  Card,
  CardBody,
  Col,
  Row,
  Modal,
  ModalHeader,
  ModalBody
} from "reactstrap";

// datatable related plugins
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider
} from "react-bootstrap-table2-paginator";

import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

import "../../assets/scss/datatables.scss";

import {
  getAffiliates as onGetAffiliates,
  addNewAffiliate as onAddNewAffiliate
} from "../../store/actions";
import { isEmpty, size, map } from "lodash";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AvField, AvForm } from "availity-reactstrap-validation";
import { AffiliateRole, AffiliateState, Currency } from "../../common/utils/model";
import Loader from "../../components/UI/loader";
import ColumnActions from "./view/ColumnActions";
import SearchAffiliate from "./view/SearchAffiliate";

const Affiliates: React.FC = () => {

  const dispatch = useDispatch();

  const { affiliates, errorAff, loading } = useSelector((state: any) => {
    return {
      affiliates: state.Affiliates.affiliates,
      errorAff: state.Affiliates.error,
      loading: state.Affiliates.loading
    };
  });

  const [affiliateList, setAffiliateList] = useState<any>(null);
  const [errorAffList, setErrorAffList] = useState<any>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isLoadAff, setLoadAff] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);

  const columns = [
    {
      dataField: "actions",
      text: "Actions",
      sort: false,
      formatter: (cell: any, row: any) => (
        <ColumnActions
          id={row.id}
        />
      )
    },
    {
      dataField: "username",
      text: "Username",
      sort: true
    },
    {
      dataField: "role",
      text: "Role",
      sort: true
    },
    {
      dataField: "ai",
      text: "AI",
      sort: true
    },
    {
      dataField: "email",
      text: "Email",
      sort: true
    },
    {
      dataField: "reportto",
      text: "Report To",
      sort: true
    },
    {
      dataField: "createdat",
      text: "Created At",
      sort: true
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
      )
    }
  ];

  // Table Data

  let filter = {
    order: 1
  };

  useEffect(() => {
    if (affiliates.items && !affiliates.items.length) {
      dispatch(onGetAffiliates("", filter));
    }
  }, []);

  useEffect(() => {
    if (affiliates) {
      setAffiliateList(affiliates.items);
      setLoading(true);
    }
    setIsEdit(false);
  }, [affiliates]);

  // errorAff
  useEffect(() => {
    if (errorAff) {
      setErrorAffList(errorAff.response);
    }
    setIsEdit(false);
  }, [errorAff]);

  useEffect(() => {
    setLoadAff(false);
  }, [affiliateList]);

  // @ts-ignore
  const affiliateData = !(affiliateList) ? [] : affiliateList?.map(affiliate => {
    let color, status, role;
    switch (affiliate.generalInfo.state) {
      case 0:
        status = "active";
        color = "success";
        break;
      case 2:
        status = "notActive";
        color = "warning";
        break;
      case 1:
        status = "banned";
        color = "danger";
        break;
      default:
        color = "light";
        break;
    }

    switch (affiliate.generalInfo.role) {
      case 0:
        role = "Affiliate";
        break;
      case 1:
        role = "Master Affiliate";
        break;
      case 2:
        role = "Affiliate Manager";
        break;
      case 3:
        role = "Admin";
        break;
      case 4:
        role = "Master Affiliate Referral";
        break;
      default:
        role = "Undefined";
        break;
    }

    return {
      id: affiliate.affiliateId,
      username: affiliate.generalInfo.username,
      role: role,
      ai: affiliate.affiliateId,
      email: affiliate.generalInfo.email,
      reportto: "Management",
      createdat: new Date(affiliate.generalInfo.createdAt).toLocaleDateString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit"
      }),
      status: status,
      actions: "",
      color: color
    };
  });

  const defaultSorted: any = [
    {
      dataField: "id",
      order: "desc"
    }
  ];

  const pageOptions: any = {
    sizePerPage: affiliateData.length,
    totalSize: affiliateData.length, // replace later with size(customers),
    custom: true
  };

  // Select All Button operation
  // const selectRow: any = {
  //   mode: "checkbox",
  // };

  const { SearchBar } = Search;

  async function loadMore() {
    if (affiliates.pagination.nextUrl) {
      setLoadAff(true);
      const moreAff = await onGetAffiliates(affiliates.pagination.nextUrl, {});
      dispatch(moreAff);
    }
  }

  if (errorAffList) {
    console.log(errorAffList);
    // if(errorAffList.status === 401){
    //   location.replace('/logout');
    // }
  }

  const toggle = () => {
    setModal(!modal);
    if (!modal && !isEmpty(affiliates) && !!isEdit) {
      setTimeout(() => {
        setAffiliateList(affiliates.items);
        setIsEdit(false);
      }, 500);
    }
  };

  const handleValidAffiliateSubmit = (values: any) => {
    const date = new Date();
    const newAffiliate = {
      generalInfo: {
        username: values["username"],
        email: values["email"],
        password: values["password"],
        phone: "",
        skype: "",
        zipCode: "",
        role: +values["role"],
        state: +values["state"],
        currency: +values["currency"],
        createdAt: date,
        apiKey: ""
      },
      company: {
        name: "",
        address: "",
        regNumber: "",
        vatId: ""
      },
      bank: {
        beneficiaryName: "",
        beneficiaryAddress: "",
        bankName: "",
        bankAddress: "",
        accountNumber: "",
        swift: "",
        iban: ""
      }
    };
    // save new aff
    dispatch(onAddNewAffiliate(newAffiliate));
    toggle();
  };

  const handleAffiliateClicks = () => {
    toggle();
  };


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
                  ) : (

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
                              {loading && <Loader />}
                              <Row className="mb-2">
                                <Col md="4">
                                  <div className="search-box me-2 mb-2 d-inline-block">
                                    <div className="position-relative">
                                      <SearchBar {...toolkitProps.searchProps} />
                                      <i className="bx bx-search-alt search-icon" />
                                    </div>
                                  </div>
                                </Col>
                                <Col md="4">
                                  <SearchAffiliate />
                                </Col>
                                <Col md="4">
                                  <div className="text-right float-end">

                                    <Link
                                      to="#"
                                      className="btn btn-success"
                                      onClick={toggle}
                                    >
                                      <i className="bx bx-plus me-1"></i> Add
                                      New
                                    </Link>

                                    {/*<button type="submit" className="btn btn-success ">
                                      <i className="bx bx-plus"></i> new affiliate
                                    </button>*/}
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


                                    <Modal isOpen={modal} toggle={toggle}>
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
                                                    required: { value: true }
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
                                                    required: { value: true }
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
                                                    required: { value: true }
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
                                                  {AffiliateRole.map((val, i) => <option key={i}
                                                                                         value={i}>{val}</option>)}
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
                                                  {AffiliateState.map((val, i) => <option key={i}
                                                                                          value={i}>{val}</option>)}
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
                                                  {Currency.map((val, i) => <option key={i} value={i}>{val}</option>)}
                                                </AvField>
                                              </div>

                                              {/*<div className="mb-3">
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
                                              </div>*/}
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
                                    </Modal>

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
                        {!isLoadAff ? <i className="mdi mdi-download d-block font-size-16"> </i> :
                          <i className="bx bx-loader bx-spin d-block font-size-16"> </i>}
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
