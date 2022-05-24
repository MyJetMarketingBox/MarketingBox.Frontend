import React, { useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { CardBody, Col, Row } from "reactstrap";
import Loader from "src/components/UI/loader";
import {
  closeEditCampaignRowModal,
  deleteCampaignRow,
  getBrands,
  getCampaignRowByCampaignId,
  getGeo,
  openEditCampaignRowModal,
} from "src/store/actions";
import { getCampaigns } from "src/store/campaigns/actions";
import { RootStoreType } from "src/store/storeTypes";
import Breadcrumbs from "../../../../components/Common/Breadcrumb";
import ModalCompaignRow from "./addCompaignRow/ModalCompaignRow";
import CamaignRowsTable from "./table/CamaignRowsTable";

interface IParams {
  id: string;
}
const CampaignDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams<IParams>();

  const { isLoading, pagination, campaignRows, isOpenEditModal, editableCRid } =
    useSelector((state: RootStoreType) => {
      return {
        isLoading: state.CampaignRows.isLoading,
        campaignRows: state.CampaignRows.items,
        pagination: state.CampaignRows.pagination,
        isOpenEditModal: state.CampaignRows.isEditCRModal,
        editableCRid: state.CampaignRows.editableCRid,
      };
    });

  const handleOpenEditModal = () => {
    dispatch(openEditCampaignRowModal());
  };
  const handleCloseEditModal = () => {
    dispatch(closeEditCampaignRowModal());
  };

  useEffect(() => {
    dispatch(getCampaigns());
    dispatch(getGeo());
    dispatch(getBrands());
    dispatch(getCampaignRowByCampaignId("", { CampaignIds: id }));
  }, []);

  return (
    <div className="page-content">
      <MetaTags>
        <title>Campaign | TraffMe </title>
      </MetaTags>
      <div className="container-fluid">
        <Breadcrumbs title="Campaings" breadcrumbItem="Campaings" />
      </div>

      <Row>
        <Col xs={12}>
          <div>
            <CardBody>
              <Row className="mb-2 justify-content-end">
                <Col className="col-md-4 offset-4 text-end">
                  <button
                    type="button"
                    className="btn btnOrange"
                    onClick={handleOpenEditModal}
                  >
                    <i className="bx bx-plus me-1" /> Add New
                  </button>
                </Col>
              </Row>

              <Row className="mb-4">
                <Col xl="12">
                  <div className="table-responsive">
                    {!isLoading && campaignRows.length && (
                      <CamaignRowsTable items={campaignRows} />
                    )}

                    {!isLoading && !campaignRows.length && (
                      <div style={{ textAlign: "center", padding: "30px 0" }}>
                        <h3>No Data Available</h3>
                      </div>
                    )}

                    {isLoading && <Loader />}
                  </div>
                </Col>
              </Row>
            </CardBody>
          </div>
        </Col>
      </Row>

      {isOpenEditModal && (
        <ModalCompaignRow
          isOpen={isOpenEditModal}
          activeCRId={+id}
          toggleClose={handleCloseEditModal}
          campaignRow={
            campaignRows.find(item => item.campaignRowId === editableCRid) ||
            null
          }
        />
      )}
    </div>
  );
};

export default CampaignDetail;
