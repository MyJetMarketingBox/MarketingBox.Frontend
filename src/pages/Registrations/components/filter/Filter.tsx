import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import SelectTypeSearch from "../../../../components/UI/simpleSearch/SelectTypeSearch";
import s from "../filter/FilterReg.module.scss";
import {
  clearRegistrations,
  getRegistrations,
} from "../../../../store/registrations/actions";
import { RegistrationStatus, ReportType } from "../../../../common/utils/model";

import { Col, Collapse, Row } from "reactstrap";
import { AvField, AvForm } from "availity-reactstrap-validation";
import Select from "../../../../components/UI/select";
import {
  clearAffiliate,
  getAffiliates,
} from "../../../../store/affiliates/actions";
import {
  clearCountries,
  getCountries,
} from "../../../../store/countries/actions";
import { clearBrands, getBrands } from "../../../../store/brands/actions";
import {
  clearIntegrations,
  getIntegrations,
} from "../../../../store/integrations/actions";
import {
  clearCampaigns,
  getCampaigns,
} from "../../../../store/campaigns/actions";
import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";
import SearchRegistration from "../search";
import { getUpdateDate } from "src/helpers/getUpdateDate";

export default () => {
  const dispatch = useDispatch();

  const [collapse, setCollapse] = useState(false);
  const [countFilter, setCountFilter] = useState<any>();

  const [selectAff, setSelectAff] = useState([]);
  const [selectCountry, setSelectCountry] = useState([]);
  const [selectBrand, setSelectBrand] = useState([]);
  const [selectIntegr, setSelectIntegr] = useState([]);
  const [selectCampaign, setSelectCampaign] = useState([]);
  const [selectStatus, setSelectStatus] = useState<any>();
  const [selectType, setSelectType] = useState<any>({
    value: 2,
    label: "All",
  })

  //const [fromDate, setFromDate] = useState(new Date(new Date().setDate(new Date().getDate() - 6)).toJSON().slice(0, 10))
  const [fromDate, setFromDate] = useState("");
  //const [toDate, setToDate] = useState(new Date().toJSON().slice(0, 10))
  const [toDate, setToDate] = useState("");
  const [dateFilter, setDateFilter] = useState(`${fromDate} to ${toDate}`);

  useEffect(() => {
    let count = 0;

    selectAff.length > 0 ? (count += 1) : null;
    selectCountry.length > 0 ? (count += 1) : null;
    selectBrand.length > 0 ? (count += 1) : null;
    selectIntegr.length > 0 ? (count += 1) : null;
    selectCampaign.length > 0 ? (count += 1) : null;
    selectStatus ? (count += 1) : null;
    selectType ? (count += 1) : null;
    fromDate || toDate ? (count += 1) : null;

    setCountFilter(count);
  });

  const {
    theme,
    affiliates,
    loadingAffList,
    countries,
    loadingCountries,
    brands,
    loadingBrandList,
    integrations,
    loadingIntegrList,
    campaigns,
    loadingCampaigns,
    loadingRegistration,
  } = useSelector((state: any) => {
    return {
      theme: state.Layout.layoutMode,
      affiliates: state.Affiliates.affiliates.items,
      loadingAffList: state.Affiliates.loading,
      countries: state.Countries.value.items,
      loadingCountries: state.Countries.loading,
      brands: state.Brands.brands.items,
      loadingBrandList: state.Brands.loading,
      integrations: state.Integrations.value.items,
      loadingIntegrList: state.Integrations.loading,
      campaigns: state.Campaigns.campaigns.items,
      loadingCampaigns: state.Campaigns.loading,
      loadingRegistration: state.Registrations.loading,
    };
  });

  const filter = {
    order: 1,
    limit: 50,
  };

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

  const toggleCollapse = () => {
    setCollapse(!collapse);
  };

  const affiliateList = affiliates.map((item: any) => {
    return {
      value: item.id,
      label: item.generalInfo.username,
    };
  });

  const brandList = brands.map((item: any) => {
    return {
      value: item.id,
      label: item.name,
    };
  });

  const integrList = integrations.map((item: any) => {
    return {
      value: item.id,
      label: item.name,
    };
  });

  const countriesList = countries.map((item: any) => {
    return {
      value: item.id,
      label: item.name,
    };
  });

  const campaignList = campaigns.map((item: any) => {
    return {
      value: item.id,
      label: item.name,
    };
  });

  const statusList = RegistrationStatus.map((item: any, idx: number) => {
    return {
      value: idx,
      label: item,
    };
  });

  const typeList = ReportType.map((item: any, idx: number) => {
    return {
      value: idx,
      label: item,
    };
  })

  const setDateOnFilter = (data: any) => {
    if (data.length > 1) {
      const utcFrom = data[0].getTime();
      const from = getUpdateDate(utcFrom);

      const utcTo = data[1].getTime();
      const to = getUpdateDate(utcTo);

      setFromDate(from);
      setToDate(to);
      setDateFilter(`${from} to ${to}`);
    }
  };

  console.log(selectType);
  console.log(selectStatus);
  console.log(selectCountry);

  const handleFilterSubmit = () => {
    const curFilter = {
      ...filter,
      AffiliateIds: selectAff.map((item: any) => item.value).join(","),
      CountryIds: selectCountry.map((item: any) => item.value).join(","),
      BrandIds: selectBrand.map((item: any) => item.value).join(","),
      CampaignIds: selectCampaign.map((item: any) => item.value).join(","),
      IntegrationIds: selectIntegr.map((item: any) => item.value).join(","),
      Statuses: selectStatus?.value || null,
      type: selectType?.value || null,
      DateFrom: fromDate,
      DateTo: toDate ? toDate + " 23:59:59" : null,
    };

    dispatch(clearRegistrations());
    dispatch(getRegistrations(null, curFilter));
  };

  const handleClearFilter = () => {
    setSelectAff([]);
    setDateFilter("");
    setSelectBrand([]);
    setSelectCampaign([]);
    setSelectCountry([]);
    setSelectIntegr([]);
    setSelectStatus(null);
    setSelectType({
      value: 2, label: "All",
    });
    setFromDate("");
    setToDate("");

    dispatch(clearRegistrations());
    dispatch(getRegistrations("", filter));
  };

  return (
    <>
      <Col className="col-md-4">
        <SearchRegistration />
      </Col>
      <Col className="col-md-4 offset-4 text-end">
        {collapse && (
          <button
            className="btn btn-light mr-10 fw-bold"
            type="button"
            onClick={handleClearFilter}
          >
            Clear
          </button>
        )}

        <button
          className="btn btnOrange"
          type="button"
          onClick={toggleCollapse}
        >
          {collapse ? (
            <>
              Hide filters
              {countFilter > 0 ? (
                <span className="count-white ml-10">{countFilter}</span>
              ) : (
                <i className="bx bx-filter me-1 font-size-20 icon" />
              )}
            </>
          ) : (
            <>
              Open filters
              <i className="bx bx-filter me-1 font-size-20 icon" />
            </>
          )}
        </button>
      </Col>

      <div className="accordion mt-3" id="accordion">
        <Collapse isOpen={collapse} className="accordion-collapse">
          <div className="accordion-body">
            <AvForm onValidSubmit={handleFilterSubmit}>
              <Row>
                <Col lg={3}>
                  <div className="mb-3 custom-react-select">
                    <div className="react-select-descr">Date Range</div>
                    <Flatpickr
                      className="form-control d-block"
                      placeholder="Select Date Range..."
                      options={{
                        mode: "range",
                        dateFormat: "Y-m-d",
                      }}
                      value={dateFilter}
                      onChange={setDateOnFilter}
                    />
                  </div>
                </Col>

                <Col lg={3}>
                  <div className="mb-3 custom-react-select">
                    <div className="react-select-descr">Affiliates</div>
                    <Select
                      isMulti
                      isSearchable
                      isLoading={loadingAffList}
                      options={affiliateList}
                      onChange={setSelectAff}
                      value={selectAff}
                    />
                  </div>
                </Col>

                <Col lg={3}>
                  <div className="mb-3 custom-react-select">
                    <div className="react-select-descr">Brands</div>
                    <Select
                      isMulti
                      isSearchable
                      isLoading={loadingBrandList}
                      options={brandList}
                      onChange={setSelectBrand}
                      value={selectBrand}
                    />
                  </div>
                </Col>

                <Col lg={3}>
                  <div className="mb-3 custom-react-select">
                    <div className="react-select-descr">Integrations</div>
                    <Select
                      isMulti
                      isSearchable
                      isLoading={loadingIntegrList}
                      options={integrList}
                      onChange={setSelectIntegr}
                      value={selectIntegr}
                    />
                  </div>
                </Col>
              </Row>

              <Row>
                <Col lg={3}>
                  <div className="mb-3 custom-react-select">
                    <div className="react-select-descr">Campaigns</div>
                    <Select
                      isMulti
                      isSearchable
                      isLoading={loadingCampaigns}
                      options={campaignList}
                      onChange={setSelectCampaign}
                      value={selectCampaign}
                    />
                  </div>
                </Col>

                <Col lg={3}>
                  <div className="mb-3 custom-react-select">
                    <div className="react-select-descr">Countries</div>
                    <Select
                      isMulti
                      isSearchable
                      isLoading={loadingCountries}
                      options={countriesList}
                      value={selectCountry}
                      onChange={setSelectCountry}
                    />
                  </div>
                </Col>

                <Col lg={3}>
                  <div className="mb-3 custom-react-select">
                    <div className="react-select-descr">Status</div>
                    <Select
                      options={statusList}
                      onChange={setSelectStatus}
                      value={selectStatus}
                    />
                  </div>
                </Col>

                <Col lg={3}>
                  <div className="mb-3 custom-react-select">
                    <div className="react-select-descr">Type</div>
                    <Select
                      options={typeList}
                      onChange={setSelectType}
                      value={selectType}
                    />
                  </div>
                </Col>
              </Row>

              <Row>
                <Col className="col-md-12 text-end">
                  <button
                    type="submit"
                    className="btn btnOrange"
                    disabled={loadingRegistration}
                  >
                    {loadingRegistration && (
                      <i className="bx bx-hourglass bx-spin me-2" />
                    )}
                    Search
                  </button>
                </Col>
              </Row>

            </AvForm>
          </div>
        </Collapse>
      </div>
    </>
  );
};
