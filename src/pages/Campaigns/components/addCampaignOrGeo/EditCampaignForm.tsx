import { useDispatch, useSelector } from "react-redux";
import { Col, Row, Modal, ModalHeader, ModalBody, Form, ModalFooter } from "reactstrap";
import { AvField, AvForm } from "availity-reactstrap-validation";
import { addCampaign, editCampaign } from "../../../../store/campaigns/actions";
import { CampaignTabsEnum } from "src/enums/CampaignTabsEnum";
import React, { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import { addGeo, getGeo } from "src/store/actions";
import { RootStoreType } from "src/store/storeTypes";
import * as yup from "yup";
import ValidationText from "../../../../constants/validationText";
import { useFormik } from "formik";
import LabelInput from "../../../../components/UI/FormElements/LabelInput";

interface Props {
  isOpen: boolean;
  toggle: () => void;
  data: any;
}

interface IFormValues {
  name: string;
}

const EditCampaignForm = ({ data, isOpen, toggle }: Props) => {
  const dispatch = useDispatch();

  //const [name, setName] = useState(data.name);

  const validationSchema: yup.SchemaOf<IFormValues> = yup.object().shape({
    name: yup.string()
      .min(1, ValidationText.minLength1)
      .max(75, ValidationText.maxLength75)
      .matches(/^[a-zA-Z0-9_-]+$/, ValidationText.usernameMask)
      .required(ValidationText.required),
  });

  const initialValues = useCallback((): IFormValues => {
    return {
      name: data.name,
    }
  }, [data]);


  // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   setName(e.target.value);
  // };

  const handleSubmitForm = () => {
    dispatch(
      editCampaign({
        id: data.id,
        "name": values.name,
      })
    );

    toggle();
  };

  const {
    values,
    validateForm,
    handleChange,
    submitForm,
    handleBlur,
    errors,
    touched,
    isValid,
    resetForm,
    setFieldValue
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

  return (
    <Modal isOpen={isOpen} toggle={toggle} centered>
      {/*<AvForm onValidSubmit={handleValidSubmit}>*/}
      <Form className="needs-validation">
        <ModalHeader toggle={toggle} tag="h4">
          Edit Campaign
        </ModalHeader>
        <ModalBody>
          <Row form>
            <Col xs={12}>
              <div className="mb-3">
                <LabelInput
                  label="Name*"
                  placeholder="Name*"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name || ""}
                  hasError={!!(errors.name && touched.name)}
                  errorText={errors.name}
                />
              </div>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Row>
            <Col>
              <div className="d-flex">
                <button
                  type="button"
                  className="btn btnOrange"
                  onClick={handlerClickSubmit}
                  disabled={!isValid}
                >
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

export default EditCampaignForm;
