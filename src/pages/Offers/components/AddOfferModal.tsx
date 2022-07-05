import React, { useEffect, useMemo, useState } from "react";
import {
  Col,
  Container,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import { AvField, AvForm } from "availity-reactstrap-validation";
import Select from "src/components/UI/select";
import { useDispatch, useSelector } from "react-redux";
import {
  addOffer,
  getBrand,
  getBrands,
  getGeo,
  getLanguages,
} from "src/store/actions";
import { RootStoreType } from "src/store/storeTypes";
import { brandPrivacy, Currency, OfferState } from "src/common/utils/model";

interface Props {
  isOpen: boolean;
  toggleClose: () => void;
}
const AddOfferModal = ({ isOpen, toggleClose }: Props) => {
  const dispatch = useDispatch();

  const { geos, languages, brands, isLoadingAdd } = useSelector((store: RootStoreType) => ({
    geos: store.Geo,
    languages: store.Languages,
    brands: store.Brands,
    isLoadingAdd: store.Offers.isLoadingAdd
  }));

  const [formValues, setFormValues] = useState({
    geoIds: [],
    languageId: null,
    brandId: null,
  });
  const handleValidSubmit = (values: any) => {
    dispatch(
      addOffer({
        ...values,
        ...formValues,

        state: +values.state,
        currency: +values.currency,
        privacy: +values.privacy,
      })
    );

    toggleClose();
  };

  const handleChangeSelect = (val: any) => {
    let vals = { ...formValues };
    let data = val.value;
    if (val.length > 0 && val[0].name === "geoId") {
      data = val.map((el: any) => el.value);
      // @ts-ignore
      vals["geoIds"] = data;
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
      dispatch(getBrands("", { integrationType: 1 }));
    }
    return () => {
      mount = false;
    };
  }, []);

  //
  return (
    <Modal
      isOpen={isOpen}
      centered
      style={{ width: "700px", maxWidth: "100%" }}
    >
      <Container fluid>
        <AvForm
          onValidSubmit={(e: any, values: any) => {
            handleValidSubmit(values);
          }}
        >
          <ModalBody>
            <ModalHeader toggle={toggleClose} tag="h4" className="mb-4">
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
              <Col xs={12} md={6} className="mb-3">
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
              <Col xs={12} md={6} className="mb-3">
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
              <Col xs={12} md={6} className="mb-3">
                <Label>Language</Label>
                <Select
                  isSearchable
                  options={languagesSelect}
                  onChange={handleChangeSelect}
                />
              </Col>
              <Col xs={12} md={6} className="mb-3">
                <Label>Brand</Label>
                <Select
                  isSearchable
                  options={brandSelect}
                  onChange={handleChangeSelect}
                />
              </Col>
              <Col xs={12} md={6} className="mb-3">
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
              <Col xs={12} md={6} className="mb-3">
                <AvField
                  type="select"
                  name="state"
                  className="form-select"
                  label="State"
                  required
                  value="0"
                >
                  <option value={""}>Select sate</option>
                  {OfferState.map((val, i) => (
                    <option key={i} value={i}>
                      {val}
                    </option>
                  ))}
                </AvField>
              </Col>
            </Row>
            <ModalFooter className="justify-content-end">
              <div className="d-flex justify-content-end">
                <button type="submit" className="mr-10 btn custom-btn-success">
                  {isLoadingAdd && <i className="bx bx-hourglass bx-spin me-2"/>}
                  Save
                </button>
              </div>
            </ModalFooter>
          </ModalBody>
        </AvForm>
      </Container>
    </Modal>
  );
};

export default AddOfferModal;
