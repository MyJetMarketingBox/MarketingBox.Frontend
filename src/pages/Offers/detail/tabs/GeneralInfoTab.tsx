import React from "react";
import { Col, Row, TabContent, TabPane } from "reactstrap";
import { OfferTabsEnum } from "../OfferDetatils";

interface Props {}
const GeneralInfoTab = ({}: Props) => {
  return (
    <TabPane tabId={OfferTabsEnum.GeneralInfo}>
      <div className="d-flex mb-4">
        <input
          type="text"
          value={"Offer name"}
          className="text-input"
          onChange={() => {}}
        />
      </div>

      <Row className="justify-content-between">
        <Col xs={12} sm={6} className="mb-3">
          <p>- download archive link </p>
          <p>- AffiliatePayout - manually inserted payout range</p>
          <p>- available languages preview links (non mvp)</p>
          <p>- working hours (non mvp)</p>
        </Col>
        <Col xs={12} sm={5} className="mb-3">
          <p>preview link (non mvp)</p>
        </Col>
      </Row>
    </TabPane>
  );
};

export default GeneralInfoTab;
