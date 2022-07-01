import MetaTags from "react-meta-tags";
import React, { useCallback, useEffect, useMemo } from "react";
import { Button, Card, CardBody, Col, Container, Form, FormGroup, Row } from "reactstrap";
//redux
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
//Import Breadcrumb
import Breadcrumb from "../../components/Common/Breadcrumb";
// actions
import { getProfile, updateProfile } from "../../store/actions";
import { RootStoreType } from "src/store/storeTypes";
import ProfileChangePassword from "./component/ProfileChangePassword";
import { avaLetters } from "../../helpers/avaLetters";
import Loader from "../../components/UI/loader";
import { Currency } from "../../common/utils/model";
import * as yup from "yup";
import { useFormik } from "formik";
import ValidationText from "../../constants/validationText";
import LabelInput from "../../components/UI/FormElements/LabelInput";
import LabelSelect from "../../components/UI/FormElements/LabelSelect";

interface AffValuesType {
  g_username: string;
  g_email: string;
  g_phone?: string | null;
  g_skype?: string | null;
  g_zipCode?: string | null;
  g_state?: number | null;
  g_currency: number;

  c_name?: string | null;
  c_address?: string | null;
  c_regNumber?: string | null;
  c_vatId?: string | null;

  b_beneficiaryName?: string | null;
  b_beneficiaryAddress?: string | null;
  b_name?: string | null;
  b_address?: string | null;
  b_accountNumber?: string | null;
  b_swift?: string | null;
  b_iban?: string | null;
}

