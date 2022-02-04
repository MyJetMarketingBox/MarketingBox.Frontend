import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap";
import { deleteAffiliate as onDeleteAffiliate } from "../../../store/affiliates/actions";
import ConfirmDeleteAff from "./ConfirmDeleteAff";

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

  const handleDeleteAffiliate = (id: number) => () => {
    dispatch(onDeleteAffiliate(id))
  };

  return (
    <div>
      <UncontrolledDropdown onClick={toggleAction}>
        <DropdownToggle tag="a" className="btn btn-light">
          <i className={`mdi ${isOpen ? "mdi-dots-horizontal" : "mdi-dots-vertical"}`} />
        </DropdownToggle>

        <DropdownMenu className="float-start">
          <DropdownItem tag={Link} to={{
            pathname: `/Affiliates/view/${id}`,
            state: { id }
          }}>edit</DropdownItem>
          <DropdownItem onClick={popupDeleteConfirmOpen}>delete</DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
      {
        isDeleteConfirm &&
        <ConfirmDeleteAff
          close={popupDeleteConfirmClose}
          handleDelete={handleDeleteAffiliate(id)}
        />
      }
    </div>
  )
}
