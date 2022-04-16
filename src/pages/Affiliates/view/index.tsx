import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import FormAffiliate from "../components/editAffiliate/formAffiliate"
import MetaTags from "react-meta-tags";

import {
  Card,
  CardBody,
  CardHeader,
  CardText,
  CardTitle,
  Col,
  Collapse,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  UncontrolledDropdown,
} from "reactstrap";

import classnames from "classnames";
import { useDispatch, useSelector } from "react-redux";

import { getAffiliateProfile } from "../../../store/affiliates/actions";

const Affiliate = (props: any) => {
  const dispatch = useDispatch();

  const {
    match: { params },
  } = props;

  const { affiliate, loading, loaded } = useSelector((state: any) => ({
    affiliate: state.Affiliates.affiliateProfile,
    loading: state.Affiliates.loading,
    loaded: state.Affiliates.loaded
  }));

   //const [getAffiliate, setAffiliate] = useState(null);
  const [customActiveTab, setcustomActiveTab] = useState("1");
  //const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (params && params.id) {
      dispatch(getAffiliateProfile(params.id));
    }
    /*else {
      dispatch(onGetAffiliateProfile(1)); //удалите после полной интеграции
    }*/
  }, []);

  /*useEffect(() => {
    if(affiliateProfile && affiliateProfile.affiliateId) {
      setAffiliate(affiliateProfile);
      setLoading(true)
    }
  }, [affiliateProfile]);*/

  const toggleCustom = (tab: any) => {
    if (customActiveTab !== tab) {
      setcustomActiveTab(tab);
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Affiliate {params.id} | TraffMe </title>
        </MetaTags>
        <div className="container-fluid">
          <Breadcrumbs title="TraffMe" breadcrumbItem="Affiliate" />
          <Row>
            <Col className="col-12">

              <Card>
                {!loaded ? (
                  <div style={{ textAlign: "center" }}>
                    <h1>Loading...</h1>
                  </div>
                ):( <>

                  <CardHeader className="align-items-center d-flex">
                    <div className="flex-shrink-0">
                      <Nav tabs className="justify-content-start nav-tabs-custom rounded card-header-tabs">
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
                            <span className="d-none d-sm-block">Home</span>
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
                            <span className="d-none d-sm-block">Profile</span>
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            style={{ cursor: "pointer" }}
                            className={classnames({
                              active: customActiveTab === "3",
                            })}
                            onClick={() => {
                              toggleCustom("3");
                            }}
                          >
                          <span className="d-block d-sm-none">
                            <i className="far fa-envelope"></i>
                          </span>
                            <span className="d-none d-sm-block">Messages</span>
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            style={{ cursor: "pointer" }}
                            className={classnames({
                              active: customActiveTab === "4",
                            })}
                            onClick={() => {
                              toggleCustom("4");
                            }}
                          >
                          <span className="d-block d-sm-none">
                            <i className="fas fa-cog"></i>
                          </span>
                            <span className="d-none d-sm-block">Settings</span>
                          </NavLink>
                        </NavItem>
                      </Nav>
                    </div>
                  </CardHeader>
                  <CardBody>


                    <TabContent
                      activeTab={customActiveTab}
                      className="p-3 text-muted"
                    >
                      <TabPane tabId="1">
                        <Row>
                          <Col sm="12">
                            <CardText className="mb-0">
                              <FormAffiliate />
                            </CardText>
                          </Col>
                        </Row>
                      </TabPane>
                      <TabPane tabId="2">
                        <Row>
                          <Col sm="12">
                            <CardText className="mb-0">
                              2
                            </CardText>
                          </Col>
                        </Row>
                      </TabPane>
                      <TabPane tabId="3">
                        <Row>
                          <Col sm="12">
                            <CardText className="mb-0">
                              3
                            </CardText>
                          </Col>
                        </Row>
                      </TabPane>
                      <TabPane tabId="4">
                        <Row>
                          <Col sm="12">
                            <CardText className="mb-0">
                              4
                            </CardText>
                          </Col>
                        </Row>
                      </TabPane>
                    </TabContent>
                  </CardBody>

                </>)}
              </Card>

            </Col>
          </Row>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Affiliate;
