import React from "react";
import { TabPane } from "reactstrap";
import { OfferTabsEnum } from "../OfferDetatils";

interface Props {}
const ScreenshotsTab = ({}: Props) => {
  return <TabPane tabId={OfferTabsEnum.Screenshots}>screenshot tab</TabPane>;
};

export default ScreenshotsTab;
