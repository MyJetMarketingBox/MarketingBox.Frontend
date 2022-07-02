import React from "react";
import SimpleSearch from "../../../../components/UI/simpleSearch";
import {clearIntegrations, getIntegrations} from "../../../../store/integrations/actions";

const searchIntegration = () => {
  const optionsSelect = [
    { value: "name", label: "Search by Name" },
    { value: "id", label: "Search by ID" },
  ];

  return (
    <SimpleSearch
      options={optionsSelect}
      getDispatch={getIntegrations}
      clearDispatch={clearIntegrations}
    />
  )
}

export default searchIntegration;