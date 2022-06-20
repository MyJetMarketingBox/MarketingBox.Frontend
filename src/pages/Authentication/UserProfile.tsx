import MetaTags from "react-meta-tags";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  CardBody,
  Col,
  Container,
  FormGroup,
  Label,
  Row,
} from "reactstrap";
// availity-reactstrap-validation
import { AvField, AvForm } from "availity-reactstrap-validation";
//redux
import { useDispatch, useSelector } from "react-redux";

import { withRouter } from "react-router-dom";
//Import Breadcrumb
import Breadcrumb from "../../components/Common/Breadcrumb";
// actions
import {
  clearAffProfile,
  editProfile,
  getAffiliateProfile,
  updateAffiliate,
} from "../../store/actions";
import { RootStoreType } from "src/store/storeTypes";
import ProfileChangePassword from "./component/ProfileChangePassword";
import { avaLetters } from "../../helpers/avaLetters";
import Loader from "../../components/UI/loader";
import { Currency } from "../../common/utils/model";

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
    error: state.AffProfile.error,
    profile: state.AffProfile.affProfile,
    loading: state.AffProfile.loading,
    loaded: state.AffProfile.loaded,
    upLoading: state.AffProfile.upLoading,
    upLoaded: state.AffProfile.upLoaded,
    authUserID: state.login.userInfo?.["user-id"] || "",
    authUserName: state.login.userInfo?.["user-name"] || "",
  }));

  function handleValidSubmit(event: any, values: any) {
    const arrAffPayId = profile?.payouts.map((item: any) => item.id);

    const updateProfile = {
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

    dispatch(updateAffiliate(updateProfile, +authUserID));
  }

  useEffect(() => {
    if (authUserID) {
      dispatch(getAffiliateProfile(+authUserID));
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
                          <div className="text-muted">
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
                  <AvForm
                    className="form-horizontal"
                    onValidSubmit={(e: any, v: any) => {
                      handleValidSubmit(e, v);
                    }}
                  >
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
                            value={profile?.generalInfo.username}
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
                            value={profile?.generalInfo.email}
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
                            value={profile?.generalInfo.phone}
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
                            value={profile?.generalInfo.skype}
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
                            value={profile?.generalInfo.zipCode}
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
                            value={profile?.generalInfo.currency.toString()}
                          >
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
                          <Label htmlFor="validationCompanyName">
                            Company Name
                          </Label>
                          <AvField
                            name="name"
                            placeholder="Company Name"
                            type="text"
                            errorMessage=" Please provide a company name."
                            className="form-control"
                            //validate={{ required: { value: true } }}
                            id="validationCompanyName"
                            value={profile?.company?.name || ""}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="3">
                        <FormGroup className="mb-3">
                          <Label htmlFor="validationCompanyAddress">
                            Company Address
                          </Label>
                          <AvField
                            name="address"
                            placeholder="Company Address"
                            type="text"
                            errorMessage="Please provide a company address."
                            className="form-control"
                            //validate={{ required: { value: true } }}
                            id="validationCompanyAddress"
                            value={profile?.company?.address || ""}
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
                            value={profile?.company?.regNumber || ""}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="3">
                        <FormGroup className="mb-3">
                          <Label htmlFor="validationVatIt">VAT IT</Label>
                          <AvField
                            name="vatId"
                            placeholder="VAT IT"
                            type="text"
                            errorMessage=" Please provide a VAT IT."
                            className="form-control"
                            //validate={{ required: { value: true } }}
                            id="validationVatIt"
                            value={profile?.company?.vatId || ""}
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
                            value={profile?.bank?.beneficiaryName || ""}
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
                            value={profile?.bank?.beneficiaryAddress || ""}
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
                            value={profile?.bank?.name || ""}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="3">
                        <FormGroup className="mb-3">
                          <Label htmlFor="validationBankAddress">
                            Bank Address
                          </Label>
                          <AvField
                            name="bankAddress"
                            placeholder="Bank Address"
                            type="text"
                            errorMessage="Please provide a Bank address."
                            className="form-control"
                            //validate={{ required: { value: true } }}
                            id="validationBankAddress"
                            value={profile?.bank?.address || ""}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup className="mb-3">
                          <Label htmlFor="validationAccountNumber">
                            Account Number
                          </Label>
                          <AvField
                            name="accountNumber"
                            placeholder="Account Number"
                            type="text"
                            errorMessage=" Please provide a Account Number."
                            className="form-control"
                            //validate={{ required: { value: true } }}
                            id="validationAccountNumber"
                            value={profile?.bank?.accountNumber || ""}
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
                            value={profile?.bank?.swift || ""}
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
                            value={profile?.bank?.iban || ""}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <hr />

                    <Button
                      className="btnOrange float-end btn-width-250"
                      type="submit"
                      disabled={upLoading}
                    >
                      {upLoading && (
                        <i className="bx bx-hourglass bx-spin me-2" />
                      )}
                      Update
                    </Button>
                  </AvForm>
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

export default withRouter(UserProfile);
