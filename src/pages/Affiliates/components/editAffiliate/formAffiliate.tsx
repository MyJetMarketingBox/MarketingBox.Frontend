import React, { useEffect, useState } from "react";
import {
    Card,
    CardBody,
    CardHeader,
    Col,
    Row,
    FormGroup,
    Label,
    Input,
    Button,
    Badge,
    UncontrolledDropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
} from 'reactstrap';

import {
    updateAffiliate
} from "../../../../store/actions";

import { AvForm, AvField } from "availity-reactstrap-validation"
import { AffiliateRole, AffiliateState, Currency, PayoutType } from "../../../../common/utils/model";
import { useDispatch, useSelector } from "react-redux";
import 'react-toastify/dist/ReactToastify.css';


const FormAffiliate = (props: any) => {
    const dispatch = useDispatch();

    const [stateAff, setStateAff] = useState(0);
    const bg = [ "bg-success", "bg-danger", "bg-warning" ];
    const bx = [ "bx-check-double", "bx-block", "bx-error" ];

    const {upLoading, currentAffProfile} = useSelector((state: any) => {
        return {
            currentAffProfile: state.AffProfile.affProfile,
            upLoading: state.AffProfile.upLoading
        };
    });

    const { id, generalInfo, company, bank, offerAffiliates, payouts } = props.affiliate;


    useEffect(() => {
        setStateAff(generalInfo.state)
    }, [generalInfo.state])

    const arrAffPayId = currentAffProfile.payouts.map((item : any) => item.id)

    const handleValidAffiliateSubmit = (values: any) => {
        //console.log(currentAffProfile);
        const updateAff = {
            generalInfo: {
                username: values["username"] || null,
                email: values["email"] || null,
                password: values["new_password"] || generalInfo.password || null,
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
                vatId: values["vatId"] || null
            },
            bank: {
                beneficiaryName: values["beneficiaryName"] || null,
                beneficiaryAddress: values["beneficiaryAddress"] || null,
                bankName: values["bankName"] || null,
                bankAddress: values["bankAddress"] || null,
                accountNumber: values["accountNumber"] || null,
                swift: values["swift"] || null,
                iban: values["iban"] || null
            },
            affiliatePayoutIds: arrAffPayId,
        };
        //console.log(updateAff);
        dispatch(updateAffiliate(updateAff, id))
    }

    const changeStateAff = (e: any) => {
        setStateAff(e.target.value)
    }

    return (
        <React.Fragment>
            <AvForm className="needs-validation" onValidSubmit={(
              e: any,
              values: any
            ) => {
                handleValidAffiliateSubmit(values);
            }}>
                <div style={{margin: '0 0 25px 0', display: "flex", justifyContent: "space-between"}}>
                    <h4>{generalInfo.username}</h4>

                    <div>
                        <UncontrolledDropdown>
                            <DropdownToggle
                              type="button"
                              className={`btn-sm ${bg[stateAff]} waves-effect btn-label waves-light`}
                            >
                                <i className={`bx ${bx[stateAff]} label-icon`}></i>{" "}
                                {AffiliateState[stateAff]} <i className="mdi mdi-chevron-down"></i>
                            </DropdownToggle>
                            <DropdownMenu>
                                {AffiliateState.map((item, i) => {
                                    if(i !== stateAff)
                                        return <DropdownItem onClick={changeStateAff} key={i} value={i}>{item}</DropdownItem>
                                })}
                            </DropdownMenu>
                        </UncontrolledDropdown>

                    </div>
                </div>
                <Row>
                    <h5 className="text-orange">General Info</h5>
                    <Col md="3">
                        <FormGroup className="mb-3">
                            <Label htmlFor="validationUserName">User name *</Label>
                            <AvField
                                name="username"
                                placeholder="User name"
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
                            <Label htmlFor="validationCustomEmail">Email *</Label>
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
                            <AvField
                              type="select"
                              name="currency"
                              className="form-select"
                              id="currency"
                              label="Currency *"
                              required
                              value={generalInfo.currency.toString()}
                            >
                                <option value="">Select currency</option>
                                {Currency.map((val, i) => <option key={i} value={i} >{val}</option>)}
                            </AvField>
                        </FormGroup>
                    </Col>
                </Row>
                <hr />
                <Row>
                    <h5 className="text-orange">Company</h5>
                    <Col md="3">
                        <FormGroup className="mb-3">
                            <Label htmlFor="validationCompanyName">Company name</Label>
                            <AvField
                                name="name"
                                placeholder="Company name"
                                type="text"
                                errorMessage=" Please provide a company name."
                                className="form-control"
                                //validate={{ required: { value: true } }}
                                id="validationCompanyName"
                                value={company?.name || ''}
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
                                value={company?.address || ''}
                            />
                        </FormGroup>
                    </Col>
                    <Col md="3">
                        <FormGroup className="mb-3">
                            <Label htmlFor="validationCompanyRegNumber">Company Reg Number</Label>
                            <AvField
                                name="regNumber"
                                placeholder="Company Reg Number"
                                type="text"
                                errorMessage=" Please provide a Company Reg Number."
                                className="form-control"
                                //validate={{ required: { value: true } }}
                                id="validationCompanyRegNumber"
                                value={company?.regNumber || ''}
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
                              value={company?.vatId || ''}
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <hr />
                <Row>
                    <h5 className="text-orange">Bank</h5>
                    <Col md="3">
                        <FormGroup className="mb-3">
                            <Label htmlFor="validationBeneficiaryName">Beneficiary name</Label>
                            <AvField
                              name="beneficiaryName"
                              placeholder="Beneficiary name"
                              type="text"
                              errorMessage=" Please provide a Beneficiary name."
                              className="form-control"
                              //validate={{ required: { value: true } }}
                              id="validationBeneficiaryName"
                              value={bank?.beneficiaryName || ''}
                            />
                        </FormGroup>
                    </Col>
                    <Col md="3">
                        <FormGroup className="mb-3">
                            <Label htmlFor="validationBeneficiaryAddress">Beneficiary Address</Label>
                            <AvField
                              name="beneficiaryAddress"
                              placeholder="Beneficiary Address"
                              type="text"
                              errorMessage="Please provide a Beneficiary address."
                              className="form-control"
                              //validate={{ required: { value: true } }}
                              id="validationBeneficiaryAddress"
                              value={bank?.beneficiaryAddress || ''}
                            />
                        </FormGroup>
                    </Col>
                    <Col md="3">
                        <FormGroup className="mb-3">
                            <Label htmlFor="validationBankName">Bank name</Label>
                            <AvField
                              name="bankName"
                              placeholder="Bank name"
                              type="text"
                              errorMessage=" Please provide a Bank name."
                              className="form-control"
                              //validate={{ required: { value: true } }}
                              id="validationBankName"
                              value={bank?.bankName || ''}
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
                              value={bank?.bankAddress || ''}
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
                              value={bank?.accountNumber || ''}
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
                              value={bank?.swift || ''}
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
                              value={bank?.iban || ''}
                            />
                        </FormGroup>
                    </Col>
                </Row>

                {generalInfo.apiKey &&
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
                }

                <hr />
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
                                  minLength: {value: 8, errorMessage: 'Your name must be between 8 and 16 characters'},
                                  maxLength: {value: 16, errorMessage: 'Your name must be between 6 and 16 characters'},
                                  pattern: {value: '^[A-Za-z0-9]+$', errorMessage: 'Your name must be composed only with letter and numbers'},
                              }}
                              id="validationNewPassword"
                              value=""
                              autoComplete="off"
                            />
                        </FormGroup>
                    </Col>
                    <Col md="6">
                        <FormGroup className="mb-3">
                            <Label htmlFor="validationConfirmPassword">Confirm Password</Label>
                            <AvField
                              name="confirm_password"
                              placeholder="Confirm Password"
                              type="password"
                              errorMessage="Please provide a confirm password."
                              className="form-control"
                              validate={{
                                  minLength: {value: 8, errorMessage: 'Your name must be between 8 and 16 characters'},
                                  maxLength: {value: 16, errorMessage: 'Your name must be between 6 and 16 characters'},
                                  pattern: {value: '^[A-Za-z0-9]+$', errorMessage: 'Your name must be composed only with letter and numbers'},
                                  match: {value:'new_password', errorMessage: 'Passwords must match'}
                              }}
                              id="validationConfirmPassword"
                              value=""
                              autoComplete="off"
                            />
                        </FormGroup>
                    </Col>
                </Row>

                <hr />
                <Button className="btnOrange float-end" type="submit" disabled={upLoading}>
                    {upLoading && <i className="bx bx-hourglass bx-spin me-2" />}
                    Save
                </Button>
            </AvForm>
        </React.Fragment>
    );
}

export default FormAffiliate;
