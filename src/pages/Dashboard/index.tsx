import React, { useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
//import Breadcrumbs
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { Collapse, Row } from "reactstrap";
import Indicators from "./Indicators";
import TopOffers from "./TopOffers";
import Map from "./Map";

import c from "./index.module.scss";
import { useDispatch } from "react-redux";
import { clearDashMap, clearDashStatistics, getDashMap, getDashStatistics, getLanguages } from "src/store/actions";
import ButtonPeriod from "./buttonPeriod";
import Flatpickr from "react-flatpickr";
import { getUpdateDate } from "../../helpers/getUpdateDate";

const Dashboard = () => {
  const dispatch = useDispatch();

  const [collapse, setCollapse] = useState(false);
  const [dateFilter, setDateFilter] = useState({
    fromDate: new Date(new Date().setDate(new Date().getDate() - 7)).toISOString().split('T')[0]+"T00:00:00Z" || null,
    toDate: new Date().toISOString().split('T')[0]+"T23:59:59Z"
  });

  useEffect(() => {
    dispatch(getLanguages());
  }, []);


  const setPeriod = (data: any) => {
    if(data !== "0"  && data !== "999") {

      let period: any;
      switch (data) {
        case "7" : period = new Date().setDate(new Date().getDate() - 7); break;
        case "30" : period = new Date().setMonth(new Date().getMonth() - 1); break;
        case "180": period = new Date().setMonth(new Date().getMonth() - 6); break;
        case "360": period = new Date().setMonth(new Date().getMonth() - 12); break;
      }

      setDateFilter({
        fromDate: new Date(period).toISOString().split('T')[0]+"T00:00:00Z",
        toDate: new Date().toISOString().split('T')[0]+"T23:59:59Z"
      });
      setCollapse(false);
    }

    if(data === "999"){
      setCollapse(!collapse);
    }

    if(data === "0"){
      setCollapse(false);
      setDateFilter({
        fromDate: null,
        toDate: new Date().toISOString().split('T')[0]+"T23:59:59Z"
      });
    }

  }

  const setDateOnFilter = (data: any) => {
    if (data.length > 1) {
      const from = getUpdateDate(data[0].getTime());
      const to = getUpdateDate(data[1].getTime());

      setDateFilter({
        fromDate: from+"T00:00:00Z",
        toDate: to+"T23:59:59Z"
      });
    }
  };


  useEffect(() => {
    dispatch(getDashStatistics(dateFilter))
    dispatch(getDashMap(dateFilter))
    return () => {
      dispatch(clearDashStatistics())
      dispatch(clearDashMap())
    }
  }, [dateFilter])

  return (
    <React.Fragment>
      <MetaTags>
        <title>Dashboard</title>
      </MetaTags>
      <div className="page-content full d-flex">
        <div className={c.dashboard}>
          <div className={c.top}>
            <Breadcrumbs
              title="Your statistics"
              breadcrumbItem="Dashboard"
            />
            <ButtonPeriod setPeriod={setPeriod} />
            <Row>
              <div className="accordion mt-3" id="accordion">
                <Collapse isOpen={collapse} className="accordion-collapse">
                  <div className="accordion-body">
                    <div className="col-3 mb-3 custom-react-select">
                      <Flatpickr
                        className="form-control d-block"
                        placeholder="Select Date Range..."
                        options={{
                          mode: "range",
                          dateFormat: "Y-m-d",
                        }}
                        onChange={setDateOnFilter}
                      />
                    </div>
                  </div>
                </Collapse>
              </div>

              <Indicators />
            </Row>
          </div>
          <div className={c.bottom}>
            <div className={c.bottomContent}>
              <div className={c.colLeft}>
                <TopOffers />
              </div>
              <div className={c.colRight}>
                <Map />
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
