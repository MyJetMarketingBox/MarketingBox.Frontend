import React, { ChangeEvent } from "react";
import { Label, Input } from "reactstrap";
import { AvField } from "availity-reactstrap-validation";
import { DayOfWorkEnum } from "src/enums/DayOfWorkEnum";
import { ActivityHoursType } from "src/types/ActivityHoursType";
import { useTranslation } from "react-i18next";
import { DayOfWorkName } from "src/constants/DayOfWorkName";
import InputMask from "react-input-mask";

interface Props {
  onChange: (data: ActivityHoursType) => void;
  value: ActivityHoursType;
}

const ActivityHourInputItem = ({ value, onChange }: Props) => {
  const { t } = useTranslation();

  const handleChangeIsActive = () => {
    onChange({
      ...value,
      isActive: !value.isActive,
    });
  };

  const handleChangeFrom = (e: ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...value,
      from: (!e.target.value) ? "00:00:00" : e.target.value,
    });
  };

  const handleChangeTo = (e: ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...value,
      to: (!e.target.value) ? "23:59:59" : e.target.value,
    });
  };

  return (
    <div className="activity_hours_block">
      <span className="activity_hours_block-title">
        {t(DayOfWorkName[value.day])}
      </span>
      <div className="activity_hours_block-checkbox">
        <Input
          type="checkbox"
          id={`activity-day-${value.day}`}
          switch="success"

          onChange={handleChangeIsActive}
          defaultChecked={!!value.isActive}
        />
        <Label htmlFor={`activity-day-${value.day}`} />
      </div>

      <div className="d-flex ml-5">
        {/*<AvField
          name={`activity-day-from-${value.day}`}
          //type="time"
          //step="1"
          value={value.from || ""}
          onChange={handleChangeFrom}
        />*/}
        <InputMask
          name={`activity-day-from-${value.day}`}
          mask="99:99:99"
          placeholder="__:__:__"
          value={value.from || ""}
          className="form-control input-color text-end"
          onChange={handleChangeFrom}
          style={{padding: "0px", border: "unset", height: "30px", width: "100px"}}
          validate={{
            pattern: {
              value: '^([0-1]?\\d|2[0-3])(?::([0-5]?\\d))?(?::([0-5]?\\d))?$',
              errorMessage: 'Your name must be composed only with letter and numbers'
            },
          }}
        ></InputMask>
        <span style={{margin:"0px 10px", lineHeight: "2"}}> - </span>
        {/*<AvField
          name={`activity-day-to-${value.day}`}
          //type="time"
          //step="1"
          value={value.to || ""}
          onChange={handleChangeTo}
        />*/}
        <InputMask
          name={`activity-day-to-${value.day}`}
          mask="99:99:99"
          placeholder="__:__:__"
          value={value.to || ""}
          className="form-control input-color"
          onChange={handleChangeTo}
          style={{padding: "0px", border: "unset", height: "30px", width: "100px"}}
          validate={{
            pattern: {
              value: '^([0-1]?\\d|2[0-3])(?::([0-5]?\\d))?(?::([0-5]?\\d))?$',
              errorMessage: 'Your name must be composed only with letter and numbers'
            },
          }}
        ></InputMask>
      </div>
    </div>
  );
};

export default ActivityHourInputItem;
