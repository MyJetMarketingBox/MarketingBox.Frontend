import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearGeo, delGeo, getGeo } from "../../store/geo/actions";
import { Col, Row } from "reactstrap";
import MiniCard from "../../components/UI/miniCard/miniCard";
import BtnLoadMore from "../../components/UI/btns/BtnLoadMore";
import SearchGeo from "./components/search";
import { CardTypeEnum } from "../../enums/CardTypeEnum";

const Geo = (props: any) => {
  const dispatch = useDispatch();

  const { geoList, nextUrl, loading, loaded, total } = useSelector(
    (state: any) => {
      return {
        geoList: state.Geo.geo.items,
        nextUrl: state.Geo.geo.pagination.nextUrl,
        total: state.Geo.geo.pagination.total,
        loading: state.Geo.loading,
        loaded: state.Geo.loaded,
      };
    }
  );

  let filter = {
    order: 1,
    limit: 12,
  };

  useEffect(() => {
    dispatch(getGeo("", filter));
    return () => {
      dispatch(clearGeo());
    };
  }, []);

  async function loadMore() {
    if (nextUrl) {
      dispatch(getGeo(nextUrl, filter));
    }
  }

  const handleDelete = (id: number) => {
    dispatch(delGeo(id));
  };

  return (
    <React.Fragment>
      <Row>
        {geoList.map((geo: any) => (
          <MiniCard
            data={geo}
            path={`/geo/edit/${geo.id}`}
            handleDelete={handleDelete}
            cardType={CardTypeEnum.Geo}
            key={`geo-card-id-${geo.id}`}
          />
        ))}
      </Row>

      {nextUrl && (
        <Row>
          <Col className="col-12">
            <div className="text-center">
              <BtnLoadMore loading={loading} handeClick={loadMore} />
            </div>
          </Col>
        </Row>
      )}
    </React.Fragment>
  );
};

export default Geo;
