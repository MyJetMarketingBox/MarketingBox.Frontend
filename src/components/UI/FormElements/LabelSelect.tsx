import React, { ChangeEvent, FC } from "react";
import { FormFeedback, Input } from "reactstrap";
import classnames from "classnames";

interface Props {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  name: string;
  value: string;
  hasError?: boolean;
  errorText?: string;
}

const LabelSelect: FC<Props> = ({
  children,
  onChange,
  onBlur,
  name,
  value,
  hasError,
  errorText,
  label,
}) => {
  return (
    <div
      className={classnames("mb-3", {
        "form-floating": !!value && label,
      })}
    >
      <Input
        type="select"
        value={value}
        className="form-select form-control"
        id={name}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        invalid={!!hasError}
      >
        {children}
      </Input>
      {label && !!value && <label htmlFor={name}>{label}</label>}
      <FormFeedback itemType="invalid">{errorText}</FormFeedback>
    </div>
  );
};

export default LabelSelect;
