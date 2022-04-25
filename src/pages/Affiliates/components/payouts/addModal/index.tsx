import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import { AvField, AvForm } from "availity-reactstrap-validation";
import { PayoutType, Currency } from "../../../../../common/utils/model";
import { clearGeo, getGeo } from "../../../../../store/geo/actions";
import Select from "react-select";
import { addAffPayouts } from "../../../../../store/affiliatePayouts/actions";

export default ({ isOpen, toggle }: any) => {
  const dispatch = useDispatch();

  const [selectGeo, setSelectGeo] = useState([]);

  const { geo, loadingGeoList, loadedGeoList, loadingItem, loadedItem} = useSelector((state:any) => {
    return {
      geo: state.Geo.geo.items,
      loadingGeoList: state.Geo.loading,
      loadedGeoList: state.Geo.loaded,
      loadingItem: state.AffPayouts.loadingItem,
      loadedItem: state.AffPayouts.loadedItem
    }
  })

  let filter = {
    order: 1
  };

  useEffect(() => {
    dispatch(getGeo('', filter))
    return () => {
      dispatch(clearGeo())
    }
  }, [])


  const geoList = geo.map((item:any) => {
    return {
      value: item.id,
      label: item.name
    }
  });

  const handleValidAffPayoutSubmit = (data: any) => {
    const {value, lable} : any = selectGeo;
    const addPayouts = {
      amount: +data.amount,
      payoutType:  +data.payoutType,
      currency:  +data.currency,
      geoId: +value
    }

    console.log(addPayouts);

    dispatch(addAffPayouts(addPayouts))
  }

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle} tag="h4">
        Add Payout
      </ModalHeader>
      <ModalBody>

        <AvForm
          onValidSubmit={(
            e: any,
            values: any
          ) => {
            handleValidAffPayoutSubmit(values);
          }}
        >
          <Row form>
            <Col xs={12}>
              <div className="mb-3">
                <AvField
                  name="amount"
                  label="Amount*"
                  type="text"
                  errorMessage="Invalid amount"
                  validate={{
                    required: { value: true }
                  }}
                  value={""}
                />
              </div>

              <div className="mb-3">
                <AvField
                  type="select"
                  name="payoutType"
                  className="form-select"
                  label="Payout Type"
                  required
                  value=""
                >
                  <option value={""}>Select sate</option>
                  {PayoutType.map((val, i) =>
                    <option key={i} value={i}>{val.label}</option>
                  )}
                </AvField>
              </div>

              <div className="mb-3">
                <AvField
                  type="select"
                  name="currency"
                  className="form-select"
                  label="Currency"
                  required
                  value="0"
                >
                  <option value={""}>Select sate</option>
                  {Currency.map((val, i) => <option key={i} value={i}>{val}</option>)}
                </AvField>
              </div>

              <div className="mb-3">
                <Select
                  isSearchable
                  isLoading={loadingGeoList}
                  options={geoList}
                  onChange={setSelectGeo}
                />
              </div>

            </Col>
          </Row>
          <Row>
            <Col>
              <div className="text-end">
                <button
                  type="submit"
                  className="btn btn-success save-user"
                >
                  {loadingItem && <i className="bx bx-hourglass bx-spin me-2"/>}
                  Save
                </button>
              </div>
            </Col>
          </Row>
        </AvForm>
      </ModalBody>
    </Modal>
  )
}