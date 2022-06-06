import React from "react";
import SimpleSearch from "../../../../components/UI/simpleSearch";
import {
  getRedistribution,
  clearRedistribution
} from "../../../../store/redistribution/actions";

export default () => {
  const optionsSelect = [
    { value: "Name", label: "Search by Name" },
  ];

  return (
    <SimpleSearch
      options={optionsSelect}
      getDispatch={getRedistribution}
      clearDispatch={clearRedistribution}
    />
  )
}