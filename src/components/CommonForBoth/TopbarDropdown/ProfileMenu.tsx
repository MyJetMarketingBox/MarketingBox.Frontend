import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

//i18n
import { withTranslation } from "react-i18next";
// Redux
import { withRouter, Link } from "react-router-dom";

// users
import user1 from "../../../assets/images/users/avatar-1.jpg";

//redux
import { useSelector } from "react-redux";

import c from "./ProfileMenu.module.scss";
import { LOCAL_STORAGE_AUTH_USER } from "../../../constants/localStorageKeys";
import Page from "src/constants/pages";
import { avaLetters } from "../../../helpers/avaLetters";

const ProfileMenu = (props: any) => {
  const { success, profile } = useSelector((state: any) => ({
    success: state.Profile.success,
    profile: state.Profile.data?.generalInfo,
  }));

  // Declare a new state variable, which we'll call "menu"
  const [menu, setMenu] = useState<boolean>(false);
  //const [username, setusername] = useState("Admin");

  const dropdownClickHandler = () => {
    setMenu(prev => !prev);
  };

  /*useEffect(() => {
    const getAuthUser = localStorage.getItem(LOCAL_STORAGE_AUTH_USER);
    if (getAuthUser) {
      const obj = JSON.parse(getAuthUser);
      setusername(obj.username);
    }
  }, [success]);*/

  return (
    <Dropdown isOpen={menu} toggle={dropdownClickHandler} className="d-flex">
      <DropdownToggle
        className={c.toggle}
        id="page-header-user-dropdown"
        tag="button"
      >
        {/*<img src={user1} alt="Header Avatar" />*/}
        <div className="avatar mini">
          <div className="avatar_letters mini">
            {avaLetters(profile?.username)}
          </div>
        </div>
      </DropdownToggle>
      <DropdownMenu className="dropdown-menu-end">
        <DropdownItem tag="a" href={Page.PROFILE}>
          <i className="bx bx-user font-size-16 align-middle me-1" />
          {props.t("Profile")}{" "}
        </DropdownItem>
        <DropdownItem tag="a" href={Page.LOCK_SCREEN}>
          <i className="bx bx-lock-open font-size-16 align-middle me-1" />
          {props.t("Lock screen")}
        </DropdownItem>
        <div className="dropdown-divider" />
        <Link to={Page.SIGN_OUT} className="dropdown-item">
          <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger" />
          <span>{props.t("Logout")}</span>
        </Link>
      </DropdownMenu>
    </Dropdown>
  );
};

ProfileMenu.propTypes = {
  success: PropTypes.any,
  t: PropTypes.any,
};
export default withTranslation()(withRouter(ProfileMenu));
