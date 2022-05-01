import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearBrands, getBrands } from "../../store/brands/actions";
import Loader from "../../components/UI/loader";
import MetaTags from "react-meta-tags";
import {
  Card,
  CardBody,
  Col,
  Row
} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import SearchBrand from "./components/search";
import TableBrands from "./components/table"
import BtnLoadMore from "../../components/UI/btns/BtnLoadMore";
import AddBrandModal from "./components/modal/add";

const Brands: React.FC = () => {

  const dispatch = useDispatch();

  const { brands, nextUrl, error, loaded, loading } = useSelector((state: any) => {
    return {
      brands: state.Brands.brands.items,
      nextUrl: state.Brands.brands.pagination.nextUrl,
      error: state.Brands.error,
      loading: state.Brands.loading,
      loaded: state.Brands.loaded
    }
  })

  const [modal, setModal] = useState<boolean>(false);

  let filter = {
    order: 1,
    limit: 50
  };

  useEffect(() => {
    dispatch(getBrands("", filter));
    return () => {
      dispatch(clearBrands())
    }
  }, []);

  async function loadMore() {
    if(nextUrl){
      dispatch(getBrands(nextUrl, filter))
    }
  }

  const toggleModal = () => {
    setModal(prev => !prev);
  };

  return (
    <>
      {!loaded && loading && <Loader />}
      <div className="page-content">
        <MetaTags>
          <title>Brands | TraffMe </title>
        </MetaTags>
        <div className="container-fluid">
          <Breadcrumbs title="TraffMe" breadcrumbItem="Brands" />
        </div>

        <Row>
          <Col className="col-12">
            <div>
              <CardBody>

                <Row className="mb-2">
                  <Col className="col-md-4">
                    <SearchBrand />
                  </Col>
                  <Col className="col-md-4 offset-4 text-end">
                    <button
                      type="button"
                      className="btn btnOrange"
                      onClick={toggleModal}
                    >
                      <i className="bx bx-plus me-1" /> Add New
                    </button>
                  </Col>
                </Row>

                <Row className="mb-4">
                  <Col xl="12">
                    <div className="table-responsive">
                      {brands.length ? <TableBrands brands={brands} /> : null}
                      {
                        (!brands.length && loaded) ?
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
            </div>
          </Col>
        </Row>
      </div>
      <AddBrandModal isOpen={modal} toggle={toggleModal} />
    </>
  )

}

export default Brands;