import React, { useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import BtnLoadMore from "src/components/UI/btns/BtnLoadMore";
import Loader from "src/components/UI/loader";
import { CardTypeEnum } from "src/enums/CardTypeEnum";
import { clearOffersStore, getOffers } from "src/store/actions";
import { IOffersParams } from "src/store/offers/actionTypes";
import { RootStoreType } from "src/store/storeTypes";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import MiniCard from "../../components/UI/miniCard/miniCard";
import SearchOffers from "./components/SearchOffers";

const OffersPage = () => {
  const dispatch = useDispatch();
  const [params, setParams] = useState<IOffersParams>({
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

  useEffect(() => {
    dispatch(getOffers("", params));

    return () => {
      dispatch(clearOffersStore());
    };
  }, []);

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
                <Col md={3} className="mb-5">
                  <SearchOffers />
                </Col>

                <Col className="mb-5 d-flex align-items-center justify-content-end">
                  <button
                    type="button"
                    className="btn btnOrange"
                    onClick={() => {}}
                  >
                    Add Offer
                  </button>
                </Col>
              </Row>

              <Row>
                {offers.map(offer => (
                  <MiniCard
                    key={`offers-card-${offer.id}`}
                    cardType={CardTypeEnum.Offer}
                    data={offer}
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
            </CardBody>
          </Card>
        </Row>
      </Container>
    </div>
  );
};

export default OffersPage;
