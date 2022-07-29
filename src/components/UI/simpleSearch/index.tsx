import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import c from "./simpleSearch.module.scss";
import SelectTypeSearch from "./SelectTypeSearch";
import Flatpickr from "react-flatpickr";
import { getUpdateDate } from "../../../helpers/getUpdateDate";

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
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [dateFilter, setDateFilter] = useState<string>("");

  const filter = {
    order: 1,
    limit: 50
  };

  const handleChangeSelect = (typeFilter: any) => {
    setSearchType(typeFilter);
  }

  const onChangeHandler = (e: any) => {
    setValue(e.target.value);
  }

  const getFilter = () => {
    if (value || (fromDate && toDate)) {
      const type = options[searchType].value;
      const curFilter = (type === "days")
        ? {...filter, FromDate: fromDate+"T00:00:00Z", ToDate: toDate+"T23:59:59Z"}
        : { ...filter, [type]: value }
      //const curFilter = { ...filter, [type]: value }
      dispatch(clearDispatch());
      dispatch(getDispatch(null, curFilter));
    }
  }

  const onKeypressHandler = (e: any) => {
    if (e.key === "Enter") {
      getFilter();
    }
  }

  const setDateOnFilter = (data: any) => {
    if (data.length > 1) {
      const from = getUpdateDate(data[0].getTime());
      const to = getUpdateDate(data[1].getTime());

      setFromDate(from);
      setToDate(to);
      setDateFilter(`${from} to ${to}`);
    }
  };

  const cancelHandleClick = () => {
    setValue('');
    setFromDate('');
    setToDate('');
    setDateFilter('');
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
        {options[searchType].value === "days" ? (
          <Flatpickr
            className={`form-control d-block ${c["flp-height"]}`}
            placeholder="Select Date Range"
            options={{
              mode: "range",
              dateFormat: "Y-m-d",
            }}
            value={dateFilter}
            onChange={setDateOnFilter}
          />
        ):(
          <input
          type="text"
          value={value}
          onChange={onChangeHandler}
          onKeyPress={onKeypressHandler}
          placeholder={options[searchType].label} />
        )}

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
