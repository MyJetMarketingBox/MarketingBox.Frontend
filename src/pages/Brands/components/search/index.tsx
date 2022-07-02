import React, { useState } from "react";
import { clearBrands, getBrands } from "../../../../store/brands/actions";
import SimpleSearch from "../../../../components/UI/simpleSearch";

export default () => {

  const optionsSelect = [
    {value: 'name', label: 'Search by Name'},
    {value: 'id', label: 'Search by Brand ID'},
    {value: 'integrationId', label: 'Search by Integration ID'}
  ];

  return (
    <SimpleSearch options={optionsSelect} getDispatch={getBrands} clearDispatch={clearBrands}/>
  );

}
