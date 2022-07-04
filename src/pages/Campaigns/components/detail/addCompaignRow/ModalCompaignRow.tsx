import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Col, Label, Input, Modal, Row, Form, ModalHeader, ModalFooter } from "reactstrap";
import { AvField, AvForm } from "availity-reactstrap-validation";
import {
  CampaignRowValues,
  ICampaignRowItem,
} from "src/store/campaignsRow/actionTypes";
import Select from "src/components/UI/select";
import { useDispatch, useSelector } from "react-redux";
import { RootStoreType } from "src/store/storeTypes";
import { addCampaignRow, editCampaignRow, modalAssignPayoutBrand } from "src/store/actions";
import { CapTypeName } from "src/constants/CapTypeName";
import "./ModalCompaignRowStyle.scss";
import { ActivityHoursType } from "src/types/ActivityHoursType";
import { DayOfWorkName } from "src/constants/DayOfWorkName";
import ActivityHourInputItem from "./ActivityHourInputItem";
import { CapTypeEnum } from "src/enums/CapTypeEnum";
import * as yup from "yup";
import ValidationText from "../../../../../constants/validationText";
import { useFormik } from "formik";
import LabelSelect from "../../../../../components/UI/FormElements/LabelSelect";
import LabelInput from "../../../../../components/UI/FormElements/LabelInput";

interface Props {
  isOpen: boolean;
  toggleClose: () => void;
  campaignRow?: ICampaignRowItem | null;
  activeCRId: number;
  campaignId: number;
}

interface ICampaignRow {
  campaignId: number | null,
  brandId: number | null,
  geoId: number | null,
  priority: number | null,
  weight: number | "",
  dailyCapValue: number | "",
  capType: CapTypeEnum | null;
  information?: string | null,
  enableTraffic: boolean | null,
  activityHours: ActivityHoursType[] | null;
}

