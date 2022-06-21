import React from "react";
import { TabContent, TabPane } from "reactstrap";
import { OfferTabsEnum } from "../OfferDetatils";

interface Props {}
const EmailTab = ({}: Props) => {
  return <TabPane tabId={OfferTabsEnum.Email}>email tab</TabPane>;
};

export default EmailTab;
