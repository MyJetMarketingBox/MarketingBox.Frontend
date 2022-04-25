import React from "react";
import { Col, Row } from "reactstrap";
import c from './Indicators.module.scss';
import { ReactComponent as IconArrow } from '../../assets/images/icon-arrow.svg';

const Indicators = () => {
  return (
    <React.Fragment>
      <Row className={c.items}>
        <Col sm={6} md={4} xl={3} className={c.item}>
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
        </Col>
        <Col sm={6} md={4} xl={3} className={c.item}>
          <div className={c.value}>
            192.1k
            <div className={c.diff}>
              <div className={c.diffIcon}>
                <IconArrow />
              </div>
              <div className={c.diffVal}>111%</div>
            </div>
          </div>
          <div className={c.name}>Clicks</div>
        </Col>
        <Col sm={6} md={4} xl={3} className={c.item}>
          <div className={c.value}>
            153.1k
            <div className={c.diff}>
              <div className={c.diffIcon}>
                <IconArrow />
              </div>
              <div className={c.diffVal}>24%</div>
            </div>
          </div>
          <div className={c.name}>Qualified leads</div>
        </Col>
        <Col sm={6} md={4} xl={3} className={c.item}>
          <div className={c.value}>
            43.9k
            <div className={[c.diff, c.low].join(" ")}>
              <div className={c.diffIcon}>
                <IconArrow />
              </div>
              <div className={c.diffVal}>9%</div>
            </div>
          </div>
          <div className={c.name}>Failed leads</div>
        </Col>
        <Col sm={6} md={4} xl={3} className={c.item}>
          <div className={c.value}>
            5.4k
            <div className={c.diff}>
              <div className={c.diffIcon}>
                <IconArrow />
              </div>
              <div className={c.diffVal}>15%</div>
            </div>
          </div>
          <div className={c.name}>FTD’s</div>
        </Col>
        <Col sm={6} md={4} xl={3} className={c.item}>
          <div className={c.value}>
            451
            <div className={c.diff}>
              <div className={c.diffIcon}>
                <IconArrow />
              </div>
              <div className={c.diffVal}>20%</div>
            </div>
          </div>
          <div className={c.name}>Conversions</div>
        </Col>
        <Col sm={12} xl={6} className={c.item}>
          <div className={c.value}>
            $1,234,324.00
            <div className={c.diff}>
              <div className={c.diffIcon}>
                <IconArrow />
              </div>
              <div className={c.diffVal}>24%</div>
            </div>
          </div>
          <div className={c.name}>Payouts</div>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Indicators;
