import React, { useState } from "react";
import { useDispatch } from "react-redux";
import MetaTags from "react-meta-tags";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { Card, CardBody, CardHeader, Col, Nav, NavItem, NavLink, Row, TabContent, TabPane } from "reactstrap";
import classnames from "classnames";
import TableAff from "./components/table/affiliate"
import TableBrand from "./components/table/brand"
import AddBrandModal from "../../components/UI/modal/payouts/addBrand";
import AddAffModal from "../../components/UI/modal/payouts/addAffiliate";

const Payouts = () => {
  const dispatch = useDispatch();

  const [customActiveTab, setCustomActiveTab] = useState<string>("1");
  const [modalAff, setModalAff] = useState<boolean>(false);
  const [modalBrand, setModalBrand] = useState<boolean>(false);

  const toggleCustom = (tab: any) => {
    if (customActiveTab !== tab) {
      setCustomActiveTab(tab);
    }
  };

  const toggleModalAff = () => {
    setModalAff(prev => !prev);
  };

  const toggleModalBrand = () => {
    setModalBrand(prev => !prev);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Payouts | TraffMe </title>
        </MetaTags>
        <div className="container-fluid">
          <Breadcrumbs title="TraffMe" breadcrumbItem="Payouts" />
        </div>

        <Row>
          <Col xs={12}>
            <Card>
              <CardHeader>
                <div className="flex-shrink-0">
                  <Nav tabs className="justify-content-start nav-tabs-custom rounded card-header-tabs">
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: customActiveTab === "1",
                        })}
                        onClick={() => { toggleCustom("1"); }}
                      >
                        <span className="d-none d-sm-block">Affiliate</span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: customActiveTab === "2",
                        })}
                        onClick={() => { toggleCustom("2"); }}
                      >
                        <span className="d-none d-sm-block">Brand</span>
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
                    <Row className="mb-4">
                      <Col className="text-end">
                        <button
                          type="button"
                          className="btn btnOrange"
                          onClick={toggleModalAff}
                        >
                          <i className="bx bx-plus me-1" /> New Payout
                        </button>
                      </Col>
                    </Row>

                    <Row>
                      <Col sm="12">
                        <TableAff />
                      </Col>
                    </Row>
                  </TabPane>

                  <TabPane tabId="2">
                    <Row className="mb-4">
                      <Col className="text-end">
                        <button
                          type="button"
                          className="btn btnOrange"
                          onClick={toggleModalBrand}
                        >
                          <i className="bx bx-plus me-1" /> New Payout
                        </button>
                      </Col>
                    </Row>

                    <Row>
                      <Col sm="12">
                        <TableBrand />
                      </Col>
                    </Row>
                  </TabPane>
                </TabContent>

              </CardBody>
            </Card>
          </Col>
        </Row>

        <AddBrandModal isOpen={modalBrand} toggle={toggleModalBrand} />
        <AddAffModal isOpen={modalAff} toggle={toggleModalAff} isAff={false}/>
      </div>
    </React.Fragment>
  )
}

export default Payouts