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

import BtnLoadMore from "../../components/UI/btns/BtnLoadMore";
import { RootStoreType } from "src/store/storeTypes";
import Geo from "../Geo";
import Loader from "../../components/UI/loader";
import MiniCard from "../../components/UI/miniCard/miniCard";
import SearchCampaigns from "./components/search";
import SearchGeo from "../Geo/components/search";
import AddCampaignOrGeoForm from "./components/addCampaignOrGeo/AddCampaignOrGeoForm";
import { CampaignTabsEnum } from "src/enums/CampaignTabsEnum";

const TAB_DATA = {
  [CampaignTabsEnum.Campaign]: {
    title: "Campaign List",
    tabTitle: "Campaign",
  },

  [CampaignTabsEnum.Geo]: {
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

  const [customActiveTab, setCustomActiveTab] = useState<CampaignTabsEnum>(
    CampaignTabsEnum.Campaign
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
                          active: customActiveTab === CampaignTabsEnum.Campaign,
                        })}
                        onClick={() => {
                          toggleCustom(CampaignTabsEnum.Campaign);
                        }}
                      >
                        <span className="d-block d-sm-none">
                          <i className="fas fa-home"></i>
                        </span>
                        <span className="d-none d-sm-block">
                          {TAB_DATA[CampaignTabsEnum.Campaign].tabTitle}
                        </span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: customActiveTab === CampaignTabsEnum.Geo,
                        })}
                        onClick={() => {
                          toggleCustom(CampaignTabsEnum.Geo);
                        }}
                      >
                        <span className="d-block d-sm-none">
                          <i className="far fa-user"></i>
                        </span>
                        <span className="d-none d-sm-block">
                          {TAB_DATA[CampaignTabsEnum.Geo].tabTitle}
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
                  <TabPane tabId={CampaignTabsEnum.Campaign}>
                    <Row className="align-items-center justify-content-between">
                      <Col md={4} className="mb-5">
                        <SearchCampaigns />
                      </Col>

                      <Col className="mb-5 d-flex align-items-center justify-content-end">
                        <button
                          type="button"
                          className="btn btnOrange"
                          onClick={toggleModal}
                        >
                          Add {TAB_DATA[customActiveTab].tabTitle}
                        </button>
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
                  <TabPane tabId={CampaignTabsEnum.Geo}>
                    <Row className="align-items-center justify-content-between">
                      <Col className="col-md-4 mb-5">
                        <SearchGeo />
                      </Col>

                      <Col className="mb-5 d-flex align-items-center justify-content-end">
                        <button
                          type="button"
                          className="btn btnOrange"
                          onClick={toggleModal}
                        >
                          Add {TAB_DATA[customActiveTab].tabTitle}
                        </button>
                      </Col>
                    </Row>
                    <Geo />
                  </TabPane>
                </TabContent>
              </CardBody>
            </Card>
          </Row>
        </Container>
      </div>
      {loading && <Loader />}
      <AddCampaignOrGeoForm isOpen={modal} toggle={toggleModal} formType={customActiveTab} />
    </React.Fragment>
  );
};

export default CampaignsGrid;
