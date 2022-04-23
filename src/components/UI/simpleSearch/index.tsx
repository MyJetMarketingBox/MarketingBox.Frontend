import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import c from './simpleSearch.module.scss';
import SelectTypeSearch from "../../../pages/Affiliates/components/select/SelectTypeSearch";

export default (props: any) => {
  const dispatch = useDispatch();

  const { theme } = useSelector((state: any) => {
    return {
      theme: state.Layout.layoutMode
    }
  });

  const { options, getDispatch, clearDispatch } = props;

  const [searchType, setSearchType] = useState(0);
  const [value, setValue] = useState('');

  const filter = {
    order: 1
  };

  const handleChangeSelect = (typeFilter: any) => {
    setSearchType(typeFilter);
  }

  const onChangeHandler = (e: any) => {
    setValue(e.target.value);
  }

  const getFilter = () => {
    if (value) {
      const type = options[searchType].value;
      const curFilter = { ...filter, [type]: value }
      dispatch(clearDispatch());
      dispatch(getDispatch(null, curFilter));
    }
  }

  const onKeypressHandler = (e: any) => {
    if (e.key === "Enter") {
      getFilter();
    }
  }

  const cancelHandleClick = () => {
    setValue('');
    dispatch(clearDispatch());
    dispatch(getDispatch(null, filter));
  }

  const classesContainer = [c['search-aff']];
  if (theme === 'dark') classesContainer.push(c['dark'])

  return (
    <div className={classesContainer.join(' ')}>
      <SelectTypeSearch
        options={options}
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
          placeholder={options[searchType].label} />
      </div>
      <button
        type="button"
        className={c['search-aff-btn-cancel']}
        onClick={cancelHandleClick}
      />
      <button
        type="button"
        className={c['search-aff-btn']}
        onClick={getFilter}
      >
        <i className="bx bx-search-alt search-icon" />
      </button>
    </div>
  );
}
