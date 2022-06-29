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
import SearchAffPayout from "./components/search/searchAffPayout";
import SearchBrandPayout from "./components/search/searchBrandPayout"

const Payouts = () => {
  const dispatch = useDispatch();

  const [customActiveTab, setCustomActiveTab] = useState<string>("1");
  const [modalAff, setModalAff] = useState<boolean>(false);
  const [modalBrand, setModalBrand] = useState<boolean>(false);
  const [payoutAffId, setPayoutAffId] = useState(null);
  const [payoutBrandId, setPayoutBrandId] = useState(null);

  const toggleCustom = (tab: any) => {
    if (customActiveTab !== tab) {
      setCustomActiveTab(tab);
    }
  };

  const toggleModalAff = (type: string) => {
    if (type === 'new') setPayoutAffId(null);
    setModalAff(prev => !prev);
  };

  const toggleModalBrand = (type: string) => {
    if (type === 'new') setPayoutBrandId(null);
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
                      <Col className="col-md-4">
                        <SearchAffPayout />
                      </Col>
                      <Col className="text-end">
                        <button
                          type="button"
                          className="btn btnOrange"
                          onClick={() => toggleModalAff('new')}
                        >
                          {/*<i className="bx bx-plus me-1" />*/} New Payout
                        </button>
                      </Col>
                    </Row>

                    <Row>
                      <Col sm="12">
                        <TableAff setPayoutId={setPayoutAffId} toggle={toggleModalAff}/>
                      </Col>
                    </Row>
                  </TabPane>

                  <TabPane tabId="2">
                    <Row className="mb-4">
                      <Col className="col-md-4">
                        <SearchBrandPayout />
                      </Col>
                      <Col className="text-end">
                        <button
                          type="button"
                          className="btn btnOrange"
                          onClick={() => toggleModalBrand('new')}
                        >
                          {/*<i className="bx bx-plus me-1" />*/} New Payout
                        </button>
                      </Col>
                    </Row>

                    <Row>
                      <Col sm="12">
                        <TableBrand setPayoutId={setPayoutBrandId} toggle={toggleModalBrand}/>
                      </Col>
                    </Row>
                  </TabPane>
                </TabContent>

              </CardBody>
            </Card>
          </Col>
        </Row>


        {modalAff && <AddAffModal isOpen={modalAff} toggle={toggleModalAff} isAff={false} payoutId={payoutAffId}/>}

        {modalBrand && <AddBrandModal isOpen={modalBrand} toggle={toggleModalBrand} isBrand={false} payoutId={payoutBrandId}/>}


      </div>
    </React.Fragment>
  )
}

export default Payouts