import React, { useMemo, useState } from "react";
import MetaTags from "react-meta-tags";
import Breadcrumbs from "../../../../components/Common/Breadcrumb";
import {
  Card,
  CardBody,
  Col,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import { useHistory } from "react-router-dom";
import classnames from "classnames";
import RegFiles from "../../../RegFiles";
import Registrations from "./registrations";
import Filter from "./filter";
import { useDispatch, useSelector } from "react-redux";
import Params from "./params";
import { addRedistribution } from "../../../../store/redistribution/actions";
import { RedistributionContentTypeRenderEnum } from "../../../../enums/RedistributionContentTypeRenderEnum";
import * as yup from "yup";
import { useFormik } from "formik";
import ValidationText from "../../../../constants/validationText";

export interface IRedistributionParams {
  listFileId: number[];
  listRegId: number[];
  registrationSearchRequest: {};
  name: string;
  affiliateId: number;
  campaignId: number;
  frequency: number;
  portionLimit: number;
  dayLimit: number;
  useAutologin: boolean;
}

export default () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [activeTab, setActiveTab] = useState(1);
  const [type, setType] = useState<RedistributionContentTypeRenderEnum | null>(
    null
  );
  const [listFileId, setListFileId] = useState<number[]>([]);
  const [listRegId, setListRegId] = useState<number[]>([]);
  const [registrationSearchRequest, setRegistrationSearchRequest] =
    useState<any>(null);
  const [params, createParams] = useState<any>();

  /*const validationSchema: yup.SchemaOf<IRedistributionParams> = yup
    .object()
    .shape({

    });

  const initialValues: IRedistributionParams = {

  };*/

  const { loading } = useSelector((state: any) => {
    return {
      loading: state.Redistribution.loading,
    };
  });

  const isRegSearchRequest = useMemo(() => {
    if (!registrationSearchRequest) {
      return false;
    }
    return !Object.values(registrationSearchRequest).some(el => !!el === true);
  }, [registrationSearchRequest]);

  function toggleTab(tab: any) {
    if (activeTab !== tab) {
      if (tab >= 1 && tab <= 2) {
        setActiveTab(tab);
      }
    }
  }

  const handlerSetIdFile = (id: number) => {
    let newArr = [...listFileId];
    const idx = newArr.findIndex(el => el === id);
    if (idx === -1) {
      newArr.push(id);
    } else {
      newArr.splice(idx, 1);
    }
    setListFileId(newArr);
  };

  const handelSetRegId = (id: number) => {
    let newArr = [...listRegId];
    const idx = newArr.findIndex(el => el === id);
    if (idx === -1) {
      newArr.push(id);
    } else {
      newArr.splice(idx, 1);
    }
    setListRegId(newArr);
  };

  const handelSetFilter = (data: any) => {
    setRegistrationSearchRequest(data);
  };

  const clear = () => {
    setListFileId([]);
    setListRegId([]);
    setRegistrationSearchRequest(null);
  };

  const setParams = (data: any) => {
    createParams(data);
  };

  const handelSubmit = () => {
    let sendData: any = {
      registrationsIds: listRegId,
      filesIds: listFileId,
      registrationSearchRequest: registrationSearchRequest,
    };

    sendData = { ...params, ...sendData };

    dispatch(addRedistribution(sendData, history));
  };

  const renderContent = () => {
    switch (type) {
      case RedistributionContentTypeRenderEnum.Registrations:
        return (
          <Registrations
            selected={true}
            setRegId={handelSetRegId}
            clearState={clear}
          />
        );

      case RedistributionContentTypeRenderEnum.Filter:
        return <Filter setFilter={handelSetFilter} clearState={clear} />;

      case RedistributionContentTypeRenderEnum.RegFiles:
        return (
          <RegFiles
            selectedCol={true}
            setIdFile={handlerSetIdFile}
            clearState={clear}
          />
        );

      default:
        return null;
    }
  };

  const handleChange = (e: any) => {
    setType(+e.target.value);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Add Redistribution | TraffMe </title>
        </MetaTags>
        <div className="container-fluid">
          <Breadcrumbs title="TraffMe" breadcrumbItem="Add Redistribution" />
        </div>

        <Row>
          <Col xs={12}>
            <Card>
              <CardBody>
                <div id="basic-pills-wizard" className="twitter-bs-wizard">
                  <ul className="twitter-bs-wizard-nav nav nav-pills nav-justified">
                    <NavItem>
                      <NavLink
                        to="#"
                        className={classnames(
                          { active: activeTab === 1 },
                          "nav-link"
                        )}
                        /*onClick={() => {
                          setActiveTab(1);
                        }}*/
                      >
                        <div
                          className="step-icon"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Seller Details"
                        >
                          <i className="bx bx-sitemap"></i>
                        </div>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        to="#"
                        className={classnames({ active: activeTab === 2 })}
                        /*onClick={() => {
                          setActiveTab(2);
                        }}*/
                      >
                        <div
                          className="step-icon"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Select list"
                        >
                          <i className="bx bx-list-ul"></i>
                        </div>
                      </NavLink>
                    </NavItem>
                  </ul>
                  <hr />
                  <TabContent
                    className="twitter-bs-wizard-tab-content"
                    activeTab={activeTab}
                  >
                    <TabPane tabId={1}>
                      <div className="mb-4">
                        {type !== null && <Params setParams={setParams} />}
                      </div>
                      <div className="row">
                        <div className="col-md-4 content-center">
                          <div className="form_radio_btn">
                            <input
                              id="radio1"
                              type="radio"
                              name="type"
                              value={
                                RedistributionContentTypeRenderEnum.Registrations
                              }
                              key="1"
                              onChange={handleChange}
                            />
                            <label htmlFor="radio1">
                              <i className="mdi mdi-database-plus font-size-132" />
                              <div className="title">Registrations</div>
                            </label>
                          </div>
                        </div>

                        <div className="col-md-4 content-center">
                          <div className="form_radio_btn">
                            <input
                              id="radio2"
                              type="radio"
                              name="type"
                              value={RedistributionContentTypeRenderEnum.Filter}
                              key="2"
                              onChange={handleChange}
                            />
                            <label htmlFor="radio2">
                              <i className="mdi mdi-database-arrow-right-outline font-size-132" />
                              <div className="title">Import from data base</div>
                            </label>
                          </div>
                        </div>

                        <div className="col-md-4 content-center">
                          <div className="form_radio_btn">
                            <input
                              id="radio4"
                              type="radio"
                              name="type"
                              value={
                                RedistributionContentTypeRenderEnum.RegFiles
                              }
                              key="4"
                              onChange={handleChange}
                            />
                            <label htmlFor="radio4">
                              <i className="mdi mdi-file-table-outline font-size-132" />
                              <div className="title">Import from file</div>
                            </label>
                          </div>
                        </div>
                      </div>
                    </TabPane>
                    <TabPane tabId={2}>
                      <div>
                        <div className="text-center mb-4">
                          <h5>Choose where to pull the leads from</h5>
                          {/*<p className="card-title-desc">Fill all information below</p>*/}
                        </div>

                        {type !== null && renderContent()}
                      </div>
                    </TabPane>

                    {/*<TabPane tabId={3}>
                      <div>
                        <div className="text-center mb-4">
                          <h5>Bank Details</h5>
                          <p className="card-title-desc">Fill all information below</p>
                        </div>
                        <form>
                          <div className="row">
                            <div className="col-lg-6">
                              <div className="mb-3">
                                <label
                                  htmlFor="basicpill-namecard-input"
                                  className="form-label"
                                >
                                  Name on Card
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="basicpill-namecard-input"
                                />
                              </div>
                            </div>

                            <div className="col-lg-6">
                              <div className="mb-3">
                                <label className="form-label">Credit Card Type</label>
                                <select className="form-select">
                                  <option>Select Card Type</option>
                                  <option defaultValue="AE">American Express</option>
                                  <option value="VI">Visa</option>
                                  <option value="MC">MasterCard</option>
                                  <option value="DI">Discover</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-lg-6">
                              <div className="mb-3">
                                <label
                                  htmlFor="basicpill-cardno-input"
                                  className="form-label"
                                >
                                  Credit Card Number
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="basicpill-cardno-input"
                                />
                              </div>
                            </div>

                            <div className="col-lg-6">
                              <div className="mb-3">
                                <label
                                  htmlFor="basicpill-card-verification-input"
                                  className="form-label"
                                >
                                  Card Verification Number
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="basicpill-card-verification-input"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-lg-6">
                              <div className="mb-3">
                                <label
                                  htmlFor="basicpill-expiration-input"
                                  className="form-label"
                                >
                                  Expiration Date
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="basicpill-expiration-input"
                                />
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </TabPane>*/}
                  </TabContent>
                  <ul className="pager wizard twitter-bs-wizard-pager-link">
                    <li
                      className={
                        activeTab === 1 ? "previous disabled" : "previous"
                      }
                    >
                      <button
                        className={
                          activeTab === 1
                            ? "btn btnOrange btn-width-250 disabled"
                            : "btn btnOrange btn-width-250"
                        }
                        onClick={() => {
                          toggleTab(activeTab - 1);
                        }}
                      >
                        <i className="bx bx-chevron-left me-1"></i> Previous
                      </button>
                    </li>

                    {activeTab === 2 ? (
                      <li className="next">
                        <button
                          className="btn btnOrange btn-width-250"
                          onClick={handelSubmit}
                          disabled={
                            !(
                              listRegId.length ||
                              listFileId.length ||
                              !isRegSearchRequest
                            )
                          }
                        >
                          {loading && (
                            <i className="bx bx-hourglass bx-spin me-2" />
                          )}
                          Save
                        </button>
                      </li>
                    ) : (
                      <li
                        className={activeTab === 2 ? "next disabled" : "next"}
                      >
                        <button
                          className={
                            activeTab === 2
                              ? "btn btnOrange btn-width-250 disabled"
                              : "btn btnOrange btn-width-250"
                          }
                          onClick={() => {
                            toggleTab(activeTab + 1);
                          }}
                          //disabled={!params?.nameRedistribution}
                        >
                          Next <i className="bx bx-chevron-right ms-1"></i>
                        </button>
                      </li>
                    )}
                  </ul>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};
