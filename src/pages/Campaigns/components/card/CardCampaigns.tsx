import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Card,
  CardBody,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import { useDispatch } from "react-redux";
import { deleteCampaign } from "../../../../store/campaigns/actions";
import ConfirmDelete from "../../../../components/UI/confirmDelete/ConfirmDelete";
import { CampaignType } from "src/types/CampaignsTypes";
import Page from "src/constants/pages";

interface Props {
  campaign: CampaignType;
}
const CardCampaigns = ({ campaign }: Props) => {
  const dispatch = useDispatch();
  const { push } = useHistory();
  const [isDeleteConfirm, setIsDeleteConfirm] = useState(false);

  const handleDelete = () => {
    dispatch(deleteCampaign(campaign.id));
  };

  const popupDeleteConfirmOpen = () => {
    setIsDeleteConfirm(true);
  };

  const handleOpenDetail = () => {
    push(`${Page.CAMPAIGNS}/${campaign.id}`);
  };

  const popupDeleteConfirmClose = () => {
    setIsDeleteConfirm(false);
  };

  const handleDeleteCampaign = () => {
    dispatch(deleteCampaign(campaign.id));
  };

  return (
    <>
      <Col xl="3" sm="6">
        <Card className="text-center">
          <CardBody className="mb-0">
            <UncontrolledDropdown className="dropdown text-end">
              <DropdownToggle className="text-muted font-size-16 pointer" tag="a">
                <i className="bx bx-dots-horizontal-rounded"></i>
              </DropdownToggle>

              <DropdownMenu className="dropdown-menu-end">
                <DropdownItem to="#">Edit</DropdownItem>
                <DropdownItem onClick={handleOpenDetail}>Detail</DropdownItem>
                <DropdownItem
                  className="accent-color"
                  onClick={popupDeleteConfirmOpen}
                >
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>

            <div className="avatar-xl mx-auto mb-4">
              <span
                className={
                  "avatar-title bg-soft-light text-light display-4 m-0 rounded-circle"
                }
              >
                <i
                  className="bx bxs-user-circle"
                  style={{ color: "#7b746f" }}
                ></i>
              </span>
            </div>

            <h5 className="font-size-15 mb-1">
              <Link to={`campaign/${campaign.id}`} className="text-dark">
                {campaign.name}
              </Link>
            </h5>
            <p className="text-muted mb-2">Campaign ID (gi): {campaign.id}</p>
          </CardBody>
          <div className="btn-group p-2" role="group">
            <button
              type="button"
              onClick={handleOpenDetail}
              className="btn btn-link-accent text-truncate"
            >
              <i className="uil uil-user me-1"></i> Detail
            </button>
          </div>
        </Card>
      </Col>
      {isDeleteConfirm && (
        <ConfirmDelete
          isOpen={isDeleteConfirm}
          id={campaign.id}
          handleDelete={handleDeleteCampaign}
          toggle={popupDeleteConfirmClose}
        />
      )}
    </>
  );
};

export default CardCampaigns;
