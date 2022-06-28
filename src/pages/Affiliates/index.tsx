import React, { useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import { Card, CardBody, Col, Row } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import AddAffiliateForm from "./components/addAffiliate/AddAffiliateForm";
import "../../assets/scss/datatables.scss";
import {
  clearAffiliate,
  clearAffiliateError,
  getAffiliates,
} from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/UI/loader";
import SearchAffiliate from "./components/search/SearchAffiliate";
import TableAff from "./components/table/TableAff";
import BtnLoadMore from "../../components/UI/btns/BtnLoadMore";
import { RootStoreType } from "src/store/storeTypes";

const Affiliates: React.FC = () => {
  const dispatch = useDispatch();

  const { affiliates, nextUrl, errorAff, loading, loaded, total } = useSelector(
    (state: RootStoreType) => {
      return {
        affiliates: state.Affiliates.affiliates.items,
        nextUrl: state.Affiliates.affiliates.pagination?.nextUrl,
        errorAff: state.Affiliates.error,
        loading: state.Affiliates.loading,
        loaded: state.Affiliates.loaded,
        total: state.Affiliates.affiliates.pagination?.total,
      };
    }
  );

  const [isOpen, setIsOpen] = useState<boolean>(false);

  let filter = {
    order: 1,
    limit: 50,
  };

  useEffect(() => {
    dispatch(getAffiliates("", filter));
    return () => {
      dispatch(clearAffiliate());
    };
  }, []);

  async function loadMore() {
    if (nextUrl) {
      dispatch(getAffiliates(nextUrl, {}));
    }
  }

  const toggleModal = (status: boolean) => {
    setIsOpen(status);
    //setIsOpen(prev => !prev);
    if (errorAff.error) {
      dispatch(clearAffiliateError());
    }
  };

  return (
    <>
      {!loaded && loading && <Loader />}
      <div className="page-content">
        <MetaTags>
          <title>Affiliates | TraffMe </title>
        </MetaTags>
        <div className="container-fluid">
          <Breadcrumbs title="TraffMe" breadcrumbItem="Affiliates" />
        </div>

        <Row>
          <Col className="col-12">
            <div>
              <CardBody>
                <Row className="mb-2">
                  <Col className="col-md-4 mb-4">
                    <SearchAffiliate />
                    <div className="col-xl-12 text-muted mt-3">
                      Showing {affiliates.length} / {total} results
                    </div>
                  </Col>
                  <Col className="col-md-4 offset-4 text-end">
                    <button
                      type="button"
                      className="btn btnOrange"
                      onClick={() => toggleModal(true)}
                    >
                      Add New
                    </button>
                  </Col>
                </Row>
                <Row className="mb-4">
                  <Col xl="12">
                    {affiliates.length ? (
                      <TableAff affiliates={affiliates} />
                    ) : null}
                    {!affiliates.length && loaded ? (
                      <div style={{ textAlign: "center", padding: "30px 0" }}>
                        <h3>No Data Available</h3>
                      </div>
                    ) : null}
                  </Col>
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
            </div>
          </Col>
        </Row>
      </div>
      <AddAffiliateForm isOpen={isOpen} toggle={toggleModal} />
    </>
  );
};

export default Affiliates;
