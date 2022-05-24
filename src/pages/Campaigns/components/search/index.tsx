import React from "react";
import SimpleSearch from "../../../../components/UI/simpleSearch"
import { clearCampaigns, getCampaigns } from "../../../../store/campaigns/actions";

export default () => {
  const optionsSelect = [
    {value: 'Name', label: 'Search by Name'},
    {value: 'id', label: 'Search by ID'},
  ]

  return (
    <SimpleSearch options={optionsSelect} getDispatch={getCampaigns} clearDispatch={clearCampaigns}/>
  )
}