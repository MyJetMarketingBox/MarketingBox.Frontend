import React, { useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import Breadcrumbs from "../../../../components/Common/Breadcrumb";
import { Card, CardBody, CardHeader, Col, Nav, NavItem, NavLink, Row, TabContent, TabPane } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { getBrand, clearBrand } from "../../../../store/brands/profile/actions";
import Loader from "../../../../components/UI/loader";
import classnames from "classnames";
import Payouts from "./payouts/table";
import Campaigns from "./campaign/table"
import Setting from "./settings"


const Brand = (props : any) => {
  const dispatch = useDispatch()

  const [customActiveTab, setCustomActiveTab] = useState<string>("1");

  const {
    match: { params },
  } = props;

  const { brand, loading, loaded } = useSelector((state: any) => {
    return {
      brand: state.BrandProfile.brand,
      loading: state.BrandProfile.loading,
      loaded: state.BrandProfile.loaded,
    }
  })

  useEffect(() => {
    if(params && params.id){
      dispatch(getBrand(params.id));
      return () => {
        dispatch(clearBrand());
      }
    }
  }, [])

  const {campaignRows,  ...currentBrand} = brand;

  const toggleCustom = (tab: any) => {
    if (customActiveTab !== tab) {
      setCustomActiveTab(tab);
    }
  };

  return(
    <React.Fragment>
      { loading && <Loader /> }
      <div className="page-content">
        <MetaTags>
          <title>Brand | TraffMe </title>
        </MetaTags>
        <div className="container-fluid">
          <Breadcrumbs title="TraffMe" breadcrumbItem="Brand" />
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
                        <span className="d-none d-sm-block">Settings</span>
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
                        <span className="d-none d-sm-block">Campaigns</span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: customActiveTab === "3",
                        })}
                        onClick={() => { toggleCustom("3"); }}
                      >
                        <span className="d-none d-sm-block">Payouts</span>
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
                        {loaded && <Setting brand={currentBrand} /> }
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="2">
                    <Row>
                      <Col sm="12">
                        {loaded && <Campaigns campaigns={brand.campaignRows} id={brand.id}/>}
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="3">
                    <Row>
                      <Col sm="12">
                        {loaded && <Payouts payouts={brand.payouts} id={brand.id} />}
                      </Col>
                    </Row>
                  </TabPane>
                </TabContent>
              </CardBody>

            </Card>
          </Col>
        </Row>

      </div>
    </React.Fragment>
  )
}

export default Brand