import React, { useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import Breadcrumbs from "../../../../components/Common/Breadcrumb";
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { clearCountries, getCountries } from "../../../../store/countries/actions";
import c from "./geoDetail.module.scss"
import { AvForm, AvField, AvInput } from "availity-reactstrap-validation";
import { getGeoProfile } from "../../../../store/geo/actions";

const GeoDetail = (props: any) => {
  const {
    match: { params },
  } = props;

  const dispatch = useDispatch();

  const {countries, loadingCountries, loadedCountries, profile, loadingProfile, loadedProfile } = useSelector((state: any) => {
    return {
      countries: state.Countries.value.items,
      loadingCountries: state.Countries.loading,
      loadedCountries: state.Countries.loaded,
      profile: state.Geo.profile,
      loadingProfile: state.Geo.loadingProfile,
      loadedProfile: state.Geo.loadedProfile
    }
  })

  const [search, setSearch] = useState('');
  const [outputCountries, setOutputCountries] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState<any>([]);
  const [profileName, setProfileName] = useState(profile?.name);

  useEffect(() => {
    dispatch(getCountries('', {order : 0}))
    return () => {
      dispatch(clearCountries())
    }
  }, [])

  if(params.id > 0){
    useEffect(() => {
      dispatch(getGeoProfile(params.id))
    }, [])
  }

  useEffect(() => {
    let filterCountries = [];
    if(loadedProfile){
      filterCountries = countries.filter(( item : any) => {
        return !selectedCountries.includes(item.id);
      }).filter((item : any) => {
        if(search == ''){
          return item;
        }else if (item.name.toLowerCase().includes(search.toLowerCase())) {
          return item;
        }
      })
    }else{
      filterCountries = countries.filter((item : any) => {
        if(search == ''){
          return item;
        }else if (item.name.toLowerCase().includes(search.toLowerCase())) {
          return item;
        }
      });
    }

    setOutputCountries(filterCountries);
    setProfileName(profile.name)
  }, [countries, search, selectedCountries])

  useEffect(() => {
    setSelectedCountries(profile.countryIds)
  }, [])

  const changeName = (e: any) => {
    setProfileName(e.target.value)
  }

  const handleSelectCountry = (id: number) => {
    console.log(id);
    setSelectedCountries((prev: any) => [ ...prev, id ] )
  }

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
                    <input type="text" value={profileName} className="text-input" onChange={changeName} placeholder="Insert Geo Name"/>
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
                            onChange={(e : any) => setSearch(e.target.value)}
                          />
                        </div>
                      </AvForm>
                    </Row>
                    <ul className={c['list-country']}>
                      {outputCountries.map((item:any) =>
                        <li key={item.id} onClick={() => handleSelectCountry(item.id)}>
                          <span >{item.name}</span>
                          <span className="text-muted">{item.alfa2Code}, {item.alfa3Code}</span>
                        </li>
                      )}
                    </ul>
                  </Col>
                  <Col md={8}>
                    <ul className={c['selected-country']}>
                      {loadedProfile &&
                      selectedCountries.map((item: any) => item )
                      }
                    </ul>
                  </Col>

                </Row>

              </CardBody>
            </Card>
          </Col>
        </Row>


      </div>
    </React.Fragment>
  )

}

export default GeoDetail;