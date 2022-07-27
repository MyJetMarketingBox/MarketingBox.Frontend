import React, { useEffect, useState } from "react";
import { Col, Collapse, Row } from "reactstrap";

import SearchReports from "../search";
import { AvForm } from "availity-reactstrap-validation";
import Flatpickr from "react-flatpickr";
import { getUpdateDate } from "../../../../helpers/getUpdateDate";
import { useDispatch, useSelector } from "react-redux";
import { RootStoreType } from "../../../../store/storeTypes";
import { clearAffiliate, getAffiliates } from "../../../../store/affiliates/actions";
import { clearCountries, getCountries } from "../../../../store/countries/actions";
import { clearBrands, getBrands } from "../../../../store/brands/actions";
import { clearIntegrations, getIntegrations } from "../../../../store/integrations/actions";
import Select from "../../../../components/UI/select";
import { TypeReport } from "../../../../common/utils/model";
import { clearReports, getReports } from "../../../../store/reports/actions";
import { clearOffersStore, getOffers } from "../../../../store/offers/actions";


export default ({filter}: any) => {
  const dispatch = useDispatch();

  const [collapse, setCollapse] = useState(false);
  const [countFilter, setCountFilter] = useState<number>(0);
  const [selectAff, setSelectAff] = useState([]);
  const [selectCountry, setSelectCountry] = useState([]);
  const [selectBrand, setSelectBrand] = useState([]);
  const [selectIntegr, setSelectIntegr] = useState([]);
  const [selectOffers, setSelectOffers] = useState([]);
  const [selectReportType, setSelectReportType] = useState<any>()
  const [fromDate, setFromDate] = useState<string>(filter.DateFrom);
  const [toDate, setToDate] = useState<string>(filter.DateTo);
  const [dateFilter, setDateFilter] = useState(`${fromDate} to ${toDate}`);

  const {affiliates, loadingAffList, brands, loadingBrandList, countries, loadingCountries, integrations, loadingIntegrList, offers, loadingOffers, loadingReport} = useSelector((state: RootStoreType) => {
    return {
      affiliates : state.Affiliates.affiliates.items,
      loadingAffList : state.Affiliates.loading,
      brands: state.Brands.brands.items,
      loadingBrandList: state.Brands.loading,
      countries: state.Countries.value.items,
      loadingCountries: state.Countries.loading,
      integrations: state.Integrations.value.items,
      loadingIntegrList: state.Integrations.loading,
      offers: state.Offers.items,
      loadingOffers: state.Offers.isLoading,
      loadingReport: state.Reports.loading,
    }
  });

  useEffect(() => {
      dispatch(getAffiliates("", { order: 1 }));
      dispatch(getCountries("", { order: 0 }));
      dispatch(getBrands("", { order: 1 }));
      dispatch(getIntegrations("", { order: 1 }));
      dispatch(getOffers("", { order: 1 }));

      return () => {
        dispatch(clearAffiliate());
        dispatch(clearBrands());
        dispatch(clearOffersStore());
        dispatch(clearIntegrations());
        dispatch(clearCountries());
      };
  }, []);

  const toggleCollapse = () => {
    setCollapse(!collapse);
  };

  useEffect(() => {
    let count = 0;

    selectAff.length > 0 ? (count += 1) : null;
    selectCountry.length > 0 ? (count += 1) : null;
    selectBrand.length > 0 ? (count += 1) : null;
    selectIntegr.length > 0 ? (count += 1) : null;
    selectOffers.length > 0 ? (count += 1) : null;
    selectReportType ? (count += 1) : null;
    fromDate || toDate ? (count += 1) : null;

    setCountFilter(count);
  });

  const handleFilterSubmit = () => {
    const curFilter = {
      ...filter,
      AffiliateIds: selectAff.map((item: any) => item.value).join(","),
      CountryIds: selectCountry.map((item: any) => item.value).join(","),
      BrandIds: selectBrand.map((item: any) => item.value).join(","),
      IntegrationIds: selectIntegr.map((item: any) => item.value).join(","),
      OfferIds: selectOffers.map((item: any) => item.value).join(","),
      ReportType: selectReportType?.value,
      DateFrom: fromDate ? fromDate+"T00:00:00Z" : null,
      DateTo: toDate ? toDate+"T23:59:59Z" : null,
    }

    dispatch(clearReports());
    dispatch(getReports(null, curFilter))
  }

  const handleClearFilter = () => {

    setSelectAff([]);
    setSelectBrand([]);
    setSelectCountry([]);
    setSelectIntegr([]);
    setSelectOffers([]);
    setSelectReportType(null);
    setFromDate(filter.DateFrom);
    setToDate(filter.DateTo);
    setDateFilter(`${filter.DateFrom} to ${filter.DateTo}`);

    dispatch(clearReports());
    dispatch(getReports("", filter));
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

  const countriesList = countries.map((item: any) => {
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

  const typeList = TypeReport.map((item: any, idx: number) => {
    return {
      value: idx,
      label: item,
    };
  });

  const offerList = offers.map((item: any) => {
    return {
      value: item.id,
      label: item.name,
    };
  });

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

  return (
    <>
      <Col className="col-md-4 col-12">
        <SearchReports />
      </Col>
      <Col className="col-md-8 col-12 text-end mt-2">
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
              {countFilter >= 0 ? (
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

              </Row>

              <Row>
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

                <Col lg={3}>
                  <div className="mb-3 custom-react-select">
                    <div className="react-select-descr">Offers</div>
                    <Select
                      isMulti
                      isSearchable
                      isLoading={loadingOffers}
                      options={offerList}
                      onChange={setSelectOffers}
                      value={selectOffers}
                    />
                  </div>
                </Col>

                <Col lg={3}>
                  <div className="mb-3 custom-react-select">
                    <div className="react-select-descr">Type</div>
                    <Select
                      options={typeList}
                      onChange={setSelectReportType}
                      value={selectReportType}
                    />
                  </div>
                </Col>
              </Row>

              <Row>
                <Col className="col-md-12 text-end">
                  <button
                    type="submit"
                    className="btn btnOrange"
                    disabled={loadingReport}
                  >
                    {loadingReport && (
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
  )
}