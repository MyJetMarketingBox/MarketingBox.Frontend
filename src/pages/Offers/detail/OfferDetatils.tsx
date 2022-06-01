import React, { useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import { useHistory, useParams } from "react-router";
import {
  Card,
  CardBody,
  CardHeader,
  Container,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
} from "reactstrap";
import classnames from "classnames";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import Page from "src/constants/pages";
import GeneralInfoTab from "./tabs/GeneralInfoTab";
import ScreenshotsTab from "./tabs/ScreenshotsTab";
import EmailTab from "./tabs/EmailTab";
import VideosTab from "./tabs/VideosTab";
import { useDispatch } from "react-redux";
import { getOffer, getOfferUrl } from "src/store/actions";

export enum OfferTabsEnum {
  GeneralInfo = "general-info",
  Screenshots = "screenshots",
  Email = "email",
  Videos = "videos",
}

const OfferDetatils = () => {
  const { id, tab } = useParams<{ id: string; tab: OfferTabsEnum }>();
  const { push } = useHistory();
  const dispatch = useDispatch();

  const OfferTabs = [
    {
      id: OfferTabsEnum.GeneralInfo,
      path: `${Page.OFFERS}/${id}/${OfferTabsEnum.GeneralInfo}`,
      name: "General Info",
    },
    {
      id: OfferTabsEnum.Screenshots,
      path: `${Page.OFFERS}/${id}/${OfferTabsEnum.Screenshots}`,
      name: "Screenshots",
    },
    {
      id: OfferTabsEnum.Email,
      path: `${Page.OFFERS}/${id}/${OfferTabsEnum.Email}`,
      name: "Email",
    },
    {
      id: OfferTabsEnum.Videos,
      path: `${Page.OFFERS}/${id}/${OfferTabsEnum.Videos}`,
      name: "Videos",
    },
  ];

  useEffect(() => {
    if (id) {
      dispatch(getOffer(+id));
      dispatch(getOfferUrl(+id));
    }
    if (!tab) {
      push(`${Page.OFFERS}/${id}/${OfferTabsEnum.GeneralInfo}`);
    }
  }, []);

  return (
    <div className="page-content">
      <MetaTags>
        <title>Offers | TraffMe</title>
      </MetaTags>

      <Container fluid>
        <Breadcrumbs
          title="Details"
          breadcrumbItem="Offers"
          link={Page.OFFERS}
        />

        <Row>
          <Card>
            <CardHeader className="align-items-center d-flex">
              <div className="flex-shrink-0">
                <Nav
                  tabs
                  className="justify-content-start nav-tabs-custom rounded card-header-tabs"
                >
                  {OfferTabs.map(offerTab => (
                    <NavItem key={offerTab.id}>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: tab === offerTab.id,
                        })}
                        onClick={() => push(offerTab.path)}
                      >
                        <span className="d-block d-sm-none">
                          <i className="fas fa-home"></i>
                        </span>
                        <span className="d-none d-sm-block">
                          {offerTab.name}
                        </span>
                      </NavLink>
                    </NavItem>
                  ))}
                </Nav>
              </div>
            </CardHeader>

            <CardBody>
              <TabContent activeTab={tab} className="p-3 text-muted">
                <GeneralInfoTab />
                <ScreenshotsTab />
                <EmailTab />
                <VideosTab />
              </TabContent>
            </CardBody>
          </Card>
        </Row>
      </Container>
    </div>
  );
};

export default OfferDetatils;
