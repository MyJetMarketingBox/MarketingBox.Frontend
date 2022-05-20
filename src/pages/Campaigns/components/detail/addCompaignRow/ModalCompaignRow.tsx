import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Col, Label, Input, Modal, Row } from "reactstrap";
import { AvField, AvForm } from "availity-reactstrap-validation";
import { ICampaignRowItem } from "src/store/campaignsRow/actionTypes";
import Select from "src/components/UI/select";
import { useDispatch, useSelector } from "react-redux";
import { getCampaigns } from "src/store/campaigns/actions";
import { RootStoreType } from "src/store/storeTypes";
import { getGeo } from "src/store/actions";
import { CapTypeEnum } from "src/enums/CapTypeEnum";
import { CapTypeName } from "src/constants/CapTypeName";
import "./ModalCompaignRowStyle.scss";
import { DayOfWorkEnum } from "src/enums/DayOfWorkEnum";
import { ActivityHoursType } from "src/types/ActivityHoursType";

interface Props {
  isOpen: boolean;
  toggleClose: () => void;
  campaignRow?: ICampaignRowItem | null;
}
interface CampaignRowValues {
  brandId: number | null;
  campaignId: number | null;
  priority: number | null;
  weight: number | null;
  capType: CapTypeEnum | null;
  dailyCapValue?: string;
  activityHours: ActivityHoursType[] | null;
  information: string;
  geoId: number | null;
  enableTraffic: boolean;
}

