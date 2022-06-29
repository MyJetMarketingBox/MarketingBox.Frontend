import React, { useEffect, useState } from "react";
import { Col, Form, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { clearIntegrations, getIntegrations } from "../../../../store/integrations/actions";
import { addBrand } from "../../../../store/brands/actions";
import { useHistory } from "react-router-dom";
import Select from "../../../../components/UI/select";
import ValidationText from "../../../../constants/validationText";
import LabelInput from "../../../../components/UI/FormElements/LabelInput";
import * as yup from "yup";
import { useFormik } from "formik";

interface AddBrandType {
  name: string;
  integrationId: number;
}

export default ({ isOpen, toggle }: any) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { integrations, upLoadingBrand, addLoaded, loadingIntegration } = useSelector(
    (state: any) => {
      return {
        integrations: state.Integrations.value.items,
        loadingIntegration: state.Integrations.loading,
        upLoadingBrand: state.Brands.addBrandsLoading,
        addLoaded: state.Brands.addBrandsLoaded,
      };
    }
  );

  const validationSchema: yup.SchemaOf<AddBrandType> = yup
    .object()
    .shape({
      name: yup
        .string()
        .required(ValidationText.required)
        .min(1, ValidationText.minLength1)
        .max(75, ValidationText.maxLength255),
      integrationId: yup.number().required(ValidationText.integrationId),
    });

  const initialValues: AddBrandType = {
    name: "",
    integrationId: 0,
  };

  const handleSubmitForm = () => {
    const sendBrand = {
      name: values.name,
      integrationType: 0,
      integrationId: +values.integrationId,
    };

    dispatch(addBrand(sendBrand, history));
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

  let filter = {
    order: 1,
  };

  useEffect(() => {
    dispatch(getIntegrations("", filter));
    return () => {
      dispatch(clearIntegrations());
    }
  }, []);

  const resIntegrations = integrations.map((item: any) => {
    return {
      value: item.id,
      label: item.name,
    };
  });

  const handleChangeSelect = (name: string, value: any) => {
    setFieldValue(name, value.value)
  }

  const close = () => {
    toggle(false);
    resetForm();
  }

  return (
    <Modal isOpen={isOpen} toggle={close} className="modal-dialog-centered">
      <Form>
        <ModalHeader toggle={close} tag="h4">
          Add Brand
        </ModalHeader>
        <ModalBody>
          <Row form>
            <Col xs={12}>
              <div className="mb-3">
                <LabelInput
                  label="Name*"
                  placeholder="Enter name"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name.replace(/\s+/g, "").trim() || ""}
                  hasError={!!(errors.name && touched.name)}
                  errorText={errors.name}
                />
              </div>

              <div className="mb-3 custom-react-select">
                <Select
                  isSearchable
                  label="Integration"
                  placeholder="Integration *"
                  isLoading={loadingIntegration}
                  options={resIntegrations}
                  onChange={(value: any) => handleChangeSelect("integrationId", value)}
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
                    className="btn btnOrange save-user"
                    onClick={handlerClickSubmit}
                    disabled={upLoadingBrand || !isValid}
                  >
                    {upLoadingBrand && (
                      <i className="bx bx-hourglass bx-spin me-2" />
                    )}
                    Save
                  </button>
                </div>
              </Col>
            </Row>
          </ModalFooter>
      </Form>
    </Modal>
  );
};
