import React from "react";
import MetaTags from "react-meta-tags";
import { Label, Input, Form, FormFeedback } from "reactstrap";
import * as yup from "yup";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
// action
import { registerUserAction } from "../../store/actions";
//redux
import { useSelector, useDispatch } from "react-redux";

// import images
import logo from "../../assets/images/logo.svg";
import ValidationText from "src/constants/validationText";
import LabelInput from "src/components/UI/FormElements/LabelInput";
import LabelSelect from "src/components/UI/FormElements/LabelSelect";
import Page from "src/constants/pages";
import { RootStoreType } from "src/store/storeTypes";

interface UserRegistrationType {
  email: string;
  username: string;
  password: string;
  message: string;
  contact: string;
  searchFrom: string;
  searchFromCustom?: string;
  terms: boolean;
}

const Register = () => {
  const dispatch = useDispatch();

  const { error, loading } = useSelector((store: RootStoreType) => ({
    error: store.authUser.apiError,
    loading: store.authUser.isLoading,
  }));

  const validationSchema: yup.SchemaOf<UserRegistrationType> = yup
    .object()
    .shape({
      email: yup
        .string()
        .required(ValidationText.required)
        .email(ValidationText.email)
        .max(255, ValidationText.maxLength255),
      username: yup
        .string()
        .required(ValidationText.required)
        .max(75, ValidationText.maxLength75)
        .matches(/^[a-zA-Z0-9_-]+$/, ValidationText.invalidInput),
      password: yup
        .string()
        .required(ValidationText.required)
        .min(8, ValidationText.shortPassword)
        .max(50, ValidationText.longPassword)
        .matches(
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*?[!@#$%^&*()_+<>?])[A-Za-z\d!@#$%^&*()_+<>?]{6,}$/,
          ValidationText.passwordMask
        ),
      message: yup.string().required(ValidationText.required),
      contact: yup
        .string()
        .required(ValidationText.required)
        .max(75, ValidationText.maxLength75),
      searchFrom: yup.string().required(ValidationText.required),
      searchFromCustom: yup.string().when(["searchFrom"], {
        is: (val: string) => val === "other",
        then: yup
          .string()
          .required(ValidationText.required)
          .max(75, ValidationText.maxLength75),
      }),
      terms: yup
        .boolean()
        .required(ValidationText.required)
        .oneOf([true], ValidationText.required),
    });

  const initialValues: UserRegistrationType = {
    email: "",
    password: "",
    username: "",
    message: "WhatsApp",
    contact: "",
    searchFrom: "",
    searchFromCustom: "",
    terms: false,
  };

  const handleSubmitForm = async () => {
    const data = {
      username: values.username,
      email: values.email.toLowerCase(),
      password: values.password,
      sub: [
        {
          SubName: "ClientType",
          SubValue: "WebMaster",
        },
        {
          SubName: "MessangerType",
          SubValue: values.message,
        },
        {
          SubName: "MessangerLogin",
          SubValue: values.contact,
        },
        {
          SubName: "HeardAboutFrom",
          SubValue: values.searchFrom,
        },
        {
          SubName: "HeardAboutFromCustom",
          SubValue: values.searchFromCustom || "",
        },
      ],
    };
    dispatch(registerUserAction(data));
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
        <title>Register | TraffMe</title>
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
                <h5 className="auth-page-title">Register account</h5>
                <p className="auth-page-descr">
                  Get your free TraffMe account now
                </p>

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
                    label="Username"
                    placeholder="Enter your username"
                    name="username"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username.trim() || ""}
                    hasError={!!(errors.username && touched.username)}
                    errorText={errors.username}
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

                  <div className="mess-types" onChange={handleChange}>
                    <div className="mess-type">
                      <input
                        className="mess-type-checkbox"
                        type="radio"
                        name="message"
                        value="WhatsApp"
                        id="wa"
                        defaultChecked
                      />
                      <label className="mess-type-checkbox-label" htmlFor="wa">
                        <span className="check" />
                        <span className="descr">WhatsApp</span>
                        <span className="icon">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M6.06494 4.56206C5.91756 4.23583 5.76239 4.2293 5.62218 4.2236C5.5075 4.2187 5.3762 4.219 5.24512 4.219C5.11393 4.219 4.90075 4.26808 4.72047 4.4641C4.54009 4.66012 4.03174 5.13399 4.03174 6.09775C4.03174 7.06162 4.73687 7.99294 4.83516 8.12374C4.93355 8.25435 6.19634 10.2954 8.19623 11.0805C9.85831 11.7331 10.1965 11.6033 10.5573 11.5706C10.9181 11.538 11.7214 11.0969 11.8854 10.6394C12.0494 10.1821 12.0494 9.79005 12.0002 9.7081C11.951 9.62647 11.8198 9.57749 11.623 9.47953C11.4262 9.38158 10.4589 8.9076 10.2785 8.8423C10.0981 8.77699 9.96696 8.74434 9.83577 8.94046C9.70459 9.13638 9.32772 9.57749 9.21293 9.7081C9.09814 9.83901 8.98335 9.85534 8.78657 9.75738C8.58979 9.65912 7.95609 9.45248 7.20433 8.78514C6.61942 8.26596 6.22452 7.62475 6.10973 7.42863C5.99494 7.23272 6.09742 7.1266 6.19613 7.02894C6.28447 6.94118 6.39291 6.80027 6.4913 6.68588C6.58948 6.57149 6.62228 6.48986 6.68787 6.35925C6.75346 6.22843 6.72067 6.11405 6.67147 6.01609C6.62228 5.91814 6.23989 4.9494 6.06494 4.56206Z"
                            />
                            <path d="M13.6033 2.29991C12.1165 0.818604 10.1394 0.00239218 8.03304 0.00146484C3.69247 0.00146484 0.160135 3.51713 0.158391 7.8384C0.157879 9.21972 0.52039 10.5681 1.20943 11.7566L0.0922852 15.8178L4.26672 14.728C5.41687 15.3525 6.71183 15.6816 8.02965 15.6821H8.033H8.03304C12.3729 15.6821 15.9057 12.1658 15.9076 7.84472C15.9083 5.75047 15.0899 3.78132 13.6033 2.29991ZM8.03304 14.3584H8.03048C6.85584 14.3578 5.70395 14.0438 4.69923 13.4503L4.46011 13.3091L1.98292 13.9558L2.64429 11.552L2.48851 11.3056C1.83329 10.2684 1.48739 9.06971 1.4879 7.83892C1.48933 4.24723 4.42527 1.32523 8.03551 1.32523C9.78379 1.32595 11.4269 2.0044 12.6627 3.23562C13.8985 4.46683 14.5785 6.10354 14.578 7.84423C14.5764 11.436 11.6404 14.3584 8.03304 14.3584Z" />
                          </svg>
                        </span>
                      </label>
                    </div>

                    <div className="mess-type">
                      <input
                        className="mess-type-checkbox"
                        type="radio"
                        name="message"
                        value="Telegram"
                        id="tg"
                      />
                      <label className="mess-type-checkbox-label" htmlFor="tg">
                        <span className="check" />
                        <span className="descr">Telegram</span>
                        <span className="icon">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM8.71677 5.71098L3.32948 7.93063C2.3815 8.30057 2.93642 8.64739 2.93642 8.64739C2.93642 8.64739 3.74567 8.92485 4.43931 9.13294C5.13295 9.34103 5.50289 9.10982 5.50289 9.10982L8.76301 6.91329C9.91908 6.12716 9.64162 6.77456 9.36416 7.05202C8.76301 7.65317 7.76879 8.60115 6.93642 9.36416C6.56648 9.68786 6.75145 9.96531 6.9133 10.104C7.3838 10.5022 8.49167 11.226 8.99533 11.5551C9.13519 11.6465 9.22846 11.7075 9.24856 11.7225C9.36416 11.815 10.0116 12.2312 10.4046 12.1387C10.7977 12.0462 10.8439 11.5144 10.8439 11.5144L11.422 7.88439C11.4733 7.54407 11.5247 7.21088 11.5726 6.90018C11.6972 6.0921 11.7983 5.43611 11.815 5.20231C11.8844 4.41618 11.052 4.73988 11.052 4.73988C11.052 4.73988 9.24856 5.47976 8.71677 5.71098Z"
                            />
                          </svg>
                        </span>
                      </label>
                    </div>

                    <div className="mess-type">
                      <input
                        className="mess-type-checkbox"
                        type="radio"
                        name="message"
                        value="Skype"
                        id="sk"
                      />
                      <label className="mess-type-checkbox-label" htmlFor="sk">
                        <span className="check" />
                        <span className="descr">Skype</span>
                        <span className="icon">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M15.4337 9.31317C15.4286 9.34129 15.4251 9.36967 15.4197 9.3978L15.3924 9.23665C15.4073 9.26173 15.4197 9.28783 15.4337 9.31317C15.5163 8.86366 15.5596 8.40352 15.5596 7.94362C15.5596 6.92375 15.3599 5.93428 14.9654 5.00283C14.5848 4.10306 14.0403 3.29502 13.346 2.60125C12.6528 1.90748 11.8442 1.36296 10.945 0.982374C10.0138 0.58836 9.02431 0.388693 8.00443 0.388693C7.52376 0.388693 7.04233 0.433795 6.57382 0.523747C6.57281 0.524 6.57154 0.524 6.57027 0.524254C6.59663 0.53819 6.62323 0.550606 6.64908 0.565049L6.49021 0.540217C6.51681 0.535149 6.54367 0.529575 6.57027 0.524254C5.92744 0.182437 5.20453 0 4.47275 0C3.27804 0 2.15479 0.465215 1.31 1.31025C0.465468 2.15504 0 3.2783 0 4.47301C0 5.23342 0.195613 5.9809 0.562768 6.64148C0.567583 6.61411 0.570877 6.58649 0.576198 6.55913L0.603563 6.71749C0.589374 6.69266 0.576958 6.66681 0.562768 6.64148C0.488273 7.06944 0.448998 7.50679 0.448998 7.94362C0.448998 8.96375 0.648666 9.95297 1.04319 10.8847C1.42326 11.7847 1.96804 12.5922 2.66156 13.286C3.35583 13.9798 4.16337 14.525 5.06365 14.9046C5.99484 15.2994 6.98456 15.4993 8.00443 15.4993C8.44837 15.4993 8.89331 15.4588 9.32761 15.3817C9.30227 15.3676 9.27643 15.3546 9.25058 15.3397L9.41199 15.3681C9.38412 15.3734 9.35599 15.3767 9.32761 15.3817C9.9968 15.7603 10.7544 15.9615 11.528 15.9615C12.7225 15.9615 13.8452 15.497 14.69 14.6517C15.535 13.8075 16 12.6839 16 11.4892C16 10.7263 15.8034 9.97628 15.4337 9.31317ZM8.03459 12.5707C5.35048 12.5707 4.14969 11.2511 4.14969 10.2621C4.14969 9.75482 4.52419 9.39932 5.04034 9.39932C6.18893 9.39932 5.89146 11.0486 8.03459 11.0486C9.13174 11.0486 9.73759 10.4529 9.73759 9.84325C9.73759 9.4766 9.55667 9.07017 8.83427 8.89204L6.44688 8.29608C4.52419 7.81389 4.17528 6.7745 4.17528 5.79745C4.17528 3.76885 6.0853 3.00717 7.87901 3.00717C9.53133 3.00717 11.4791 3.92037 11.4791 5.13738C11.4791 5.65885 11.0276 5.96215 10.5117 5.96215C9.53133 5.96215 9.71174 4.60527 7.73711 4.60527C6.75727 4.60527 6.21452 5.04895 6.21452 5.68393C6.21452 6.31765 6.98836 6.5201 7.66034 6.67315L9.42744 7.06539C11.3631 7.49665 11.8539 8.62675 11.8539 9.69122C11.8539 11.3397 10.5885 12.5707 8.03459 12.5707ZM9.25058 15.3397C9.27643 15.3546 9.30227 15.3676 9.32761 15.3817C9.35599 15.3767 9.38412 15.3734 9.41199 15.3681L9.25058 15.3397ZM15.4197 9.3978C15.4251 9.36967 15.4286 9.34129 15.4337 9.31317C15.4197 9.28783 15.4073 9.26173 15.3924 9.23665L15.4197 9.3978ZM0.576198 6.55913C0.570877 6.58649 0.567583 6.61411 0.562768 6.64148C0.576958 6.66681 0.589374 6.69266 0.603563 6.71749L0.576198 6.55913ZM6.64908 0.565049C6.62323 0.550606 6.59663 0.53819 6.57027 0.524254C6.54367 0.529575 6.51681 0.535149 6.49021 0.540217L6.64908 0.565049Z" />
                          </svg>
                        </span>
                      </label>
                    </div>
                  </div>

                  <LabelInput
                    label={values.message + ` contact`}
                    placeholder={values.message + ` contact`}
                    name="contact"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.contact || ""}
                    hasError={!!(errors.contact && touched.contact)}
                    errorText={errors.contact}
                    type="text"
                  />

                  <LabelSelect
                    value={values.searchFrom || ""}
                    name="searchFrom"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="I heard about FoxOffers from"
                    hasError={!!(errors.searchFrom && touched.searchFrom)}
                    errorText={errors.searchFrom}
                  >
                    <option value="" disabled>
                      I heard about FoxOffers from...
                    </option>
                    <option value="AffiliateFix">AffiliateFix</option>
                    <option value="AffLIFT">AffLIFT</option>
                    <option value="Affpaying">Affpaying</option>
                    <option value="Make-cash.pl">Make-cash.pl</option>
                    <option value="MyMediaAds">MyMediaAds</option>
                    <option value="OfferVault">OfferVault</option>
                    <option value="STM Forum">STM Forum</option>
                    <option value="Social Media">
                      Social Media (FB, IG, TG, Twitter, LinkedIn, Reddit,
                      Quora)
                    </option>
                    <option value="Zarabiam">Zarabiam</option>
                    <option value="Gdetraffic">Gdetraffic</option>
                    <option value="Partnerkin">Partnerkin</option>
                    <option value="AffTimes">AffTimes</option>
                    <option value="CPAMonstro">CPAMonstro</option>
                    <option value="CPA rip">CPA rip</option>
                    <option value="youpartner.pro">youpartner.pro</option>
                    <option value="Protraffic">Protraffic</option>
                    <option value="other">(other)</option>
                  </LabelSelect>

                  {values.searchFrom === "other" && (
                    <LabelInput
                      label="Other"
                      placeholder="I heard about FoxOffers from"
                      name="searchFromCustom"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.searchFromCustom || ""}
                      hasError={
                        !!(errors.searchFromCustom && errors.searchFromCustom)
                      }
                      errorText={errors.searchFromCustom}
                    />
                  )}

                  <div className="mb-3">
                    <Input
                      className="form-checkbox-input"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      invalid={!!(touched.terms && errors.terms)}
                      checked={values.terms}
                      type="checkbox"
                      name="terms"
                      id="terms"
                    />
                    <Label className="form-checkbox-label" for="terms">
                      By registering you agree to the TraffMe{" "}
                      <a href="#">Terms of Use</a>
                    </Label>
                    <FormFeedback
                      valid={!(touched.terms && errors.terms)}
                      itemType="invalid"
                    >
                      {errors.terms}
                    </FormFeedback>
                  </div>

                  <div className="mb-4">
                    <button
                      className="auth-page-btn"
                      type="button"
                      disabled={!isValid || loading}
                      onClick={handlerClickSubmit}
                    >
                      {loading ? (
                        <i className="bx bx-hourglass bx-spin me-2" />
                      ) : (
                        "Register"
                      )}
                    </button>
                  </div>
                </Form>

                <div className="auth-page-form-descr text-center">
                  Already have an account?&nbsp;
                  <Link to={Page.SIGN_IN} className="text-orange fw-semibold">
                    Log In
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

export default Register;