const ModalCompaignRow = (props: Props) => {
  const { isOpen, toggleClose, campaignRow, activeCRId, campaignId } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();


  const getDefaultNumberValue = (value: any) => {
    if (isNaN(value)) {
      return value || null;
    }
    return +value;
  };

  const generateDefaultActiveHours = () => {
    let activeHourse: ActivityHoursType[] = [];
    Object.entries(DayOfWorkName).map(val => {
      activeHourse.push({
        day: +val[0],
        isActive: true,
        from: "00:00:00",
        to: "23:59:59",
      });
    });
    return activeHourse;
  };

  // data
  const { campaigns, geo, brands } = useSelector((store: RootStoreType) => {
    return {
      campaigns: store.Campaigns,
      geo: store.Geo,
      brands: store.Brands,
    };
  });

  const validationSchema: yup.SchemaOf<ICampaignRow> = yup.object().shape({
    campaignId: yup.number().required(ValidationText.required),
    brandId: yup.number().required(ValidationText.required),
    geoId: yup.number().required(ValidationText.required),
    priority: yup.number().required(ValidationText.required),
    weight: yup.number()
      .min(1, ValidationText.minLength1)
      .required(ValidationText.required),
    dailyCapValue: yup.number()
      .min(1, ValidationText.minLength1)
      .required(ValidationText.required),
    capType: yup.number()
      .required(ValidationText.required),
    information: yup.string()
      .min(1, ValidationText.minLength1)
      .max(128, ValidationText.maxLength128)
      .nullable(),
    enableTraffic: yup.boolean().required(ValidationText.required),
    activityHours: yup.array().required(ValidationText.required),
  });

  const initialValues: ICampaignRow = useMemo(() => {
    return {
      brandId: campaignRow?.brandId || null,
      campaignId: campaignId || null,
      priority: campaignRow?.priority || 1,
      weight: campaignRow?.weight || "",
      capType: getDefaultNumberValue(campaignRow?.capType || CapTypeEnum.Lead),
      dailyCapValue: campaignRow?.dailyCapValue || "",
      information: campaignRow?.information || "",
      geoId: campaignRow?.geo.id || null,
      enableTraffic: !!campaignRow?.enableTraffic,
      activityHours: campaignRow?.activityHours || generateDefaultActiveHours(),
    }
  }, [campaignRow])

  //console.log("initialValuesForm", initialValues);

  const brandSelect = useMemo(() => {
    return (
      brands.brands.items.map(el => ({
        name: "brandId",
        value: el.id,
        label: el.name,
      })) || []
    );
  }, [brands]);

  // const campaignSelect = useMemo(() => {
  //   return (
  //     campaigns.campaigns.items.map(el => ({
  //       name: "campaignId",
  //       value: el.id,
  //       label: el.name,
  //     })) || []
  //   );
  // }, [campaigns]);

  const geoSelect = useMemo(() => {
    return geo.geo.items.map(el => ({
      name: "geoId",
      value: el.id,
      label: el.name,
    }));
  }, [geo]);

  const prioritySelect = useMemo(() => {
    let arr = [];
    for (let i = 1; i < 11; i++) {
      arr.push({
        name: "priority",
        label: `${i}`,
        value: i,
      });
    }
    return arr;
  }, []);

  const capTypeSelect = useMemo(() => {
    return Object.entries(CapTypeName).map(capType => ({
      name: "capType",
      value: +capType[0],
      label: capType[1],
    }));
  }, []);

  // const initialValues = useCallback((): CampaignRowValues => {
  //   return {
  //     brandId: campaignRow?.brandId || null,
  //     campaignId:
  //       campaignRow?.campaign.id ||
  //       campaignSelect.find(item => item.value === activeCRId)?.value ||
  //       null,
  //     priority: campaignRow?.priority || null,
  //     weight: campaignRow?.weight || null,
  //     capType: getDefaultNumberValue(campaignRow?.capType || CapTypeEnum.Lead),
  //     dailyCapValue: campaignRow?.dailyCapValue || null,
  //     information: campaignRow?.information || "",
  //     geoId: campaignRow?.geo.id || null,
  //     enableTraffic: !!campaignRow?.enableTraffic,
  //     activityHours: campaignRow?.activityHours || generateDefaultActiveHours(),
  //   };
  // }, [campaignRow]);
  //
  // const [formValues, setValues] = useState<CampaignRowValues>(initialValues());

  // fun
  // const handleValidSubmit = (values: CampaignRowValues) => {
  //   const data = {
  //     ...formValues,
  //     weight: Number(formValues.weight),
  //     dailyCapValue: Number(formValues.dailyCapValue),
  //     information: formValues.information || null,
  //   };
  //   if (campaignRow) {
  //     // edit
  //     dispatch(
  //       editCampaignRow({
  //         id: campaignRow.campaignRowId,
  //         data,
  //       })
  //     );
  //     return;
  //   }
  //   // create
  //   dispatch(addCampaignRow(data));
  // };

  const handleSubmitForm = () => {
    const data = {
      ...values,
      weight: Number(values.weight),
      dailyCapValue: Number(values.dailyCapValue),
      information: values.information || null,
      priority: Number(values.priority) || null
    };

    if (campaignRow) {
      // edit
      dispatch(
        editCampaignRow({
          id: campaignRow.campaignRowId,
          data,
        })
      );
      return;
    }
    // create
    dispatch(addCampaignRow(data));

    //console.log("campaign row", data);
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

  // const setFieldValue = (field: any, value: any) => {
  //   const obj = { ...formValues };
  //   //@ts-ignore
  //   obj[field] = value;
  //   setValues(obj);
  // };

  // const handleChange = (e: any) => {
  //   if (e?.target?.name) {
  //     setFieldValue(e?.target?.name, e.target.value);
  //   }
  //   if (e?.name) {
  //     setFieldValue(e.name, e.value);
  //   }
  // };

  const handleChangeSelect = (name: string, value: any) => {
    setFieldValue(name, value.value)
  }

  // const handleClickEnableTrafic = () => {
  //   setFieldValue("enableTraffic", !formValues.enableTraffic);
  // };

  const handleChangeActivityHours = (data: ActivityHoursType) => {
    const arr = values.activityHours?.map(item => {
      if (item.day === data.day) {
        return data;
      }
      return item;
    });

    setFieldValue("activityHours", arr);
  };
  // effects

  //
  return (
    <Modal
      centered
      isOpen={isOpen}
      style={{ width: "1120px", maxWidth: "100%" }}
      toggle={toggleClose}
    >
      <ModalHeader toggle={toggleClose} tag="h4">
        {campaignRow
          ? t("Edit Row")
          : t("Add new Row")}
      </ModalHeader>

      {/*<div className="modal-header">
        <h5 className="modal-title">
          {campaignRow
            ? `${t("Edit Row")} - ${campaignRow.campaign.name} | ${
                campaignRow.campaignRowId
              }`
            : t("Add new Row")}
        </h5>
        <button
          type="button"
          className="close"
          data-dismiss="modal"
          aria-label="Close"
          onClick={toggleClose}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>*/}

      {/*  */}
      {/*<AvForm
        onValidSubmit={(e: SubmitEvent, values: CampaignRowValues) => {
          handleValidSubmit(values);
        }}
      >*/}
      <Form>
        {/* Body */}
        <div className="modal-body">
          <Row className="justify-content-between">
            <Col xs={12} xl={5}>
              <Row>
                <Col xs={12} className="mb-4">
                  <h5>Set</h5>
                </Col>
                {/*  */}
                <Col xs={12} md={6} >
                  <div className="mb-3 custom-react-select">
                    <Select
                      isSearchable
                      isLoading={brands.loading}
                      options={brandSelect}
                      onChange={(value: any) => handleChangeSelect("brandId", value)}
                      value={brandSelect.find(
                        item => item.value === values?.brandId
                      )}
                      placeholder="Brand*"
                    />
                  </div>
                </Col>
                {/*  */}
                {/*<Col xs={12} md={6}>
                  // <Label>Campaign*</Label>
                  // <Select
                  //   isSearchable
                  //   isLoading={campaigns.loading}
                  //   options={campaignSelect}
                  //   onChange={handleChange}
                  //   value={campaignSelect.find(
                  //     item => item.value === formValues.campaignId
                  //   )}
                  // />
                  <div className="mb-3 custom-react-select">
                    <Select
                      isSearchable
                      isLoading={campaigns.loading}
                      options={campaignSelect}
                      onChange={(value: any) => handleChangeSelect("campaignId", value)}
                      value={campaignSelect.find(
                        item => item.value === values.campaignId
                      )}
                      placeholder="Campaign*"
                    />
                  </div>
                </Col>*/}
                {/*  */}
                <Col xs={12} md={6}>
                  {/*<Label>GEO*</Label>
                  <Select
                    isSearchable
                    isLoading={geo.loading}
                    options={geoSelect}
                    onChange={handleChange}
                    value={geoSelect.find(
                      item => item.value === formValues.geoId
                    )}
                  />*/}
                  <div className="mb-3 custom-react-select">
                    <Select
                      isSearchable
                      isLoading={geo.loading}
                      options={geoSelect}
                      onChange={(value: any) => handleChangeSelect("geoId", value)}
                      value={geoSelect.find(
                        item => item.value === values.geoId
                      )}
                      placeholder="GEO*"
                    />
                  </div>
                </Col>
                {/*  */}
                <Col xs={12} md={6} >
                  {/*<Label>Priority*</Label>
                  <Select
                    isSearchable
                    options={prioritySelect}
                    onChange={handleChange}
                    value={prioritySelect.find(
                      item => item.value === formValues.priority
                    )}
                  />*/}
                  <div className="mb-3 custom-react-select">
                    {/*<Select
                      options={prioritySelect}
                      onChange={handleChange}
                      value={prioritySelect.find(
                        item => item.value === values.priority
                      )}
                      placeholder="Priority*"
                    />*/}
                    <LabelSelect
                      value={`${values.priority}`}
                      name="priority"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label="priority*"
                      hasError={!!(errors.priority && touched.priority)}
                      errorText={errors.priority}
                    >
                      {prioritySelect.map((item) => <option value={item.value} key={item.value}>{item.label}</option>
                      )}
                    </LabelSelect>
                  </div>
                </Col>
                {/*  */}
                <Col xs={12} md={6} className="mb-3">
                  {/*<AvField
                    name="weight"
                    label="Weight*"
                    type="number"
                    min={0}
                    errorMessage="Invalid value"
                    validate={{
                      required: { value: true },
                    }}
                    onChange={handleChange}
                    value={formValues.weight}
                  />*/}

                  <LabelInput
                    label="Weight*"
                    placeholder="Weight*"
                    name="weight"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={`${values.weight}` || ""}
                    hasError={!!(errors.weight && touched.weight)}
                    errorText={errors.weight}
                  />
                </Col>
                {/*  */}
                <Col xs={12} md={6} >
                  {/*<Label>Cap Type*</Label>
                  <Select
                    isSearchable
                    options={capTypeSelect}
                    onChange={handleChange}
                    value={capTypeSelect.find(
                      item => +item.value === formValues.capType
                    )}
                  />*/}

                  <div className="mb-3 custom-react-select">
                    <Select
                      isSearchable
                      name="capType"
                      options={capTypeSelect}
                      onChange={(value: any) => handleChangeSelect("capType", value)}
                      value={capTypeSelect.find(
                        item => +item.value === values.capType
                      )}
                      placeholder="Cap Type*"
                    />
                  </div>
                </Col>
                {/*  */}
                <Col xs={12} md={6} className="mb-3">
                  {/*<AvField
                    name="dailyCapValue"
                    label="Daily Cap Value"
                    type="number"
                    errorMessage="Invalid value"
                    validate={{
                      required: { value: formValues.capType !== null },
                    }}
                    value={formValues.dailyCapValue}
                    onChange={handleChange}
                    disabled={formValues.capType === null}
                  />*/}

                  <LabelInput
                    label="Daily Cap*"
                    placeholder="Daily Cap*"
                    name="dailyCapValue"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={`${values.dailyCapValue}`}
                    hasError={!!(errors.dailyCapValue && touched.dailyCapValue)}
                    errorText={errors.dailyCapValue}
                  />
                </Col>
                {/*  */}
              </Row>
            </Col>

            <Col xs={12} xl={5}>
              <Row className="mb-4">
                <Col xs={12}>
                  <h5>Activity Hours</h5>
                </Col>
              </Row>
              <Row>
                {values.activityHours?.map(item => (
                  <Col xs={12} key={`activiti-hour-input-item-${item.day}`}>
                    <ActivityHourInputItem
                      value={item}
                      onChange={handleChangeActivityHours}
                    />
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>

          <Row className="mb-4">
            <Col xs={12}>
              <h5>{t("Information")}</h5>
            </Col>
            <Col xs={12}>
              {/*<AvField
                name="information"
                label="Enter a description"
                type="textarea"
                errorMessage="Invalid value"
                onChange={handleChange}
                value={formValues.information}
              />*/}
              <LabelInput
                name="information"
                onChange={handleChange}
                onBlur={handleBlur}
                value={`${values.information}`}
                hasError={!!(errors.information && touched.information)}
                errorText={errors.information}
              />
            </Col>
          </Row>

          <Row className="mb-4">
            <Col className="d-flex align-items-center">
              <h5 className="enableTraffic-margin">{t("Enable Traffic")}</h5>

              <div className="d-i-block">
                <Input
                  type="checkbox"
                  id="enableTraffic"
                  switch="success"
                  defaultChecked={!!values.enableTraffic}
                  onChange={handleChange}
                />
                <Label htmlFor="enableTraffic" className="d-flex m-0" />
              </div>
            </Col>
          </Row>
        </div>
        {/* Body */}
        {/* Footer  */}
        <ModalFooter>
          <Row>
            <Col>
              <div className="text-end">
                <button
                  type="button"
                  className="btn btnOrange"
                  onClick={handlerClickSubmit}
                  disabled={!isValid}
                >
                  {/*loadingUpdate && <i className="bx bx-hourglass bx-spin me-2"/>*/}
                  Save
                </button>
              </div>
            </Col>
          </Row>
        </ModalFooter>
        {/* Footer */}
      </Form>
    </Modal>
  );
};

export default ModalCompaignRow;
