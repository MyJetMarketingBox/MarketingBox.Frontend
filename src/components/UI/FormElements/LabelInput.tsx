import React, { ChangeEvent, forwardRef, useState } from "react";
import { FormFeedback, Input, Label } from "reactstrap";
import classnames from "classnames";

interface Props {
  label?: string;
  name: string;
  placeholder?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: ChangeEvent<HTMLInputElement>) => void;
  hasError?: boolean;
  errorText?: string;
  value: string;
  type?: "email" | "text" | "password" | "number";
}

const LabelInput = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const [showPass, setShowPasss] = useState(false);

  const toggleShowPass = () => {
    if (type !== "password") {
      return;
    }
    setShowPasss(!showPass);
  };

  const {
    label,
    value,
    name,
    placeholder,
    onChange,
    hasError,
    errorText,
    type = "text",
    onBlur,
  } = props;

  return (
    <div className="mb-3">
      <div className="form-floating">
        {type === "password" && (
          <div className="auth-page-form-pass-toggle" onClick={toggleShowPass}>
            {showPass ? "HIDE" : "SHOW"}
          </div>
        )}

        <Input
          innerRef={ref}
          id={name}
          name={name}
          placeholder={placeholder}
          invalid={hasError}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          type={type === "password" ? (showPass ? "text" : type) : type}
        />
        {label && (
          <Label
            for={name}
            className={classnames({
              "text-uppercase": !!value,
            })}
          >
            {value ? label : placeholder}
          </Label>
        )}
        <FormFeedback itemType="invalid">{errorText}</FormFeedback>
      </div>
    </div>
  );
});

export default LabelInput;
