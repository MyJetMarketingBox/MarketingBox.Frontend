import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Label, Row } from "reactstrap";
import Select from "src/components/UI/select";
import OfferPrivacyName from "src/constants/OfferPrivacyName";
import OfferStatusName from "src/constants/OfferStatusName";
import { getBrand, getBrands, getGeo, getLanguages } from "src/store/actions";
import { getCampaigns } from "src/store/campaigns/actions";
import { LanguageItemType } from "src/store/languages/actionTypes";
import { IOffersParams } from "src/store/offers/actionTypes";
import { RootStoreType } from "src/store/storeTypes";

interface Props {
  onFilter: (value: any) => void;
  onClearFilter: () => void;
}

const DEFAULT_PARAMS = {
  languageIds: null,
  privacies: null,
  geoIds: null,
  states: null,
  brandIds: null,
};

const OffersFilter = ({ onFilter, onClearFilter }: Props) => {
  const dispatch = useDispatch();

  const [filterParams, setFilterParams] = useState(DEFAULT_PARAMS);

  const handleChange = (value: any) => {
    let obj = { ...filterParams };

    // @ts-ignore
    obj[value.name] = value.value;

    console.log(obj);
    setFilterParams(obj);
  };

  const handleFilter = () => {
    onFilter(filterParams);
  };

  const handleClearFilter = () => {
    setFilterParams(DEFAULT_PARAMS);
    onClearFilter();
  };

  const { geos, languages, brands } = useSelector((store: RootStoreType) => ({
    geos: store.Geo.geo.items,
    languages: store.Languages.items,
    brands: store.Brands.brands.items,
  }));

  const geoSelect = useMemo(() => {
    return geos.map(geo => ({
      name: "geoIds",
      label: geo.name,
      value: geo.id,
    }));
  }, [geos]);

  const languagesSelect = useMemo(() => {
    return languages.map(language => ({
      name: "languageIds",
      label: language.name,
      value: language.id,
    }));
  }, [languages]);

  const brandsSelect = useMemo(() => {
    return brands.map(brand => ({
      name: "brandIds",
      label: brand.name,
      value: brand.id,
    }));
  }, [brands]);

  const statusSelect = Object.entries(OfferStatusName).map(status => ({
    name: "states",
    label: status[1],
    value: +status[0],
  }));

  const privacySelect = Object.entries(OfferPrivacyName).map(privacy => ({
    name: "privacies",
    label: privacy[1],
    value: +privacy[0],
  }));

  useEffect(() => {
    dispatch(getGeo());
    dispatch(getLanguages());
    dispatch(getCampaigns());
    dispatch(getBrands());

    return () => {
      setFilterParams(DEFAULT_PARAMS);
    };
  }, []);

  return (
    <Row className="mb-4 align-items-end">
      <Col xs={12} md={12} lg={2} className="mb-3 custom-react-select">
        <Label>Countries</Label>
        <Select
          isSearchable
          options={geoSelect}
          onChange={handleChange}
          value={
            geoSelect.find(item => item.value === filterParams.geoIds) || null
          }
        />
      </Col>

      <Col xs={12} md={6} lg={2} className="mb-3 custom-react-select">
        <Label>Languages</Label>
        <Select
          isSearchable
          options={languagesSelect}
          onChange={handleChange}
          value={
            languagesSelect.find(
              item => item.value === filterParams.languageIds
            ) || null
          }
        />
      </Col>

      <Col xs={12} md={6} lg={2} className="mb-3 custom-react-select">
        <Label>Brands</Label>
        <Select
          isSearchable
          options={brandsSelect}
          onChange={handleChange}
          value={
            brandsSelect.find(item => item.value === filterParams.brandIds) ||
            null
          }
        />
      </Col>

      <Col xs={12} md={6} lg={2} className="mb-3 custom-react-select">
        <Label>Status</Label>
        <Select
          isSearchable
          options={statusSelect}
          onChange={handleChange}
          value={
            statusSelect.find(item => item.value === filterParams.states) ||
            null
          }
        />
      </Col>

      <Col xs={12} md={6} lg={2} className="mb-3 custom-react-select">
        <Label>Privacies</Label>
        <Select
          isSearchable
          options={privacySelect}
          onChange={handleChange}
          value={
            privacySelect.find(item => item.value === filterParams.privacies) ||
            null
          }
        />
      </Col>

      <Col xs={12} md={12} lg={2} className="mb-3 custom-react-select">
        <Row>
          <Col xs={6}>
            <button
              type="button"
              className="w-100 btn btn-light btn-h"
              onClick={handleClearFilter}
            >
              Clear
            </button>
          </Col>

          <Col xs={6}>
            <button
              type="button"
              className="w-100 btn btnOrange btn-h"
              onClick={handleFilter}
            >
              Filter
            </button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default OffersFilter;
