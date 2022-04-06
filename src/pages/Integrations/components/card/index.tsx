import React, { useState } from "react";
import { Link } from "react-router-dom";
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
import { deleteIntegration } from "../../../../store/integrations/actions";
import ConfirmDelete from "../../../../components/UI/confirmDelete/ConfirmDelete";

const CardIntegration = (props : any) => {
  const { integration } = props;

  const dispatch = useDispatch();
  const [isDeleteConfirm, setIsDeleteConfirm] = useState(false);

  const popupDeleteConfirmOpen = () => {
    setIsDeleteConfirm(true);
  }

  const popupDeleteConfirmClose = () => {
    setIsDeleteConfirm(false);
  }

  const handleDeleteIntegration = () => {
    dispatch(deleteIntegration(integration.id))
  }

  return (
    <>
      <Col xl="3" sm="6">
        <Card className="text-center">
          <CardBody>

            <div className="avatar-xl mx-auto mb-4">
                <span
                  className={
                    "avatar-title bg-soft-light text-light display-4 m-0 rounded-circle"
                  }
                >
                  <i className="bx bxs-user-circle" style={{"color":"#7b746f"}}></i>
                </span>
            </div>

            <h5 className="font-size-15 mb-1">
              <Link to={`campaign/${integration.id}`} className="text-dark">
                {integration.name}
              </Link>
            </h5>

          </CardBody>

          <div className="btn-group" role="group">
            <button
              type="button"
              className="btn btn-outline-light text-truncate"
            >
              <i className="uil uil-user me-1"></i> Detail
            </button>
            <button
              type="button"
              className="btn btn-outline-light text-truncate"
              onClick={popupDeleteConfirmOpen}
            >
              <i className="uil uil-envelope-alt me-1"></i> Delete
            </button>
          </div>

        </Card>
      </Col>
      {
        isDeleteConfirm &&
        <ConfirmDelete
          close={popupDeleteConfirmClose}
          handleDelete={handleDeleteIntegration} />
      }
    </>
  )
}

export default CardIntegration;