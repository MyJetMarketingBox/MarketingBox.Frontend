import React from "react";
import SimpleSearch from "../../../../components/UI/simpleSearch"
import {getPostbackLogs, clearPostbackLogs} from "../../../../store/postback_logs/actions";

export default () => {
  const optionsSelect = [
    { value: 'AffiliateName', label: 'Search by Affiliate Name' },
    { value: 'AffiliateIds', label: 'Search by Ai' },
    { value: 'RegistrationUId', label: 'Search by Unique ID' },
  ]

  return (
      <SimpleSearch options={optionsSelect} getDispatch={getPostbackLogs} clearDispatch={clearPostbackLogs}/>
  )
}