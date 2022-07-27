import React from "react";
import {clearReports, getReports} from "../../../../store/reports/actions";
import SimpleSearch from "../../../../components/UI/simpleSearch";

export default () => {
  const optionsSelect = [
    {value: 'Name', label: 'Search by Name'},
  ]

  return (
    <SimpleSearch options={optionsSelect} getDispatch={getReports} clearDispatch={clearReports}/>
  )
}