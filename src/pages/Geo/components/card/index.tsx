import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Card,
  CardBody,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle, Row,
  UncontrolledDropdown
} from "reactstrap";
import { useDispatch } from "react-redux";
import { deleteCampaign } from "../../../../store/campaigns/actions";
import ConfirmDelete from "../../../../components/UI/confirmDelete/ConfirmDelete";
import { CampaignType } from "src/types/CampaignsTypes";
import Page from "src/constants/pages";

interface Props {
  campaign: CampaignType;
}
const Index = ({ data }: any) => {
  const dispatch = useDispatch();
  const { push } = useHistory();
  const [isDeleteConfirm, setIsDeleteConfirm] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectId, setSelectId] = useState(false);

  const handleDelete = () => {
    //dispatch(deleteCampaign(data.id));
  };

  const popupDeleteConfirmOpen = () => {
    setIsDeleteConfirm(true);
  };

  const handleOpenDetail = () => {
    push(`/geo/edit/${data.id}`);
  };

  const popupDeleteConfirmClose = () => {
    setIsDeleteConfirm(false);
  };

  const handleDeleteCampaign = () => {
    //dispatch(deleteCampaign(data.id));
  };

  const toggleAction = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <>
      <Col xl="3" sm="6">
        <Card className="text-center">
          <CardBody className="mb-0">

            <Row className="card-dot text-end">
              <UncontrolledDropdown isOpen={isOpen} toggle={toggleAction}>
                <DropdownToggle className="btn btn-light" tag="a">
                  <i className={`mdi ${
                    isOpen ? "mdi-dots-horizontal" : "mdi-dots-vertical"
                  }`} />
                </DropdownToggle>

                <DropdownMenu className="float-start">
                  <DropdownItem onClick={handleOpenDetail}>Edit</DropdownItem>
                  <DropdownItem
                    className="accent-color"
                    onClick={popupDeleteConfirmOpen}
                  >
                    Delete
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Row>

            <h5 className="font-size-22 mx-auto mb-4 mt-5 truncate">
              <Link to={`/geo/edit/${data.id}`} className="text-dark-blue">
                {data.name}
              </Link>
            </h5>
            <p className="text-muted mb-2">Geo ID (li): {data.id}</p>
            <Row style={{display: "inline-block"}} >
              <span className="text-start">Created: </span>
              <span className="text-end">
                {new Date(data.createdAt).toLocaleDateString('ru-RU', {day:"2-digit", month:"2-digit", year:"2-digit"})}
              </span>
            </Row>
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
          id={data.id}
          handleDelete={handleDeleteCampaign}
          toggle={popupDeleteConfirmClose}
        />
      )}
    </>
  );
};

export default Index;
