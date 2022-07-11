import React from "react";
import {clearPostback, getPostbacks} from "../../../../store/postback/actions";
import SimpleSearch from "../../../../components/UI/simpleSearch";

export default () => {
  const optionsSelect = [
    {value: 'AffiliateName', label: 'Search by Affiliate Name'},
    {value: 'AffiliateIds', label: 'Search by AI'},
  ];

  return (
    <SimpleSearch options={optionsSelect} getDispatch={getPostbacks} clearDispatch={clearPostback}/>
  )
}