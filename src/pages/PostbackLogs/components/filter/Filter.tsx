import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import SelectTypeSearch from "../../../Affiliates/components/select/SelectTypeSearch";
import s from "../filter/FilterReg.module.scss";
import {clearRegistrations, getRegistrations} from "../../../../store/registrations/actions";
import { AffiliateRole, registrationModel } from "../../../../common/utils/model";

import {
  Col,
} from "reactstrap";
import { AvField } from "availity-reactstrap-validation";

export default (props: any) => {
  const dispatch = useDispatch();

  const optionsSelect = [
    {value: 'affiliateId', label: 'Search by AI'},
    {value: 'httpQueryType', label: 'Search by Method'},
    {value: 'eventType', label: 'Search by Event'},
  ];

  const [searchType, setSearchType] = useState(0);
  const [value, setValue] = useState('');

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

  const getRegByFilter = () => {
    if (value) {
      const type = optionsSelect[searchType].value;
      const curFilter = { ...filter, [type]: value }
      console.log(curFilter);
      //dispatch(clearRegistrations());
      //dispatch(getRegistrations(null, curFilter));
    }
  }

  const onKeypressHandler = (e: any) => {
    if (e.key === "Enter") {
      getRegByFilter();
    }
  }

  const cancelHandleClick = () => {
    setValue('');
    //dispatch(clearRegistrations());
    //dispatch(getRegistrations(null, filter));
  }

  const classesContainer = [s['search-aff']];
  if (theme === 'dark') classesContainer.push(s['dark'])

  return(
    <>
      <Col md={4}>
        <div className={classesContainer.join('')}>
          <SelectTypeSearch
            options={optionsSelect}
            curValue={searchType}
            handleChange={handleChangeSelect}
            theme={theme}
          />
          <div className={s['search-aff-input']}>
            <input
              type="text"
              value={value}
              onChange={onChangeHandler}
              onKeyPress={onKeypressHandler}
              placeholder={optionsSelect[searchType].label} />
          </div>
          <button
            type="button"
            className={s['search-aff-btn-cancel']}
            onClick={cancelHandleClick}
          />
          <button
            type="button"
            className={s['search-aff-btn']}
            onClick={getRegByFilter}
          >
            <i className="bx bx-search-alt search-icon" />
          </button>
        </div>
      </Col>

    </>
  )
}