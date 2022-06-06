import React, { useEffect, useMemo, useState } from "react";
import { Col, Label, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import { AvField, AvForm } from "availity-reactstrap-validation";
import Select from "src/components/UI/select";
import { useDispatch, useSelector } from "react-redux";
import { getBrand, getBrands, getGeo, getLanguages } from "src/store/actions";
import { RootStoreType } from "src/store/storeTypes";
import { AffiliateState, brandPrivacy, Currency } from "src/common/utils/model";

interface Props {}
const AddOfferModal = ({}: Props) => {
  const dispatch = useDispatch();

  const { geos, languages, brands } = useSelector((store: RootStoreType) => ({
    geos: store.Geo,
    languages: store.Languages,
    brands: store.Brands,
  }));

  const [formValues, setFormValues] = useState({
    geoIds: [],
    languageId: null,
    brandId: null,
  });
  const handleValidSubmit = (values: any) => {
    console.log({
      ...values,
      ...formValues,

      state: +values.state,
      currency: +values.currency,
      privacy: +values.privacy,
    });
  };

  const handleChangeSelect = (val: any) => {
    let vals = { ...formValues };
    let data = val.value;
    if (val.length > 0 && val[0].name === "geoId") {
      data = val.map((el: any) => el.value).join(",");
      // @ts-ignore
      vals["geoIds"] = `${data}`;
    } else {
      // @ts-ignore
      vals[val.name] = val.value;
    }
    setFormValues(vals);
  };

  const geoSelect = useMemo(() => {
    return geos.geo.items.map(geo => ({
      name: "geoId",
      label: geo.name,
      value: geo.id,
    }));
  }, [geos]);

  const languagesSelect = useMemo(() => {
    return languages.items.map(lang => ({
      name: "languageId",
      label: lang.name,
      value: lang.id,
    }));
  }, [languages]);

  const brandSelect = useMemo(() => {
    return brands.brands.items.map(br => ({
      name: "brandId",
      label: br.name,
      value: br.id,
    }));
  }, [brands]);

  useEffect(() => {
    let mount = true;
    if (mount) {
      dispatch(getGeo());
      dispatch(getLanguages());
      dispatch(getBrands());
    }
    return () => {
      mount = false;
    };
  }, []);

  //
  return (
    <Modal isOpen={true} centered>
      <AvForm
        onValidSubmit={(e: any, values: any) => {
          handleValidSubmit(values);
        }}
      >
        <ModalBody>
          <ModalHeader toggle={() => {}} tag="h4" className="mb-4">
            Add Offer
          </ModalHeader>

          <Row>
            <Col xs={12} className="mb-3">
              <AvField
                name="name"
                label="Name"
                type="text"
                errorMessage="Invalid name"
                validate={{
                  required: { value: true },
                }}
              />
            </Col>
            <Col xs={12} className="mb-3">
              <Label>Geos</Label>
              <div className="custom-react-select">
                <Select
                  isMulti
                  isSearchable
                  options={geoSelect}
                  onChange={handleChangeSelect}
                />
              </div>
            </Col>
            <Col xs={12} className="mb-3">
              <AvField type="select" name="currency" label="Currency">
                <option value="" selected>
                  Select currency
                </option>
                {Currency.map((el, i) => (
                  <option key={el} value={i}>
                    {el}
                  </option>
                ))}
              </AvField>
            </Col>
            <Col xs={12} className="mb-3">
              <Label>Language</Label>
              <Select
                isSearchable
                options={languagesSelect}
                onChange={handleChangeSelect}
              />
            </Col>
            <Col xs={12} className="mb-3">
              <Label>Brand</Label>
              <Select
                isSearchable
                options={brandSelect}
                onChange={handleChangeSelect}
              />
            </Col>
            <Col xs={12} className="mb-3">
              <AvField type="select" name="privacy" label="Privacy">
                <option value="" selected>
                  Select privacy
                </option>
                {brandPrivacy.map((el, i) => (
                  <option key={el} value={i}>
                    {el}
                  </option>
                ))}
              </AvField>
            </Col>
            <Col xs={12} className="mb-3">
              <AvField
                type="select"
                name="state"
                className="form-select"
                label="State"
                required
                value="0"
              >
                <option value={""}>Select sate</option>
                {AffiliateState.map((val, i) => (
                  <option key={i} value={i}>
                    {val}
                  </option>
                ))}
              </AvField>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="d-flex">
                <button type="submit" className="mr-10 btn custom-btn-success">
                  Save
                </button>

                <button type="button" className="btn custom-btn-light">
                  Cancel
                </button>
              </div>
            </Col>
          </Row>
        </ModalBody>
      </AvForm>
    </Modal>
  );
};

export default AddOfferModal;
