import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import MetaTags from "react-meta-tags";
import classnames from "classnames";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import {
  clearCampaigns,
  deleteCampaign,
  getCampaigns,
} from "../../store/campaigns/actions";
import AddCampaignForm from "./components/addCampaign/AddCampaignForm";
import BtnLoadMore from "../../components/UI/btns/BtnLoadMore";
import { RootStoreType } from "src/store/storeTypes";
import Geo from "../Geo";
import Loader from "../../components/UI/loader";
import MiniCard from "../../components/UI/miniCard/miniCard";
import SearchCampaigns from "./components/search";

enum TabsEnum {
  Campaign = "campaign",
  Geo = "geo",
}

const TAB_DATA = {
  [TabsEnum.Campaign]: {
    title: "Campaign List",
    tabTitle: "Campaign",
  },

  [TabsEnum.Geo]: {
    title: "Geo List",
    tabTitle: "Geo",
  },
};

const CampaignsGrid = () => {
  const dispatch = useDispatch();
  const { campaigns, pagination, nextUrl, loaded, loading, error } =
    useSelector((state: RootStoreType) => ({
      pagination: state.Campaigns.campaigns.pagination,
      campaigns: state.Campaigns.campaigns.items,
      nextUrl: state.Campaigns.campaigns.pagination?.nextUrl,
      loaded: state.Campaigns.loaded,
      loading: state.Campaigns.loading,
      error: state.Campaigns.error,
    }));

  const [modal, setModal] = useState<boolean>(false);

  const [customActiveTab, setCustomActiveTab] = useState<TabsEnum>(
    TabsEnum.Campaign
  );

  let filter = {
    order: 1,
    limit: 50,
  };

  const toggleCustom = (tab: any) => {
    if (customActiveTab !== tab) {
      setCustomActiveTab(tab);
    }
  };

  const toggleModal = () => {
    setModal(prev => !prev);
  };

  useEffect(() => {
    dispatch(getCampaigns(null, filter));

    return () => {
      dispatch(clearCampaigns());
    };
  }, []);

  const handleDeleteCampaign = (id: number) => {
    dispatch(deleteCampaign(id));
  };

  async function loadMore() {
    if (nextUrl) {
      dispatch(getCampaigns(nextUrl, filter));
    }
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>{TAB_DATA[customActiveTab].tabTitle} | TraffMe</title>
        </MetaTags>
        <Container fluid>
          {/** Render Breadcrumbs **/}
          <Breadcrumbs title="TraffMe" breadcrumbItem="Campaigns" />

          <Row className="align-items-center">
            <Col md={6}>
              <div className="mb-3">
                <h5 className="card-title">
                  {TAB_DATA[customActiveTab].title}
                  <span className="text-muted fw-normal ms-2">(834)</span>
                </h5>
              </div>
            </Col>

            <Col md={6}>
              <div className="d-flex flex-wrap align-items-center justify-content-end gap-2 mb-3">
                <div>
                  <button
                    type="button"
                    className="btn btnOrange"
                    onClick={toggleModal}
                  >
                    Add {TAB_DATA[customActiveTab].tabTitle}
                  </button>
                </div>
              </div>
            </Col>
          </Row>

          <Row>
            <Card>
              <CardHeader className="align-items-center d-flex">
                <div className="flex-shrink-0">
                  <Nav
                    tabs
                    className="justify-content-start nav-tabs-custom rounded card-header-tabs"
                  >
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: customActiveTab === TabsEnum.Campaign,
                        })}
                        onClick={() => {
                          toggleCustom(TabsEnum.Campaign);
                        }}
                      >
                        <span className="d-block d-sm-none">
                          <i className="fas fa-home"></i>
                        </span>
                        <span className="d-none d-sm-block">
                          {TAB_DATA[TabsEnum.Campaign].tabTitle}
                        </span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: customActiveTab === TabsEnum.Geo,
                        })}
                        onClick={() => {
                          toggleCustom(TabsEnum.Geo);
                        }}
                      >
                        <span className="d-block d-sm-none">
                          <i className="far fa-user"></i>
                        </span>
                        <span className="d-none d-sm-block">
                          {TAB_DATA[TabsEnum.Geo].tabTitle}
                        </span>
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
                  <TabPane tabId={TabsEnum.Campaign}>
                    <Row>
                      <Col className="col-md-4 mb-5">
                        <SearchCampaigns />
                      </Col>
                    </Row>

                    <Row>
                      {campaigns.map((campaign: any) => (
                        <MiniCard
                          data={campaign}
                          path={`/campaigns/${campaign.id}`}
                          handleDelete={handleDeleteCampaign}
                          key={campaign.id}
                        />
                      ))}
                    </Row>

                    {nextUrl && (
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
                    )}
                  </TabPane>
                  <TabPane tabId={TabsEnum.Geo}>
                    <Geo />
                  </TabPane>
                </TabContent>
              </CardBody>
            </Card>
          </Row>
        </Container>
      </div>
      {loading && <Loader />}
      <AddCampaignForm isOpen={modal} toggle={toggleModal} />
    </React.Fragment>
  );
};

export default CampaignsGrid;
