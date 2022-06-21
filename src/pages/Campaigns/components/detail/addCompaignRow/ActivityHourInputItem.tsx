import React, { ChangeEvent } from "react";
import { Label, Input } from "reactstrap";
import { AvField } from "availity-reactstrap-validation";
import { DayOfWorkEnum } from "src/enums/DayOfWorkEnum";
import { ActivityHoursType } from "src/types/ActivityHoursType";
import { useTranslation } from "react-i18next";
import { DayOfWorkName } from "src/constants/DayOfWorkName";

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
      from: e.target.value,
    });
  };

  const handleChangeTo = (e: ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...value,
      to: e.target.value,
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

      <div className="d-flex">
        <AvField
          name={`activity-day-from-${value.day}`}
          type="time"
          value={value.from || ""}
          onChange={handleChangeFrom}
        />
        &nbsp;
        <AvField
          name={`activity-day-to-${value.day}`}
          type="time"
          value={value.to || ""}
          onChange={handleChangeTo}
        />
      </div>
    </div>
  );
};

export default ActivityHourInputItem;
