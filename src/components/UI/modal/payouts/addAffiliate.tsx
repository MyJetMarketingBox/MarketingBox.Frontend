import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Col, Form, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";
import { Currency, PayoutType } from "../../../../common/utils/model";
import { clearGeo, getGeo } from "../../../../store/geo/actions";
import Select from "../../../../components/UI/select";
import { addAffPayouts, addPayout, updatePayout } from "../../../../store/affiliatePayouts/actions";
import * as yup from "yup";
import { useFormik } from "formik";
import ValidationText from "../../../../constants/validationText";
import LabelInput from "../../FormElements/LabelInput";
import LabelSelect from "../../FormElements/LabelSelect";

interface AddAffPayouts {
  name: string,
  amount: number,
  payoutType: number,
  currency: number,
  geoId: number
}

export default ({ isOpen, toggle, isAff, payoutId }: any) => {
  const dispatch = useDispatch();

  const { geo, loadingGeoList, loadedGeoList, loadingItem, loadedItem, affiliate, selectedPayout, loadingUpdate, loadedUpdate} = useSelector((state:any) => {
    return {
      geo: state.Geo.geo.items,
      loadingGeoList: state.Geo.loading,
      loadedGeoList: state.Geo.loaded,
      loadingItem: state.AffPayouts.loadingItem,
      loadedItem: state.AffPayouts.loadedItem,
      affiliate: state.AffProfile.affProfile,
      selectedPayout: state.AffPayouts.affPayouts.items.find((item: any) => item.id == payoutId ),
      loadingUpdate: state.AffPayouts.loadingUpdate,
      loadedUpdate: state.AffPayouts.loadedUpdate,
    }
  })

  const validationSchema: yup.SchemaOf<AddAffPayouts> = yup
    .object()
    .shape({
      name: yup.string()
        .required(ValidationText.required)
        .max(75, ValidationText.maxLength75)
        .matches(/^[a-zA-Z0-9_-]+$/, ValidationText.invalidInput),
      amount: yup.number()
        .integer("Must be more than 0")
        .required(ValidationText.required),
      payoutType: yup.number().required(ValidationText.required),
      currency: yup.number().required(ValidationText.required),
      geoId: yup.number().required(ValidationText.required),
    });

  const initialValues = useCallback(():AddAffPayouts => (
    {
      name: selectedPayout?.name || "",
      amount: selectedPayout?.amount || "",
      payoutType: (selectedPayout?.payoutType >= 0)
        ? selectedPayout?.payoutType : "",
      currency: 0,
      geoId: selectedPayout?.geo?.id || null
    }
  ), [selectedPayout]);

  const handleSubmitForm = () => {
    const payout = {
      name: values.name,
      amount: +values.amount,
      payoutType: +values.payoutType,
      currency: +values.currency,
      geoId: values.geoId
    }

    if(payoutId > 0 ){
      dispatch(updatePayout(payout, payoutId))
    }else{
      isAff
        ? dispatch(addAffPayouts(payout, affiliate))
        : dispatch(addPayout(payout));
    }
  }

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
    initialValues: initialValues(),
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

  useEffect(() => {
    dispatch(getGeo('', { order: 1 }))
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
    console.log(selectedPayout);
  }, [selectedPayout])

  useEffect(() => {
    if((!loadingUpdate && loadedUpdate) || (!loadingItem && loadedItem)){
      close();
    }
  }, [loadingUpdate, loadedUpdate, loadingItem, loadedItem])

  const close = () => {
    toggle(false);
    resetForm();
  };

  const handleChangeSelect = (name: string, value: any) => {
    setFieldValue(name, value.value)
  }

  return (
    <Modal isOpen={isOpen} toggle={() => close()} className="modal-dialog-centered">
      <ModalHeader toggle={() => close()} tag="h4">
        {payoutId ? 'Change' : 'Add'} Payout
      </ModalHeader>
      <Form>
        <ModalBody>
          <Row form>
            <Col xs={12}>
              <Row>
                <Col lg={9}>
                  <div className="mb-3">
                    <LabelInput
                      label="Name*"
                      placeholder="Enter name"
                      name="name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name.trim().replace(/\s/g, "") || ""}
                      hasError={!!(errors.name && touched.name)}
                      errorText={errors.name}
                    />
                  </div>
                </Col>
                <Col lg={3}>
                  <div className="mb-3">
                    <LabelInput
                      label="Amount*"
                      placeholder="Amount*"
                      name="amount"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={`${values.amount}`}
                      hasError={!!(errors.amount && touched.amount)}
                      errorText={errors.amount}
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col lg={6}>
                  <div className="mb-3">
                    <LabelSelect
                      name="payoutType"
                      label="Payout Type*"
                      value={`${values.payoutType}`}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      hasError={!!(errors.payoutType && touched.payoutType)}
                      errorText={errors.payoutType}
                    >
                      <option value="">Select payout type*</option>
                      {PayoutType.map((val, i) =>
                        <option key={i} value={i}>{val.label}</option>
                      )}
                    </LabelSelect>
                  </div>
                </Col>
                <Col lg={6}>
                  <div className="mb-3">
                    <LabelSelect
                      name="currency"
                      label="Currency*"
                      value={`${values.currency}`}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      hasError={!!(errors.currency && touched.currency)}
                      errorText={errors.currency}
                    >
                      <option value="">Select currency*</option>
                      {Currency.map((val, i) => <option key={i} value={i}>{val}</option>)}
                    </LabelSelect>
                  </div>
                </Col>
              </Row>

              <div className="mb-3 custom-react-select">
                <Select
                  isSearchable
                  label="GEO*"
                  placeholder="Select GEO *"
                  isLoading={loadingGeoList}
                  options={geoList}
                  onChange={(value: any) => handleChangeSelect("geoId", value)}
                  value={geoList.find((item: any) => item.value === values.geoId)}
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
                  className="btn btnOrange btn-width-250"
                  onClick={handlerClickSubmit}
                  disabled={loadingItem || loadingUpdate || !isValid}
                >
                  {(loadingItem || loadingUpdate) && <i className="bx bx-hourglass bx-spin me-2"/>}
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
