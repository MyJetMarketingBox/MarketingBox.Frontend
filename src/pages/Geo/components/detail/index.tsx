import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
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
import { getGeoProfile } from "../../../../store/geo/actions";
import { useParams } from "react-router";

const GeoDetail = (props: any) => {
  const {
    match: { params },
  } = props;

  const { id } = useParams<{ id: string }>();

  console.log(id);

  const dispatch = useDispatch();

  const {
    countries,
    loadingCountries,
    loadedCountries,
    profile,
    loadingProfile,
    loadedProfile,
  } = useSelector((state: any) => {
    return {
      countries: state.Countries.value.items,
      loadingCountries: state.Countries.loading,
      loadedCountries: state.Countries.loaded,
      profile: state.Geo.profile,
      loadingProfile: state.Geo.loadingProfile,
      loadedProfile: state.Geo.loadedProfile,
    };
  });

  const [search, setSearch] = useState("");
  const [selectedCountries, setSelectedCountries] = useState<number[]>([]);
  const [profileName, setProfileName] = useState("");

  const changeName = (e: ChangeEvent<HTMLInputElement>) => {
    setProfileName(e.target.value);
  };

  const handleSelectCountry = (id: number) => {
    console.log(id);
    setSelectedCountries((prev: any) => [...prev, id]);
  };

  const handleRemoveSelected = (id: number) => () => {
    console.log("remove ", id);
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
    dispatch(getCountries("", { order: 0 }));
    dispatch(getGeoProfile(+id));

    return () => {
      dispatch(clearCountries());
    };
  }, []);

  return (
    <React.Fragment>
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
                <Row className="mb-5">
                  <Col md={12}>
                    <input
                      type="text"
                      value={profileName}
                      className="text-input"
                      onChange={changeName}
                      placeholder="Insert Geo Name"
                    />
                  </Col>
                </Row>

                <Row>
                  <Col md={4}>
                    <Row>
                      <AvForm>
                        <div className="mb-5">
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
                      </AvForm>
                    </Row>
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
                  </Col>

                  {/* added countries  */}
                  <Col md={8}>
                    <ul className={c["selected-country"]}>
                      {loadedProfile && selectedCountries.length
                        ? selectedCountries.map((itemId: number) => (
                            <button
                              key={`geo-${itemId}`}
                              className="btn btn-primary mr-1"
                              onClick={handleRemoveSelected(itemId)}
                            >
                              {countryName(itemId)}
                            </button>
                          ))
                        : "Select some countries"}
                    </ul>
                  </Col>
                  {/*  */}
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
