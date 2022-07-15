import React from "react";
import SimpleSearch from "../../../../components/UI/simpleSearch"
import {clearRegistrations, getRegistrations} from "../../../../store/registrations/actions";

export default () => {
  const optionsSelect = [
    {value: 'RegistrationIds', label: 'Search by ID'},
    {value: 'email', label: 'Search by Email'},
    {value: 'FirstName', label: 'Search by First name'},
    {value: 'LastName', label: 'Search by Last name'},
    {value: 'Phone', label: 'Search by Phone'},
    {value: 'AffiliateIds', label: 'Search by Ai'},
    {value: 'CrmStatuses', label: 'Search by Call Status'},
    {value: 'CampaignIds', label: 'Search by Campaign ID'},
    {value: 'OfferIds', label: 'Search by Offer ID'},
    {value: 'BrandIds', label: 'Search by Brand ID'},
  ]

  return (
    <SimpleSearch options={optionsSelect} getDispatch={getRegistrations} clearDispatch={clearRegistrations}/>
  )
}