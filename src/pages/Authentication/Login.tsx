import React, { useState } from "react";
import MetaTags from "react-meta-tags";
import { Alert, Form, FormFeedback, Input, Label } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation";

// actions
import { signInAction } from "../../store/actions";

// import images
import logo from "../../assets/images/logo.svg";
import Page from "src/constants/pages";
import ValidationText from "src/constants/validationText";
import { RootStoreType } from "src/store/storeTypes";
import LabelInput from "src/components/UI/FormElements/LabelInput";

interface UserSignInCredsType {
  email: string;
  password: string;
  rememberMe: boolean;
}

const Login = () => {
  const dispatch = useDispatch();

  const { error, loading } = useSelector((store: RootStoreType) => ({
    error: store.authUser.apiError,
    loading: store.authUser.isLoading,
  }));

  const validationSchema: yup.SchemaOf<UserSignInCredsType> = yup
    .object()
    .shape({
      email: yup
        .string()
        .required(ValidationText.required)
        .email(ValidationText.email)
        .max(255, ValidationText.maxLength255),
      password: yup
        .string()
        .required(ValidationText.required)
        .min(8, ValidationText.shortPassword)
        .max(50, ValidationText.longPassword),
      rememberMe: yup.boolean().required(),
    });

  const initialValues: UserSignInCredsType = {
    email: "",
    password: "",
    rememberMe: false,
  };
  // handleValidSubmit
  const handleSubmitForm = () => {
    dispatch(signInAction(values));
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

  return (
    <React.Fragment>
      <MetaTags>
        <title>Login | TraffMe</title>
      </MetaTags>

      <div className="container-fluid">
        <div className="auth-page row">
          <div className="auth-page-form-wrapper col-12 col-lg-6">
            <div className="auth-page-form-body">
              <div className="auth-page-logo text-center">
                <Link to="/dashboard" className="d-block auth-logo">
                  <img src={logo} alt="FoxOffers" width="164" height="42" />
                </Link>
              </div>
              <div className="auth-content">
                <h5 className="auth-page-title">Welcome back</h5>
                <p className="auth-page-descr">
                  Sign in to continue to TraffMe.
                </p>
                {error ? (
                  <Alert color="danger">{`Not valid email or password`}</Alert>
                ) : null}
                <Form className="custom-form" noValidate>
                  <LabelInput
                    label="Email"
                    placeholder="Enter your email"
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
                    placeholder="Enter your password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password || ""}
                    hasError={!!(errors.password && touched.password)}
                    errorText={errors.password}
                    type="password"
                  />
                  <div className="auth-page-forgot-pass mb-3">
                    <Link to={Page.FORGOT_PASSWORD} className="">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="mb-3">
                    <Input
                      className="form-checkbox-input"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      invalid={!!(touched.rememberMe && errors.rememberMe)}
                      checked={values.rememberMe}
                      type="checkbox"
                      name="rememberMe"
                      id="terms"
                    />
                    <Label className="form-checkbox-label" for="terms">
                      Remember me
                    </Label>
                    <FormFeedback
                      valid={!(touched.rememberMe && errors.rememberMe)}
                      itemType="invalid"
                    >
                      {errors.rememberMe}
                    </FormFeedback>
                  </div>
                  <button
                    className="auth-page-btn"
                    type="button"
                    onClick={handlerClickSubmit}
                    disabled={!isValid || loading}
                  >
                    {loading ? (
                      <i className="bx bx-hourglass bx-spin me-2" />
                    ) : (
                      "Log In"
                    )}
                  </button>
                </Form>

                <div className="auth-page-form-descr text-center">
                  Don't have an account?{" "}
                  <Link to="/register" className="text-orange fw-semibold">
                    Sign up
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="auth-page-img d-none d-lg-block col-lg-6" />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
