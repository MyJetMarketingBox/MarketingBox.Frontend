import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Label, Row } from "reactstrap";
import Select from "src/components/UI/select";
import OfferPrivacyName from "src/constants/OfferPrivacyName";
import OfferStatusName from "src/constants/OfferStatusName";
import { clearBrands, clearCountries, clearGeo, getBrands, getGeo, getLanguages } from "src/store/actions";
import { clearCampaigns, getCampaigns } from "src/store/campaigns/actions";
import { RootStoreType } from "src/store/storeTypes";

interface Props {
  onFilter: (value: any) => void;
  setCountFilter: (value: any) => void;
  clearFilterParams: number;
  //onClearFilter: () => void;
}

const DEFAULT_PARAMS = {
  languageIds: null,
  privacies: null,
  geoIds: null,
  states: null,
  brandIds: null,
};

const OffersFilter = ({ onFilter, setCountFilter, clearFilterParams }: Props) => {
  const dispatch = useDispatch();

  const [filterParams, setFilterParams] = useState(DEFAULT_PARAMS);

  const handleChange = (value: any) => {
    let obj = { ...filterParams };
    let cnt:any = 0;
    // @ts-ignore
    obj[value.name] = value.value;

    Object.entries(obj).forEach(([key, value]) => {
      cnt = (value) ? cnt + 1 : cnt;
    });

    setCountFilter(cnt)
    setFilterParams(obj);
  };

  const handleFilter = () => {
    onFilter(filterParams);
  };

  useMemo(() => {
    if(clearFilterParams > 0){
      setFilterParams(DEFAULT_PARAMS);
    }
  }, [clearFilterParams])

  // const handleClearFilter = () => {
  //   setFilterParams(DEFAULT_PARAMS);
  //   onClearFilter();
  // };

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
      dispatch(clearGeo())
      dispatch(clearCampaigns())
      dispatch(clearBrands())
    };
  }, []);

  return (
    <>
      <Row className="align-items-end">
        <Col xs={12} md={12} lg={3} className="mb-3 custom-react-select">
          <Label>GEO</Label>
          <Select
            isMulti
            isSearchable
            options={geoSelect}
            onChange={handleChange}
            value={
              geoSelect.find(item => item.value === filterParams.geoIds) || null
            }
            //placeholder="Select GEO"
          />
        </Col>

        <Col xs={12} md={6} lg={3} className="mb-3 custom-react-select">
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
            //placeholder="Select languages"
          />
        </Col>

        <Col xs={12} md={6} lg={3} className="mb-3 custom-react-select">
          <Label>Brands</Label>
          <Select
            isSearchable
            options={brandsSelect}
            onChange={handleChange}
            value={
              brandsSelect.find(item => item.value === filterParams.brandIds) ||
              null
            }
            //placeholder="Select brands"
          />
        </Col>

        <Col xs={12} md={6} lg={3} className="mb-3 custom-react-select">
          <Label>Status</Label>
          <Select
            isSearchable
            options={statusSelect}
            onChange={handleChange}
            value={
              statusSelect.find(item => item.value === filterParams.states) ||
              null
            }
            //placeholder="Select status"
          />
        </Col>

        <Col xs={12} md={6} lg={3} className="mb-3 custom-react-select">
          <Label>Privacies</Label>
          <Select
            isSearchable
            options={privacySelect}
            onChange={handleChange}
            value={
              privacySelect.find(item => item.value === filterParams.privacies) ||
              null
            }
            //placeholder="Select privacies"
          />
        </Col>
      </Row>

      <Row>
        <Col className="col-md-12 text-end">
          <button
            type="button"
            className="btn btnOrange"
            onClick={handleFilter}
          >
            Search
          </button>
        </Col>
      </Row>

    </>
  );
};

export default OffersFilter;
