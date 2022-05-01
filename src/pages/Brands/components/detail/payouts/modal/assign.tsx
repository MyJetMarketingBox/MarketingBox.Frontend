import React, { useEffect, useState } from "react";
import { Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import { AvForm } from "availity-reactstrap-validation";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { getBrandPayouts } from "../../../../../../store/brandPayouts/actions";
import { updateBrand } from "../../../../../../store/brands/profile/actions";

export default ({ isOpen, toggle }: any) => {
  const dispatch = useDispatch();

  const [selectPayouts, setSelectPayouts] = useState([])

  const { payoutsList, brand } = useSelector((state: any) => {
    return{
      payoutsList: state.BrandPayouts.brandPayouts.items,
      brand: state.BrandProfile.brand,
    }
  })

  let filter = { order: 1 };

  useEffect(() => {
    dispatch(getBrandPayouts("", filter))
  }, []);

  const arrBrandPayoutsId = brand.payouts.map((item:any) => item.id)

  const resBrandPayoutsList = payoutsList.filter((item: any) => {
    return !arrBrandPayoutsId.includes(item.id)
  }).map((item : any) => {
    return {
      value: item.id,
      label: item.name
    }
  })

  const handleValidBrandPayoutSubmit = (values : any) => {
    const {payouts, id, campaignRows, integration, ...currBrand} = brand;

    const resPayouts = selectPayouts.map((item: any) => {
      return item.value
    });

    const currPayouts = payouts.map((item : any) => {
      return item.id
    })

    currBrand.brandPayoutIds = [...currPayouts, ...resPayouts];
    currBrand.integrationId = integration?.id; // 16

    dispatch(updateBrand(currBrand, id))
  }

  return(
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
            handleValidBrandPayoutSubmit(values);
          }}
        >
          <Row form>
            <Col xs={12}>
              <div className="mb-3">
                <Select
                  isMulti
                  isSearchable
                  isLoading={""}
                  options={resBrandPayoutsList}
                  onChange={setSelectPayouts}
                  rules={{ required: 'Please select an option'}}
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
                  //disabled={upLoading}
                >
                  {/*upLoading &&<i className="bx bx-hourglass bx-spin me-2"/>*/}
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