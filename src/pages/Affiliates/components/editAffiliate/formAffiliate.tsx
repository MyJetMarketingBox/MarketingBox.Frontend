import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormGroup,
  Label,
  Row,
  UncontrolledDropdown
} from "reactstrap";

import { addNewAffiliate, updateAffiliate } from "../../../../store/actions";

import { AvField, AvForm } from "availity-reactstrap-validation";
import { AffiliateState, Currency } from "../../../../common/utils/model";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router";
import { AffiliateAccStatusEnum } from "../../../../enums/AffiliateAccStatusEnum";
import { CurrencyEnum } from "../../../../enums/CurrencyEnum";
import * as yup from "yup";
import { useFormik } from "formik";
import ValidationText from "../../../../constants/validationText";
import { array } from "yup";
import LabelInput from "../../../../components/UI/FormElements/LabelInput";
import LabelSelect from "../../../../components/UI/FormElements/LabelSelect";

/*interface IAffGeneralInfo {
  username: string;
  email: string;
  phone?: string;
  skype?: string;
  zipCode?: string;
  state?: number | null;
  currency: number | null;
}
interface IAffCompany {
  name?: string;
  address?: string;
  regNumber?: string;
  vatId?: string;
}
interface IAffBank {
  beneficiaryName?: string;
  beneficiaryAddress?: string;
  name?: string;
  address?: string;
  accountNumber?: string;
  swift?: string;
  iban?: string;
}*/

interface AffValuesType {
  g_username: string;
  g_email: string;
  g_phone?: string | null;
  g_skype?: string | null;
  g_zipCode?: string | null;
  g_state?: number | null;
  g_currency: number | null;

  c_companyName?: string | null;
  c_companyAddress?: string | null;
  c_regNumber?: string | null;
  c_vatId?: string | null;

  b_beneficiaryName?: string | null;
  b_beneficiaryAddress?: string | null;
  b_bankName?: string | null;
  b_bankAddress?: string | null;
  b_accountNumber?: string | null;
  b_swift?: string | null;
  b_iban?: string | null;
}

