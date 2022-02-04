import React from 'react';
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
} from 'reactstrap';

import { AvForm, AvField } from "availity-reactstrap-validation"
import { AffiliateRole, AffiliateState, Currency } from "../../../common/utils/model";

/*{
  "affiliateId": 5,
  "generalInfo": {
    "username": "Test Sv",
    "password": "111eqrwsd",
    "email": "string",
    "phone": "+48222292744",
    "skype": "string",
    "zipCode": "02648",
    "role": "affiliate",
    "state": "active",
    "currency": "eur",
    "createdAt": "2021-11-11T17:23:24.683092Z",
    "apiKey": "TRDR39334"
  },
  "company": {
    "name": "FYTVY",
    "address": "string",
    "regNumber": "string",
    "vatId": "string"
  },
  "bank": {
    "beneficiaryName": "YCYTCY",
    "beneficiaryAddress": "string",
    "bankName": "string",
    "bankAddress": "string",
    "accountNumber": "string",
    "swift": "string",
    "iban": "string"
  },
  "sequence": 0
}*/


const FormAffiliate = (props: any) => {

    const { affiliateId, generalInfo, company, bank, sequence } = props.affiliate;
    const handleValidAffiliateSubmit = (values: any) => {
        console.log(values);
    }

    const bg = [ "bg-success", "bg-danger", "bg-warning" ];

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
                    <Badge className={`me-2 ${bg[generalInfo.state]}`}>{AffiliateState[generalInfo.state]}</Badge>
                </div>
                <Row>
                    <h5 className="text-orange">General Info</h5>
                    <Col md="3">
                        <FormGroup className="mb-3">
                            <Label htmlFor="validationCustom01">User name *</Label>
                            <AvField
                                name="username"
                                placeholder="User name"
                                type="text"
                                errorMessage="Enter User Name"
                                className="form-control"
                                validate={{ required: { value: true } }}
                                id="validationCustom01"
                                value={generalInfo.username}
                            />
                        </FormGroup>
                    </Col>
                    <Col md="3">
                        <FormGroup className="mb-3">
                            <Label htmlFor="validationCustomEmail">Email*</Label>
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
                            <Label htmlFor="validationCustom02">Phone</Label>
                            <AvField
                              name="phone"
                              placeholder="Last phone"
                              type="text"
                              errorMessage="Enter phone"
                              className="form-control"
                              validate={{ required: { value: true } }}
                              id="validationCustom03"
                              value={generalInfo.phone}
                            />
                        </FormGroup>
                    </Col>
                    <Col md="3">
                        <FormGroup className="mb-3">
                            <Label htmlFor="validationCustom02">Skype</Label>
                            <AvField
                              name="skype"
                              placeholder="Last skype"
                              type="text"
                              errorMessage="Enter skype"
                              className="form-control"
                              validate={{ required: { value: true } }}
                              id="validationCustom04"
                              value={generalInfo.skype}
                            />
                        </FormGroup>
                    </Col>
                    <Col md="3">
                        <FormGroup className="mb-3">
                            <AvField
                              type="select"
                              name="role"
                              className="form-select"
                              label="Role*"
                              required
                              value={generalInfo.role}
                            >
                                <option value={""}>Select role</option>
                                {AffiliateRole.map((val, i) => <option key={i} value={i} >{val}</option>)}
                            </AvField>
                        </FormGroup>
                    </Col>
                    <Col md="3">
                        <FormGroup className="mb-3">
                            <Label htmlFor="validationCustomZip">Zip Code</Label>
                            <AvField
                              name="zipCode"
                              placeholder="zip code"
                              type="text"
                              errorMessage="Enter zip code"
                              className="form-control"
                              //validate={{ required: { value: true } }}
                              id="validationCustomZip"
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
                              label="Currency *"
                              required
                              value={generalInfo.currency}
                            >
                                <option value={""}>Select currency</option>
                                {Currency.map((val, i) => {
                                    const selected = generalInfo.currency === i;
                                    return (<option key={i} value={i} selected={selected}>{val}</option>);
                                })}
                            </AvField>
                        </FormGroup>
                    </Col>
                    <Col md="3">
                        <FormGroup className="mb-3">
                            <Label htmlFor="validationCustom02">Skype</Label>
                            <AvField
                              name="skype"
                              placeholder="Last skype"
                              type="text"
                              errorMessage="Enter skype"
                              className="form-control"
                              validate={{ required: { value: true } }}
                              id="validationCustom04"
                              value={generalInfo.skype}
                            />
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
                                value={company.name}
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
                                value={company.address}
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
                                value={company.regNumber}
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
                              value={company.vatId}
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
                              value={bank.beneficiaryName}
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
                              value={bank.beneficiaryAddress}
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
                              value={bank.bankName}
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
                              value={bank.bankAddress}
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
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
                              value={bank.accountNumber}
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
                              value={bank.swift}
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
                              value={bank.iban}
                            />
                        </FormGroup>
                    </Col>
                </Row>

                <hr />
                {/*<Row>
                    <Col lg="12">
                        <FormGroup className="mb-3">
                            <div className="form-check">
                                <Input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="invalidCheck"
                                />
                                <Label
                                    className="form-check-label"
                                    htmlFor="invalidCheck"
                                >
                                    {" "}
                                    Agree to terms and conditions
                                </Label>
                            </div>
                        </FormGroup>
                    </Col>
                </Row>*/}
                <Button className="btnOrange float-end" type="submit">
                    Save
                </Button>
            </AvForm>
        </React.Fragment>
    );
}

export default FormAffiliate;