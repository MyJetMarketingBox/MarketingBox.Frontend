import { useDispatch, useSelector } from "react-redux";
import { Col, Form, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";
import { addCampaign } from "../../../../store/campaigns/actions";
import { CampaignTabsEnum } from "src/enums/CampaignTabsEnum";
import React, { useMemo } from "react";
import { RootStoreType } from "src/store/storeTypes";
import * as yup from "yup";
import { useFormik } from "formik";
import ValidationText from "../../../../constants/validationText";
import LabelInput from "../../../../components/UI/FormElements/LabelInput";

interface ICampaignType {
  name: string;
}

interface Props {
  isOpen: boolean;
  formType: CampaignTabsEnum;
  toggle: () => void;
}

/*interface IFormValues {
  name: string;
  geoId: string;
}*/

const AddCampaignOrGeoForm = ({ isOpen, formType, toggle }: Props) => {
  const dispatch = useDispatch();

  const { geo, loading } = useSelector((store: RootStoreType) => ({
    geo: store.Geo,
    loading: store.Campaigns.loading
  }));

  const validationSchema: yup.SchemaOf<ICampaignType> = yup
    .object()
    .shape({
      name: yup
        .string()
        .required(ValidationText.required)
        .min(1, ValidationText.minLength1)
        .max(75, ValidationText.maxLength75)
        .matches(/^[a-zA-Z0-9_-]+$/, ValidationText.invalidInput),
    });

  const initialValues: ICampaignType = {
    name: "",
  };

  const handleValidSubmit = () => {
    switch (formType) {
      case CampaignTabsEnum.Campaign:
        dispatch(
          addCampaign({
            name: values.name,
          })
        );
        break;

      /*default:
        const data = {
          name: values.name,
          countryIds: geo.geo.items.find(item => item.id === +values.geoId)
            ?.countryIds,
        };

        dispatch(addGeo(data));*/
      default:
        break;
    }

    toggle();
  };

  let {
    values,
    validateForm,
    handleChange,
    submitForm,
    handleBlur,
    errors,
    touched,
    isValid,
    setFieldValue,
    resetForm
  } = useFormik({
    initialValues,
    onSubmit: handleValidSubmit,
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

  const formTitle = useMemo(() => {
    switch (formType) {
      case CampaignTabsEnum.Campaign:
        return "Add Campaign";
      default:
        return "Add Geo";
    }
  }, [formType]);

  return (
    <Modal isOpen={isOpen} toggle={toggle} centered>
      <ModalHeader toggle={toggle} tag="h4">
        {formTitle}
      </ModalHeader>
      <Form>
        <ModalBody>
          <Row form>
            <Col xs={12}>
              <div className="mb-3">
                <LabelInput
                  label="Name*"
                  placeholder="Enter name"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name.replace(/\s+/g, "").trim() || ""}
                  hasError={!!(errors.name && touched.name)}
                  errorText={errors.name}
                />
              </div>
            </Col>

            {/*{formType === CampaignTabsEnum.Geo && (
              <Col xs={12}>
                <div className="mb-3">
                  <AvField
                    name="geoId"
                    label="Country"
                    type="select"
                    errorMessage="Invalid name"
                    validate={{
                      required: { value: true },
                    }}
                  >
                    {geo.loaded &&
                      geo.geo.items.map(item => (
                        <option
                          key={`geo-id-${item.id / Math.random()}`}
                          value={item.id}
                        >
                          {item.name}
                        </option>
                      ))}
                  </AvField>
                </div>
              </Col>
            )}*/}
          </Row>
        </ModalBody>
        <ModalFooter>
          <Row>
            <Col>
              <div className="d-flex">
                <button
                  type="button"
                  className="btn btnOrange save-user"
                  onClick={handlerClickSubmit}
                  disabled={loading || !isValid}
                >
                  {loading && (
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

export default AddCampaignOrGeoForm;
