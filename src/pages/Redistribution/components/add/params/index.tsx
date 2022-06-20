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
import { AvField, AvForm } from "availity-reactstrap-validation";
import { Col, Input, Label, Row } from "reactstrap";
import Select from "../../../../../components/UI/select";

export default ({ setParams }: any) => {
  const dispatch = useDispatch();

  const [selectAff, setSelectAff] = useState<any>();
  const [selectCampaign, setSelectCampaign] = useState<any>();
  const [selectFrequency, setSelectFrequency] = useState<any>();
  const [portionLimit, setPortionLimit] = useState<number>();
  const [dayLimit, setDayLimit] = useState<number>();
  const [useAutologin, setUseAutologin] = useState<boolean>(false);
  const [nameRedistribution, setNameRedistribution] = useState<string>("");

  const { affiliates, loadingAffList, campaigns, loadingCampaigns } =
    useSelector((state: any) => {
      return {
        affiliates: state.Affiliates.affiliates.items,
        loadingAffList: state.Affiliates.loading,
        campaigns: state.Campaigns.campaigns.items,
        loadingCampaigns: state.Campaigns.loading,
      };
    });

  useEffect(() => {
    dispatch(getAffiliates("", { order: 1 }));
    dispatch(getCountries("", { order: 0 }));
    dispatch(getBrands("", { order: 1 }));
    dispatch(getIntegrations("", { order: 1 }));
    dispatch(getCampaigns("", { order: 1 }));

    return () => {
      dispatch(clearAffiliate());
      dispatch(clearBrands());
      dispatch(clearCampaigns());
      dispatch(clearIntegrations());
      dispatch(clearCountries());
    };
  }, []);

  useEffect(() => {
    let data = {
      name: nameRedistribution,
      affiliateId: selectAff?.value,
      campaignId: selectCampaign?.value,
      frequency: selectFrequency?.value,
      portionLimit: portionLimit,
      dayLimit: dayLimit,
      useAutologin: useAutologin,
    };

    setParams(data);
  }, [
    selectAff,
    selectCampaign,
    selectFrequency,
    portionLimit,
    dayLimit,
    useAutologin,
    nameRedistribution,
  ]);

  const handlePortionLimit = (e: any) => {
    setPortionLimit(e.target.value.trim());
  };

  const handleDayLimit = (e: any) => {
    setDayLimit(e.target.value.trim());
  };

  const handleUseAutologin = () => {
    setUseAutologin(!useAutologin);
  };

  const handlerNameRedistribution = (e: any) => {
    setNameRedistribution(e.target.value.trim());
  };

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

  return (
    <div className="mb-3 row">
      <h5>
        <label htmlFor="basicpill-firstname-input" className="form-label">
          Enter the params of the Redistribution Transaction
        </label>
      </h5>

      <AvForm>
        <Row>
          <Col lg={4}>
            <AvField
              name="name"
              type="text"
              validate={{
                required: { value: true, errorMessage: "Please enter a name" },
                pattern: {
                  value: "^[A-Za-z0-9]+$",
                  errorMessage:
                    "Your name must be composed only with letter and numbers",
                },
                minLength: {
                  value: 6,
                  errorMessage: "Your name must be between 6 and 16 characters",
                },
                maxLength: {
                  value: 16,
                  errorMessage: "Your name must be between 6 and 16 characters",
                },
              }}
              onChange={handlerNameRedistribution}
              label="Name*"
            />
          </Col>

          <Col lg={4}>
            <div className="mb-3 custom-react-select">
              <div className="react-select-descr">Affiliates*</div>
              <Select
                isSearchable
                isLoading={loadingAffList}
                options={affiliateList}
                onChange={setSelectAff}
                value={selectAff}
              />
            </div>
          </Col>

          <Col lg={4}>
            <div className="mb-3 custom-react-select">
              <div className="react-select-descr">Campaigns*</div>
              <Select
                isSearchable
                isLoading={loadingCampaigns}
                options={campaignList}
                onChange={setSelectCampaign}
                value={selectCampaign}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col lg={3}>
            <div className="mb-3 custom-react-select">
              <div className="react-select-descr">Status*</div>
              <Select
                options={frequencyList}
                onChange={setSelectFrequency}
                value={selectFrequency}
              />
            </div>
          </Col>

          <Col lg={3}>
            <AvField
              name="portionLimit"
              type="text"
              validate={{
                required: {
                  value: true,
                  errorMessage: "Please enter a Portion Limit",
                },
                pattern: {
                  value: "^[0-9]+$",
                  errorMessage: "Your name must be composed only numbers",
                },
                minLength: {
                  value: 1,
                  errorMessage:
                    "Your name must be between 1 and 100 characters",
                },
                maxLength: {
                  value: 100,
                  errorMessage:
                    "Your name must be between 1 and 100 characters",
                },
              }}
              onChange={handlePortionLimit}
              label="Portion Limit*"
            />
          </Col>

          <Col lg={3}>
            <AvField
              name="dayLimit"
              type="text"
              validate={{
                required: {
                  value: true,
                  errorMessage: "Please enter a Portion Limit",
                },
                pattern: {
                  value: "^[0-9]+$",
                  errorMessage: "Your name must be composed only numbers",
                },
                minLength: {
                  value: 1,
                  errorMessage:
                    "Your name must be between 1 and 100 characters",
                },
                maxLength: {
                  value: 100,
                  errorMessage:
                    "Your name must be between 1 and 100 characters",
                },
              }}
              onChange={handleDayLimit}
              label="Day Limit*"
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
                defaultChecked={useAutologin}
                onChange={handleUseAutologin}
              />
              <Label
                htmlFor="square-switch4"
                data-on-label="Yes"
                data-off-label="No"
              ></Label>
            </div>
          </Col>
        </Row>
      </AvForm>
    </div>
  );
};
