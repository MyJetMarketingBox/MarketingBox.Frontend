import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";
import { AvField, AvForm } from "availity-reactstrap-validation";
import { Currency, PayoutType } from "../../../../../common/utils/model";
//import Select from "react-select";
import { clearAffPayouts, getAffPayouts } from "../../../../../store/affiliatePayouts/actions";
import { updateAffiliate } from "../../../../../store/affiliates/profile/actions";
import Select from "../../../../../components/UI/select";

export default ({ isOpen, toggle }: any) => {
  const dispatch = useDispatch();

  const [selectPayouts, setSelectPayouts] = useState([])

  const { payoutsList, affiliate, upLoading, affLoaded, upLoaded, loadingUpdate, loadedUpdate, affLoading } = useSelector((state:any) => {
    return{
      payoutsList: state.AffPayouts.affPayouts.items,
      affiliate: state.AffProfile.affProfile,
      upLoading: state.AffProfile.upLoading,
      upLoaded: state.AffProfile.upLoaded,
      affLoaded: state.AffProfile.loaded,
      affLoading: state.AffProfile.loading,
      loadingUpdate: state.AffPayouts.loadingUpdate,
      loadedUpdate: state.AffPayouts.loadedUpdate,
    }
  })

  let filter = {
    order: 1
  };

  useEffect(() => {
    dispatch(getAffPayouts('', filter))
    return () => {
      dispatch(clearAffPayouts())
    }
  }, []);

  const arrAffPayId = affiliate.payouts.map((item : any) => item.id)

  const resAffPayoutsList = payoutsList.filter(
    (item: any) => {
        return !arrAffPayId.includes(item.id);
    }
  ).map((item : any) => {
    return {
      value: item.id,
      label: item.name
    }
  });

  useEffect(() => {
    if((!upLoading && upLoaded) || (!loadingUpdate && loadedUpdate)){
      close();
    }
  }, [upLoading, upLoaded, loadingUpdate, loadedUpdate])

  const close = () => {
    toggle(false);
    setSelectPayouts([])
  };

  const handleValidAffPayoutSubmit = (values : any) => {
    const {payouts, offerAffiliates, bank, company, ...affClear} = affiliate

    const resPayouts = selectPayouts.map((item: any) => {
      return item.value
    });

    const currPayouts = payouts.map((item : any) => {
      return item.id
    })

    affClear.affiliatePayoutIds = [...currPayouts, ...resPayouts]

    dispatch(updateAffiliate(affClear, affClear.id))
  }

  return (
    <Modal isOpen={isOpen} toggle={close} className="modal-dialog-centered">
      <AvForm
        onValidSubmit={(
          e: any,
          values: any
        ) => {
          handleValidAffPayoutSubmit(values);
        }}
      >
        <ModalHeader toggle={close} tag="h4">
          Assign Payout
        </ModalHeader>
        <ModalBody>

          <Row form>
            <Col xs={12}>
              <div className="mb-3 custom-react-select">
                <div className="react-select-descr">
                  Select Payout <span className="accent-color">*</span>
                </div>
                <Select
                  isMulti
                  isSearchable
                  isLoading={affLoading}
                  options={resAffPayoutsList}
                  onChange={setSelectPayouts}
                  value={selectPayouts}
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
                  className="btn btnOrange save-user"
                  disabled={upLoading || !selectPayouts.length}
                >
                  {upLoading &&<i className="bx bx-hourglass bx-spin me-2"/>}
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