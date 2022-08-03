import React, { useEffect } from "react";
import { Col, Row } from "reactstrap";
import c from './Indicators.module.scss';
import { ReactComponent as IconArrow } from '../../assets/images/icon-arrow.svg';
import { ReactComponent as IconArrowDownward } from '../../assets/images/arrow_downward.svg';

import Loader from "../../components/UI/loader";
import { useDispatch, useSelector } from "react-redux";
import { RootStoreType } from "../../store/storeTypes";
import { clearDashStatistics, getDashStatistics } from "../../store/dashboard/statistics/actions";
import { kFormatter } from "../../helpers/kFormatter";

const Indicators = () => {
  const dispatch = useDispatch();

  const {statistics, loadingStat, loadedStat} = useSelector((state: RootStoreType) => {
    return {
      statistics: state.DashStatistics.statistics,
      loadingStat: state.DashStatistics.loading,
      loadedStat: state.DashStatistics.loaded,
    }
  })

  /*useEffect(() => {
    dispatch(getDashStatistics({}))

    return () => {
      dispatch(clearDashStatistics())
    }
  }, []);*/

  return (
    <React.Fragment>
      { !loadedStat && loadingStat && <Loader /> }
      <Row className={c.items}>
        {/*<Col sm={6} md={4} xl={3} className={c.item}>
          <div className={c.value}>
            241.4k
            <div className={c.diff}>
              <div className={c.diffIcon}>
                <IconArrow />
              </div>
              <div className={c.diffVal}>54%</div>
            </div>
          </div>
          <div className={c.name}>Impressions</div>
        </Col>*/}

        <Col sm={6} md={4} xl={3} className={c.item}>
          <div className={c.value}>
            {kFormatter(statistics?.clicks.actual)}
            <div className={(statistics?.clicks.diffType === 0) ? c.diff : c.diffNeg}>
              <div className={c.diffIcon}>
                {(statistics?.clicks.diffType === 0) ? <IconArrow/>: <IconArrowDownward/>}
              </div>
              <div className={c.diffVal}>{statistics?.clicks.percent}%</div>
            </div>
          </div>
          <div className={c.name}>Clicks</div>
        </Col>

        <Col sm={6} md={4} xl={3} className={c.item}>
          <div className={c.value}>
            {kFormatter(statistics?.registrationsCount.actual)}
            <div className={(statistics?.registrationsCount.diffType === 0) ? c.diff : c.diffNeg}>
              <div className={c.diffIcon}>
                {(statistics?.registrationsCount.diffType === 0) ? <IconArrow/>: <IconArrowDownward/>}
              </div>
              <div className={c.diffVal}>{statistics?.registrationsCount.percent}%</div>
            </div>
          </div>
          <div className={c.name}>Qualified leads</div>
        </Col>

        <Col sm={6} md={4} xl={3} className={c.item}>
          <div className={c.value}>
            {kFormatter(statistics?.failedCount.actual)}
            <div className={(statistics?.failedCount.diffType === 0) ? c.diff : c.diffNeg}>
              <div className={c.diffIcon}>
                {(statistics?.failedCount.diffType === 0) ? <IconArrow/>: <IconArrowDownward/>}
              </div>
              <div className={c.diffVal}>{statistics?.failedCount.percent}%</div>
            </div>
          </div>
          <div className={c.name}>Failed leads</div>
        </Col>

        <Col sm={6} md={4} xl={3} className={c.item}>
          <div className={c.value}>
            {kFormatter(statistics?.ftdCount.actual)}
            <div className={(statistics?.ftdCount.diffType === 0) ? c.diff : c.diffNeg}>
              <div className={c.diffIcon}>
                {(statistics?.ftdCount.diffType === 0) ? <IconArrow/>: <IconArrowDownward/>}
              </div>
              <div className={c.diffVal}>{statistics?.ftdCount.percent}%</div>
            </div>
          </div>
          <div className={c.name}>FTD’s</div>
        </Col>

        <Col sm={6} md={4} xl={3} className={c.item}>
          <div className={c.value}>
            {kFormatter(statistics?.cr.actual)}
            <div className={(statistics?.cr.diffType === 0) ? c.diff : c.diffNeg}>
              <div className={c.diffIcon}>
                {(statistics?.cr.diffType === 0) ? <IconArrow/>: <IconArrowDownward/>}
              </div>
              <div className={c.diffVal}>{statistics?.cr.percent}%</div>
            </div>
          </div>
          <div className={c.name}>Conversions</div>
        </Col>

        <Col sm={12} xl={6} className={c.item}>
          <div className={c.value}>
            $ {new Intl.NumberFormat('en-IN').format(statistics?.payouts.actual)}
            <div className={(statistics?.payouts.diffType === 0) ? c.diff : c.diffNeg}>
              <div className={c.diffIcon}>
                {(statistics?.payouts.diffType === 0) ? <IconArrow/>: <IconArrowDownward/>}
              </div>
              <div className={c.diffVal}>{statistics?.payouts.percent}%</div>
            </div>
          </div>
          <div className={c.name}>Payouts</div>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Indicators;
