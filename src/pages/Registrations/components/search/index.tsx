import React from "react";
import SimpleSearch from "../../../../components/UI/simpleSearch"
import {clearRegistrations, getRegistrations} from "../../../../store/registrations/actions";

export default () => {
  const optionsSelect = [
    {value: 'name', label: 'Search by Name'},
    {value: 'email', label: 'Search by Email'},
  ]

  return (
    <SimpleSearch options={optionsSelect} getDispatch={getRegistrations} clearDispatch={clearRegistrations}/>
  )
}