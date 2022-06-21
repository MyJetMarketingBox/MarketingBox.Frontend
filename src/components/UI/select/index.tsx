import React from "react";
import Select from "react-select";
import { useSelector } from "react-redux";

export default (props: any) => {
  const { theme } = useSelector((state: any) => {
    return {
      theme: state.Layout.layoutMode,
    };
  });

  const colourStyles =
    theme === "dark"
      ? {
          control: (styles: any) => ({ ...styles, backgroundColor: "white" }),
          option: (
            styles: any,
            { data, isDisabled, isFocused, isSelected }: any
          ) => {
            return {
              ...styles,
              backgroundColor: isSelected
                ? "#E74A18"
                : isFocused
                ? "#858d98"
                : "#363a38",
              // color: '#FFF',
            };
          },
        }
      : {
          control: (styles: any) => ({ ...styles, backgroundColor: "white" }),
          option: (
            styles: any,
            { data, isDisabled, isFocused, isSelected }: any
          ) => {
            return {
              ...styles,
              backgroundColor: isSelected
                ? "#E74A18"
                : isFocused
                ? "#f2f2f2"
                : "#ffffff",
              // color: '#FFF',
            };
          },
        };

  return (
    <Select
      {...props}
      className="react-select-container"
      classNamePrefix="react-select"
      styles={colourStyles}
    />
  );
};
