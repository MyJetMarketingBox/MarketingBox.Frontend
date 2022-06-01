import React, { useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import BtnLoadMore from "src/components/UI/btns/BtnLoadMore";
import Loader from "src/components/UI/loader";
import Page from "src/constants/pages";
import { CardTypeEnum } from "src/enums/CardTypeEnum";
import { clearOffersStore, deleteOffer, getOffers } from "src/store/actions";
import { IOffersParams } from "src/store/offers/actionTypes";
import { RootStoreType } from "src/store/storeTypes";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import MiniCard from "../../components/UI/miniCard/miniCard";
import OffersFilter from "./components/OffersFilter";
import SearchOffers from "./components/SearchOffers";

const OffersPage = () => {
  const dispatch = useDispatch();
  const [params, setParams] = useState({
    limit: 12,
  });
  //
  const { offers, nextUrl, loading } = useSelector(
    ({ Offers }: RootStoreType) => ({
      offers: Offers.items,
      nextUrl: Offers.pagination?.nextUrl || "",
      loading: Offers.isLoading,
    })
  );

  async function loadMore() {
    if (nextUrl) {
      dispatch(getOffers(nextUrl, params));
    }
  }
  //

  const handleClearFilter = () => {
    setParams({
      limit: 12,
    });
  };

  const handleDeleteOffer = (id: number) => {
    dispatch(deleteOffer(id));
  };
  const handleChangeFilter = (values: any) => {
    setParams({ ...values, limit: 12 });
  };

  useEffect(() => {
    dispatch(getOffers("", params));

    return () => {
      dispatch(clearOffersStore());
    };
  }, [params]);

  return (
    <div className="page-content">
      {loading && <Loader />}

      <MetaTags>
        <title>Offers | TraffMe</title>
      </MetaTags>

      <Container fluid>
        <Breadcrumbs title="TraffMe" breadcrumbItem="Offers" />

        <Row>
          <Card>
            <CardBody>
              <Row className="align-items-center justify-content-between">
                <Col xs={12} md={6} className="mb-5">
                  <SearchOffers />
                </Col>

                <Col
                  xs={12}
                  md={3}
                  lg={2}
                  className="mb-5 d-flex align-items-center justify-content-end"
                >
                  <button
                    type="button"
                    className="w-100 btn btnOrange btn-h"
                    onClick={() => {}}
                  >
                    Add Offer
                  </button>
                </Col>
              </Row>

              <OffersFilter
                onClearFilter={handleClearFilter}
                onFilter={handleChangeFilter}
              />

              <Row>
                {offers.length ? (
                  offers.map(offer => (
                    <MiniCard
                      key={`offers-card-${offer.id}`}
                      path={`${Page.OFFERS}/${offer.id}/`}
                      cardType={CardTypeEnum.Offer}
                      data={offer}
                      handleDelete={() => handleDeleteOffer(offer.id)}
                    />
                  ))
                ) : (
                  <div style={{ textAlign: "center", padding: "30px 0" }}>
                    <h3>No Data Available</h3>
                  </div>
                )}
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
            </CardBody>
          </Card>
        </Row>
      </Container>
    </div>
  );
};

export default OffersPage;
