import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearGeo, getGeo } from "../../../../store/geo/actions";
import { Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";
import { AvField, AvForm } from "availity-reactstrap-validation";
import { Currency, PayoutType } from "../../../../common/utils/model";
import Select from "../../select";
import { addBPayout, addBrandPayout, updateBrandPayout } from "../../../../store/brandPayouts/actions";

export default ({ isOpen, toggle, isBrand, payoutId }: any) => {

  const dispatch = useDispatch();

  const [selectGeo, setSelectGeo] = useState<any>({});

  const { geo, loadingGeoList, loadedGeoList, loadingItem, loadedItem, brand, payout, loadingUpdate, loadedUpdate} = useSelector((state:any) => {
    return {
      geo: state.Geo.geo.items,
      loadingGeoList: state.Geo.loading,
      loadedGeoList: state.Geo.loaded,
      loadingItem: state.BrandPayouts.loadingItem,
      loadedItem: state.BrandPayouts.loadedItem,
      brand: state.BrandProfile.brand,
      payout: state.BrandPayouts.brandPayouts.items.find((item: any) => item.id == payoutId),
      loadingUpdate: state.BrandPayouts.loadingUpdate,
      loadedUpdate: state.BrandPayouts.loadedUpdate
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

  useEffect(() => {
    if(payoutId > 0){
      let findGeo = geo.find((item : any) => payout?.geo.id === item.id);

      let sGeo = { value: findGeo.id, label: findGeo.name }
      setSelectGeo( sGeo )
    }else{
      setSelectGeo({})
    }
  }, [payoutId])

  useEffect(() => {
    if((!loadingUpdate && loadedUpdate) || (!loadingItem && loadedItem)){
      close();
      setSelectGeo({})
    }
  }, [loadingUpdate, loadedUpdate, loadingItem, loadedItem])

  const close = () => {
    toggle(false);
  };

  const handleValidBrandPayoutSubmit = (data: any) => {
    const {value, lable} : any = selectGeo;
    const payout = {
      name: data.name,
      amount: +data.amount,
      payoutType: +data.payoutType,
      currency: +data.currency,
      geoId: +value
    }

    if(payoutId > 0 ){
      dispatch(updateBrandPayout(payout, payoutId))
    } else {
      isBrand
        ? dispatch(addBrandPayout(payout, brand))
        : dispatch(addBPayout(payout));
    }
  }

  return (
    <Modal isOpen={isOpen} toggle={toggle} className="modal-dialog-centered">
      <ModalHeader toggle={toggle} tag="h4">
        {payoutId ? 'Change' : 'Add'} Payout
      </ModalHeader>
      <AvForm
        onValidSubmit={(
          e: any,
          values: any
        ) => {
          handleValidBrandPayoutSubmit(values);
        }}
      >
        <ModalBody>
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
                      value={payout?.name}
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
                      value={payout?.amount}
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
                      value={String(payout?.payoutType)}
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
                      value={payout?.currency || "0"}
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
                  value={selectGeo}
                />
              </div>

            </Col>
          </Row>
        </ModalBody>

        <ModalFooter>
          <Row>
            <Col>
              <div className="text-end">
                <button
                  type="submit"
                  className="btn btnOrange btn-width-250"
                  disabled={loadingItem || loadingUpdate}
                >
                  {(loadingItem || loadingUpdate) && <i className="bx bx-hourglass bx-spin me-2"/>}
                  Save
                </button>
              </div>
            </Col>
          </Row>
        </ModalFooter>
      </AvForm>
    </Modal>
  )
}