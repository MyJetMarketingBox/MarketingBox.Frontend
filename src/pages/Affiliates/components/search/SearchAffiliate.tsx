import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SelectTypeSearch from "../select/SelectTypeSearch";
import c from './SearchAffiliate.module.scss';
import { clearAffiliate, getAffiliates } from "../../../../store/affiliates/actions";

export default () => {
  const optionsSelect = [
    {value: 'username', label: 'Search by username'},
    {value: 'email', label: 'Search by Email'},
    {value: 'id', label: 'Search by AI'},
    {value: 'role', label: 'Search by Role'},
    {value: 'name', label: 'Search by Name'},
    {value: 'id', label: 'Search by AI'}
  ];

  const [searchType, setSearchType] = useState(0);
  const [value, setValue] = useState('');
  const dispatch = useDispatch();
  const { theme } = useSelector((state: any) => {
    return {
      theme: state.Layout.layoutMode
    }
  });
  const filter = {
    order: 1
  };

  const handleChangeSelect = (typeFilter: any) => {
    setSearchType(typeFilter);
  }

  const onChangeHandler = (e: any) => {
    setValue(e.target.value);
  }

  const getAffiliateByFilter = () => {
    if (value) {
      const type = optionsSelect[searchType].value;
      const curFilter = { ...filter, [type]: value }
      dispatch(clearAffiliate());
      dispatch(getAffiliates(null, curFilter));
    }
  }

  const onKeypressHandler = (e: any) => {
    if (e.key === "Enter") {
      getAffiliateByFilter();
    }
  }

  const cancelHandleClick = () => {
    setValue('');
    dispatch(clearAffiliate());
    dispatch(getAffiliates(null, filter));
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
          onKeyPress={onKeypressHandler}
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
