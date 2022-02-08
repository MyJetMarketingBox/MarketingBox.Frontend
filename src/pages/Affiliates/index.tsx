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

import { getAffiliates } from "../../store/actions";
import { isEmpty, size, map } from "lodash";

import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/UI/loader";
import SearchAffiliate from "./components/search/SearchAffiliate";
import TableAff from "./components/table/TableAff";

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

  // const [errorAffList, setErrorAffList] = useState<any>(null);
  const [isLoadAff, setLoadAff] = useState<boolean>(false);
  // const [isEdit, setIsEdit] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);

  let filter = {
    order: 1
  };

  useEffect(() => {
    if (affiliates && !affiliates.length) {
      dispatch(getAffiliates("", filter));
    }
  }, []);

  async function loadMore() {
    if (nextUrl) {
      dispatch(getAffiliates(nextUrl, filter));
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
    // if (!modal && !isEmpty(affiliates) && !!isEdit) {
    //   setTimeout(() => {
    //     setAffiliateList(affiliates.items);
    //     setIsEdit(false);
    //   }, 500);
    // }
  };

  return (
    <>
      {
        loading && <Loader />
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
                <Row>
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
                <Row>
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
                        <button
                          className="btn btnOrange waves-effect waves-light w-sm"
                          onClick={loadMore}
                        >
                          {!isLoadAff ? <i className="mdi mdi-download d-block font-size-16"> </i> :
                            <i className="bx bx-loader bx-spin d-block font-size-16"> </i>}
                          {" "}
                          Load More
                        </button>
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
