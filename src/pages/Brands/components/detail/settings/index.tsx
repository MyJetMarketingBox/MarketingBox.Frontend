import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { updateBrand } from "../../../../../store/brands/profile/actions";
import { clearIntegrations, getIntegrations } from "../../../../../store/integrations/actions";
import Select from "../../../../../components/UI/select";
import { IntegrationTypeEnum } from "../../../../../enums/IntegrationTypeEnum";


export default (props: any) => {
  const { brand } = props
  const dispatch = useDispatch();

  const [integrationType, setIntegrationType] = useState(brand.integrationType);
  const [brandName, setBrandName] = useState(brand.name);
  const [getIntegration, setIntegration] = useState({
    value: brand.integration?.id,
    label: brand.integration?.name
  });
  const bg = [ "bg-orange", "bg-success"];
  const bx = [ "bx-code", "bx-link-alt"];


  const { upLoaded, upLoading, integrations } = useSelector((state : any) => {
    return {
      upLoaded : state.BrandProfile.upLoaded,
      upLoading : state.BrandProfile.upLoading,
      integrations: state.Integrations.value.items,
    }
  })

  useEffect(() => {
    dispatch(getIntegrations("", { order: 1 }));
    return () => {
      dispatch(clearIntegrations())
    }
  }, []);

  const resIntegrations = integrations.map((item: any) => {
    return {
      value: item.id,
      label: item.name,
    };
  });

  const changeIntegrationType = (e: any) => {
    setIntegrationType(+e.target.value)
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
      "name": brandName,
      "integrationId": getIntegration.value,
      "integrationType": +integrationType,
      "brandPayoutIds": brandPayoutIds,
      "link": values.link || null,
      "linkParameters": (values.clickId) ? {} : null,
    }

    if(values.clickId){
      currBrand.integrationId = null;
      currBrand.linkParameters = {
        "clickId": values.clickId,
        "language": values.language || null,
        "mpC_1": values.mpC_1 || null,
        "mpC_2": values.mpC_2 || null,
        "mpC_3": values.mpC_3 || null,
        "mpC_4": values.mpC_4 || null,
      }
    }

    dispatch(updateBrand(currBrand, brand.id));
  }

  const changeName = (e: any) => {
    console.log(e.target.value);
    setBrandName(e.target.value)
  }

  return (

    <React.Fragment>

      <AvForm className="needs-validation" onValidSubmit={(
        e: any,
        values: any
      ) => {
        handleValidBrandSubmit(values);
      }}>

        <div style={{margin: '0 0 25px 0', display: "flex", justifyContent: "space-between"}}>
          <input type="text" value={brandName} className="text-input" onChange={changeName}/>

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

        {integrationType === IntegrationTypeEnum.API &&
        <Row>
          <h5 className="text-orange">Integration</h5>
          <Col md="4">
            <div className="mb-3 custom-react-select">
              <div className="react-select-descr">
                Select Integration
              </div>
              <Select
                isSearchable
                options={resIntegrations}
                onChange={setIntegration}
                value={getIntegration}
              />
            </div>
          </Col>
        </Row>
        }

        <hr />

        {integrationType === IntegrationTypeEnum.S2S &&
          <div className="row">
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
          </div>
        }

        <Row>
          <Col className="mt-4">
            <div className="text-end">
              <button
                type="submit"
                className="btn bg-orange text-white btn-width-250"
                disabled={upLoading}
              >
                {upLoading && <i className="bx bx-hourglass bx-spin me-2"/>}
                Save
              </button>
            </div>
          </Col>
        </Row>


      </AvForm>
    </React.Fragment>
  )
}