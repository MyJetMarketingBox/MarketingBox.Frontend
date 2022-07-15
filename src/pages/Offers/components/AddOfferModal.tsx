import React, { useMemo, useState } from "react";
import { Col, Form, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";
import Select from "src/components/UI/select";
import { useDispatch, useSelector } from "react-redux";
import { addOffer } from "src/store/actions";
import { RootStoreType } from "src/store/storeTypes";
import "./AddModalOfferStyle.scss";
import { CurrencyEnum } from "../../../enums/CurrencyEnum";
import * as yup from "yup";
import { useFormik } from "formik";
import ValidationText from "../../../constants/validationText";
import LabelInput from "../../../components/UI/FormElements/LabelInput";

interface IOffer {
  name: string,
  geoIds: number[] | null,
  currency:  number | null,
  languageId?: number | null,
  brandId: number | null,
  state: boolean,
  privacy: boolean,
}

interface Props {
  isOpen: boolean;
  toggleClose: () => void;
}

const AddOfferModal = ({ isOpen, toggleClose }: Props) => {
  const dispatch = useDispatch();

  const [cntGeos, setCntGeos] = useState<number>(0);

  const { geos, languages, brands, isLoadingAdd, isLoadedAdd } = useSelector((store: RootStoreType) => ({
    geos: store.Geo,
    languages: store.Languages,
    brands: store.Brands,
    isLoadingAdd: store.Offers.isLoadingAdd,
    isLoadedAdd: store.Offers.isLoadedAdd,
  }));

  /*useEffect(() => {
    let mount = true;
    if (mount) {
      dispatch(getGeo());
      dispatch(getLanguages());
      dispatch(getBrands("", { integrationType: 1 }));
    }
    return () => {
      mount = false;
    };
  }, []);*/


  const validationSchema: yup.SchemaOf<IOffer> = yup.object().shape({
    name: yup.string()
      .required(ValidationText.required)
      .min(1, ValidationText.minLength1)
      .max(75, ValidationText.maxLength75)
      .matches(/^[a-zA-Z0-9_-]+$/, ValidationText.usernameMask),
    geoIds: yup.array().required(),
    currency: yup.number().required(ValidationText.required),
    languageId: yup.number().nullable(),
    brandId: yup.number().required(ValidationText.required),
    state: yup.boolean().required(ValidationText.required),
    privacy: yup.boolean().required(ValidationText.required),
  });

  const initialValues: IOffer = {
    name: "",
    geoIds: null,
    currency: CurrencyEnum.USD,
    languageId: null,
    brandId: null,
    state: true,
    privacy: true,
  }

  const handleSubmitForm = () => {
    dispatch(
      addOffer({
        ...values,
        state: +values.state,
        privacy: +values.privacy
      })
    );
  }

  const {
    values,
    validateForm,
    handleChange,
    submitForm,
    handleBlur,
    errors,
    touched,
    isValid,
    resetForm,
    setFieldValue
  } = useFormik({
    initialValues,
    onSubmit: handleSubmitForm,
    validationSchema: validationSchema,
    validateOnBlur: true,
    validateOnChange: true,
    validateOnMount: true,
  });

  const handlerClickSubmit = async () => {
    const curErrors = await validateForm();
    const curErrorsKeys = Object.keys(curErrors);
    if (curErrorsKeys.length) {
      const el = document.getElementById(curErrorsKeys[0]);
      if (el) el.focus();
    }
    submitForm();
  };

  /*const handleChangeSelect = (val: any) => {
    let vals = { ...formValues };
    let data = val.value;
    if (val.length > 0 && val[0].name === "geoId") {
      data = val.map((el: any) => el.value);
      setCntGeos(data);
      // @ts-ignore
      vals["geoIds"] = data;
    } else {
      // @ts-ignore
      vals[val.name] = val.value;
    }
    setFormValues(vals);
  };*/

  const handleChangeSelect = (name: string, value: any) => {
    setFieldValue(name, value.value)
  }

  const handleChangeSelect2 = (name: string, value: any) => {
    let data = value.map((el: any) => el.value);
    setCntGeos(data.length);
    setFieldValue(name, (value.length) ? data : null )
  }

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
    return brands.brands.items.filter((item: any) => item.integrationType === 1).map(br => ({
      name: "brandId",
      label: br.name,
      value: br.id,
    }));
  }, [brands]);

  //
  return (
    <Modal isOpen={isOpen} toggle={toggleClose} centered>
      <ModalHeader toggle={toggleClose} tag="h4" className="mb-4">
        Add Offer
      </ModalHeader>
        <Form className="custom-form">
          <ModalBody>
            <Row>
              <Col xs={12} >
                <LabelInput
                  label="Name*"
                  placeholder="Enter name"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name.trim() || ""}
                  hasError={!!(errors.name && touched.name)}
                  errorText={errors.name}
                />
              </Col>
              <Col xs={12} className="mb-3">
                <div className="custom-react-select">
                  <Select
                    isSearchable
                    options={brandSelect}
                    onChange={(value: any) => handleChangeSelect("brandId", value)}
                    placeholder="Brand*"
                  />
                </div>
              </Col>
              <Col xs={12} className="mb-3">
                <div className="custom-react-select">
                  <Select
                    isMulti
                    isSearchable
                    options={(cntGeos < 5) ? geoSelect : [] }
                    onChange={(value: any) => handleChangeSelect2("geoIds", value)}
                    placeholder="GEOs*"
                  />
                </div>
              </Col>
              <Col xs={12} className="mb-3">
                <div className="custom-react-select">
                  <Select
                    isSearchable
                    options={languagesSelect}
                    onChange={(value: any) => handleChangeSelect("languageId", value)}
                    placeholder="Languages"
                  />
                </div>
              </Col>

              <Col xs={12} md={3} className="mb-3">
                <div>Privacy: </div>
                <Input type="checkbox" id="privacy" name="privacy" switch="success" defaultChecked={true} onChange={handleChange}/>
                <Label htmlFor="privacy" data-on-label="Public" data-off-label="Private"></Label>
              </Col>
              <Col xs={12} md={3} className="mb-3">
                <div>State: </div>
                <Input type="checkbox" id="state" name="state" switch="success" defaultChecked={true} onChange={handleChange}/>
                <Label htmlFor="state" data-on-label="Active" data-off-label="NotActive"></Label>
              </Col>
            </Row>
          </ModalBody>

          <ModalFooter>
            <Row>
              <Col>
                <div className="text-end">
                  <button
                    type="button"
                    onClick={handlerClickSubmit}
                    disabled={!isValid || isLoadingAdd}
                    className="btn btnOrange btn-width-250 save-user"
                  >
                    {isLoadingAdd && (
                      <i className="bx bx-hourglass bx-spin me-2" />
                    )}
                    Save
                  </button>
                </div>
              </Col>
            </Row>
          </ModalFooter>

        </Form>
    </Modal>
  );
};

export default AddOfferModal;
