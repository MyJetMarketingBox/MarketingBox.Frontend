import React, { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import MetaTags from "react-meta-tags";
import Breadcrumbs from "../../../../components/Common/Breadcrumb";
import { Button, Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCountries,
  getCountries,
} from "../../../../store/countries/actions";
import c from "./geoDetail.module.scss";
import { AvForm, AvField, AvInput } from "availity-reactstrap-validation";
import { addGeo, getGeoProfile, updateGeo } from "../../../../store/geo/actions";
import { useHistory, useParams } from "react-router";
import SimpleBar from "simplebar-react";
import Loader from "../../../../components/UI/loader";

const GeoDetail = (props: any) => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const dispatch = useDispatch();

  const {
    countries,
    loadingCountries,
    loadedCountries,
    profile,
    loadingProfile,
    loadedProfile,
    loaded,
    loading
  } = useSelector((state: any) => {
    return {
      countries: state.Countries.value.items,
      loadingCountries: state.Countries.loading,
      loadedCountries: state.Countries.loaded,
      profile: state.Geo.profile,
      loadingProfile: state.Geo.loadingProfile,
      loadedProfile: state.Geo.loadedProfile,
      loaded: state.Geo.loaded,
      loading: state.Geo.loading,
    };
  });

  const [search, setSearch] = useState("");
  const [selectedCountries, setSelectedCountries] = useState<number[]>([]);
  const [profileName, setProfileName] = useState("");

  const ref = useRef<any>();

  const changeName = (e: ChangeEvent<HTMLInputElement>) => {
    setProfileName(e.target.value);
  };

  const handleSelectCountry = (id: number) => {
    setSelectedCountries((prev: any) => [...prev, id]);
  };

  const handleRemoveSelected = (id: number) => () => {
    const arr = selectedCountries.filter(item => item !== id);
    setSelectedCountries(arr);
  };

  const outputCountries = useMemo(() => {
    let list = countries.filter(
      (item: any) => !selectedCountries.includes(item.id)
    );
    if (search) {
      list = list.filter((item: any) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    return list;
  }, [countries, search, selectedCountries]);

  const countryName = (id: number) => {
    return countries.find((item: any) => item.id === id)?.name || "";
  };

  useEffect(() => {
    if (loadedProfile) {
      setSelectedCountries(profile.countryIds || []);
      setProfileName(profile.name || "");
    }
  }, [profile]);

  useEffect(() => {
    let isMounted = true
    dispatch(getCountries("", { order: 0 }));
    if (id) {
      dispatch(getGeoProfile(+id));
    }

    if (isMounted) {
      setSelectedCountries([])
      setProfileName("")
    }

    return () => {
      dispatch(clearCountries());
      isMounted = false;
    };
  }, []);

  const handleBtnUpdate = () => {
    const upGeo = {
      "name": profileName.trim(),
      "countryIds": selectedCountries
    }

    if (id) {
      dispatch(updateGeo(upGeo, +id))
    }else{
      dispatch(addGeo(upGeo))
    }
  }

  const handlerBtnAddAllCountries = () => {
    const arrCountries = outputCountries.map((item: any) => item.id)
    setSelectedCountries((prev: any) => [...prev, ...arrCountries]);
  }

  const handlerBtnRemoveAllCountries = () => {
    setSelectedCountries([])
  }

  useEffect(() => {
    ref.current.recalculate();
  })

  const handleBack = () => {
    history.goBack();
  };

  /*function scrollElement(item: any) {
    if (item) {
      const currentPosition = item.offsetTop;
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300;
      }
    }
  }*/

  return (
    <React.Fragment>
      { !loadedProfile && loadingProfile && <Loader /> }
      <div className="page-content">
        <MetaTags>
          <title>GEO EDIT | TraffMe </title>
        </MetaTags>

        <div className="container-fluid">
          <Breadcrumbs title="TraffMe" breadcrumbItem="Geo" />
        </div>

        <Row>
          <Col xs={12}>
            <Card>
              <CardBody>
                <Row className="mb-4">
                  <Col md={12}>
                    <input
                      type="text"
                      value={profileName}
                      className="text-input"
                      onChange={changeName}
                      placeholder="Insert Geo Name"
                    />
                  </Col>
                  <div className="col-xl-12 mt-3 inline-flex">
                    <i className="bx bx-chevron-left font-size-20 text-orange"></i>
                    <a onClick={handleBack} className="text-orange pointer">
                      Back to Geo
                    </a>
                  </div>
                </Row>

                <Row>
                  <Col md={3}>
                    <Row className="mb-4">
                      <AvForm>
                        <div className="mb-4">
                          <AvField
                            name="name"
                            placeholder="Search Country"
                            type="text"
                            className="form-control"
                            autoComplete="off"
                            id="validationCountry"
                            onChange={(e: any) => setSearch(e.target.value)}
                          />
                        </div>
                        <div className="text-lg-center">
                          <a className="text-dark-blue pointer mr-5" onClick={handlerBtnAddAllCountries}>
                            Add All Countries
                          </a>
                          <span> | </span>
                          <a className="text-dark-blue pointer ml-5" onClick={handlerBtnRemoveAllCountries}>
                            Remove All Countries
                          </a>
                        </div>
                      </AvForm>
                    </Row>

                    <SimpleBar ref={ref} className={c["wrapper-list-country"]} autoHide={false}>
                      <ul className={c["list-country"]}>
                        {outputCountries.map((item: any) => (
                          <li
                            key={`list-country-${item.id}`}
                            onClick={() => handleSelectCountry(item.id)}
                          >
                            <span>{item.name}</span>
                            <span className="text-muted">
                              {item.alfa2Code}, {item.alfa3Code}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </SimpleBar>
                  </Col>

                  {/* added countries  */}
                  <Col md={9}>
                    <p>Countries Added: {selectedCountries.length}</p>
                    <ul className={c["selected-country"]}>
                      {/*loadedProfile &&*/}
                      {selectedCountries.length
                        ? selectedCountries.map((itemId: number) => (
                            <button
                              key={`geo-${itemId}`}
                              onClick={handleRemoveSelected(itemId)}
                              className="text-dark-blue"
                            >
                              <span>{countryName(itemId)}</span>
                            </button>
                          ))
                        : "Select some countries"}
                    </ul>
                  </Col>
                  {/*  */}

                  <Row>
                    <Col>
                      <div className="text-end">
                        <button
                          type="submit"
                          className="btn btnOrange btn-width-250"
                          onClick={handleBtnUpdate}
                          disabled={!selectedCountries.length || loading}
                        >
                          {loading && <i className="bx bx-hourglass bx-spin me-2"/>}
                          Save
                        </button>
                      </div>
                    </Col>
                  </Row>

                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default GeoDetail;
