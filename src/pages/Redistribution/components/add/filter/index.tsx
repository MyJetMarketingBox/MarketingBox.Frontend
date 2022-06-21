import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAffiliate, getAffiliates } from "../../../../../store/affiliates/actions";
import { clearCountries, getCountries } from "../../../../../store/countries/actions";
import { clearBrands, getBrands } from "../../../../../store/brands/actions";
import { clearIntegrations, getIntegrations } from "../../../../../store/integrations/actions";
import { clearCampaigns, getCampaigns } from "../../../../../store/campaigns/actions";
import { getUpdateDate } from "../../../../../helpers/getUpdateDate";
import { Col, Row } from "reactstrap";
import Flatpickr from "react-flatpickr";
import { AvForm } from "availity-reactstrap-validation";
import Select from "../../../../../components/UI/select";
import { RegistrationStatus, ReportType } from "../../../../../common/utils/model";

export default ({setFilter, clearState} : any) => {
  const dispatch = useDispatch()

  const [selectAff, setSelectAff] = useState([]);
  const [selectBrand, setSelectBrand] = useState([]);
  const [selectCampaign, setSelectCampaign] = useState([]);
  const [selectCountry, setSelectCountry] = useState([]);
  const [selectStatus, setSelectStatus] = useState<any>();
  const [selectType, setSelectType] = useState<any>()
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [dateFilter, setDateFilter] = useState(`${fromDate} to ${toDate}`);


  const {
    affiliates,
    loadingAffList,
    countries,
    loadingCountries,
    brands,
    loadingBrandList,
    campaigns,
    loadingCampaigns,
  } = useSelector((state: any) => {
    return {
      affiliates: state.Affiliates.affiliates.items,
      loadingAffList: state.Affiliates.loading,
      countries: state.Countries.value.items,
      loadingCountries: state.Countries.loading,
      brands: state.Brands.brands.items,
      loadingBrandList: state.Brands.loading,
      campaigns: state.Campaigns.campaigns.items,
      loadingCampaigns: state.Campaigns.loading,
    };
  });

  useEffect(() => {
    if(!affiliates.length) {
      dispatch(getAffiliates("", { order: 1 }));
    }
    if(!countries.length) {
      dispatch(getCountries("", { order: 0 }));
    }
    if(!brands.length) {
      dispatch(getBrands("", { order: 1 }));
    }
    if(!campaigns.length) {
      dispatch(getCampaigns("", { order: 1 }));
    }

    return () => {
      /*dispatch(clearAffiliate());
      dispatch(clearBrands());
      dispatch(clearCampaigns());
      dispatch(clearCountries());*/
      clearState();
    };
  }, []);

  const affiliateList = affiliates.map((item: any) => {
    return {
      name: "affiliateIds",
      value: item.id,
      label: item.generalInfo.username,
    };
  });

  const brandList = brands.map((item: any) => {
    return {
      name: "affiliateIds",
      value: item.id,
      label: item.name,
    };
  });

  const countriesList = countries.map((item: any) => {
    return {
      name: "countryIds",
      value: item.id,
      label: item.name,
    };
  });

  const campaignList = campaigns.map((item: any) => {
    return {
      name: "campaignIds",
      value: item.id,
      label: item.name,
    };
  });

  const statusList = RegistrationStatus.map((item: any, idx: number) => {
    return {
      name: "crmStatuses",
      value: idx,
      label: item,
    };
  });

  const typeList = ReportType.map((item: any, idx: number) => {
    return {
      name: "statuses",
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

  const handleFilterSubmit = () => {
    const curFilter = {
      affiliateIds: selectAff.map((item: any) => item.value).join(","),
      countryIds: selectCountry.map((item: any) => item.value).join(","),
      brandIds: selectBrand.map((item: any) => item.value).join(","),
      campaignIds: selectCampaign.map((item: any) => item.value).join(","),
      dateFrom: fromDate ? fromDate+" 00:00:01" : null,
      dateTo: toDate ? toDate+" 23:59:59" : null,
      statuses: selectType?.value || null,
      crmStatuses: selectStatus?.value || null,
    }

    setFilter(curFilter);
  }

  useEffect(() => {
    handleFilterSubmit();
  }, [selectAff, selectBrand, selectCountry, selectCampaign, fromDate, toDate, selectStatus, selectType])

  return (
    <AvForm>
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
      </Row>

      <Row>
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
    </AvForm>
  )

}