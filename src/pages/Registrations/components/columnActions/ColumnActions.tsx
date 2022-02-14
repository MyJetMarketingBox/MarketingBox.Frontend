import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap";
import { deleteAffiliate as onDeleteAffiliate } from "../../../../store/affiliates/actions";
import ConfirmDeleteAff from "../confirm/ConfirmDeleteAff";

export default ({ id }: any) => {
  const dispatch = useDispatch();
  const [isDeleteConfirm, setIsDeleteConfirm] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleAction = () => {
    setIsOpen(prev => !prev);
  }

  const popupDeleteConfirmOpen = () => {
    setIsDeleteConfirm(true);
  }

  const popupDeleteConfirmClose = () => {
    setIsDeleteConfirm(false);
  }

  const handleDeleteRegistration = (id: number) => () => {
    //dispatch(onDeleteRegistration(id))
  };

  return (
    <div>
      <UncontrolledDropdown isOpen={isOpen} toggle={toggleAction}>
        <DropdownToggle tag="a" className="btn btn-light">
          <i className={`mdi ${isOpen ? "mdi-dots-horizontal" : "mdi-dots-vertical"}`} />
        </DropdownToggle>

        <DropdownMenu className="float-start">
          <DropdownItem onClick={popupDeleteConfirmOpen} className="link-danger">
            delete
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
      {
        isDeleteConfirm &&
        <ConfirmDeleteAff
          close={popupDeleteConfirmClose}
          handleDelete={handleDeleteRegistration(id)}
        />
      }
    </div>
  )
}
