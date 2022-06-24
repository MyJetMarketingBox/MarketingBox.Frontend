import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  FormGroup,
  Label,
  Row,
  UncontrolledDropdown,
} from "reactstrap";

import { updateAffiliate } from "../../../../store/actions";

import { AvField, AvForm } from "availity-reactstrap-validation";
import { AffiliateState, Currency } from "../../../../common/utils/model";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router";

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

  useEffect(() => {
    setStateAff(generalInfo.state);
  }, [generalInfo.state]);

  const arrAffPayId = currentAffProfile.payouts.map((item: any) => item.id);

  const handleValidAffiliateSubmit = (values: any) => {
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
  };

  const changeStateAff = (e: any) => {
    setStateAff(e.target.value);
  };

  const handleBack = () => {
    history.goBack();
  };

  return (
    <React.Fragment>
      <AvForm
        className="needs-validation"
        onValidSubmit={(e: any, values: any) => {
          handleValidAffiliateSubmit(values);
        }}
      >
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
              <Label htmlFor="validationUserName">
                User Name <span className="accent-color">*</span>
              </Label>
              <AvField
                name="username"
                placeholder="User Name"
                type="text"
                errorMessage="Enter User Name"
                className="form-control"
                validate={{ required: { value: true } }}
                id="validationUserName"
                value={generalInfo.username}
              />
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup className="mb-3">
              <Label htmlFor="validationCustomEmail">
                Email <span className="accent-color">*</span>
              </Label>
              <AvField
                name="email"
                placeholder="Email"
                type="email"
                errorMessage="Enter email"
                className="form-control"
                validate={{ required: { value: true } }}
                id="validationCustomEmail"
                value={generalInfo.email}
              />
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup className="mb-3">
              <Label htmlFor="validationPhone">Phone</Label>
              <AvField
                name="phone"
                placeholder="Last phone"
                type="text"
                errorMessage="Enter phone"
                className="form-control"
                //validate={{ required: { value: true } }}
                id="validationPhone"
                value={generalInfo.phone}
              />
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup className="mb-3">
              <Label htmlFor="validationSkype">Skype</Label>
              <AvField
                name="skype"
                placeholder="Last skype"
                type="text"
                errorMessage="Enter skype"
                className="form-control"
                //validate={{ required: { value: true } }}
                id="validationSkype"
                value={generalInfo.skype}
              />
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup className="mb-3">
              <Label htmlFor="validationZip">Zip Code</Label>
              <AvField
                name="zipCode"
                placeholder="zip code"
                type="text"
                errorMessage="Enter zip code"
                className="form-control"
                //validate={{ required: { value: true } }}
                id="validationZip"
                value={generalInfo.zipCode}
              />
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup className="mb-3">
              <Label htmlFor="currency">
                Currency <span className="accent-color">*</span>
              </Label>
              <AvField
                type="select"
                name="currency"
                className="form-select"
                id="currency"
                required
                value={generalInfo.currency.toString()}
              >
                <option value="">Select currency</option>
                {Currency.map((val, i) => (
                  <option key={i} value={i}>
                    {val}
                  </option>
                ))}
              </AvField>
            </FormGroup>
          </Col>
        </Row>
        <hr />
        <Row>
          <h5 className="text-orange">Company</h5>
          <Col md="3">
            <FormGroup className="mb-3">
              <Label htmlFor="validationCompanyName">Company Name</Label>
              <AvField
                name="name"
                placeholder="Company Name"
                type="text"
                errorMessage=" Please provide a company name."
                className="form-control"
                //validate={{ required: { value: true } }}
                id="validationCompanyName"
                value={company?.name || ""}
              />
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup className="mb-3">
              <Label htmlFor="validationCompanyAddress">Company Address</Label>
              <AvField
                name="address"
                placeholder="Company Address"
                type="text"
                errorMessage="Please provide a company address."
                className="form-control"
                //validate={{ required: { value: true } }}
                id="validationCompanyAddress"
                value={company?.address || ""}
              />
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup className="mb-3">
              <Label htmlFor="validationCompanyRegNumber">
                Company Reg Number
              </Label>
              <AvField
                name="regNumber"
                placeholder="Company Reg Number"
                type="text"
                errorMessage=" Please provide a Company Reg Number."
                className="form-control"
                //validate={{ required: { value: true } }}
                id="validationCompanyRegNumber"
                value={company?.regNumber || ""}
              />
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup className="mb-3">
              <Label htmlFor="validationVatId">VAT ID</Label>
              <AvField
                name="vatId"
                placeholder="VAT ID"
                type="text"
                errorMessage=" Please provide a VAT ID."
                className="form-control"
                //validate={{ required: { value: true } }}
                id="validationVatId"
                value={company?.vatId || ""}
              />
            </FormGroup>
          </Col>
        </Row>
        <hr />
        <Row>
          <h5 className="text-orange">Bank</h5>
          <Col md="3">
            <FormGroup className="mb-3">
              <Label htmlFor="validationBeneficiaryName">
                Beneficiary Name
              </Label>
              <AvField
                name="beneficiaryName"
                placeholder="Beneficiary Name"
                type="text"
                errorMessage=" Please provide a Beneficiary name."
                className="form-control"
                //validate={{ required: { value: true } }}
                id="validationBeneficiaryName"
                value={bank?.beneficiaryName || ""}
              />
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup className="mb-3">
              <Label htmlFor="validationBeneficiaryAddress">
                Beneficiary Address
              </Label>
              <AvField
                name="beneficiaryAddress"
                placeholder="Beneficiary Address"
                type="text"
                errorMessage="Please provide a Beneficiary address."
                className="form-control"
                //validate={{ required: { value: true } }}
                id="validationBeneficiaryAddress"
                value={bank?.beneficiaryAddress || ""}
              />
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup className="mb-3">
              <Label htmlFor="validationBankName">Bank Name</Label>
              <AvField
                name="bankName"
                placeholder="Bank Name"
                type="text"
                errorMessage=" Please provide a Bank name."
                className="form-control"
                //validate={{ required: { value: true } }}
                id="validationBankName"
                value={bank?.name || ""}
              />
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup className="mb-3">
              <Label htmlFor="validationBankAddress">Bank Address</Label>
              <AvField
                name="bankAddress"
                placeholder="Bank Address"
                type="text"
                errorMessage="Please provide a Bank address."
                className="form-control"
                //validate={{ required: { value: true } }}
                id="validationBankAddress"
                value={bank?.address || ""}
              />
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup className="mb-3">
              <Label htmlFor="validationAccountNumber">Account Number</Label>
              <AvField
                name="accountNumber"
                placeholder="Account Number"
                type="text"
                errorMessage=" Please provide a Account Number."
                className="form-control"
                //validate={{ required: { value: true } }}
                id="validationAccountNumber"
                value={bank?.accountNumber || ""}
              />
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup className="mb-3">
              <Label htmlFor="validationSwift">Swift</Label>
              <AvField
                name="swift"
                placeholder="Swift"
                type="text"
                errorMessage="Please provide a Swift."
                className="form-control"
                //validate={{ required: { value: true } }}
                id="validationSwift"
                value={bank?.swift || ""}
              />
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup className="mb-3">
              <Label htmlFor="validationIBAN">IBAN</Label>
              <AvField
                name="iban"
                placeholder="IBAN"
                type="text"
                errorMessage=" Please provide a IBAN."
                className="form-control"
                //validate={{ required: { value: true } }}
                id="validationIBAN"
                value={bank?.iban || ""}
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

        {/*<hr />
        <Row>
          <h5 className="text-orange">Password</h5>
          <Col md="6">
            <FormGroup className="mb-3">
              <Label htmlFor="validationNewPassword">New Password</Label>
              <AvField
                name="new_password"
                placeholder="New password"
                type="password"
                errorMessage=" Please provide a new password."
                className="form-control"
                validate={{
                  minLength: {
                    value: 8,
                    errorMessage:
                      "Your name must be between 8 and 16 characters",
                  },
                  maxLength: {
                    value: 16,
                    errorMessage:
                      "Your name must be between 6 and 16 characters",
                  },
                  pattern: {
                    value: "^[A-Za-z0-9]+$",
                    errorMessage:
                      "Your name must be composed only with letter and numbers",
                  },
                }}
                id="validationNewPassword"
                value=""
                autoComplete="off"
              />
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup className="mb-3">
              <Label htmlFor="validationConfirmPassword">
                Confirm Password
              </Label>
              <AvField
                name="confirm_password"
                placeholder="Confirm Password"
                type="password"
                errorMessage="Please provide a confirm password."
                className="form-control"
                validate={{
                  minLength: {
                    value: 8,
                    errorMessage:
                      "Your name must be between 8 and 16 characters",
                  },
                  maxLength: {
                    value: 16,
                    errorMessage:
                      "Your name must be between 6 and 16 characters",
                  },
                  pattern: {
                    value: "^[A-Za-z0-9]+$",
                    errorMessage:
                      "Your name must be composed only with letter and numbers",
                  },
                  match: {
                    value: "new_password",
                    errorMessage: "Passwords must match",
                  },
                }}
                id="validationConfirmPassword"
                value=""
                autoComplete="off"
              />
            </FormGroup>
          </Col>
        </Row>*/}

        <hr />
        <Button
          className="btnOrange float-end btn-width-250"
          type="submit"
          disabled={upLoading}
        >
          {upLoading && <i className="bx bx-hourglass bx-spin me-2" />}
          Save
        </Button>
      </AvForm>
    </React.Fragment>
  );
};

export default FormAffiliate;
