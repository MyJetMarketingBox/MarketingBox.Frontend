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

import { countryCodeEmoji } from "country-code-emoji";

interface Props {}
const GeneralInfoTab = ({}: Props) => {
  const bg = ["bg-success", "bg-danger", "bg-warning"];
  const bx = ["bx-check-double", "bx-block", "bx-error"];
  const { offer, offerUrl, countrines } = useSelector(
    (store: RootStoreType) => ({
      offer: store.Offers.editableOffer,
      offerUrl: store.Offers.offerUrl,
      countrines: store.Countries.value.items,
    })
  );

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

        <Row className="justify-content-between ">
          <Col xs={12} className="mb-3">
            <div className="mb-3">
              <h5 className="text-orange">Countries</h5>
              {offer?.geos.map(item => (
                <>
                  {item.countryIds.map(country => (
                    <div key={item.id} className="badge  badge-lg">
                      {countrines.find(el => el.id === country)?.name}
                    </div>
                  ))}
                </>
              ))}
            </div>

            <div className="mb-3">
              <h5 className="text-orange">Language</h5>
              <div className="badge  badge-lg">{offer?.language.name}</div>
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
        </Row>
      </AvForm>
    </TabPane>
  );
};

export default GeneralInfoTab;
