import React, { useEffect, useState } from "react";
import { Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";
import { AvForm } from "availity-reactstrap-validation";
//import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { clearBrandPayouts, getBrandPayouts } from "../../../../../../store/brandPayouts/actions";
import { updateBrand } from "../../../../../../store/brands/profile/actions";
import Select from "../../../../../../components/UI/select";

export default ({ isOpen, toggle }: any) => {
  const dispatch = useDispatch();

  const [selectPayouts, setSelectPayouts] = useState([])
  //const [modalStandard, setModalStandard] = useState(isOpen);

  const { payoutsList, brand, loadingPayouts, upLoadingBrand, upLoadedBrand} = useSelector((state: any) => {
    return{
      payoutsList: state.BrandPayouts.brandPayouts.items,
      loadingPayouts: state.BrandPayouts.loading,
      brand: state.BrandProfile.brand,
      upLoadingBrand: state.BrandProfile.upLoading,
      upLoadedBrand: state.BrandProfile.upLoaded
    }
  })

  let filter = { order: 1 };

  useEffect(() => {
    dispatch(getBrandPayouts("", filter))
    return () => {
      dispatch(clearBrandPayouts())
    }
  }, []);

  // useEffect(() => {
  //   if(upLoadedBrand) {
  //     setModalStandard(!modalStandard)
  //   }
  // }, [upLoadedBrand])
  //
  // useEffect(() => {
  //   setModalStandard(isOpen);
  // }, [isOpen])

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
                <div className="mb-3 custom-react-select">
                  <div className="react-select-descr">
                    Select Brand
                  </div>
                  <Select
                    isMulti
                    isSearchable
                    isLoading={loadingPayouts}
                    options={resBrandPayoutsList}
                    onChange={setSelectPayouts}
                    rules={{ required: 'Please select an option'}}
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
                  className="btn btnOrange"
                  disabled={upLoadingBrand}
                >
                  {upLoadingBrand && <i className="bx bx-hourglass bx-spin me-2"/>}
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