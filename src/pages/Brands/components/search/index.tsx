import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearBrands, getBrands } from "../../../../store/brands/actions";
import c from "./SearchBrand.module.scss";
import SelectTypeSearch from "../../../../components/UI/simpleSearch";

export default () => {

  const optionsSelect = [
    {value: 'name', label: 'Search by name'},
    {value: 'id', label: 'Search by ID'},
    {value: 'integrationId', label: 'Search by Integration ID'}
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

  const getBrandByFilter = () => {
    if(value){
      const type = optionsSelect[searchType].value;
      const curFilter = { ...filter, [type]: value }
      dispatch(clearBrands());
      dispatch(getBrands(null, curFilter))
    }
  }

  const onKeypressHandler = (e: any) => {
    if(e.key === "Enter"){
      getBrandByFilter();
    }
  }

  const cancelHandleClick = () => {
    setValue('');
    dispatch(clearBrands());
    dispatch(getBrands(null, filter))
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
        onClick={getBrandByFilter}
      >
        <i className="bx bx-search-alt search-icon" />
      </button>
    </div>
  );

}
