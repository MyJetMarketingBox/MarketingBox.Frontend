import React, { useEffect, useState } from "react";
import { Col, Form, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";
import { AvForm } from "availity-reactstrap-validation";
import { useDispatch, useSelector } from "react-redux";
import { clearBrandPayouts, getBrandPayouts } from "../../../../../../store/brandPayouts/actions";
import { updateBrand } from "../../../../../../store/brands/profile/actions";
import Select from "../../../../../../components/UI/select";
import * as yup from "yup";
import { useFormik } from "formik";
import ValidationText from "../../../../../../constants/validationText";

interface AssignBrandPayouts {
  brandPayoutIds: number[];
}

export default ({ isOpen, toggle }: any) => {
  const dispatch = useDispatch();

  const { payoutsList, brand, loadingPayouts, upLoadingBrand, upLoadedBrand} = useSelector((state: any) => {
    return{
      payoutsList: state.BrandPayouts.brandPayouts.items,
      loadingPayouts: state.BrandPayouts.loading,
      brand: state.BrandProfile.brand,
      upLoadingBrand: state.BrandProfile.upLoading,
      upLoadedBrand: state.BrandProfile.upLoaded
    }
  })


  const validationSchema: yup.SchemaOf<AssignBrandPayouts> = yup
    .object()
    .shape({
      brandPayoutIds: yup.array()
        .required(ValidationText.required)
        .min(1, ValidationText.minArray1),
    });

  const initialValues: AssignBrandPayouts = {
    brandPayoutIds: [],
  };

  const handleSubmitForm = () => {
    const {payouts, id, campaignRows, integration, ...currBrand} = brand;

    const currPayouts = payouts.map((item : any) => {
      return item.id
    })

    currBrand.brandPayoutIds = [...currPayouts, ...values.brandPayoutIds];
    currBrand.integrationId = integration?.id;

    dispatch(updateBrand(currBrand, id))
  };

  let {
    values,
    validateForm,
    handleChange,
    submitForm,
    handleBlur,
    errors,
    touched,
    isValid,
    setFieldValue,
    resetForm
  } = useFormik({
    initialValues,
    onSubmit: handleSubmitForm,
    validationSchema: validationSchema,
    validateOnBlur: true,
    validateOnChange: true,
    validateOnMount: true,
  });

  const handlerClickSubmit = async () => {
    const curErrors = await validateForm();
    const curErrorsKeys = Object.keys(curErrors);
    if (curErrorsKeys.length) {
      const el = document.getElementById(curErrorsKeys[0]);
      if (el) el.focus();
    }
    submitForm();
  };

  let filter = { order: 1 };

  useEffect(() => {
    dispatch(getBrandPayouts("", filter))
    return () => {
      dispatch(clearBrandPayouts())
    }
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

  const handleChangeSelect = (name: string, value: any) => {

    const resPayouts = value.map((item: any) => {
      return item.value
    });

    setFieldValue(name, resPayouts)
  }

  useEffect(() => {
    if(upLoadedBrand){
      close();
    }
  }, [upLoadedBrand])


  /*const handleValidBrandPayoutSubmit = (values : any) => {
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
  }*/

  const close = () => {
    toggle(false);
    resetForm();
  }

  return(
    <Modal isOpen={isOpen} toggle={() => close()} centered={true}>
      <ModalHeader toggle={() => close()} tag="h4">
        Assign Payout
      </ModalHeader>
        <Form >
        <ModalBody>
            <Row form>
              <Col xs={12}>
                <div className="mb-3 mt-3 custom-react-select">
                  {/*<div className="react-select-descr">
                    Select Brand
                  </div>*/}
                  <Select
                    isMulti
                    isSearchable
                    isLoading={loadingPayouts}
                    options={resBrandPayoutsList}
                    onChange={(value: any) => handleChangeSelect("brandPayoutIds", value)}
                    placeholder="Select Brand*"
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
                  type="button"
                  className="btn btnOrange"
                  disabled={upLoadingBrand || !isValid}
                  onClick={handlerClickSubmit}
                >
                  {upLoadingBrand && <i className="bx bx-hourglass bx-spin me-2"/>}
                  Save
                </button>
              </div>
            </Col>
          </Row>
        </ModalFooter>

      </Form>
    </Modal>
  )
}