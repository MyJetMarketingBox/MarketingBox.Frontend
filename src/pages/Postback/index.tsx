import React, { useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import { clearPostback, getPostbacks, modalPostback, updatePostback } from "../../store/postback/actions";
import { Card, CardBody, Col, Row } from "reactstrap";
import ModalPostback from "./components/modal";
import { httpQueryType } from "../../common/utils/model";
import Loader from "../../components/UI/loader";
import TablePostbaks from "./components/table";
import BtnLoadMore from "../../components/UI/btns/BtnLoadMore";
import { getBrands } from "../../store/brands/actions";
import PostbacksBrand from "./components/search";

const Postback: React.FC = () => {
  const dispatch = useDispatch();

  const [postbackId, setPostbackId] = useState<number | null>(null);

  const { postbacks, loaded, loading, nextUrl, total, modal } = useSelector(
    (state: any) => {
      return {
        postbacks: state.Postbacks.data.items,
        nextUrl: state.Postbacks.data.pagination.nextUrl,
        total: state.Postbacks.data.pagination.total,
        loading: state.Postbacks.loading,
        loaded: state.Postbacks.loaded,
        modal: state.Postbacks.modalPostback
      };
    }
  );

  let filter = {
    order: 1,
    limit: 50
  };

  useEffect(() => {
    dispatch(getPostbacks("", filter));
    return () => {
      dispatch(clearPostback());
    };
  }, []);

  async function loadMore() {
    if(nextUrl){
      dispatch(getPostbacks(nextUrl, filter))
    }
  }

  // const toggleModal = () => {
  //   setModal(prev => !prev);
  // };

  const toggleModalPostback = (status: boolean) => {
    dispatch(modalPostback(status));
  }

  const handleAddPostback = () => {
    setPostbackId(0);
    toggleModalPostback(true);
  }


  /*const toggleCustom = (tab: any) => {
    if (customActiveTab !== tab) {
      setcustomActiveTab(tab);
    }
  };

  const popupDeleteConfirmOpen = () => {
    setIsDeleteConfirm(true);
  };

  const popupDeleteConfirmClose = () => {
    setIsDeleteConfirm(false);
  };*/

  // const handleDeletePostback = () => () => {
  //   dispatch(delPostback());
  // };

  /*const handleUpdatePostback = (values: any) => {
    const newPostback = {
      depositReference: values["depositReference"],
      depositTGReference: values["depositTGReference"],
      registrationReference: values["registrationReference"],
      registrationTGReference: values["registrationTGReference"],
      httpQueryType: values["httpQueryType"],
    };

    dispatch(updatePostback(newPostback));
  };*/

  return (
    <React.Fragment>
      {!loaded && loading && <Loader />}
      <div className="page-content">
        <MetaTags>
          <title>Postbacks | TraffMe </title>
        </MetaTags>
        <div className="container-fluid">
          <Breadcrumbs title="TraffMe" breadcrumbItem="Postbacks" />
        </div>

        <Row>
          <Col className="col-12">
            <Card>
              <CardBody>

                {/*{!loaded && loading ? null : !loaded ? (
            <Row className="align-items-center">
              <Col md={12}>
                <div className="d-flex flex-wrap align-items-center justify-content-end gap-2 mb-3">
                  <div>
                    <button
                      type="button"
                      className="btn btn-light"
                      onClick={toggleModal}
                    >
                      <i className="bx bx-plus me-1"></i> Add New
                    </button>
                  </div>
                </div>
              </Col>
            </Row>
          ) : null}*/}


                <Row>
                  <Col className="col-md-4 mb-3">
                    <PostbacksBrand />
                    <div className="col-xl-12 text-muted mt-3">
                      Showing {postbacks.length} / {total} results
                    </div>
                  </Col>
                  <Col className="col-md-4 offset-4 text-end">
                    <button
                      type="button"
                      className="btn btnOrange"
                      onClick={() => handleAddPostback()}
                    >
                      Add New
                    </button>
                  </Col>
                </Row>

                <Row className="mb-4">
                  <Col xl="12">
                    <div className="table-responsive">
                      {postbacks.length ? <TablePostbaks postbacks={postbacks} setPostbackId={setPostbackId} toggle={toggleModalPostback}/> : null}
                      {
                        (!postbacks.length && loaded) ?
                          <div style={{ "textAlign": "center", "padding": "30px 0" }}>
                            <h3>No Data Available</h3>
                          </div> :
                          null
                      }
                    </div>
                  </Col>
                </Row>

                {/*{loaded &&
            <Row>
              <Col md={9}>
                <Card>
                  <CardHeader>
                    <h4 className="card-title">{postback.affiliateName}</h4>
                  </CardHeader>
                  <AvForm
                    className="needs-validation"
                    onValidSubmit={(e: any, values: any) => {
                      handleUpdatePostback(values);
                    }}
                  >
                    <CardBody>
                      <Row>
                        <Col xs="12">
                          <Nav tabs className="nav-tabs-custom nav-justified">
                            <NavItem>
                              <NavLink
                                style={{ cursor: "pointer" }}
                                className={classnames({
                                  active: customActiveTab === "1",
                                })}
                                onClick={() => {
                                  toggleCustom("1");
                                }}
                              >
                                <span className="d-block d-sm-none">
                                  <i className="fas fa-home"></i>
                                </span>
                                <span className="d-none d-sm-block">Lead</span>
                              </NavLink>
                            </NavItem>
                            <NavItem>
                              <NavLink
                                style={{ cursor: "pointer" }}
                                className={classnames({
                                  active: customActiveTab === "2",
                                })}
                                onClick={() => {
                                  toggleCustom("2");
                                }}
                              >
                                <span className="d-block d-sm-none">
                                  <i className="far fa-user"></i>
                                </span>
                                <span className="d-none d-sm-block">
                                  Deposit
                                </span>
                              </NavLink>
                            </NavItem>
                          </Nav>

                          <TabContent
                            activeTab={customActiveTab}
                            className="p-3 text-muted"
                          >
                            <TabPane tabId="1">
                              <Row>
                                <Col sm="12">
                                  <AvField
                                    name="registrationReference"
                                    label="URL"
                                    type="text"
                                    placeholder="Enter lead URL"
                                    value={postback.registrationReference}
                                  />

                                  <AvField
                                    name="registrationTGReference"
                                    label="URL TG"
                                    type="text"
                                    placeholder="Enter lead URL TG"
                                    value={postback.registrationTGReference}
                                  />
                                </Col>
                              </Row>
                            </TabPane>
                            <TabPane tabId="2">
                              <Row>
                                <Col sm="12">
                                  <AvField
                                    name="depositReference"
                                    label="URL"
                                    type="text"
                                    placeholder="Enter deposit URL"
                                    value={postback.depositReference}
                                  />

                                  <AvField
                                    name="depositTGReference"
                                    label="URL TG"
                                    type="text"
                                    placeholder="Enter deposit URL TG"
                                    value={postback.depositTGReference}
                                  />
                                </Col>
                              </Row>
                            </TabPane>
                          </TabContent>
                        </Col>
                      </Row>

                      <Row>
                        <Col xs={12}>
                          <div className="p-3">
                            <AvField
                              type="select"
                              name="httpQueryType"
                              label="Query Type*"
                              className="form-select"
                              errorMessage="Invalid query type"
                              validate={{
                                required: { value: true },
                              }}
                              value={postback.httpQueryType}
                            >
                              <option value={""} key={0}>
                                Select query type
                              </option>
                              {httpQueryType.map((item, idx) => {
                                return (
                                  <option value={idx} key={idx + 1}>
                                    {item}
                                  </option>
                                );
                              })}
                            </AvField>
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                    <CardFooter>
                      <Button
                        className="btn custom-btn-success"
                        style={{ marginRight: "25px" }}
                        type="submit"
                      >
                        {upLoading && (
                          <i className="bx bx-hourglass bx-spin me-2" />
                        )}
                        Update
                      </Button>

                      <Button
                        className="btn custom-btn-light"
                        type="submit"
                        onClick={popupDeleteConfirmOpen}
                      >
                        Delete
                      </Button>
                    </CardFooter>
                  </AvForm>
                </Card>
              </Col>
            </Row>
          }*/}

                {
                  nextUrl &&
                  <Row>
                    <Col className="col-12">
                      <div className="text-center">
                        <BtnLoadMore
                          loading={loading}
                          handeClick={loadMore}
                        />
                      </div>
                    </Col>
                  </Row>
                }
              </CardBody>
            </Card>
          </Col>
        </Row>


      {modal && <ModalPostback isOpen={modal} toggle={toggleModalPostback} postbackId={postbackId}/>}

      </div>
    </React.Fragment>
  );
};

export default Postback;
