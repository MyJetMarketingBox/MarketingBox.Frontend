import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { Col, Label, Input, Modal, Row } from "reactstrap";
import { AvField, AvForm } from "availity-reactstrap-validation";
import {
  CampaignRowValues,
  ICampaignRowItem,
} from "src/store/campaignsRow/actionTypes";
import Select from "src/components/UI/select";
import { useDispatch, useSelector } from "react-redux";
import { RootStoreType } from "src/store/storeTypes";
import { addCampaignRow, editCampaignRow } from "src/store/actions";
import { CapTypeName } from "src/constants/CapTypeName";
import "./ModalCompaignRowStyle.scss";
import { ActivityHoursType } from "src/types/ActivityHoursType";
import { DayOfWorkName } from "src/constants/DayOfWorkName";
import ActivityHourInputItem from "./ActivityHourInputItem";
import { CapTypeEnum } from "src/enums/CapTypeEnum";

interface Props {
  isOpen: boolean;
  toggleClose: () => void;
  campaignRow?: ICampaignRowItem | null;
  activeCRId: number;
}

const ModalCompaignRow = (props: Props) => {
  const { isOpen, toggleClose, campaignRow, activeCRId } = props;
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
        from: "00:00:01",
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

  const brandSelect = useMemo(() => {
    return (
      brands.brands.items.map(el => ({
        name: "brandId",
        value: el.id,
        label: el.name,
      })) || []
    );
  }, [brands]);

  const campaignSelect = useMemo(() => {
    return (
      campaigns.campaigns.items.map(el => ({
        name: "campaignId",
        value: el.id,
        label: el.name,
      })) || []
    );
  }, [campaigns]);

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

  const initialValues = useCallback((): CampaignRowValues => {
    return {
      brandId: campaignRow?.brandId || null,
      campaignId:
        campaignRow?.campaign.id ||
        campaignSelect.find(item => item.value === activeCRId)?.value ||
        null,
      priority: campaignRow?.priority || null,
      weight: campaignRow?.weight || null,
      capType: getDefaultNumberValue(campaignRow?.capType || CapTypeEnum.Lead),
      dailyCapValue: campaignRow?.dailyCapValue || null,
      information: campaignRow?.information || "",
      geoId: campaignRow?.geo.id || null,
      enableTraffic: !!campaignRow?.enableTraffic,
      activityHours: campaignRow?.activityHours || generateDefaultActiveHours(),
    };
  }, [campaignRow]);

  const [formValues, setValues] = useState<CampaignRowValues>(initialValues());

  // fun
  const handleValidSubmit = (values: CampaignRowValues) => {
    const data = {
      ...formValues,
      weight: Number(formValues.weight),
      dailyCapValue: Number(formValues.dailyCapValue),
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
  };

  const setFieldValue = (field: any, value: any) => {
    const obj = { ...formValues };
    //@ts-ignore
    obj[field] = value;
    setValues(obj);
  };

  const handleChange = (e: any) => {
    if (e?.target?.name) {
      setFieldValue(e?.target?.name, e.target.value);
    }
    if (e?.name) {
      setFieldValue(e.name, e.value);
    }
  };

  const handleClickEnableTrafic = () => {
    setFieldValue("enableTraffic", !formValues.enableTraffic);
  };

  const handleChangeActivityHours = (data: ActivityHoursType) => {
    const arr = formValues.activityHours?.map(item => {
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
    >
      <div className="modal-header">
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
      </div>

      {/*  */}
      <AvForm
        onValidSubmit={(e: SubmitEvent, values: CampaignRowValues) => {
          handleValidSubmit(values);
        }}
      >
        {/* Body */}
        <div className="modal-body">
          <Row className="justify-content-between">
            <Col xs={12} xl={5}>
              <Row>
                <Col xs={12} className="mb-4">
                  <h5>Set</h5>
                </Col>
                {/*  */}
                <Col xs={12} md={6} className="mb-3">
                  <Label>Brand*</Label>
                  <Select
                    isSearchable
                    isLoading={brands.loading}
                    options={brandSelect}
                    onChange={handleChange}
                    value={brandSelect.find(
                      item => item.value === formValues?.brandId
                    )}
                  />
                </Col>
                {/*  */}
                <Col xs={12} md={6} className="mb-3">
                  <Label>Campaign*</Label>
                  <Select
                    isSearchable
                    isLoading={campaigns.loading}
                    options={campaignSelect}
                    onChange={handleChange}
                    value={campaignSelect.find(
                      item => item.value === formValues.campaignId
                    )}
                  />
                </Col>
                {/*  */}
                <Col xs={12} md={6} className="mb-3">
                  <Label>GEO*</Label>
                  <Select
                    isSearchable
                    isLoading={geo.loading}
                    options={geoSelect}
                    onChange={handleChange}
                    value={geoSelect.find(
                      item => item.value === formValues.geoId
                    )}
                  />
                </Col>
                {/*  */}
                <Col xs={12} md={6} className="mb-3">
                  <Label>Priority*</Label>
                  <Select
                    isSearchable
                    options={prioritySelect}
                    onChange={handleChange}
                    value={prioritySelect.find(
                      item => item.value === formValues.priority
                    )}
                  />
                </Col>
                {/*  */}
                <Col xs={12} md={6} className="mb-3">
                  <AvField
                    name="weight"
                    label="Weight*"
                    type="number"
                    errorMessage="Invalid value"
                    validate={{
                      required: { value: true },
                    }}
                    onChange={handleChange}
                    value={formValues.weight}
                  />
                </Col>
                {/*  */}
                <Col xs={12} md={6} className="mb-3">
                  <Label>Cap Type</Label>
                  <Select
                    isSearchable
                    options={capTypeSelect}
                    onChange={handleChange}
                    value={capTypeSelect.find(
                      item => +item.value === formValues.capType
                    )}
                  />
                </Col>
                {/*  */}
                <Col xs={12} md={6} className="mb-3">
                  <AvField
                    name="dailyCapValue"
                    label="Enter daily cap"
                    type="number"
                    errorMessage="Invalid value"
                    validate={{
                      required: { value: formValues.capType !== null },
                    }}
                    value={formValues.dailyCapValue}
                    onChange={handleChange}
                    disabled={formValues.capType === null}
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
                {formValues.activityHours?.map(item => (
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
              <AvField
                name="information"
                label="Enter a description"
                type="textarea"
                errorMessage="Invalid value"
                onChange={handleChange}
                value={formValues.information}
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
                  defaultChecked={formValues.enableTraffic}
                  onChange={handleClickEnableTrafic}
                />
                <Label htmlFor="enableTraffic" className="d-flex m-0" />
              </div>
            </Col>
          </Row>
        </div>
        {/* Body */}
        {/* Footer  */}
        <div className="modal-footer">
          <div className="d-flex w-100 justify-content-center">
            <button type="submit" className="mr-10 btn custom-btn-success">
              {t("Save")}
            </button>

            <button
              type="button"
              className="btn custom-btn-light"
              onClick={toggleClose}
            >
              {t("Cancel")}
            </button>
          </div>
        </div>
        {/* Footer */}
      </AvForm>
    </Modal>
  );
};

export default ModalCompaignRow;
