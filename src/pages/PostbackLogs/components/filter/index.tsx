import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Collapse, Row } from "reactstrap";

import Search from "../search";
import { AvForm } from "availity-reactstrap-validation";
import Select from "../../../../components/UI/select";
import { clearPostbackLogs, getPostbackLogs } from "../../../../store/postback_logs/actions";
import { clearAffiliate, getAffiliates } from "../../../../store/affiliates/actions";
import Flatpickr from "react-flatpickr";
import { getUpdateDate } from "../../../../helpers/getUpdateDate";
import { eventType, httpQueryType } from "../../../../common/utils/model";
import { number } from "yup";


export default () => {
  const dispatch = useDispatch()
  const [collapse, setCollapse] = useState(false);
  const [countFilter, setCountFilter] = useState<number>(0);

  const [selectAff, setSelectAff] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [dateFilter, setDateFilter] = useState(`${fromDate} to ${toDate}`);
  const [selectEventType, setSelectEventType] = useState<any>();
  const [selectHttpQueryType, setSelectHttpQueryType] = useState<any>();

  const {
    affiliates,
    loadingAffList,
    loadingPostbackLog
  } = useSelector((state: any) => {
    return {
      affiliates: state.Affiliates.affiliates.items,
      loadingAffList: state.Affiliates.loading,
      loadingPostbackLog: state.PostbackLogs.loading
    }
  })

  const filter = {
    order: 1,
    limit: 50,
  };

  useEffect(() => {
    dispatch(getAffiliates("", { order: 1 }));

    return () => {
      dispatch(clearAffiliate());
    };
  }, []);

  useEffect(() => {
    let count = 0;

    selectAff.length > 0 ? (count += 1) : null;
    selectEventType ? (count += 1) : null;
    selectHttpQueryType ? (count += 1) : null;
    fromDate || toDate ? (count += 1) : null;

    setCountFilter(count);
  });

  useEffect(() => {
    if(countFilter === 0){
      handleClearFilter()
    }
  }, [countFilter])

  const handleClearFilter = () => {
    setSelectAff([]);
    setSelectEventType(null);
    setSelectHttpQueryType(null);
    setDateFilter("");
    setFromDate("");
    setToDate("");

    dispatch(clearPostbackLogs());
    dispatch(getPostbackLogs(null, filter));
  }

  const toggleCollapse = () => {
    setCollapse(!collapse);
  };

  const affiliateList = affiliates.map((item: any) => {
    return {
      value: item.id,
      label: item.generalInfo.username,
    };
  });

  const eventTypeList = eventType.map((item: any, idx: number) => {
    return {
      value: +idx,
      label: item,
    };
  });

  const httpQueryTypeList = httpQueryType.map((item: any, idx: number) => {
    return {
      value: +idx,
      label: item,
    };
  })

  const setDateOnFilter = (data: any) => {
    if (data.length > 1) {
      const utcFrom = data[0].getTime();
      const from = getUpdateDate(utcFrom);

      const utcTo = data[1].getTime();
      const to = getUpdateDate(utcTo);

      setFromDate(from);
      setToDate(to);
      setDateFilter(`${from} to ${to}`);
    }
  };

  const handleFilterSubmit = () => {

    const curFilter = {
      ...filter,
      AffiliateIds: selectAff.map((item: any) => item.value).join(","),
      EventType: selectEventType?.value,
      HttpQueryType: selectHttpQueryType?.value,
      FromDate: fromDate,
      ToDate: toDate ? toDate + " 23:59:59" : null,
    };

    dispatch(clearPostbackLogs());
    dispatch(getPostbackLogs(null, curFilter));
  };

  return (
    <>
      <Col className="col-md-4 mb-3">
        <Search/>
      </Col>

      <Col className="col-md-4 offset-4 text-end">
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
          className="btn btnOrange"
          type="button"
          onClick={toggleCollapse}
        >
          {collapse ? (
            <>
              Hide filters
              {countFilter > 0 ? (
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
                      placeholder="Select Date Range..."
                      options={{
                        mode: "range",
                        dateFormat: "Y-m-d",
                      }}
                      value={dateFilter}
                      onChange={setDateOnFilter}
                    />
                  </div>
                </Col>

                <Col lg={3}>
                  <div className="mb-3 custom-react-select">
                    <div className="react-select-descr">Affiliates</div>
                    <Select
                      isMulti
                      isSearchable
                      isLoading={loadingAffList}
                      options={affiliateList}
                      onChange={setSelectAff}
                      value={selectAff}
                    />
                  </div>
                </Col>

                <Col lg={3}>
                  <div className="mb-3 custom-react-select">
                    <div className="react-select-descr">Event</div>
                    <Select
                      options={eventTypeList}
                      onChange={setSelectEventType}
                      value={selectEventType}
                    />
                  </div>
                </Col>

                <Col lg={3}>
                  <div className="mb-3 custom-react-select">
                    <div className="react-select-descr">Method</div>
                    <Select
                      options={httpQueryTypeList}
                      onChange={setSelectHttpQueryType}
                      value={selectHttpQueryType}
                    />
                  </div>
                </Col>


              </Row>

              <Row>
                <Col className="col-md-12 text-end">
                  <button
                    type="submit"
                    className="btn btnOrange"
                    disabled={loadingPostbackLog}
                  >
                    {loadingPostbackLog && (
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
  );
};