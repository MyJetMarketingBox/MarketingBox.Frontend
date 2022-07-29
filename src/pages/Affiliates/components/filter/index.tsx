import React, { useEffect, useState } from "react";
import { getUpdateDate } from "../../../../helpers/getUpdateDate";
import { Col, Collapse, Row } from "reactstrap";
import SearchAff from "../search/SearchAffiliate"
import { AvForm } from "availity-reactstrap-validation";
import Flatpickr from "react-flatpickr";
import { useDispatch, useSelector } from "react-redux";
import { clearAffiliate, getAffiliates } from "../../../../store/affiliates/actions";
import { RootStoreType } from "../../../../store/storeTypes";

export default ({filter, toggleAddAff} : any) => {
  const dispatch = useDispatch();

  const [collapse, setCollapse] = useState<boolean>(false);
  const [countFilter, setCountFilter] = useState<number>(0);
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [dateFilter, setDateFilter] = useState<string>(`${fromDate} to ${toDate}`);

  const {loading} = useSelector((state: RootStoreType) => {
    return {
      loading: state.Affiliates.loading,
    }
  })

  const setDateOnFilter = (data: any) => {
    if (data.length > 1) {
      const from = getUpdateDate(data[0].getTime());
      const to = getUpdateDate(data[1].getTime());

      setFromDate(from);
      setToDate(to);
      setDateFilter(`${from} to ${to}`);
    }
  };

  useEffect(() => {
    let count = 0;
    fromDate || toDate ? (count += 1) : null;

    setCountFilter(count);
  });

  const toggleCollapse = () => {
    setCollapse(!collapse);
  };

  const handleFilterSubmit = () => {
    const curFilter = {
      ...filter,
      FromDate: fromDate ? fromDate+"T00:00:00Z" : null,
      ToDate: toDate ? toDate+"T23:59:59Z" : null,
    }

    dispatch(clearAffiliate());
    dispatch(getAffiliates(null, curFilter));
  }

  const handleClearFilter = () => {
    setFromDate("");
    setToDate("");
    setDateFilter("");

    dispatch(clearAffiliate());
    dispatch(getAffiliates(null, filter));
  }


  return (
    <>
      <Col className="col-md-4 col-12 mb-1">
        <SearchAff />
      </Col>
      <Col className="col-md-8 col-12 mt-1 text-end ">
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
              {countFilter >= 0 ? (
                <span className="count-white ml-10">{countFilter}</span>
              ) : (
                <i className="bx bx-filter me-1 font-size-20 icon" />
              )}
            </>
          ) : (
            <>
              Open filters
              <i className="bx bx-filter me-1 font-size-20 icon" />
            </>
          )}
        </button>

        <button
          type="button"
          className="btn btn-dark-blue"
          onClick={() => toggleAddAff(true)}
        >
          Add New
        </button>
      </Col>

      <div className="accordion mt-3" id="accordion">
        <Collapse isOpen={collapse} className="accordion-collapse">
          <div className="accordion-body">
            <AvForm onValidSubmit={handleFilterSubmit}>
              <Row>
                <Col lg={3}>
                  <div className="mb-3 custom-react-select">
                    <div className="react-select-descr">Date Range</div>
                    <Flatpickr
                      className="form-control d-block"
                      placeholder="Select Date Range"
                      options={{
                        mode: "range",
                        dateFormat: "Y-m-d",
                      }}
                      value={dateFilter}
                      onChange={setDateOnFilter}
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col className="col-md-12 text-end">
                  <button
                    type="submit"
                    className="btn btnOrange"
                    disabled={loading}
                  >
                    {loading && (
                      <i className="bx bx-hourglass bx-spin me-2" />
                    )}
                    Search
                  </button>
                </Col>
              </Row>
            </AvForm>
          </div>
        </Collapse>
      </div>
    </>
  )
}