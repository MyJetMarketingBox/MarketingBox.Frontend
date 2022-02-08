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
import { Link } from "react-router-dom";
import { AvField, AvForm } from "availity-reactstrap-validation";
import { AffiliateRole, AffiliateState, Currency } from "../../common/utils/model";
import Loader from "../../components/UI/loader";
import ColumnActions from "./view/ColumnActions";
import SearchAffiliate from "./components/search/SearchAffiliate";
import FormAffiliate from "./view/formAffiliate";
import TableAff from "./components/table/TableAff";

const Affiliates: React.FC = () => {

  const dispatch = useDispatch();

  const { affiliates, nextUrl, errorAff, loading } = useSelector((state: any) => {
    return {
      affiliates: state.Affiliates.affiliates.items,
      nextUrl: state.Affiliates.affiliates.pagination.nextUrl,
      errorAff: state.Affiliates.error,
      loading: state.Affiliates.loading
    };
  });

  // const [affiliateList, setAffiliateList] = useState<any>(null);
  // const [errorAffList, setErrorAffList] = useState<any>(null);
  // const [isLoading, setLoading] = useState<boolean>(false);
  // const [isLoadAff, setLoadAff] = useState<boolean>(false);
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

  // useEffect(() => {
  //   if (affiliates) {
  //     setAffiliateList(affiliates.items);
  //     setLoading(true);
  //   }
  //   setIsEdit(false);
  // }, [affiliates]);
  //
  // // errorAff
  // useEffect(() => {
  //   if (errorAff) {
  //     setErrorAffList(errorAff.response);
  //   }
  //   setIsEdit(false);
  // }, [errorAff]);
  //
  // useEffect(() => {
  //   setLoadAff(false);
  // }, [affiliateList]);
  //
  // // @ts-ignore
  // const affiliateData = !(affiliateList) ? [] : affiliateList?.map(affiliate => {
  //   let color, status, role;
  //   switch (affiliate.generalInfo.state) {
  //     case 0:
  //       status = "active";
  //       color = "success";
  //       break;
  //     case 2:
  //       status = "notActive";
  //       color = "warning";
  //       break;
  //     case 1:
  //       status = "banned";
  //       color = "danger";
  //       break;
  //     default:
  //       color = "light";
  //       break;
  //   }
  //
  //   return {
  //     id: affiliate.affiliateId,
  //     username: affiliate.generalInfo.username,
  //     role: AffiliateRole[affiliate.generalInfo.role],
  //     ai: affiliate.affiliateId,
  //     email: affiliate.generalInfo.email,
  //     reportto: "Management",
  //     createdat: new Date(affiliate.generalInfo.createdAt).toLocaleDateString("ru-RU", {
  //       day: "2-digit",
  //       month: "2-digit",
  //       year: "2-digit"
  //     }),
  //     status: status,
  //     actions: "",
  //     color: color
  //   };
  // });
  //
  // const pageOptions: any = {
  //   sizePerPage: affiliateData.length,
  //   totalSize: affiliateData.length, // replace later with size(customers),
  //   custom: true
  // };
  //
  // // Select All Button operation
  // // const selectRow: any = {
  // //   mode: "checkbox",
  // // };
  //
  // const { SearchBar } = Search;
  //
  // async function loadMore() {
  //   if (affiliates.pagination.nextUrl) {
  //     setLoadAff(true);
  //     const moreAff = await onGetAffiliates(affiliates.pagination.nextUrl, {});
  //     dispatch(moreAff);
  //   }
  // }
  //
  // if (errorAffList) {
  //   console.log(errorAffList);
  //   // if(errorAffList.status === 401){
  //   //   location.replace('/logout');
  //   // }
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
                <p>Loading...</p>
                <Row>
                  <Col className="col-md-6">
                    <SearchAffiliate />
                  </Col>
                  <Col className="col-md-6">
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
                      <TableAff affiliates={affiliates} />
                      <div style={{ "textAlign": "center", "padding": "30px 0" }}>
                        <h3>No Data Available</h3>
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col className="col-12">
                    <div className="text-center">
                      <button
                        className="btn btnOrange waves-effect waves-light w-sm"
                        // onClick={loadMore}
                      >
                        {/*{!isLoadAff ? <i className="mdi mdi-download d-block font-size-16"> </i> :*/}
                        {/*  <i className="bx bx-loader bx-spin d-block font-size-16"> </i>}*/}
                        {/*{" "}*/}
                        Load More
                      </button>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
      <AddAffiliateForm isOpen={modal} toggle={toggleModal} />
    </>
    // <React.Fragment>
    //   <div className="page-content">
    //     <div className="container-fluid">
    //       <Row>
    //         <Col className="col-12">
    //           <Card>
    //             <CardBody>
    //               {affiliates.pagination.nextUrl && (
    //                 <div className="text-center">
    //                   <button
    //                     className="btn btnOrange waves-effect waves-light w-sm"
    //                     onClick={loadMore}
    //                   >
    //                     {!isLoadAff ? <i className="mdi mdi-download d-block font-size-16"> </i> :
    //                       <i className="bx bx-loader bx-spin d-block font-size-16"> </i>}
    //                     {/*<i className={`${!isLoadAff ? 'mdi mdi-download' : 'bx bx-loader bx-spin'} d-block font-size-16`}></i> {" "}*/}
    //                     {" "}
    //                     Load More
    //                   </button>
    //                 </div>
    //               )}
    //             </CardBody>
    //           </Card>
    //         </Col>
    //       </Row>
    //     </div>
    //   </div>
    //
    // </React.Fragment>
  );
};

export default Affiliates;
