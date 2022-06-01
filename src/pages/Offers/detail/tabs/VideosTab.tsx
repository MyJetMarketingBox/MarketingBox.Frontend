import React from "react";
import { TabPane } from "reactstrap";
import { OfferTabsEnum } from "../OfferDetatils";

interface Props {}
const VideosTab = ({}: Props) => {
  return <TabPane tabId={OfferTabsEnum.Videos}>video tab</TabPane>;
};

export default VideosTab;
