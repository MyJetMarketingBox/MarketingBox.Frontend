import React, { useMemo, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Card,
  CardBody,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledDropdown,
} from "reactstrap";
import ConfirmDelete from "../confirmDelete/ConfirmDelete";
import { CardTypeEnum } from "../../../enums/CardTypeEnum";

const miniCard = ({
  data,
  path = "",
  cardType = CardTypeEnum.Campaign,
  handleDelete,
  openEditCampaign,
}: any) => {
  const { push } = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteConfirm, setIsDeleteConfirm] = useState(false);

  const popupDeleteConfirmOpen = () => {
    setIsDeleteConfirm(true);
  };

  const popupDeleteConfirmClose = () => {
    setIsDeleteConfirm(false);
  };

  const handleOpenDetail = () => {
    push(path);
  };

  const handleClickEdit = () => {
    console.log(data);
    openEditCampaign(data);
  };

  const cardTypeTitle = useMemo(() => {
    switch (cardType) {
      case CardTypeEnum.Geo:
        return "Geo ID (li):";
      case CardTypeEnum.Offer:
        return "Offer ID:";

      default:
        return "Campaign ID (gi):";
    }
  }, [cardType]);

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
                  <i
                    className={`mdi ${
                      isOpen ? "mdi-dots-horizontal" : "mdi-dots-vertical"
                    }`}
                  />
                </DropdownToggle>

                <DropdownMenu className="float-start">
                  <DropdownItem
                    onClick={
                      cardType === CardTypeEnum.Geo
                        ? handleOpenDetail
                        : handleClickEdit
                    }
                  >
                    Edit
                  </DropdownItem>
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
              <Link to={path} className="text-dark-blue">
                {data.name}
              </Link>
            </h5>
            <p className="text-muted mb-2">
              {cardTypeTitle} {data.id}
            </p>

            <Row style={{ display: "inline-block" }}>
              <span className="text-start">Created: </span>
              <span className="text-end">
                {new Date(data.createdAt).toLocaleDateString("ru-RU", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "2-digit",
                })}
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
          handleDelete={handleDelete}
          toggle={popupDeleteConfirmClose}
        />
      )}
    </>
  );
};

export default miniCard;
