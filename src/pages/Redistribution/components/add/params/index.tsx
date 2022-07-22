import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAffiliate,
  getAffiliates,
} from "../../../../../store/affiliates/actions";
import {
  clearCountries,
  getCountries,
} from "../../../../../store/countries/actions";
import { clearBrands, getBrands } from "../../../../../store/brands/actions";
import {
  clearIntegrations,
  getIntegrations,
} from "../../../../../store/integrations/actions";
import {
  clearCampaigns,
  getCampaigns,
} from "../../../../../store/campaigns/actions";
import { RedistributionFrequency } from "../../../../../common/utils/model";
import { Col, Form, Input, Label, Row } from "reactstrap";
import Select from "../../../../../components/UI/select";
import LabelInput from "../../../../../components/UI/FormElements/LabelInput";

export default ({ handleChange, handleBlur, errors, touched, values, setFieldValue }: any) => {
  const dispatch = useDispatch();

  // const [selectAff, setSelectAff] = useState<any>();
  // const [selectCampaign, setSelectCampaign] = useState<any>();
  // const [selectFrequency, setSelectFrequency] = useState<any>();
  // const [portionLimit, setPortionLimit] = useState<number>();
  // const [dayLimit, setDayLimit] = useState<number>();
  // const [useAutologin, setUseAutologin] = useState<boolean>(false);
  // const [nameRedistribution, setNameRedistribution] = useState<string>("");

  const { affiliates, loadingAffList, campaigns, loadingCampaigns } =
    useSelector((state: any) => {
      return {
        affiliates: state.Affiliates.affiliates.items,
        loadingAffList: state.Affiliates.loading,
        campaigns: state.Campaigns.campaigns.items,
        loadingCampaigns: state.Campaigns.loading,
      };
    });

  /*useEffect(() => {
    /!*if(!affiliates.length) {
      dispatch(getAffiliates("", { order: 1 }));
    }
    if(!affiliates.length) {
      dispatch(getCountries("", { order: 0 }));
    }
    if(!affiliates.length) {
      dispatch(getBrands("", { order: 1 }));
    }
    if(!affiliates.length) {
      dispatch(getIntegrations("", { order: 1 }));
    }
    if(!affiliates.length) {
      dispatch(getCampaigns("", { order: 1 }));
    }*!/

    return () => {
      /!*dispatch(clearAffiliate());
      dispatch(clearBrands());
      dispatch(clearCampaigns());
      dispatch(clearIntegrations());
      dispatch(clearCountries());*!/
    };
  }, []);*/

  const affiliateList = affiliates.map((item: any) => {
    return {
      value: item.id,
      label: item.generalInfo.username,
    };
  });

  const campaignList = campaigns.map((item: any) => {
    return {
      value: item.id,
      label: item.name,
    };
  });

  const frequencyList = RedistributionFrequency.map(
    (item: any, idx: number) => {
      return {
        value: idx,
        label: item,
      };
    }
  );

  const handleChangeSelect = (name: string, value: any) => {
    setFieldValue(name, value.value)
  }

  return (
    <div className="mb-3 row">
      <h5>
        <label htmlFor="basicpill-firstname-input" className="form-label">
          Enter the params of the Redistribution Transaction
        </label>
      </h5>

      <Form className="custom-form" >
        <Row>
          <Col lg={4}>
            <LabelInput
              label="Name *"
              placeholder="Enter Name *"
              name="name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name.trim() || ""}
              hasError={!!(errors.name && touched.name)}
              errorText={errors.name}
            />
          </Col>

          <Col lg={4}>
            <div className="mb-3 custom-react-select">
              <Select
                isSearchable
                isLoading={loadingAffList}
                options={affiliateList}
                onChange={(value: any) => handleChangeSelect("affiliateId", value)}
                //value={selectAff}
                placeholder="Affiliates *"
              />
            </div>
          </Col>

          <Col lg={4}>
            <div className="mb-3 custom-react-select">
              <Select
                isSearchable
                isLoading={loadingCampaigns}
                options={campaignList}
                onChange={(value: any) => handleChangeSelect("campaignId", value)}
                //value={selectCampaign}
                placeholder="Campaigns *"
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col lg={3}>
            <div className="mb-3 custom-react-select">
              <Select
                options={frequencyList}
                onChange={(value: any) => handleChangeSelect("frequency", value)}
                //value={selectFrequency}
                placeholder="Status *"
              />
            </div>
          </Col>

          <Col lg={3}>
            <LabelInput
              label="Portion Limit *"
              placeholder="Enter Portion Limit *"
              name="portionLimit"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.portionLimit.trim() || ""}
              hasError={!!(errors.portionLimit && touched.portionLimit)}
              errorText={errors.portionLimit}
            />
          </Col>

          <Col lg={3}>
            <LabelInput
              label="Day Limit *"
              placeholder="Enter Day Limit *"
              name="dayLimit"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.dayLimit.trim() || ""}
              hasError={!!(errors.dayLimit && touched.dayLimit)}
              errorText={errors.dayLimit}
            />
          </Col>

          <Col lg={3}>
            <div className="react-select-descr">Autologin</div>
            <div className="square-switch mt-2">
              <Input
                type="checkbox"
                id="square-switch4"
                switch="my-orange"
                name="useAutologin"
                defaultChecked={false}
                onChange={handleChange}
              />
              <Label
                htmlFor="square-switch4"
                data-on-label="Yes"
                data-off-label="No"
              ></Label>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
