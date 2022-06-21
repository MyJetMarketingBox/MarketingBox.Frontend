import React from "react";
import SimpleSearch from "src/components/UI/simpleSearch";
import { clearOffersStore, getOffers } from "src/store/actions";

const SearchOffers = () => {
  const optionsSelect = [
    {value: 'offerName', label: 'Search by Name'},
    {value: 'id', label: 'Search by ID'},
  ]

  return (
    <SimpleSearch options={optionsSelect} getDispatch={getOffers} clearDispatch={clearOffersStore}/>
  )
};

export default SearchOffers;
