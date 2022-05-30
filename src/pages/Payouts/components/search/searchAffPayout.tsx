import React from "react";
import SimpleSearch from "../../../../components/UI/simpleSearch";
import {
  clearAffPayouts,
  getAffPayouts
} from "../../../../store/affiliatePayouts/actions";

export default () => {
  const optionsSelect = [
    { value: "AffiliateId", label: "Search by AI" },
    { value: "Name", label: "Search by Name" },
    { value: "PayoutTypes", label: "Search by Payout Types" },
  ];

  return (
    <SimpleSearch
      options={optionsSelect}
      getDispatch={getAffPayouts}
      clearDispatch={clearAffPayouts}
    />
  );
};