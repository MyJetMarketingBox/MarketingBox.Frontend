import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearGeo, delGeo, getGeo, modalGeoInCampaignsHide } from "../../store/geo/actions";
import { Col, Row } from "reactstrap";
import MiniCard from "../../components/UI/miniCard/miniCard";
import BtnLoadMore from "../../components/UI/btns/BtnLoadMore";
import { CardTypeEnum } from "../../enums/CardTypeEnum";
import ModalGeoInCampaigns from "./components/modal/geoInCampaigns";

const Geo = () => {
  const dispatch = useDispatch();

  const { geoList, nextUrl, loading, loaded, total, deleteGeo, isOpen } = useSelector(
    (state: any) => {
      return {
        geoList: state.Geo.geo.items,
        nextUrl: state.Geo.geo.pagination.nextUrl,
        total: state.Geo.geo.pagination.total,
        loading: state.Geo.loading,
        loaded: state.Geo.loaded,
        deleteGeo: state.Geo.delete,
        isOpen: state.Geo.delete.modal
      };
    }
  );

  let filter = {
    order: 1,
  };

  useEffect(() => {
    dispatch(getGeo("", filter));

    return () => {
      dispatch(clearGeo());
      dispatch(modalGeoInCampaignsHide())
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

  const handleCloseModal = () => {
    dispatch(modalGeoInCampaignsHide())
  };

  return (
    <React.Fragment>

      <div className="col-xl-12 text-muted mb-3">
        Showing {geoList.length} / {total} results
      </div>

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

      {isOpen && <ModalGeoInCampaigns isOpen={isOpen} toggleClose={handleCloseModal} campaigns={deleteGeo.items} />}

    </React.Fragment>
  );
};

export default Geo;
