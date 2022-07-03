import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { modalNewPayoutAff } from "../../store/affiliates/profile/actions";
import { modalNewPayoutBrand } from "../../store/brands/profile/actions";

const Payouts = () => {
  const dispatch = useDispatch();

  const [customActiveTab, setCustomActiveTab] = useState<string>("1");
  //const [modalAff, setModalAff] = useState<boolean>(false);
  //const [modalBrand, setModalBrand] = useState<boolean>(false);
  const [payoutAffId, setPayoutAffId] = useState(null);
  const [payoutBrandId, setPayoutBrandId] = useState(null);

  const { modalBrandNew, modalAffNew} = useSelector((state: any) => {
    return {
      modalBrandNew: state.BrandProfile.modalNewPayout,
      modalAffNew: state.AffProfile.modalNewPayout,
    }
  })

  const toggleCustom = (tab: any) => {
    if (customActiveTab !== tab) {
      setCustomActiveTab(tab);
    }
  };

  const toggleModalAff = (type: string, status: boolean) => {
    if (type === 'new') setPayoutAffId(null);
    //setModalAff(prev => !prev);
    dispatch(modalNewPayoutAff(status))
  };

  const toggleModalBrand = (type: string, status: boolean) => {
    if (type === 'new') setPayoutBrandId(null);
    //setModalBrand(prev => !prev);
    dispatch(modalNewPayoutBrand(status));
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
                    <Row >
                      <Col className="col-md-4">
                        <SearchAffPayout />
                      </Col>
                      <Col className="text-end">
                        <button
                          type="button"
                          className="btn btnOrange"
                          onClick={() => toggleModalAff('new', true)}
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
                    <Row >
                      <Col className="col-md-4">
                        <SearchBrandPayout />
                      </Col>
                      <Col className="text-end">
                        <button
                          type="button"
                          className="btn btnOrange"
                          onClick={() => toggleModalBrand('new', true)}
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


        {modalAffNew && <AddAffModal isOpen={modalAffNew} toggle={toggleModalAff} isAff={false} payoutId={payoutAffId}/>}

        {modalBrandNew && <AddBrandModal isOpen={modalBrandNew} toggle={toggleModalBrand} isBrand={false} payoutId={payoutBrandId}/>}


      </div>
    </React.Fragment>
  )
}

export default Payouts