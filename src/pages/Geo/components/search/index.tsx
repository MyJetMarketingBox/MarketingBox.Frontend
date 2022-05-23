import React from "react";
import SimpleSearch from "../../../../components/UI/simpleSearch"
import { clearGeo, getGeo } from "../../../../store/geo/actions";

export default () => {
  const optionsSelect = [
    {value: 'Name', label: 'Search by Name'},
    {value: 'GeoId', label: 'Search by ID'},
  ]

  return (
    <SimpleSearch options={optionsSelect} getDispatch={getGeo} clearDispatch={clearGeo}/>
  )
}