import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import { AvField, AvForm } from "availity-reactstrap-validation";
import { Currency, PayoutType } from "../../../../../common/utils/model";
import Select from "react-select";
import { getAffPayouts } from "../../../../../store/affiliatePayouts/actions";
import { updateAffiliate } from "../../../../../store/affiliates/profile/actions";

export default ({ isOpen, toggle }: any) => {
  const dispatch = useDispatch();

  const [selectPayouts, setSelectPayouts] = useState([])

  const { payoutsList, affiliate, upLoading, affLoaded } = useSelector((state:any) => {
    return{
      payoutsList: state.AffPayouts.affPayouts.items,
      affiliate: state.AffProfile.affProfile,
      upLoading: state.AffProfile.upLoading,
      affLoaded: state.AffProfile.loaded
    }
  })

  let filter = {
    order: 1
  };

  useEffect(() => {
    dispatch(getAffPayouts('', filter))
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
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle} tag="h4">
        Assign Payout
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
                <Select
                  isMulti
                  isSearchable
                  isLoading={""}
                  options={resAffPayoutsList}
                  onChange={setSelectPayouts}
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
                  disabled={upLoading}
                >
                  {upLoading &&<i className="bx bx-hourglass bx-spin me-2"/>}
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