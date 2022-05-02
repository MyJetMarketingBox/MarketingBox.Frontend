import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearGeo, getGeo } from "../../../../store/geo/actions";
import { Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import { AvField, AvForm } from "availity-reactstrap-validation";
import { Currency, PayoutType } from "../../../../common/utils/model";
import Select from "../../select";
import { addBPayout, addBrandPayout } from "../../../../store/brandPayouts/actions";

export default ({ isOpen, toggle, isBrand }: any) => {

  const dispatch = useDispatch();

  const [selectGeo, setSelectGeo] = useState([]);

  const { geo, loadingGeoList, loadedGeoList, loadingItem, loadedItem, brand} = useSelector((state:any) => {
    return {
      geo: state.Geo.geo.items,
      loadingGeoList: state.Geo.loading,
      loadedGeoList: state.Geo.loaded,
      loadingItem: state.BrandPayouts.loadingItem,
      loadedItem: state.BrandPayouts.loadedItem,
      brand: state.BrandProfile.brand
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

  const handleValidBrandPayoutSubmit = (data: any) => {
    const {value, lable} : any = selectGeo;
    const addPayout = {
      name: data.name,
      amount: +data.amount,
      payoutType: +data.payoutType,
      currency: +data.currency,
      geoId: +value
    }

    isBrand
      ? dispatch(addBrandPayout(addPayout, brand))
      : dispatch(addBPayout(addPayout));
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
            handleValidBrandPayoutSubmit(values);
          }}
        >
          <Row form>
            <Col xs={12}>
              <Row>
                <Col lg={9}>
                  <div className="mb-3">
                    <AvField
                      name="name"
                      label="Name*"
                      type="text"
                      errorMessage="Invalid name"
                      validate={{
                        required: { value: true }
                      }}
                      value={""}
                    />
                  </div>
                </Col>
                <Col lg={3}>
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
                </Col>
              </Row>
              <Row>
                <Col lg={6}>
                  <div className="mb-3">
                    <AvField
                      type="select"
                      name="payoutType"
                      className="form-select"
                      label="Payout Type*"
                      required
                      value=""
                    >
                      <option value={""}>Select sate</option>
                      {PayoutType.map((val, i) =>
                        <option key={i} value={i}>{val.label}</option>
                      )}
                    </AvField>
                  </div>
                </Col>
                <Col lg={6}>
                  <div className="mb-3">
                    <AvField
                      type="select"
                      name="currency"
                      className="form-select"
                      label="Currency*"
                      required
                      value="0"
                    >
                      <option value={""}>Select sate</option>
                      {Currency.map((val, i) => <option key={i} value={i}>{val}</option>)}
                    </AvField>
                  </div>
                </Col>
              </Row>

              <div className="mb-3 custom-react-select">
                <div className="react-select-descr">
                  Select GEO
                </div>
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
                  className="btn btnOrange save-user"
                  disabled={loadingItem}
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