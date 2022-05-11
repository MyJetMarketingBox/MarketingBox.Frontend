import React from "react";
import SimpleSearch from "../../../../components/UI/simpleSearch"
import {clearRegistrations, getRegistrations} from "../../../../store/registrations/actions";

/*<ul data-v-71a2da90="" className="showColumnList" style="--opacity:1;">


  <li data-v-71a2da90="" className="">
    Search by Affiliate
  </li>
  <li data-v-71a2da90="" className="">
    Search by Ci
  </li>
  <li data-v-71a2da90="" className="">
    Search by Campaign
  </li>
  <li data-v-71a2da90="" className="">
    Search by Gi
  </li>
  <li data-v-71a2da90="" className="">
    Search by Box
  </li>
  <li data-v-71a2da90="" className="">
    Search by Brand
  </li>
  <li data-v-71a2da90="" className="">
    Search by Offer
  </li>
  <li data-v-71a2da90="" className="">
    Search by Country Code
  </li>
  <li data-v-71a2da90="" className="">
    Search by Country
  </li>
  <li data-v-71a2da90="" className="">
    Search by Unique ID
  </li>
  <li data-v-71a2da90="" className="">
    Search by Customer ID
  </li>


  <li data-v-71a2da90="" className="">
    Search by Prefix
  </li>
  <li data-v-71a2da90="" className="">
    Search by Call Status
  </li>
</ul>*/

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