const UserProfile = () => {
  const dispatch = useDispatch();

  const {
    error,
    authUserID,
    loading,
    loaded,
    authUserName,
    profile,
    upLoading,
    upLoaded,
  } = useSelector((state: RootStoreType) => ({
    error: state.Profile.error,
    profile: state.Profile.data,
    loading: state.Profile.loading,
    loaded: state.Profile.loaded,
    upLoading: state.Profile.upLoading,
    upLoaded: state.Profile.upLoaded,
    authUserID: state.authUser.userInfo?.["user-id"] || "",
    authUserName: state.Profile.data?.generalInfo.username || "",
  }));

  const validationSchema: yup.SchemaOf<AffValuesType> = yup.object().shape({
    g_username: yup.string()
      .required(ValidationText.required)
      .max(75, ValidationText.maxLength75)
      .matches(/^[a-zA-Z0-9_-]+$/, ValidationText.invalidInput),
    g_email: yup.string()
      .required(ValidationText.required)
      .email(ValidationText.email)
      .max(255, ValidationText.maxLength255),
    g_phone: yup.string()
      .matches(/^[1-9]{1}[0-9]{3,14}$/, ValidationText.invalidPhoneNumber).nullable(),
    g_skype: yup.string().nullable(),
    g_zipCode: yup.string().nullable(),
    g_state: yup.number().nullable(),
    g_currency: yup.number().required(ValidationText.required),

    c_name: yup.string()
      .max(75, ValidationText.maxLength75)
      .matches(/^[a-z A-Z0-9_-]+$/, ValidationText.invalidInput)
      .nullable(),
    c_address: yup.string()
      .max(75, ValidationText.maxLength75)
      .matches(/^[a-z A-Z0-9_-]+$/, ValidationText.invalidInput)
      .nullable(),
    c_regNumber: yup.string()
      .max(75, ValidationText.maxLength75)
      .matches(/^[a-z A-Z0-9_-]+$/, ValidationText.invalidInput)
      .nullable(),
    c_vatId: yup.string()
      .max(75, ValidationText.maxLength75)
      .matches(/^[a-z A-Z0-9_-]+$/, ValidationText.invalidInput)
      .nullable(),

    b_beneficiaryName: yup.string()
      .max(75, ValidationText.maxLength75)
      .matches(/^[a-z A-Z0-9_-]+$/, ValidationText.invalidInput)
      .nullable(),
    b_beneficiaryAddress: yup.string()
      .max(75, ValidationText.maxLength75)
      .matches(/^[a-z A-Z0-9_-]+$/, ValidationText.invalidInput)
      .nullable(),
    b_name: yup.string()
      .max(75, ValidationText.maxLength75)
      .matches(/^[a-z A-Z0-9_-]+$/, ValidationText.invalidInput)
      .nullable(),
    b_address:yup.string()
      .max(75, ValidationText.maxLength75)
      .matches(/^[a-z A-Z0-9_-]+$/, ValidationText.invalidInput)
      .nullable(),
    b_accountNumber: yup.string()
      .max(75, ValidationText.maxLength75)
      .matches(/^[a-z A-Z0-9_-]+$/, ValidationText.invalidInput)
      .nullable(),
    b_swift: yup.string()
      .max(75, ValidationText.maxLength75)
      .matches(/^[a-zA-Z0-9_-]+$/, ValidationText.invalidInput)
      .nullable(),
    b_iban: yup.string()
      .max(75, ValidationText.maxLength75)
      .matches(/^[A-Z{2}0-9]+$/, ValidationText.invalidInput)
      .nullable(),
  })

  const initialValues : AffValuesType = useMemo(() => {
    return {
      g_username: profile?.generalInfo?.username || "",
      g_email: profile?.generalInfo?.email || "",
      g_phone: profile?.generalInfo?.phone || "",
      g_skype: profile?.generalInfo?.skype || "",
      g_zipCode: profile?.generalInfo?.zipCode || "",
      g_state: profile?.generalInfo?.state || null,
      g_currency: profile?.generalInfo?.currency || 0,

      c_name: profile?.company?.name || "",
      c_address: profile?.company?.address || "",
      c_regNumber: profile?.company?.regNumber || "",
      c_vatId: profile?.company?.vatId || "",

      b_beneficiaryName: profile?.bank?.beneficiaryName || "",
      b_beneficiaryAddress: profile?.bank?.beneficiaryAddress || "",
      b_name: profile?.bank?.name || "",
      b_address: profile?.bank?.address || "",
      b_accountNumber: profile?.bank?.accountNumber || "",
      b_swift: profile?.bank?.swift || "",
      b_iban: profile?.bank?.iban || "",
    }
  }, [profile])

  const handleSubmitForm = () => {
    const arrAffPayId = profile?.payouts.map((item: any) => item.id);
    let generalInfo:any = {}
    let company:any = {}
    let bank:any = {}

    for (const key in values) {
      if(key.includes('g_')){
        // @ts-ignore
        generalInfo[key.slice(2)] = values[key] || null;
      }
      if(key.includes('c_')){
        // @ts-ignore
        company[key.slice(2)] = values[key] || null;
      }
      if(key.includes('b_')){
        // @ts-ignore
        bank[key.slice(2)] = values[key] || null;
      }
    }

    const updateProfileData = {
      generalInfo,
      company,
      bank,
      affiliatePayoutIds: arrAffPayId,
    };

    dispatch(updateProfile(updateProfileData, +authUserID));
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
    setFieldValue
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

  /*function handleValidSubmit(event: any, values: any) {
    const arrAffPayId = profile?.payouts.map((item: any) => item.id);

    const updateProfileData = {
      generalInfo: {
        username: values["username"] || null,
        email: values["email"] || null,
        phone: values["phone"] || null,
        skype: values["skype"] || null,
        zipCode: values["zipCode"] || null,
        currency: +values["currency"] || null,
        state: profile?.generalInfo.state,
      },
      company: {
        name: values["name"] || null,
        address: values["address"] || null,
        regNumber: values["regNumber"] || null,
        vatId: values["vatId"] || null,
      },
      bank: {
        beneficiaryName: values["beneficiaryName"] || null,
        beneficiaryAddress: values["beneficiaryAddress"] || null,
        name: values["bankName"] || null,
        address: values["bankAddress"] || null,
        accountNumber: values["accountNumber"] || null,
        swift: values["swift"] || null,
        iban: values["iban"] || null,
      },
      affiliatePayoutIds: arrAffPayId,
    };

    dispatch(updateProfile(updateProfileData, +authUserID));
  }*/

  useEffect(() => {
    if (!profile || (authUserID && +profile.id !== +authUserID)) {
      dispatch(getProfile(+authUserID));
    }
  }, []);

  return (
    <React.Fragment>
      {!loaded && loading && <Loader />}
      <div className="page-content">
        <MetaTags>
          <title>Profile | TraffMe</title>
        </MetaTags>
        <Container fluid>
          <Breadcrumb title="TraffMe" breadcrumbItem="Profile" />

          {loaded && (
            <>
              <Row>
                <Col lg="12">
                  <Card>
                    <CardBody>
                      <div className="d-flex">
                        <div className="ms-3">
                          <div className="avatar">
                            <div className="avatar_letters">
                              {avaLetters(authUserName)}
                            </div>
                          </div>
                        </div>
                        <div className="flex-grow-1 align-self-center ms-3">
                          <div className="text-muted word_break_all">
                            <h5>{profile?.generalInfo.username}</h5>
                            <p className="mb-1">{profile?.generalInfo.email}</p>
                            <p className="mb-0">Id no: #{authUserID}</p>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>

              <h4 className="card-title mb-4">Change Profile</h4>

              <Card>
                <CardBody>
                  <Form>
                    <Row>
                      <h5 className="text-orange">General Info</h5>
                      <Col md="3">
                        <FormGroup className="mb-3">
                          <LabelInput
                            label="User Name*"
                            placeholder="Enter user name"
                            name="g_username"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.g_username.trim() || ""}
                            hasError={!!(errors.g_username && touched.g_username)}
                            errorText={errors.g_username}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="3">
                        <FormGroup className="mb-3">
                          <LabelInput
                            label="Email*"
                            placeholder="Enter email"
                            name="g_email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.g_email.trim().toLowerCase() || ""}
                            hasError={!!(errors.g_email && touched.g_email)}
                            errorText={errors.g_email}
                            type="email"
                          />
                        </FormGroup>
                      </Col>
                      <Col md="3">
                        <FormGroup className="mb-3">
                          <LabelInput
                            label="Phone"
                            placeholder="Enter phone"
                            name="g_phone"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.g_phone || ""}
                            hasError={!!(errors.g_phone && touched.g_phone)}
                            errorText={errors.g_phone}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="3">
                        <FormGroup className="mb-3">
                          <LabelInput
                            label="Skype"
                            placeholder="Enter skype"
                            name="g_skype"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.g_skype || ""}
                            hasError={!!(errors.g_skype && touched.g_skype)}
                            errorText={errors.g_skype}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="3">
                        <FormGroup className="mb-3">
                          <LabelInput
                            label="Zip Code"
                            placeholder="Enter zip code"
                            name="g_zipCode"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.g_zipCode || ""}
                            hasError={!!(errors.g_zipCode && touched.g_zipCode)}
                            errorText={errors.g_zipCode}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="3">
                        <FormGroup className="mb-3">
                          <LabelSelect
                            value={`${values.g_currency}`}
                            name="g_currency"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            label="Currency*"
                            hasError={!!(errors.g_currency && touched.g_currency)}
                            errorText={errors.g_currency}
                          >
                            {Currency.map((val, i) => (
                              <option key={i} value={i}>
                                {val}
                              </option>
                            ))}
                          </LabelSelect>
                        </FormGroup>
                      </Col>
                    </Row>
                    <hr />
                    <Row>
                      <h5 className="text-orange">Company</h5>
                      <Col md="3">
                        <FormGroup className="mb-3">
                          <LabelInput
                            label="Company Name"
                            placeholder="Enter company name"
                            name="c_name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.c_name || ""}
                            hasError={!!(errors.c_name && touched.c_name)}
                            errorText={errors.c_name}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="3">
                        <FormGroup className="mb-3">
                          <LabelInput
                            label="Company Address"
                            placeholder="Enter company address"
                            name="c_address"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.c_address || ""}
                            hasError={!!(errors.c_address && touched.c_address)}
                            errorText={errors.c_address}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="3">
                        <FormGroup className="mb-3">
                          <LabelInput
                            label="Company Reg Number"
                            placeholder="Enter company reg number"
                            name="c_regNumber"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.c_regNumber || ""}
                            hasError={!!(errors.c_regNumber && touched.c_regNumber)}
                            errorText={errors.c_regNumber}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="3">
                        <FormGroup className="mb-3">
                          <LabelInput
                            label="VAT ID"
                            placeholder="Enter VAT ID"
                            name="c_vatId"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.c_vatId || ""}
                            hasError={!!(errors.c_vatId && touched.c_vatId)}
                            errorText={errors.c_vatId}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <hr />
                    <Row>
                      <h5 className="text-orange">Bank</h5>
                      <Col md="3">
                        <FormGroup className="mb-3">
                          <LabelInput
                            label="Beneficiary Name"
                            placeholder="Enter beneficiary name"
                            name="b_beneficiaryName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.b_beneficiaryName || ""}
                            hasError={!!(errors.b_beneficiaryName && touched.b_beneficiaryName)}
                            errorText={errors.b_beneficiaryName}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="3">
                        <FormGroup className="mb-3">
                          <LabelInput
                            label="Beneficiary Address"
                            placeholder="Enter beneficiary address"
                            name="b_beneficiaryAddress"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.b_beneficiaryAddress || ""}
                            hasError={!!(errors.b_beneficiaryAddress && touched.b_beneficiaryAddress)}
                            errorText={errors.b_beneficiaryAddress}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="3">
                        <FormGroup className="mb-3">
                          <LabelInput
                            label="Bank Name"
                            placeholder="Enter bank name"
                            name="b_name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.b_name || ""}
                            hasError={!!(errors.b_name && touched.b_name)}
                            errorText={errors.b_name}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="3">
                        <FormGroup className="mb-3">
                          <LabelInput
                            label="Bank Address"
                            placeholder="Enter bank address"
                            name="b_address"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.b_address || ""}
                            hasError={!!(errors.b_address && touched.b_address)}
                            errorText={errors.b_address}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup className="mb-3">
                          <LabelInput
                            label="Account Number"
                            placeholder="Enter account number"
                            name="b_accountNumber"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.b_accountNumber || ""}
                            hasError={!!(errors.b_accountNumber && touched.b_accountNumber)}
                            errorText={errors.b_accountNumber}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup className="mb-3">
                          <LabelInput
                            label="Swift"
                            placeholder="Enter swift"
                            name="b_swift"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.b_swift || ""}
                            hasError={!!(errors.b_swift && touched.b_swift)}
                            errorText={errors.b_swift}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup className="mb-3">
                          <LabelInput
                            label="IBAN"
                            placeholder="Enter IBAN"
                            name="b_iban"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.b_iban || ""}
                            hasError={!!(errors.b_iban && touched.b_iban)}
                            errorText={errors.b_iban}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <hr />

                    <Button
                      className="btnOrange float-end btn-width-250"
                      type="button"
                      disabled={upLoading || !isValid}
                      onClick={handlerClickSubmit}
                    >
                      {upLoading && (
                        <i className="bx bx-hourglass bx-spin me-2" />
                      )}
                      Update
                    </Button>
                  </Form>
                </CardBody>
              </Card>

              <ProfileChangePassword />
            </>
          )}
        </Container>
      </div>
    </React.Fragment>
  );
};

export default UserProfile;
