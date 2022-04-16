import React, { useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import {
  Card,
  CardBody,
  Col,
  Row
} from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import AddAffiliateForm from "./components/addAffiliate/AddAffiliateForm";
import "../../assets/scss/datatables.scss";
import { clearAffiliate, getAffiliates } from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/UI/loader";
import SearchAffiliate from "./components/search/SearchAffiliate";
import TableAff from "./components/table/TableAff";
import BtnLoadMore from "../../components/UI/btns/BtnLoadMore";

const Affiliates: React.FC = () => {

  const dispatch = useDispatch();

  const { affiliates, nextUrl, errorAff, loading, loaded } = useSelector((state: any) => {
    return {
      affiliates: state.Affiliates.affiliates.items,
      nextUrl: state.Affiliates.affiliates.pagination.nextUrl,
      errorAff: state.Affiliates.error,
      loading: state.Affiliates.loading,
      loaded: state.Affiliates.loaded
    };
  });

  const [modal, setModal] = useState<boolean>(false);

  let filter = {
    order: 1,
    limit: 50
  };

  useEffect(() => {
    dispatch(getAffiliates("", filter));
    return () => {
      dispatch(clearAffiliate());
    }
  }, []);

  async function loadMore() {
    if (nextUrl) {
      dispatch(getAffiliates(nextUrl, {}));
    }
  }

  // if (errorAffList) {
  //   console.log(errorAffList);
  //   if (errorAffList.status === 401) {
  //     location.replace("/logout");
  //   }
  // }

  const toggleModal = () => {
    setModal(prev => !prev);
  };

  return (
    <>
      {
        !loaded && loading && <Loader />
      }
      <div className="page-content">
        <MetaTags>
          <title>Affiliates | TraffMe </title>
        </MetaTags>
        <div className="container-fluid">
          <Breadcrumbs title="TraffMe" breadcrumbItem="Affiliates" />
        </div>
        <Row>
          <Col className="col-12">
            <Card>
              <CardBody>
                <Row className="mb-2">
                  <Col className="col-md-4">
                    <SearchAffiliate />
                  </Col>
                  <Col className="col-md-4 offset-4 text-end">
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={toggleModal}
                    >
                      <i className="bx bx-plus me-1" /> Add New
                    </button>
                  </Col>
                </Row>
                <Row className="mb-4">
                  <Col xl="12">
                    <div className="table-responsive">
                      {affiliates.length ? <TableAff affiliates={affiliates} /> : null}
                      {
                        (!affiliates.length && loaded) ?
                          <div style={{ "textAlign": "center", "padding": "30px 0" }}>
                            <h3>No Data Available</h3>
                          </div> :
                          null
                      }
                    </div>
                  </Col>
                </Row>
                {
                  nextUrl &&
                  <Row>
                    <Col className="col-12">
                      <div className="text-center">
                        <BtnLoadMore
                          loading={loading}
                          handeClick={loadMore}
                        />
                      </div>
                    </Col>
                  </Row>
                }
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
      <AddAffiliateForm isOpen={modal} toggle={toggleModal} />
    </>
  );
};

export default Affiliates;
