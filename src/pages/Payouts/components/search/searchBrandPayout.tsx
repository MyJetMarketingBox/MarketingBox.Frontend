import React from "react";
import SimpleSearch from "../../../../components/UI/simpleSearch";
import {clearBrandPayouts, getBrandPayouts} from "../../../../store/brandPayouts/actions";

export default () => {
  const optionsSelect = [
    { value: "BrandId", label: "Search by BI" },
    { value: "Name", label: "Search by Name" },
    { value: "PayoutTypes", label: "Search by Payout Types" },
  ];

  return (
    <SimpleSearch
      options={optionsSelect}
      getDispatch={getBrandPayouts}
      clearDispatch={clearBrandPayouts}
    />
  );
};