import React, { useEffect, useState } from "react";
import { Col, Collapse } from "reactstrap";
import SearchOffers from "../SearchOffers";
import OffersFilter from "../OffersFilter";
import { clearOffersStore, getOffers } from "../../../../store/offers/actions";
import { useDispatch } from "react-redux";

export default ({handleOpenModal}: any) => {
  const dispatch = useDispatch();

  const [collapse, setCollapse] = useState(false);
  const [countFilter, setCountFilter] = useState<number>(0);
  const [params, setParams] = useState({ limit: 12 });
  const [clearFilterParams, setClearFilterParams] = useState<number>(0);

  useEffect(() => {

    console.log(params);
    dispatch(getOffers("", params));

    return () => {
      dispatch(clearOffersStore());
    };
  }, [params]);

  const handleChangeFilter = (values: any) => {
    setParams({ ...values, limit: 12 });
  };

  const handleClearFilter = () => {
    setParams({
      limit: 12,
    });
    let cnt = clearFilterParams + 1;
    setClearFilterParams(cnt);
    setCountFilter(0);
  };

  const toggleCollapse = () => {
    setCollapse(!collapse);
  };

  return (
    <>
      <Col className="col-12 col-md-4 mb-3">
        <SearchOffers />
      </Col>

      <Col className="col-12 col-md-8 text-end">
        {collapse && (
          <button
            className="btn btn-light mr-10 fw-bold"
            type="button"
            onClick={handleClearFilter}
          >
            Clear
          </button>
        )}

        <button
          className="btn btnOrange mr-10"
          type="button"
          onClick={toggleCollapse}
        >
          {collapse ? (
            <>
              Hide filters
              <span className="count-white ml-10">{countFilter}</span>
            </>
          ) : (
            <>
              Open filters
              <i className="bx bx-filter me-1 font-size-20 icon" />
            </>
          )}
        </button>

        <button className="btn btn-dark-blue" onClick={handleOpenModal}>
          Add Offer
        </button>
      </Col>

      <div className="accordion mt-3" id="accordion">
        <Collapse isOpen={collapse} className="accordion-collapse">
          <div className="accordion-body">
            <OffersFilter
              //onClearFilter={handleClearFilter}
              onFilter={handleChangeFilter}
              setCountFilter={setCountFilter}
              clearFilterParams={clearFilterParams}
            />
          </div>
        </Collapse>
      </div>
    </>
  )
}