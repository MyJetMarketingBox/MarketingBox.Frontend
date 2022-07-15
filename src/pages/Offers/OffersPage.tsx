import React, { useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import BtnLoadMore from "src/components/UI/btns/BtnLoadMore";
import Loader from "src/components/UI/loader";
import Page from "src/constants/pages";
import { CardTypeEnum } from "src/enums/CardTypeEnum";
import { clearOffersStore, deleteOffer, getOffers, modalOfferAction } from "src/store/actions";
import { IOffersParams } from "src/store/offers/actionTypes";
import { RootStoreType } from "src/store/storeTypes";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import MiniCard from "../../components/UI/miniCard/miniCard";
import AddOfferModal from "./components/AddOfferModal";
import OffersFilter from "./components/OffersFilter";
import SearchOffers from "./components/SearchOffers";
import Filters from "./components/filters"

const OffersPage = () => {
  const dispatch = useDispatch();

  //const [showModal, setShowModal] = useState(false);
  //const [params, setParams] = useState({ limit: 12 });

  const { offers, nextUrl, loading, total, showModal } = useSelector(
    ({ Offers }: RootStoreType) => ({
      offers: Offers.items,
      nextUrl: Offers.pagination?.nextUrl || "",
      loading: Offers.isLoading,
      total: Offers.pagination?.total,
      showModal: Offers.modalOffer,
    })
  );

  async function loadMore() {
    if (nextUrl) {
      dispatch(getOffers(nextUrl, {}));
    }
  }

  /*const handleClearFilter = () => {
    setParams({
      limit: 12,
    });
  };*/

  const handleDeleteOffer = (id: number) => {
    dispatch(deleteOffer(id));
  };

  /*const handleChangeFilter = (values: any) => {
    setParams({ ...values, limit: 12 });
  };*/

  const handleOpenModal = () => {
    //setShowModal(true);
    dispatch(modalOfferAction(true))
  };

  const handleCloseModal = () => {
    dispatch(modalOfferAction(false))
    //setShowModal(false);
  };

  /*useEffect(() => {
    dispatch(getOffers("", params));

    return () => {
      dispatch(clearOffersStore());
    };
  }, [params]);*/

  return (
    <React.Fragment>
      {loading && <Loader />}
      <div className="page-content">
        <MetaTags>
          <title>Offers | TraffMe</title>
        </MetaTags>
        <div className="container-fluid">
          <Breadcrumbs title="TraffMe" breadcrumbItem="Offers" />
        </div>

        <Row>
          <Col className="col-12">
            <Card>
              <CardBody>
                <Row  className="mb-4">
                  <Filters handleOpenModal={handleOpenModal}/>
                  <div className="col-xl-12 text-muted">
                    Showing {offers.length} / {total} results
                  </div>

                  {/*<Col xs={12} md={4} className="mb-5">
                    <SearchOffers />
                  </Col>*/}

                  {/*<Col xs={12} md={3} lg={2} className="mb-5 d-flex align-items-center justify-content-end" >
                    <button
                      type="button"
                      className="w-100 btn btnOrange btn-h"
                      onClick={handleOpenModal}
                    >
                      Add Offer
                    </button>
                  </Col>*/}
                </Row>

                {/*<OffersFilter
                  onClearFilter={handleClearFilter}
                  onFilter={handleChangeFilter}
                />*/}

                <Row className="mb-4">
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
          </Col>
        </Row>

        {showModal && (
          <AddOfferModal isOpen={showModal} toggleClose={handleCloseModal} />
        )}
      </div>
    </React.Fragment>
  );
};

export default OffersPage;