const FormAffiliate = (props: any) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [stateAff, setStateAff] = useState(0);
  const bg = ["bg-orange", "bg-danger", "bg-warning"];
  const bx = ["bx-check-double", "bx-block", "bx-error"];

  const { upLoading, currentAffProfile } = useSelector((state: any) => {
    return {
      currentAffProfile: state.AffProfile.affProfile,
      upLoading: state.AffProfile.upLoading,
    };
  });

  const { id, generalInfo, company, bank, offerAffiliates, payouts } =
    props.affiliate;

  const arrAffPayId = currentAffProfile.payouts.map((item: any) => item.id);


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
      .matches(/^[1-9]{1}[0-9]{3,14}$/, ValidationText.invalidInput).nullable(),
    g_skype: yup.string().nullable(),
    g_zipCode: yup.string().nullable(),
    g_state: yup.number().nullable(),
    g_currency: yup.number().required(ValidationText.required),

    c_companyName: yup.string().nullable(),
    c_companyAddress: yup.string().nullable(),
    c_regNumber: yup.string().nullable(),
    c_vatId: yup.string().nullable(),

    b_beneficiaryName: yup.string().nullable(),
    b_beneficiaryAddress: yup.string().nullable(),
    b_bankName: yup.string().nullable(),
    b_bankAddress:yup.string().nullable(),
    b_accountNumber: yup.string().nullable(),
    b_swift: yup.string().nullable(),
    b_iban: yup.string().nullable(),
  })

  const initialValues: AffValuesType = {
    g_username: generalInfo.username,
    g_email: generalInfo.email,
    g_phone: generalInfo.phone,
    g_skype: generalInfo.skype,
    g_zipCode: generalInfo.zipCode,
    g_state: generalInfo.state,
    g_currency: generalInfo.currency,

    c_companyName: company?.companyName,
    c_companyAddress: company?.companyAddress,
    c_regNumber: company?.regNumber,
    c_vatId: company?.vatId,

    b_beneficiaryName: bank?.beneficiaryName,
    b_beneficiaryAddress: bank?.beneficiaryAddress,
    b_bankName: bank?.bankName,
    b_bankAddress: bank?.bankAddress,
    b_accountNumber: bank?.accountNumber,
    b_swift: bank?.swift,
    b_iban: bank?.iban,
  }

  useEffect(() => {
    setStateAff(generalInfo.state);
  }, [generalInfo.state]);

  const handleSubmitForm = () => {
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

    const updateAff = {
      generalInfo,
      company,
      bank,
      affiliatePayoutIds: arrAffPayId,
    };

    // console.log(newAffiliate);
    // debugger
    dispatch(updateAffiliate(updateAff, id));
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


  /*const handleValidAffiliateSubmit = (values: any) => {
    const updateAff = {
      generalInfo: {
        username: values["username"] || null,
        email: values["email"] || null,
        phone: values["phone"] || null,
        skype: values["skype"] || null,
        zipCode: values["zipCode"] || null,
        state: +stateAff,
        currency: +values["currency"] || null,
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

    dispatch(updateAffiliate(updateAff, id));
  };*/

  const changeStateAff = (e: any) => {
    setStateAff(e.target.value);
    setFieldValue("g_state", +e.target.value)
  };

  const handleBack = () => {
    history.goBack();
  };

  // useEffect(() => {
  //   console.log("isValid", isValid);
  //   console.log("handleChange", handleChange);
  //   console.log("values", values);
  //   console.log("err", errors);
  // },[isValid, handleChange, values, errors])

  return (
    <React.Fragment>
      <Form className="custom-form" noValidate={true}>
        <Row className="mb-3 col">
          <div className="col-xl-12 mb-3 inline-flex">
            <i className="bx bx-chevron-left font-size-20 text-orange"></i>
            <a onClick={handleBack} className="text-orange pointer">
              Back to Affiliates
            </a>
          </div>

          <div className="col-md-9">
            <h4>{generalInfo.username}</h4>
          </div>

          <div className="col-md-3 text-end">
            <div className="d-inline-block p-relative">
              <UncontrolledDropdown>
                <DropdownToggle
                  type="button"
                  className={`btn-sm ${bg[stateAff]} waves-effect btn-label waves-light`}
                >
                  <i className={`bx ${bx[stateAff]} label-icon`}></i>{" "}
                  {AffiliateState[stateAff]}{" "}
                  <i className="mdi mdi-chevron-down"></i>
                </DropdownToggle>
                <DropdownMenu>
                  {AffiliateState.map((item, i) => {
                    if (i !== stateAff)
                      return (
                        <DropdownItem
                          onClick={changeStateAff}
                          key={i}
                          value={i}
                        >
                          {item}
                        </DropdownItem>
                      );
                  })}
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
          </div>
        </Row>
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
                name="c_companyName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.c_companyName || ""}
                hasError={!!(errors.c_companyName && touched.c_companyName)}
                errorText={errors.c_companyName}
              />
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup className="mb-3">
              <LabelInput
                label="Company Address"
                placeholder="Enter company address"
                name="c_companyAddress"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.c_companyAddress || ""}
                hasError={!!(errors.c_companyAddress && touched.c_companyAddress)}
                errorText={errors.c_companyAddress}
              />
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup className="mb-3">
              <LabelInput
                label="Company Reg Number"
                placeholder="Enter company reg number"
                name="c_companyAddress"
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
                name="b_bankName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.b_bankName || ""}
                hasError={!!(errors.b_bankName && touched.b_bankName)}
                errorText={errors.b_bankName}
              />
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup className="mb-3">
              <LabelInput
                label="Bank Address"
                placeholder="Enter bank address"
                name="b_bankAddress"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.b_bankAddress || ""}
                hasError={!!(errors.b_bankAddress && touched.b_bankAddress)}
                errorText={errors.b_bankAddress}
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

        {generalInfo.apiKey && (
          <>
            <hr />
            <Row>
              <h5 className="text-orange">API Key</h5>
              <Col md="12">
                <FormGroup className="mb-3">
                  <Label htmlFor="validationAPIKey">API Key</Label>
                  <AvField
                    name="apiKey"
                    placeholder="API Key"
                    type="text"
                    errorMessage=" Please provide a API Key."
                    className="form-control"
                    //validate={{ required: { value: true } }}
                    id="validationAPIKey"
                    value={generalInfo?.apiKey}
                    disabled="disabled"
                  />
                </FormGroup>
              </Col>
            </Row>
          </>
        )}

        <hr />
        {console.log(upLoading)}
        <Button
          type="button"
          onClick={handlerClickSubmit}
          className="btnOrange float-end btn-width-250"
          disabled={!isValid || upLoading}
        >
          {upLoading && <i className="bx bx-hourglass bx-spin me-2" />}
          Save
        </Button>
      </Form>
    </React.Fragment>
  );
};

export default FormAffiliate;
