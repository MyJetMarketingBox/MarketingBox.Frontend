import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import { AvField, AvForm } from "availity-reactstrap-validation";
import { PayoutType, Currency } from "../../../../../common/utils/model";
import { clearGeo, getGeo } from "../../../../../store/geo/actions";

export default ({ isOpen, toggle }: any) => {
  const dispatch = useDispatch();

  const { geo, loadingGeoList, loadedGeoList} = useSelector((state:any) => {
    return {
      geo: state.Geo.geo.items,
      loadingGeoList: state.Geo.loading,
      loadedGeoList: state.Geo.loaded
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

  const handleValidAffPayoutSubmit = (values: any) => {
    console.log(values);
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
                  name="state"
                  className="form-select"
                  label="State"
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

            </Col>
          </Row>
          <Row>
            <Col>
              <div className="text-end">
                <button
                  type="submit"
                  className="btn btn-success save-user"
                >
                  <i className="bx bx-hourglass bx-spin me-2" />
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