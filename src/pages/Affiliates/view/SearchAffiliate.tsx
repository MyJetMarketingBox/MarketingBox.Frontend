import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SelectTypeSearch from "./SelectTypeSearch";
import c from './SearchAffiliate.module.scss';
import { clearAffiliate, getAffiliates } from "../../../store/affiliates/actions";

export default () => {
  const optionsSelect = [
    {value: 'username', label: 'Search by username'},
    {value: 'email', label: 'Search by Email'},
    {value: 'role', label: 'Search by Role'},
    {value: 'name', label: 'Search by Name'}
  ];

  const [searchType, setSearchType] = useState(0);
  const [value, setValue] = useState('');
  const dispatch = useDispatch();
  const { theme } = useSelector((state: any) => {
    return {
      theme: state.Layout.layoutMode
    }
  })

  const handleChangeSelect = (typeFilter: any) => {
    setSearchType(typeFilter);
  }

  const onChangeHandler = (e: any) => {
    setValue(e.target.value);
  }

  const getAffiliateByFilter = () => {
    const type = optionsSelect[searchType].value;
    if (value) {
      dispatch(clearAffiliate());
      dispatch(getAffiliates(null, {[type]: value}));
    }
  }

  const cancelHandleClick = () => {
    setValue('');
    dispatch(clearAffiliate());
    dispatch(getAffiliates(null, {}));
  }

  const classesContainer = [c['search-aff']];
  if (theme === 'dark') classesContainer.push(c['dark'])

  return (
    <div className={classesContainer.join(' ')}>
      <SelectTypeSearch
        options={optionsSelect}
        curValue={searchType}
        handleChange={handleChangeSelect}
        theme={theme}
      />
      <div className={c['search-aff-input']}>
        <input
          type="text"
          value={value}
          onChange={onChangeHandler}
          placeholder={optionsSelect[searchType].label} />
      </div>
      <button
        type="button"
        className={c['search-aff-btn-cancel']}
        onClick={cancelHandleClick}
      />
      <button
        type="button"
        className={c['search-aff-btn']}
        onClick={getAffiliateByFilter}
      >
        <i className="bx bx-search-alt search-icon" />
      </button>
    </div>
  );
}
