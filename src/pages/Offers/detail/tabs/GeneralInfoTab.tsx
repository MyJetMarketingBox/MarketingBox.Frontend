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
import { AvForm, AvField } from "availity-reactstrap-validation";
import OfferStatusName from "src/constants/OfferStatusName";
import { OfferActiveStateEnum } from "src/enums/OfferStateEnum";
import { RootStoreType } from "src/store/storeTypes";
import { OfferTabsEnum } from "../OfferDetatils";

interface Props {}
const GeneralInfoTab = ({}: Props) => {
  const bg = ["bg-success", "bg-danger", "bg-warning"];
  const bx = ["bx-check-double", "bx-block", "bx-error"];
  const { offer, offerUrl } = useSelector((store: RootStoreType) => ({
    offer: store.Offers.editableOffer,
    offerUrl: store.Offers.offerUrl,
  }));

  return (
    <TabPane tabId={OfferTabsEnum.GeneralInfo}>
      <AvForm>
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
                    <DropdownItem
                      onClick={() => {}}
                      key={val[0]}
                      value={val[0]}
                    >
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
            <h5 className="text-orange">Countries</h5>
            {offer?.geos.map(item => (
              <div key={item.id} className="badge bg-secondary m-2 mb-3 fz-16">
                {item.name}
              </div>
            ))}

            <h5 className="text-orange">Language</h5>

            <div className="badge bg-secondary mb-3 fz-16">
              {offer?.language.name}
            </div>

            <h5 className="text-orange">Offer link</h5>
            <AvField
              name="offerUrl"
              value={offerUrl}
              className="form-control mb-4"
              placeholder="Offer url"
              type="text"
            />
          </Col>
          <Col xs={12} sm={5} className="mb-3">
            {/* right column */}
          </Col>
        </Row>
      </AvForm>
    </TabPane>
  );
};

export default GeneralInfoTab;
