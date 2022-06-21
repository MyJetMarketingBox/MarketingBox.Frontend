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

import { clearAffProfile, getAffiliateProfile } from "../../../store/affiliates/profile/actions";
import Loader from "../../../components/UI/loader";
import Payouts from "../components/payouts";

const Affiliate = (props: any) => {
  const dispatch = useDispatch();

  const {
    match: { params },
  } = props;

  const { affProfile, affLoaded, affLoading } = useSelector((state: any) => ({
    affProfile: state.AffProfile.affProfile,
    affLoading: state.AffProfile.loading,
    affLoaded: state.AffProfile.loaded
  }));

  const [customActiveTab, setCustomActiveTab] = useState<string>("1");

  useEffect(() => {
    if (params && params.id) {
      dispatch(getAffiliateProfile(params.id));
      return () => {
        dispatch(clearAffProfile());
      }
    }
  }, []);

  const toggleCustom = (tab: any) => {
    if (customActiveTab !== tab) {
      setCustomActiveTab(tab);
    }
  };

  return (
    <React.Fragment>
      { !affLoaded && affLoading && <Loader /> }
      <div className="page-content">
        <MetaTags>
          <title>Affiliate {params.id} | TraffMe </title>
        </MetaTags>
        <Container fluid>
          <Breadcrumbs title="TraffMe" breadcrumbItem="Affiliate" />

          <Row>
            <Col xs={12}>

              <Card>
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
                            <span className=" d-sm-block">Settings</span>
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
                            <span className=" d-sm-block">Payouts</span>
                          </NavLink>
                        </NavItem>
                      </Nav>
                    </div>
                  </CardHeader>
                  <CardBody>

                    <TabContent
                      activeTab={customActiveTab}
                      className="text-muted"
                    >
                      <TabPane tabId="1">
                        <Row>
                          <Col sm="12">
                            {affLoaded && <FormAffiliate affiliate={affProfile}/>}
                          </Col>
                        </Row>
                      </TabPane>
                      <TabPane tabId="2">
                        <Row>
                          <Col sm="12">
                            {affLoaded && <Payouts payouts={affProfile.payouts} id={affProfile.id} />}
                          </Col>
                        </Row>
                      </TabPane>
                    </TabContent>
                  </CardBody>

              </Card>

            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Affiliate;
