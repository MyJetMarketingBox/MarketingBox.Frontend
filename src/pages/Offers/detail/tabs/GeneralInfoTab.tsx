import React from "react";
import { useSelector } from "react-redux";
import {
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  TabContent,
  TabPane,
  UncontrolledDropdown,
} from "reactstrap";
import OfferStatusName from "src/constants/OfferStatusName";
import { OfferActiveStateEnum } from "src/enums/OfferStateEnum";
import { RootStoreType } from "src/store/storeTypes";
import { OfferTabsEnum } from "../OfferDetatils";

interface Props {}
const GeneralInfoTab = ({}: Props) => {
  const bg = ["bg-success", "bg-danger", "bg-warning"];
  const bx = ["bx-check-double", "bx-block", "bx-error"];
  const { offer } = useSelector((store: RootStoreType) => ({
    offer: store.Offers.editableOffer,
  }));

  return (
    <TabPane tabId={OfferTabsEnum.GeneralInfo}>
      <div className="d-flex mb-4 justify-content-between align-items-center">
        <input
          type="text"
          defaultValue={offer?.name}
          className="text-input"
          onChange={() => {}}
        />

        {offer !== null && (
          <div className="d-inline-block p-relative">
            <UncontrolledDropdown>
              <DropdownToggle
                type="button"
                className={`btn-sm ${
                  bg[offer.state]
                } waves-effect btn-label waves-light`}
              >
                <i className={`bx ${bx[offer.state]} label-icon`}></i>{" "}
                {OfferStatusName[offer.state]}
                <i className="mdi mdi-chevron-down"></i>
              </DropdownToggle>
              <DropdownMenu>
                {Object.entries(OfferStatusName).map(val => (
                  <DropdownItem onClick={() => {}} key={val[0]} value={val[0]}>
                    {val[1]}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        )}
      </div>

      <Row className="justify-content-between">
        <Col xs={12} sm={6} className="mb-3">
          {offer?.geos.map(item => (
            <div key={item.id} className="badge bg-secondary m-2 fz-16">
              {item.name}
            </div>
          ))}
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
