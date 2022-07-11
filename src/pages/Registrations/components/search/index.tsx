import React from "react";
import SimpleSearch from "../../../../components/UI/simpleSearch"
import {clearRegistrations, getRegistrations} from "../../../../store/registrations/actions";

export default () => {
  const optionsSelect = [
    {value: 'email', label: 'Search by Email'},
    {value: 'FirstName', label: 'Search by First name'},
    {value: 'LastName', label: 'Search by Last name'},
    {value: 'Phone', label: 'Search by Phone'},
    {value: 'AffiliateIds', label: 'Search by Ai'},
  ]

  return (
    <SimpleSearch options={optionsSelect} getDispatch={getRegistrations} clearDispatch={clearRegistrations}/>
  )
}