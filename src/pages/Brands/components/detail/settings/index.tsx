import React, { useEffect, useRef, useState } from "react";
import { AvField, AvForm } from "availity-reactstrap-validation";
import {
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  FormGroup,
  Label,
  Row,
  UncontrolledDropdown
} from "reactstrap";
import { IntegrationType } from "../../../../../common/utils/model";
import { useDispatch } from "react-redux";

export default (props: any) => {
  const { brand } = props
  const dispatch = useDispatch();

  const [integrationType, setIntegrationType] = useState(brand.integrationType);
  const bg = [ "bg-orange", "bg-success"];
  const bx = [ "bx-code", "bx-link-alt"];
  const s2s = useRef<any>();




  console.log(brand);

  const changeIntegrationType = (e: any) => {
    setIntegrationType(e.target.value)
    if(e.target.value === "1"){
      console.log(s2s);
      // @ts-ignore
      //s2s.current.classList.remove('hidden')
    }else{
      // @ts-ignore
      //s2s.current.classList.add('hidden')
    }
  }

  useEffect(() => {
    setIntegrationType(brand.integrationType)
  }, [])



  const handleValidBrandSubmit = (values: any) => {

    let brandPayoutIds = [];
    if(brand.payouts.length) {
      brandPayoutIds = brand.payouts.map((item: any) => item.id)
    }

    let currBrand = {
      "name": brand.name,
      "integrationId": values.integrationID,
      "integrationType": +integrationType,
      "brandPayoutIds": brandPayoutIds,
      "link": values.link,
      "linkParameters": {
        "clickId": values.clickId,
        "language": values.language || null,
        "mpC_1": values.mpC_1 || null,
        "mpC_2": values.mpC_2 || null,
        "mpC_3": values.mpC_3 || null,
        "mpC_4": values.mpC_4 || null,
      }
    }

    console.log(currBrand);

  }

  return (

    <React.Fragment>
      {console.log(s2s)}
      <AvForm className="needs-validation" onValidSubmit={(
        e: any,
        values: any
      ) => {
        handleValidBrandSubmit(values);
      }}>

        <div style={{margin: '0 0 25px 0', display: "flex", justifyContent: "space-between"}}>
          <h4>{brand.name}</h4>

          <div>
            <UncontrolledDropdown>
              <DropdownToggle
                type="button"
                className={`btn-sm ${bg[integrationType]} waves-effect btn-label waves-light`}
              >
                <i className={`bx ${bx[integrationType]} label-icon`}></i>{" "}
                {IntegrationType[integrationType]} <i className="mdi mdi-chevron-down"></i>
              </DropdownToggle>
              <DropdownMenu>
                {IntegrationType.map((item, i) => {
                  if(i !== integrationType)
                    return <DropdownItem onClick={changeIntegrationType} key={i} value={i}>{item}</DropdownItem>
                })}
              </DropdownMenu>
            </UncontrolledDropdown>

          </div>
        </div>

        <Row>
          <h5 className="text-orange">Integration</h5>

          <Col md="3">
            <FormGroup className="mb-3">
              <Label htmlFor="validationIntegrationName">Integration name</Label>
              <AvField
                name="integrationName"
                placeholder="Integration name"
                type="text"
                errorMessage="Enter Integration Name"
                className="form-control disabled"
                validate={{ required: { value: true } }}
                id="validationIntegrationName"
                value={brand.integration.name}
                disabled
              />
            </FormGroup>
          </Col>

          <Col md={3}>
            <FormGroup className="mb-3">
              <Label htmlFor="validationIntegrationID">Integration ID*</Label>
              <AvField
                name="integrationID"
                placeholder="Integration ID"
                type="text"
                errorMessage="Enter Integration ID"
                className="form-control"
                validate={{ required: { value: true } }}
                id="validationIntegrationID"
                value={brand.integration.id}
              />
            </FormGroup>
          </Col>

        </Row>

        <Row className="" ref={s2s} id="s2s">
          <hr className="mt-3 mb-3"/>
          <h5 className="text-orange">S2S Traffic</h5>

          <Col md={3}>
            <FormGroup className="mb-3">
              <Label htmlFor="validationLink">Link*</Label>
              <AvField
                name="link"
                placeholder="Link"
                type="text"
                errorMessage="Enter link"
                className="form-control"
                validate={{ required: { value: true } }}
                id="validationLink"
                value={brand.link}
              />
            </FormGroup>
          </Col>

          <Col md={3}>
            <FormGroup className="mb-3">
              <Label htmlFor="validationClickId">Click ID*</Label>
              <AvField
                name="clickId"
                placeholder="Click ID"
                type="text"
                errorMessage="Enter click id"
                className="form-control"
                validate={{ required: { value: true } }}
                id="validationClickId"
                value={brand.linkParameters?.clickId}
              />
            </FormGroup>
          </Col>

          <Col md={3}>
            <FormGroup className="mb-3">
              <Label htmlFor="validationLanguage">Language</Label>
              <AvField
                name="language"
                placeholder="Language"
                type="text"
                errorMessage="Enter Language"
                className="form-control"
                id="validationLanguage"
                value={brand.linkParameters?.language}
              />
            </FormGroup>
          </Col>

          <Col md={3}>
            <FormGroup className="mb-3">
              <Label htmlFor="validationMPC_1">MPC_1</Label>
              <AvField
                name="mpC_1"
                placeholder="MPC_1"
                type="text"
                errorMessage="Enter MPC_1"
                className="form-control"
                id="validationMPC_1"
                value={brand.linkParameters?.mpC_1}
              />
            </FormGroup>
          </Col>

          <Col md={4}>
            <FormGroup className="mb-3">
              <Label htmlFor="validationMPC_2">MPC_2</Label>
              <AvField
                name="mpC_2"
                placeholder="MPC_2"
                type="text"
                errorMessage="Enter MPC_2"
                className="form-control"
                id="validationMPC_2"
                value={brand.linkParameters?.mpC_2}
              />
            </FormGroup>
          </Col>

          <Col md={4}>
            <FormGroup className="mb-3">
              <Label htmlFor="validationMPC_3">MPC_3</Label>
              <AvField
                name="mpC_3"
                placeholder="MPC_3"
                type="text"
                errorMessage="Enter MPC_3"
                className="form-control"
                id="validationMPC_3"
                value={brand.linkParameters?.mpC_3}
              />
            </FormGroup>
          </Col>

          <Col md={4}>
            <FormGroup className="mb-3">
              <Label htmlFor="validationMPC_4">MPC_4</Label>
              <AvField
                name="mpC_4"
                placeholder="MPC_4"
                type="text"
                errorMessage="Enter MPC_4"
                className="form-control"
                id="validationMPC_4"
                value={brand.linkParameters?.mpC_4}
              />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col className="mt-4">
            <div className="text-end">
              <button
                type="submit"
                className="btn bg-orange text-white btn-width-250"
                //disabled={loadingItem}
              >
                {/*loadingItem && <i className="bx bx-hourglass bx-spin me-2"/>*/}
                Save
              </button>
            </div>
          </Col>
        </Row>


      </AvForm>
    </React.Fragment>
  )
}