const ModalCompaignRow = ({
  isOpen,
  toggleClose,
  campaignRow = null,
}: Props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const initialValues: CampaignRowValues = useMemo(() => {
    return {
      brandId: null,
      campaignId: campaignRow?.campaign.id || null,
      priority: null,
      weight: null,
      capType: null,
      dailyCapValue: "",
      information: "",
      geoId: null,
      enableTraffic: true,
      activityHours: null,
    };
  }, [campaignRow]);

  const [formValues, setValues] = useState<CampaignRowValues>(initialValues);

  const setFieldValue = (field: string, value: any) => {
    console.log(`${field} `, value);
  };

  // data
  const { campaigns, geo } = useSelector((store: RootStoreType) => {
    return {
      campaigns: store.Campaigns,
      geo: store.Geo,
    };
  });

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

  // fun
  const handleValidSubmit = (values: CampaignRowValues) => {
    console.log(values);
  };

  const handleChange = (e: any) => {
    if (e?.name) {
      setFieldValue(e.name, e.value);
    }
  };
  // effects

  useEffect(() => {
    dispatch(getCampaigns());
    dispatch(getGeo());
  }, []);

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
            ? `${t("Edit Row")} - ${campaignRow.campaignRowId}`
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
          <Row>
            <Col>
              <h5>Set</h5>
            </Col>
          </Row>
          <Row className="mb-4">
            <Col xs={12} md={4} xl={2}>
              <Label>Campaign*</Label>
              <Select
                isSearchable
                isLoading={campaigns.loading}
                options={campaignSelect}
                onChange={handleChange}
              />
            </Col>
            <Col xs={12} md={4} xl={2}>
              <Label>GEO*</Label>
              <Select
                isSearchable
                isLoading={geo.loading}
                options={geoSelect}
                onChange={handleChange}
              />
            </Col>
            <Col xs={12} md={4} xl={2}>
              <Label>Priority*</Label>
              <Select
                isSearchable
                options={prioritySelect}
                onChange={handleChange}
              />
            </Col>
            <Col xs={12} md={4} xl={2}>
              <AvField
                name="weight"
                label="Weight*"
                type="number"
                errorMessage="Invalid value"
                validate={{
                  required: { value: true },
                }}
                value=""
              />
            </Col>
            <Col xs={12} md={4} xl={2}>
              <Label>Cap Type</Label>
              <Select
                isSearchable
                options={capTypeSelect}
                onChange={handleChange}
              />
            </Col>
            <Col xs={12} md={4} xl={2}>
              <AvField
                name="dailyCapValue"
                label="Enter daily cap"
                type="number"
                errorMessage="Invalid value"
                validate={{
                  required: { value: true },
                }}
                value=""
              />
            </Col>
          </Row>

          <Row className="mb-4">
            <Col xs={12}>
              <h5>Activity Hours</h5>
            </Col>

            <Row>
              <Col xs={12} xl={5}>
                <Row>
                  <Col xs={12}>
                    <div className="activity_hours_block">
                      <span className="activity_hours_block-title">Sunday</span>
                      <div className="activity_hours_block-checkbox">
                        <Input
                          type="checkbox"
                          id="switch1"
                          switch="success"
                          defaultChecked
                        />
                        <Label htmlFor="switch1" />
                      </div>

                      <div className="d-flex">
                        <AvField name="day-11" type="time" value="" />
                        &nbsp;
                        <AvField name="day-12" type="time" value="" />
                      </div>
                    </div>
                  </Col>
                  <Col xs={12}>
                    <div className="activity_hours_block">
                      <span className="activity_hours_block-title">Monday</span>
                      <div className="activity_hours_block-checkbox">
                        <Input
                          type="checkbox"
                          id="switch1"
                          switch="success"
                          defaultChecked
                        />
                        <Label htmlFor="switch1" />
                      </div>

                      <div className="d-flex">
                        <AvField name="day-1" type="time" value="" />
                        &nbsp;
                        <AvField name="day-1" type="time" value="" />
                      </div>
                    </div>
                  </Col>
                  <Col xs={12}>
                    <div className="activity_hours_block">
                      <span className="activity_hours_block-title">
                        Tuesday
                      </span>
                      <div className="activity_hours_block-checkbox">
                        <Input
                          type="checkbox"
                          id="switch1"
                          switch="success"
                          defaultChecked
                        />
                        <Label htmlFor="switch1" />
                      </div>

                      <div className="d-flex">
                        <AvField name="day-1" type="time" value="" />
                        &nbsp;
                        <AvField name="day-1" type="time" value="" />
                      </div>
                    </div>
                  </Col>
                  <Col xs={12}>
                    <div className="activity_hours_block">
                      <span className="activity_hours_block-title">
                        Wednesday
                      </span>
                      <div className="activity_hours_block-checkbox">
                        <Input
                          type="checkbox"
                          id="switch1"
                          switch="success"
                          defaultChecked
                        />
                        <Label htmlFor="switch1" />
                      </div>

                      <div className="d-flex">
                        <AvField name="day-1" type="time" value="" />
                        &nbsp;
                        <AvField name="day-1" type="time" value="" />
                      </div>
                    </div>
                  </Col>
                  <Col xs={12}>
                    <div className="activity_hours_block">
                      <span className="activity_hours_block-title">
                        Thursday
                      </span>
                      <div className="activity_hours_block-checkbox">
                        <Input
                          type="checkbox"
                          id="switch1"
                          switch="success"
                          defaultChecked
                        />
                        <Label htmlFor="switch1" />
                      </div>

                      <div className="d-flex">
                        <AvField name="day-1" type="time" value="" />
                        &nbsp;
                        <AvField name="day-1" type="time" value="" />
                      </div>
                    </div>
                  </Col>
                  <Col xs={12}>
                    <div className="activity_hours_block">
                      <span className="activity_hours_block-title">Friday</span>
                      <div className="activity_hours_block-checkbox">
                        <Input
                          type="checkbox"
                          id="switch1"
                          switch="success"
                          defaultChecked
                        />
                        <Label htmlFor="switch1" />
                      </div>

                      <div className="d-flex">
                        <AvField name="day-1" type="time" value="" />
                        &nbsp;
                        <AvField name="day-1" type="time" value="" />
                      </div>
                    </div>
                  </Col>
                  <Col xs={12}>
                    <div className="activity_hours_block">
                      <span className="activity_hours_block-title">
                        Saturday
                      </span>
                      <div className="activity_hours_block-checkbox">
                        <Input
                          type="checkbox"
                          id="switch1"
                          switch="success"
                          defaultChecked
                        />
                        <Label htmlFor="switch1" />
                      </div>

                      <div className="d-flex">
                        <AvField name="day-1" type="time" value="" />
                        &nbsp;
                        <AvField name="day-1" type="time" value="" />
                      </div>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
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
                value=""
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
                  defaultChecked
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
