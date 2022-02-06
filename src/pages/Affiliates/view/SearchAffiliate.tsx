import c from './SearchAffiliate.module.css';
import SelectTypeSearch from "./SelectTypeSearch";
import { useState } from "react";

export default (props: any) => {
  const optionsSelect = [
    {value: 'username', label: 'Search by username'},
    {value: 'email', label: 'Search by Email'},
    {value: 'role', label: 'Search by Role'},
    {value: 'name', label: 'Search by Name'}
  ];

  const [searchType, setSearchType] = useState(0);

  const handleChangeSelect = (idx: any) => {
    setSearchType(idx)
  }

  return (
    <div className={c['search-aff']}>
      <SelectTypeSearch
        options={optionsSelect}
        curValue={searchType}
        handleChange={handleChangeSelect}
      />
      <div>
        <input type="text" placeholder={optionsSelect[searchType].label} />
      </div>
    </div>
  );
}
