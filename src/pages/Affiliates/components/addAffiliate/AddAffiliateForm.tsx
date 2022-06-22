import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Col,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  Alert,
  ModalFooter,
  Form,
} from "reactstrap";
import { addNewAffiliate } from "../../../../store/actions";
import { AffiliateState, Currency } from "../../../../common/utils/model";
import { RootStoreType } from "src/store/storeTypes";
import { AffiliateAccStatusEnum } from "src/enums/AffiliateAccStatusEnum";
import { CurrencyEnum } from "src/enums/CurrencyEnum";
import ValidationText from "src/constants/validationText";
import LabelInput from "src/components/UI/FormElements/LabelInput";
import LabelSelect from "src/components/UI/FormElements/LabelSelect";
import * as yup from "yup";
import { useFormik } from "formik";
interface AddAffValuesType {
  username: string;
  password: string;
  email: string;
  state: AffiliateAccStatusEnum;
  currency: CurrencyEnum;
}

export default ({ isOpen, toggle }: any) => {
  const dispatch = useDispatch();

  const { addAffLoading, addAffSuccess, addAffError, error } = useSelector(
    (state: RootStoreType) => {
      return {
        addAffLoading: state.Affiliates.addAffLoading,
        addAffSuccess: state.Affiliates.addAffSuccess,
        addAffError: state.Affiliates.addAffError,
        error: state.Affiliates.error,
      };
    }
  );

  const validationSchema: yup.SchemaOf<AddAffValuesType> = yup.object().shape({
    email: yup
      .string()
      .required(ValidationText.required)
      .email(ValidationText.email)
      .max(255, ValidationText.maxLength255),
    password: yup
      .string()
      .required(ValidationText.required)
      .min(8, ValidationText.shortPassword)
      .max(50, ValidationText.longPassword)
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*?[!@#$%^&*()_+<>?])[A-Za-z\d!@#$%^&*()_+<>?]{6,}$/,
        ValidationText.passwordMask
      ),
    username: yup
      .string()
      .required(ValidationText.required)
      .max(75, ValidationText.maxLength75)
      .matches(/^[a-zA-Z0-9_-]+$/, ValidationText.invalidInput),
    state: yup.number().required(ValidationText.required),
    currency: yup.number().required(ValidationText.required),
  });

  const initialValues: AddAffValuesType = {
    email: "",
    password: "",
    username: "",
    state: AffiliateAccStatusEnum.Active,
    currency: CurrencyEnum.USD,
  };

  const handleSubmitForm = () => {
    const newAffiliate = {
      generalInfo: { ...values },
    };

    dispatch(addNewAffiliate(newAffiliate));
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

  useEffect(() => {
    if (addAffSuccess) {
      toggle(false);
    }
  }, [addAffSuccess]);

  return (
    <Modal isOpen={isOpen} toggle={toggle} className="modal-dialog-centered">
      {/*addAffLoading && <Loader />*/}
      <ModalHeader toggle={toggle} tag="h4">
        Add Affiliate
      </ModalHeader>

      <Form className="custom-form" noValidate>
        <ModalBody>
          <Row form>
            <Col xs={12}>
              {error?.isError && (
                <div className="mb-3">
                  <Alert color="danger">{error?.error?.errorMessage}</Alert>
                </div>
              )}

              <LabelInput
                label="Username"
                placeholder="Enter username"
                name="username"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username.trim() || ""}
                hasError={!!(errors.username && touched.username)}
                errorText={errors.username}
              />
              <LabelInput
                label="Email"
                placeholder="Enter email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email.trim().toLowerCase() || ""}
                hasError={!!(errors.email && touched.email)}
                errorText={errors.email}
                type="email"
              />
              <LabelInput
                label="Password"
                placeholder="Enter password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password || ""}
                hasError={!!(errors.password && touched.password)}
                errorText={errors.password}
                type="password"
              />

              <LabelSelect
                value={`${values.state}`}
                name="state"
                onChange={handleChange}
                onBlur={handleBlur}
                label="Account state"
                hasError={!!(errors.state && touched.state)}
                errorText={errors.state}
              >
                {AffiliateState.map((val, i) => (
                  <option key={i} value={i}>
                    {val}
                  </option>
                ))}
              </LabelSelect>

              <LabelSelect
                value={`${values.currency}`}
                name="currency"
                onChange={handleChange}
                onBlur={handleBlur}
                label="Currency"
                hasError={!!(errors.currency && touched.currency)}
                errorText={errors.currency}
              >
                {Currency.map((val, i) => (
                  <option key={i} value={i}>
                    {val}
                  </option>
                ))}
              </LabelSelect>
            </Col>
          </Row>
        </ModalBody>

        <ModalFooter>
          <Row>
            <Col>
              <div className="text-end">
                <button
                  type="button"
                  onClick={handlerClickSubmit}
                  disabled={!isValid || addAffLoading}
                  className="btn btnOrange btn-width-250 save-user"
                >
                  {addAffLoading && (
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
