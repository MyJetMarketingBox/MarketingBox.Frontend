import React from "react";
import SimpleSearch from "../../../../components/UI/simpleSearch";
import {
  clearAffiliate,
  getAffiliates,
} from "../../../../store/affiliates/actions";

export default () => {
  const optionsSelect = [
    { value: "username", label: "Search by Username" },
    { value: "email", label: "Search by Email" },
    { value: "id", label: "Search by AI" },
    { value: "phone", label: "Search by Phone" },
  ];

  return (
    <SimpleSearch
      options={optionsSelect}
      getDispatch={getAffiliates}
      clearDispatch={clearAffiliate}
    />
  );
};
