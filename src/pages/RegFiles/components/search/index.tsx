import React from "react";
import SimpleSearch from "../../../../components/UI/simpleSearch";

import {
  getRegFiles,
  clearRegFiles
} from "../../../../store/regFiles/actions";

export default () => {
  const optionsSelect = [
    { value: "FileName", label: "Search by File Name" }
  ];

  return (
    <SimpleSearch
      options={optionsSelect}
      getDispatch={getRegFiles}
      clearDispatch={clearRegFiles}
    />
  )
}